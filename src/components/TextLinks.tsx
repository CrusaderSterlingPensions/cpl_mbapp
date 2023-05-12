import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { textLinksProps } from './components.type';
import { verticalScale } from 'react-native-size-matters';
import { COLORS } from '../global';

const TextLinks = ({ linkContainerStyles, linkTextStyle, onPress, label }: textLinksProps) => {
  return (
    <TouchableOpacity style={{ ...styles.linkContainer, ...linkContainerStyles }} onPress={onPress}>
      <Text style={{ ...styles.linkText, ...linkTextStyle }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextLinks;

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: verticalScale(7),
  },

  linkText: {
    color: COLORS.NEUTRAL.WHITE,
  },
});
