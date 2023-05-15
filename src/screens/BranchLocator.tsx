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

const BranchLocator = ({ navigation }: any) => {
  type officeDetailsProps = {
    location: string;
    address: string;
    email: string;
    call: string;
    smsOnly?: string | undefined;
  };
  const OfficeDetails = ({ location, address, email, call, smsOnly }: officeDetailsProps) => {
    return (
      <View
        style={{
          paddingBottom: moderateScale(20),
          borderColor: COLORS.PRIMARY.DARK,
          backgroundColor: COLORS.NEUTRAL.WHITE,
          borderRadius: 10,
          flexDirection: 'column',
          overflow: 'hidden',
          marginVertical: 5,
        }}
      >
        <View
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            backgroundColor: COLORS.PRIMARY.NORMAL,
            paddingHorizontal: moderateScale(20),
          }}
        >
          <Text style={{ ...FONTS.body4Bold, color: COLORS.NEUTRAL.WHITE, textAlign: 'center' }}>
            {location}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(20),
            gap: 10,
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ ...FONTS.body4Regular }}>ADDRESS: </Text>
            <Text style={{ ...FONTS.body3Bold }}>{address}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ ...FONTS.body4Regular }}>EMAIL: </Text>
            <Text style={{ ...FONTS.body3Bold }}>{email}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ ...FONTS.body4Regular }}>CALL: </Text>
            <Text style={{ ...FONTS.body3Bold }}>{call}</Text>
          </View>
          {smsOnly && (
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ ...FONTS.body4Regular }}>SMS ONLY: </Text>
              <Text style={{ ...FONTS.body3Bold }}>{smsOnly}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <ScrollView style={styles.branchSectionContainer} showsVerticalScrollIndicator={false}>
        <Text style={{ ...FONTS.body3Bold, marginBottom: moderateScale(20) }}>Head office</Text>
        <OfficeDetails
          location="Lagos Offices"
          address="14B, Keffi Street, Off Awolowo Road, Ikoyi, Lagos, Nigeria"
          email="info@crusaderpensions.com"
          call="+234 (0) 818 011 2985"
          smsOnly="+234 (0) 806 980 4221"
        />

        <Text
          style={{
            ...FONTS.body3Bold,
            marginTop: moderateScale(20),
            marginBottom: moderateScale(10),
            color: COLORS.PRIMARY.NORMAL,
          }}
        >
          Regional Offices
        </Text>

        <View style={{ marginBottom: moderateScale(40) }}>
          <OfficeDetails
            location="Abeokuta Office"
            address="Suite 5, Cultural Village, Olusegun Obasanjo Presidential Library, Abeokuta, Ogun State"
            email="suleiman.olawoyin@crusaderpensions.com"
            call="+234 (0) 813 728 4995"
          />
          <OfficeDetails
            location="Abuja Office"
            address="Plot 273 Samuel Ademulegun Street, UAC Building, Ground Floor, Central Business District, Abuja.,FCT"
            email="aminu.dabo@crusaderpensions.com"
            call="+234 (0) 706 884 7766"
          />
          <OfficeDetails
            location="Ibadan Office"
            address="No 18, Obafemi Awolowo Way,  Opposite Nigerian Baptist Convention Oke Bola Ibadan, Ibadan, Oyo State"
            email="olubunmi.alade@crusaderpensions.com"
            call="234 (0) 814 480 7383 , +234 (0) 807 740 3376"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BranchLocator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NEUTRAL.LIGHT,
    paddingHorizontal: moderateScale(20),
  },
  branchSectionContainer: {},
});
