import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../Assets';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No restaurants found</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.black,
  },
});
