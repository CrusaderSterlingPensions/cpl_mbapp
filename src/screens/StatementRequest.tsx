import { Animated, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../global';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Image } from 'react-native';
import { nairaLogoWhite } from '../global/images';
import { Balances, History, Prices } from './fragments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, userSelector } from '../redux/userSlice';
import { data } from '../global';
import { StatusBar } from 'expo-status-bar';
import { Button, DatePicker, Loader, ModalScreen } from '../components';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { nanoid } from '@reduxjs/toolkit';
import { authSelector } from '../redux/authSlice';
import { clearDatesDetails, requestStatement, servicesSelector } from '../redux/servicesSlices';
import { FontAwesome5, Entypo, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

const StatementRequest = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const { userData } = useSelector(authSelector);
  const { isServicesLoading, isServicesError, isServicesSuccess } = useSelector(servicesSelector);

  const [startDate, setStartDate] = useState<any>(new Date(2023, 0, 1));
  const [endDate, setEndDate] = useState<any>(new Date());
  const [startDateValue, setStartDateValue] = useState<any>(moment('2023-01-01').format('L'));
  const [endDateValue, setEndDateValue] = useState<any>(moment().format('L'));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [fundTypeIsFocus, setFundTypeIsFocus] = useState<boolean>(false);
  const [fundType, setFundType] = useState<any>('');
  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [statementResponseData, setStatementResponseData] = useState<any>({});
  const [statementModalSuccess, setStatementModalSuccess] = useState<boolean>(false);
  const [statementModalError, setStatementModalError] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const fundTypeData: any[] = [
    { id: nanoid(12), label: 'Fund I', value: '1' },
    { id: nanoid(12), label: 'Fund II', value: '2' },
    { id: nanoid(12), label: 'Fund III', value: '3' },
    { id: nanoid(12), label: 'Fund IV', value: '4' },
  ];

  useEffect(() => {
    dispatch(clearDatesDetails);
    setDataLoading(false);
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));

    if (startDate && endDate) {
      console.log('Data Validated');
      const params = {
        pin: userData[1].pin,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      };
      setDataLoading(true);
      const response = await dispatch(requestStatement(params));
      if (response?.meta?.requestStatus === 'fulfilled') {
        setStatementResponseData(response);
        setDataLoading(false);
        setStatementModalSuccess(true);
      } else if (response?.meta?.requestStatus === 'rejected') {
        setDataLoading(false);
        setStatementModalError(true);
      }
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState: any) => ({ ...prevState, [input]: error }));
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 1);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <Loader loading={dataLoading} />
      <ModalScreen
        icon={
          <Ionicons name="checkmark-done-circle-outline" size={40} color={COLORS.NEUTRAL.GRAY} />
        }
        titleLabel={'Success'}
        message={statementResponseData.payload?.message}
        modalVisible={statementModalSuccess}
        setModalVisible={setStatementModalSuccess}
        buttonLabelTwo={'Proceed'}
        buttonOneOnPress={() => {}}
        buttonTwoOnPress={() => {
          dispatch(clearDatesDetails());
          setStartDateValue(moment('2023-01-01').format('L'));
          setEndDateValue(moment().format('L'));
          setStartDate(new Date(2023, 0, 1));
          setEndDate(new Date());
          setStatementModalSuccess(!statementModalSuccess);
        }}
      />
      <ModalScreen
        icon={<MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />}
        titleLabel={'Error'}
        message="Error Sending Statement to email, Please try again."
        modalVisible={statementModalError}
        setModalVisible={setStatementModalError}
        buttonLabelTwo={'Retry'}
        buttonOneOnPress={() => {}}
        buttonTwoOnPress={() => {
          setStatementModalError(!statementModalError);
          dispatch(clearDatesDetails());
        }}
      />
      <View style={styles.dateSectionContainer}>
        <Text
          style={styles.pin}
        >{`${userData[1].pin} (${userData[1].first_name} ${userData[1].surname})`}</Text>
        <Text style={styles.pin}>FUND TYPE: {userData[1].fund_id}</Text>
        <DatePicker
          date={startDate}
          setDate={setStartDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          dateValue={startDateValue}
          setDateValue={setStartDateValue}
          label={'Select Start Date'}
          maxDate={new Date()}
        />
        <DatePicker
          date={endDate}
          setDate={setEndDate}
          showDatePicker={showEndDatePicker}
          setShowDatePicker={setShowEndDatePicker}
          dateValue={endDateValue}
          setDateValue={setEndDateValue}
          label={'Select end Date'}
          maxDate={maxDate}
        />
      </View>
      {/* <View style={styles.dropdownWrapper}>
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
      </View> */}
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
  pin: {
    ...FONTS.body4Bold,
    marginBottom: 10,
  },
});
