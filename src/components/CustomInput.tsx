import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { normalize, SIZES, COLORS, FONTS } from '../global';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { customInputProps, dropDownInputProps } from './components.type';

export const DropDownInput = ({
  label,
  isFocus,
  setIsFocus,
  data,
  value,
  onChange,
}: dropDownInputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: COLORS.NEUTRAL.DARK }]}
        placeholderStyle={{ ...FONTS.body3Regular, color: COLORS.NEUTRAL.LIGHT_HOVER }}
        selectedTextStyle={{ ...FONTS.body3Regular, color: COLORS.NEUTRAL.DARK }}
        itemTextStyle={{ ...FONTS.body3Regular, color: COLORS.NEUTRAL.DARK }}
        itemContainerStyle={{}}
        data={data}
        maxHeight={300}
        value={value}
        labelField="label"
        valueField="label"
        placeholder={!isFocus ? 'Select an Option' : '...'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        activeColor={COLORS.PRIMARY.LIGHT}
      />
    </View>
  );
};

// export const DatePicker = ({
//   date,
//   setDate,
//   showDatePicker,
//   setShowDatePicker,
//   dateValue,
//   setDateValue,
//   label,
//   error,
// }: any) => {
//   return (
//     <View
//       style={
//         Platform.OS === 'ios'
//           ? {
//               marginTop: verticalScale(20),
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }
//           : { marginTop: verticalScale(20) }
//       }
//     >
//       {label && <Text style={{ ...FONTS.body3Regular, marginBottom: scale(5) }}>{label}</Text>}
//       {Platform.OS === 'android' && (
//         <TouchableOpacity
//           style={
//             date
//               ? { ...styles.containerSec }
//               : { ...styles.containerSec, borderColor: COLORS.ERROR.NORMAL }
//           }
//           onPress={() => setShowDatePicker(true)}
//         >
//           <TextInput editable={false} placeholder={'DD/MM/YYYY'} value={dateValue} />
//         </TouchableOpacity>
//       )}
//       {Platform.OS === 'android' ? (
//         showDatePicker && (
//           <DateTimePicker
//             mode="date"
//             display="default"
//             onChange={(event, value) => {
//               setShowDatePicker(!showDatePicker);
//               setDate(value);
//               setDateValue(moment(value).format('DD/MM/YYYY'));
//             }}
//             value={date}
//             maximumDate={new Date()}
//           />
//         )
//       ) : (
//         <DateTimePicker
//           mode="date"
//           display="default"
//           onChange={(event, value) => {
//             setShowDatePicker(!showDatePicker);
//             setDate(value);
//             setDateValue(moment(value).format('DD/MM/YYYY'));
//           }}
//           value={date}
//           maximumDate={new Date()}
//         />
//       )}
//     </View>
//   );
// };

const CustomInput = ({
  password,
  confirmPassword,
  label,
  keyboardType,
  multiline,
  numberOfLines,
  secureTextEntry,
  error,
  icon,
  placeholder,
  autoCapitalize,
  desc,
  autoComplete,
  value,
  onFocus = () => {},
  containerStyle,
  contextMenuHidden,
  editable,
  ...props
}: customInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShown, setIsShown] = useState(true);

  const accessibilityState: any = { disabled: !editable };
  const toggleBalance = () => {
    setIsShown(!isShown);
  };
  return (
    <View
      style={{ marginTop: verticalScale(10), ...containerStyle }}
      accessible
      accessibilityLabel={label}
      accessibilityState={
        Platform.OS === 'android'
          ? accessibilityState
          : `${label} ${!editable ? ': Disabled!' : ''}`
      }
    >
      {label && <Text style={styles.label}>{label}</Text>}
      {desc && <Text style={styles.desc}>{desc}</Text>}
      <View
        style={[
          styles.containerSec,
          {
            borderColor: error
              ? COLORS.ERROR.LIGHT_ACTIVE
              : isFocused
              ? COLORS.NEUTRAL.GRAY
              : COLORS.NEUTRAL.LIGHT_HOVER,
          },
        ]}
      >
        <TextInput
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={styles.inputSec}
          placeholder={placeholder}
          placeholderTextColor={COLORS.NEUTRAL.WHITE}
          secureTextEntry={(password || confirmPassword) && isShown ? true : false}
          autoCorrect={false}
          autoComplete={autoComplete}
          contextMenuHidden={contextMenuHidden}
          value={value}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {(password || confirmPassword) && (
          <TouchableOpacity onPress={() => toggleBalance()}>
            <FontAwesome5
              name={!isShown ? 'eye' : 'eye-slash'}
              size={normalize(16)}
              color={COLORS.NEUTRAL.WHITE}
            />
          </TouchableOpacity>
        )}
      </View>
      {!password && error && <Text style={{ ...styles.errorMessage }}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    ...FONTS.body3Regular,
    color: COLORS.PRIMARY.DARKER,
    marginBottom: 3,
  },
  desc: {
    color: 'black',
    opacity: 0.6,
    ...FONTS.body3Regular,
    paddingTop: 5,
  },
  containerSec: {
    width: '100%',
    backgroundColor: COLORS.NEUTRAL.TRANSPARENT_WHITE20,
    height: verticalScale(40),
    paddingLeft: scale(10),
    paddingRight: scale(30),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.NEUTRAL.WHITE,
  },
  inputSec: {
    height: moderateScale(50),
    color: COLORS.NEUTRAL.WHITE,
    width: '100%',
    paddingLeft: scale(5),
    paddingRight: scale(20),
    ...FONTS.body3Regular,
  },
  errorMessage: {
    ...FONTS.body4Regular,
    color: COLORS.ERROR.LIGHT_ACTIVE,
    marginTop: verticalScale(3),
  },
  dropdown: {
    height: moderateScale(50),
    borderRadius: SIZES.radius,
    paddingHorizontal: moderateScale(10),
    backgroundColor: COLORS.PRIMARY.LIGHT,
    borderColor: COLORS.NEUTRAL.LIGHT_HOVER,
    borderWidth: 1,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
});
