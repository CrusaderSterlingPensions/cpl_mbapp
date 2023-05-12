import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../global';
import { moderateScale } from 'react-native-size-matters';

export default function Line() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderColor: COLORS.NEUTRAL.WHITE,
    borderStyle: 'solid',
    height: 1,
    width: '41.5%',
    marginVertical: moderateScale(10),
  },
});
