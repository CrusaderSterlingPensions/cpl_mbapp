import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { COLORS, FONTS } from '../global';

type backButtonProps = {
  label?: string;
  onPress: () => void;
};

const BackButton = ({ label, onPress }: backButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="arrow-back" size={24} color={COLORS.PRIMARY.NORMAL} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    marginLeft: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '40%',
  },
  label: {
    ...FONTS.body3Regular,
    marginLeft: moderateScale(5),
  },
});
