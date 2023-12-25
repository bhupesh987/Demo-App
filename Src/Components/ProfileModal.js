import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../Assets';
import Button from './Button';
import {useAuth} from '../Context/UserContext';
import {SET_ASYNC_DATA} from '../Async';
import {IS_AUTH} from '../Constants';

const ProfileModal = ({modalVisible, setModalVisible}) => {
  const {updateIsAuth} = useAuth();

  const handleLogout = async() => {
    setModalVisible(false);
    updateIsAuth(false);
    await SET_ASYNC_DATA(IS_AUTH, 'null');
    ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
    StatusBar.setBackgroundColor(COLORS.white);
    StatusBar.setBarStyle('dark-content');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hi John! Do you want to logout?</Text>
          <View style={styles.buttonsBox}>
            <Button
              title={'Close'}
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <Button
              title={'Log Out'}
              style={styles.button}
              onPress={handleLogout}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    paddingHorizontal: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: COLORS.black,
  },
  button: {
    marginHorizontal: 15,
  },
  buttonsBox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
