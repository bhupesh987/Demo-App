import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, IMAGES} from '../Assets';

const Header = ({title = '', onPress = () => {}}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image
          source={IMAGES.profile}
          resizeMode={'contain'}
          style={styles.profile}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
  },
  profile: {
    height: 35,
    width: 35,
  },
});
