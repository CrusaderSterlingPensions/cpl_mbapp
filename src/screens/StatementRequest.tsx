import { Animated, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../global';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Image } from 'react-native';
import { nairaLogoWhite } from '../global/images';
import { Balances, History, Prices } from './fragments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/userSlice';
import { data } from '../global';
import { StatusBar } from 'expo-status-bar';
import { Button, DatePicker } from '../components';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { nanoid } from '@reduxjs/toolkit';

const StatementRequest = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const { profile } = data;
  const profileData = profile[0];

  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [startDateValue, setStartDateValue] = useState<any>(moment().format('L'));
  const [endDateValue, setEndDateValue] = useState<any>(moment().format('L'));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [fundTypeIsFocus, setFundTypeIsFocus] = useState<boolean>(false);
  const [fundType, setFundType] = useState<any>('');
  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const fundTypeData: any[] = [
    { id: nanoid(12), label: 'Fund I', value: '1' },
    { id: nanoid(12), label: 'Fund II', value: '2' },
    { id: nanoid(12), label: 'Fund III', value: '3' },
    { id: nanoid(12), label: 'Fund IV', value: '4' },
  ];

  const validate = async () => {
    Keyboard.dismiss();
    setIsValid(true);
    if (!fundType) {
      handleError('Please select Fund Type', 'fundType');
      setIsValid(false);
    }
    if (isValid) {
      alert('Statement Requested Successfully');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState: any) => ({ ...prevState, [input]: error }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <View style={styles.dateSectionContainer}>
        <DatePicker
          date={startDate}
          setDate={setStartDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          dateValue={startDateValue}
          setDateValue={setStartDateValue}
          label={'Select Start Date'}
        />
        <DatePicker
          date={endDate}
          setDate={setEndDate}
          showDatePicker={showEndDatePicker}
          setShowDatePicker={setShowEndDatePicker}
          dateValue={endDateValue}
          setDateValue={setEndDateValue}
          label={'Select end Date'}
        />
      </View>
      <View style={styles.dropdownWrapper}>
        <Text style={{ ...FONTS.body3Bold }}>Select Fund Type</Text>
        <Dropdown
          style={[
            styles.dropdown,
            fundTypeIsFocus && { borderColor: COLORS.NEUTRAL.DARK },
            !fundType && errors.fundType
              ? {
                  backgroundColor: COLORS.ERROR.LIGHT,
                  borderColor: COLORS.ERROR.NORMAL,
                }
              : {
                  backgroundColor: COLORS.NEUTRAL.LIGHT,
                  borderColor: COLORS.NEUTRAL.LIGHT_HOVER,
                },
          ]}
          placeholderStyle={{ ...FONTS.body3Regular, color: COLORS.NEUTRAL.DARK }}
          selectedTextStyle={{ ...FONTS.body3Regular, color: COLORS.NEUTRAL.DARK }}
          itemTextStyle={{ ...FONTS.body3Regular, color: COLORS.NEUTRAL.DARK }}
          itemContainerStyle={{}}
          data={fundTypeData}
          maxHeight={300}
          value={fundType}
          labelField="label"
          valueField="label"
          placeholder={!fundTypeIsFocus ? 'Select an Option' : '...'}
          onFocus={() => setFundTypeIsFocus(true)}
          onBlur={() => setFundTypeIsFocus(false)}
          onChange={(item) => {
            setFundType(item);
            setFundTypeIsFocus(false);
          }}
          activeColor={COLORS.PRIMARY.LIGHT}
        />
        {!fundType && errors.fundType && (
          <Text style={{ ...styles.errorMessage }}>{errors.fundType}</Text>
        )}
      </View>
      <Button
        onPress={() => validate()}
        text={'Submit'}
        // customTextStyle={styles.btnTextStyle}
        // customBtnStyle={styles.customBtnStyle}
      />
    </View>
  );
};

export default StatementRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(20),
  },
  dateSectionContainer: {
    marginBottom: moderateScale(20),
  },
  dropdown: {
    height: moderateScale(50),
    borderRadius: moderateScale(7),
    paddingHorizontal: moderateScale(10),
    borderWidth: 1,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
  },
  dropdownWrapper: {
    marginTop: verticalScale(10),
  },
  errorMessage: {
    ...FONTS.body4Regular,
    color: COLORS.ERROR.NORMAL,
    marginTop: verticalScale(3),
    marginBottom: verticalScale(5),
  },
});
