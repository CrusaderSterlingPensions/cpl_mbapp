import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FONTS, COLORS, SIZES } from '../global';
import { textComponentProps } from './components.type';

const TextComponent = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
}: textComponentProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.NEUTRAL.TRANSPARENT,
  },
  label: {
    color: COLORS.NEUTRAL.DARK,
    ...FONTS.body3Regular,
  },
});
