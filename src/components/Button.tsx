import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { normalize, COLORS, FONTS, SIZES } from '../global';
import { buttonProps } from './components.type';

const Button = ({ onPress, text, customBtnStyle, customTextStyle, icon }: buttonProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btn, ...customBtnStyle }}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.flexRow}>
        {icon}
        <Text style={{ ...styles.btnText, ...customTextStyle }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY.NORMAL,
    borderColor: COLORS.NEUTRAL.TRANSPARENT,
    borderWidth: 1,
    width: SIZES.width * 0.9,
    paddingVertical: moderateScale(15),
  },

  disabled: {
    backgroundColor: COLORS.PRIMARY.LIGHT_HOVER,
    borderColor: COLORS.PRIMARY.DARK,
    borderWidth: 1,
  },

  btnText: {
    ...FONTS.body4Bold,
    color: COLORS.NEUTRAL.WHITE,
  },
});
