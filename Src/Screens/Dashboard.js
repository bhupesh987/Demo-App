import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../Components/Header';
import RestaurantList from '../Components/RestaurantList';
import ProfileModal from '../Components/ProfileModal';
import {checkUserLocation, getCurrentLocation} from '../Helpers';
import {GET_API} from '../Api';
import {API_KEY, NEARBY_API, USER_LOCATION} from '../Constants';
import {useLocation} from '../Context/UserContext';
import {
  createTable,
  getRecords,
  getDBConnection,
  saveRecords,
  totalRows,
} from '../Sqlite';
import Loader from '../Components/Loader';
import PermissionModal from '../Components/PermissionModal';
import {GET_ASYNC_DATA, SET_ASYNC_DATA} from '../Async';

const Dashboard = () => {
  const {updateCurrentLocation} = useLocation();

  const [loading, setLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [nearbyData, setNearbyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    loadDBCallback(0);
  }, []);

  const loadDBCallback = useCallback(
    async page => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        const restroData = await getRecords(db, page);
        const total = await totalRows(db);
        if (total > 0) {
          if (restroData?.length > 0) {
            setCurrentPage(page + 10);
            const latLng = await GET_ASYNC_DATA(USER_LOCATION);
            if (!!latLng) {
              const data = JSON.parse(latLng);
              updateCurrentLocation(data);
            }

            let items = [];
            restroData?.map(it => {
              items.push(JSON.parse(it?.restaurant_data));
            });
            setNearbyData([...nearbyData, ...items]);
          }
          setBottomLoading(false);
          setLoading(false);
        } else {
          getLocation();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [nearbyData, currentPage],
  );

  const getLocation = () => {
    checkUserLocation()
      .then(async e => {
        if (e === 'granted') {
          const location = await getCurrentLocation();
          let latLng = {
            lat: location?.coords?.latitude,
            lng: location?.coords?.longitude,
          };
          updateCurrentLocation(latLng);

          await SET_ASYNC_DATA(USER_LOCATION, JSON.stringify(latLng));
          GET_API(
            `${NEARBY_API}${location?.coords?.latitude}%2C${location?.coords?.longitude}&radius=100000&type=restaurant&key=${API_KEY}`,
          ).then(async res => {
            if (res?.status === 'OK') {
              let temp = [];
              const db = await getDBConnection();
              res?.results?.map(async (it, index) => {
                await saveRecords(db, JSON.stringify(it));
                index < 10 && temp.push(it);
              });
              setNearbyData(temp);
              setCurrentPage(10);
              setBottomLoading(false);
              setLoading(false);
            }
          });
        } else {
          if (e === 'blocked') {
            setPermissionModal(true);
          }
          setLoading(false);
          setBottomLoading(false);
        }
      })
      .catch(e => {
        console.log(e, 'err');
      });
  };

  const handleEndReached = async () => {
    if (!bottomLoading) {
      setBottomLoading(true);
      loadDBCallback(currentPage);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header title={'Hi, John'} onPress={() => setProfileModal(true)} />
      <RestaurantList
        data={nearbyData}
        handleEndReached={handleEndReached}
        loadingMore={bottomLoading}
      />
      <ProfileModal
        modalVisible={profileModal}
        setModalVisible={setProfileModal}
      />
      <PermissionModal
        modalVisible={permissionModal}
        setModalVisible={setPermissionModal}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
