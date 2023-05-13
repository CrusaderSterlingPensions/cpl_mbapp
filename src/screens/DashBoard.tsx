import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTS, SIZES } from '../global';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Image } from 'react-native';
import { nairaLogoWhite } from '../global/images';
import { Balances, History, Prices } from './fragments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/userSlice';
import { data } from '../global';
import { StatusBar } from 'expo-status-bar';

const DashBoard = () => {
  const dispatch: any = useDispatch();
  const { profile } = data;
  const profileData = profile[0];

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <Balances profile={profileData} />
      <Prices profile={profileData} />
      <History profile={profileData} />
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
