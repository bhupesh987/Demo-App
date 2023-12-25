import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, IMAGES} from '../Assets';
import {useLocation} from '../Context/UserContext';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {API_KEY} from '../Constants';

const ItemDetail = props => {
  const {currentLocation} = useLocation();
  const {
    navigation,
    route: {params = {}},
  } = props;
  const {data = {}} = params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation?.goBack()}>
          <Image
            source={IMAGES.back}
            resizeMode={'contain'}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.titleText}>{data?.name}</Text>
      </View>

      {currentLocation?.lat && (
        <MapView
          showsUserLocation
          showsMyLocationButton={false}
          initialRegion={{
            latitude: +currentLocation?.lat,
            longitude: +currentLocation?.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0921,
          }}
          style={{flex: 1}}>
          <Marker
            coordinate={{
              latitude: data?.geometry?.location?.lat,
              longitude: data?.geometry?.location?.lng,
            }}
            title={data?.name}
          />
          <MapViewDirections
            origin={{
              latitude: +currentLocation?.lat,
              longitude: +currentLocation?.lng,
            }}
            destination={{
              latitude: data?.geometry?.location?.lat,
              longitude: data?.geometry?.location?.lng,
            }}
            strokeWidth={3}
            strokeColor={COLORS.primary}
            apikey={API_KEY}
          />
        </MapView>
      )}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backIcon: {
    height: 15,
    width: 15,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 7,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 7,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  titleText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 10,
  },
});
