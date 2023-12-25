import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../Assets';

const Button = ({onPress = () => {}, title = '', style = {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.container, ...style}}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 25,
    alignSelf: 'center',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 13,
  },
});
