import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { COLORS, FONTS } from '../global';

type backButtonProps = {
  label?: string;
  onPress: () => void;
  color?: string;
};

const BackButton = ({ label, color, onPress }: backButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="arrow-back" size={24} color={color || COLORS.NEUTRAL.WHITE} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(10),
    marginTop: 5,
    marginLeft: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '40%',
  },
  label: {
    ...FONTS.body2Medium,
    marginLeft: moderateScale(5),
    color: COLORS.NEUTRAL.WHITE,
  },
});
