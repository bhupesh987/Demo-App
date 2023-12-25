import {ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../Assets';

const Loader = () => {
  return <ActivityIndicator color={COLORS.primary} style={styles.loader} />;
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
});
