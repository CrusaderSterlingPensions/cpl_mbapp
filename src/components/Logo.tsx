import { Image, StyleSheet, Text, View } from 'react-native';
import { whiteLogo } from '../global/images';
import React from 'react';
import { logoProps } from './components.type';
import { COLORS, FONTS } from '../global';
import { moderateScale } from 'react-native-size-matters';

const Logo = ({ title, containerStyle }: logoProps) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Image source={whiteLogo} style={{ ...styles.logo }} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
  },
  title: {
    ...FONTS.body4Regular,
    fontSize: 12,
    marginTop: moderateScale(10),
    color: COLORS.NEUTRAL.WHITE,
  },
});
