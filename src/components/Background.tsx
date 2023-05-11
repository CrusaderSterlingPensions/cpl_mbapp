import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { landingPageBackgroundImage } from '../global/images';
import { COLORS, SIZES } from '../global';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale } from 'react-native-size-matters';

const Background = () => {
  return <Text>JDBSFN</Text>;
};

export default Background;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
