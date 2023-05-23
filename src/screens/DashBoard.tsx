import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTS, SIZES } from '../global';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Image } from 'react-native';
import { nairaLogoWhite } from '../global/images';
import { Balances, History, Prices } from './fragments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, userSelector } from '../redux/userSlice';
import { data } from '../global';
import { StatusBar } from 'expo-status-bar';
import { authSelector, userLogin } from '../redux/authSlice';

const DashBoard = () => {
  const dispatch: any = useDispatch();
  const { loginPin, loginPassword } = useSelector(userSelector);
  const { userData } = useSelector(authSelector);
  const profileData = userData[1];
  const transactionData = userData[2];

  console.log('Dashboard is still rendering, and it is too bad');

  // useEffect(() => {
  //   dispatch(userLogin({ pin: 'loginPin', password: loginPassword }));
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <Balances transactionData={transactionData} profileData={profileData} />
      <Prices transactionData={transactionData} />
      <History transactionData={transactionData} />
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(10),
  },
});
