import {Linking, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../Assets';
import Button from './Button';

const PermissionModal = ({modalVisible, setModalVisible}) => {
  const handleClick = () => {
    Linking.openSettings();
    setModalVisible(false);
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
          <Text style={styles.modalText}>
            Location permission is blocked. Please allow location from settings.
          </Text>

          <Button
            title={'Open Settings'}
            style={styles.button}
            onPress={handleClick}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PermissionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    paddingHorizontal: 30,
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
    textAlign: 'center',
  },
  button: {
    margin: 15,
  },
});
