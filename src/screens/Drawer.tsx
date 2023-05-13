import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContent,
} from '@react-navigation/drawer';

import {
  Fontisto,
  MaterialIcons,
  FontAwesome,
  Feather,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../global';
import { MenuIcon, ProfileImage } from '../components';
import DashBoard from './DashBoard';
import StatementRequest from './StatementRequest';
import FundTransfer from './FundTransfer';
import BranchLocator from './BranchLocator';
import BenefitApplication from './BenefitApplication';
import ProductCatalogue from './ProductCatalogue';
import LogoRed from '../components/LogoIcon';
import DataRecapture from './DataRecapture';
import PrivacyPolicy from './PrivacyPolicy';
import MandateChange from './MandateChange';
import { data } from '../global';
import { StatusBar } from 'expo-status-bar';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props: any) => {
  const profile = props.data;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView style={styles.drawerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.header}>
            <ProfileImage
              profile={profile}
              onPress={() => props.navigation.navigate('Profile', { data: profile })}
            />
            <View style={styles.nameEmailWrapper}>
              <Text
                style={styles.drawerProfileName}
              >{`${profile?.title?.toUpperCase()}  ${profile?.surname?.toUpperCase()}  ${profile?.first_name?.toUpperCase()}`}</Text>
              <Text style={styles.drawerProfileEmail}>{profile?.email?.toLowerCase()}</Text>
              <Text style={styles.drawerProfilePIN}>PEN110043917427</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewProfileWrapper}
            onPress={() => props.navigation.navigate('Profile', { data: profile })}
          >
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.searchBoxWrapper}>Hello</View> */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label={'Sign Out'}
        onPress={() => {
          // props.navigation.navigate('LogoutModal');
        }}
        style={{
          width: '100%',
          backgroundColor: COLORS.NEUTRAL.WHITE,
          marginLeft: 0,
          height: 80,
          paddingHorizontal: 8,
          marginVertical: 0,
          borderRadius: 0,
          borderTopWidth: 1,
          borderTopColor: COLORS.PRIMARY.LIGHT,
          paddingTop: 10,
        }}
        labelStyle={{
          color: COLORS.NEUTRAL.DARK,
          ...FONTS.body3Medium,
        }}
        icon={() => <SimpleLineIcons name="logout" size={24} color={COLORS.NEUTRAL.DARK} />}
      />
    </View>
  );
};

const DrawerMenu = ({ navigation }: any) => {
  const { profile } = data;
  const profileData = profile[0];
  // const { profile } = useSelector(userSelector);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} data={profileData} />}
      screenOptions={({ navigation }) => ({
        headerTitle: () => {
          return (
            <View
              style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <StatusBar style="auto" translucent />
              <Text
                style={{ ...FONTS.body2Bold, marginBottom: 5 }}
              >{`Hi, ${profileData?.title?.toUpperCase()} ${profileData?.surname?.toUpperCase()}`}</Text>
              <Text>{profileData?.pin}</Text>
            </View>
          );
        }, //Put name
        headerStyle: {
          height: 120,
          backgroundColor: COLORS.NEUTRAL.WHITE,
        },
        headerRightContainerStyle: {
          paddingRight: 10,
        },
        headerLeftContainerStyle: {
          width: '15%',
        },
        headerLeft: () => <MenuIcon onPress={() => navigation.toggleDrawer()} />,
        headerRight: () => <LogoRed />,
        headerTitleContainerStyle: {
          width: '100%',
        },
        headerTitleStyle: {
          ...FONTS.body3Medium,
          color: COLORS.NEUTRAL.NORMAL,
        },

        headerShown: true,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerItemStyle: styles.drawerItemStyle,
        drawerActiveBackgroundColor: COLORS.PRIMARY.LIGHT,
        drawerInactiveBackgroundColor: COLORS.NEUTRAL.TRANSPARENT,
      })}
    >
      <Drawer.Screen
        name={'Dashboard'}
        options={{
          title: `Dashboard`,
          drawerIcon: () => (
            <FontAwesome
              name="bank"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={DashBoard}
      />
      <Drawer.Screen
        name="StatementRequest"
        options={{
          title: 'Statement Request',
          headerShown: true,
          drawerIcon: () => (
            <AntDesign
              name="adduser"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={StatementRequest}
      />
      <Drawer.Screen
        name={'Calculator'}
        options={{
          title: 'Funds Movements',
          headerShown: true,
          drawerIcon: () => (
            <Feather
              name="briefcase"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={FundTransfer}
      />
      <Drawer.Screen
        name={'BranchLocator'}
        options={{
          title: 'Branch Locator',
          headerShown: true,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="file-percent-outline"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={BranchLocator}
      />
      <Drawer.Screen
        name={'BenefitApplication'}
        options={{
          title: 'Benefit Application',
          headerShown: true,
          drawerIcon: () => (
            <Feather
              name="settings"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={BenefitApplication}
      />
      <Drawer.Screen
        name={'ProductCatalogue'}
        options={{
          title: 'Product Catalogue',
          headerShown: true,
          drawerIcon: () => (
            <Feather
              name="settings"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={ProductCatalogue}
      />
      <Drawer.Screen
        name="DataRecapture"
        options={{
          title: 'Data Recapture',
          headerShown: true,

          drawerActiveBackgroundColor: COLORS.NEUTRAL.WHITE,
          drawerItemStyle: {
            width: '90%',
            backgroundColor: COLORS.NEUTRAL.ACCENT,
            marginTop: moderateScale(10),
          },
          drawerActiveTintColor: COLORS.NEUTRAL.WHITE,
          drawerInactiveTintColor: COLORS.NEUTRAL.WHITE,
          drawerLabelStyle: {
            color: COLORS.NEUTRAL.WHITE,
            marginLeft: moderateScale(20),
          },
        }}
        component={DataRecapture}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        options={{
          title: 'Privacy Policy',
          headerShown: true,

          drawerActiveBackgroundColor: COLORS.NEUTRAL.WHITE,
          drawerItemStyle: {
            width: '90%',
            backgroundColor: COLORS.NEUTRAL.ACCENT,
          },
          drawerActiveTintColor: COLORS.NEUTRAL.WHITE,
          drawerInactiveTintColor: COLORS.NEUTRAL.WHITE,
          drawerLabelStyle: {
            color: COLORS.NEUTRAL.WHITE,
            marginLeft: moderateScale(20),
          },
        }}
        component={PrivacyPolicy}
      />
      <Drawer.Screen
        name="MandateChange"
        options={{
          title: 'Mandate Change',
          headerShown: true,

          drawerActiveBackgroundColor: COLORS.NEUTRAL.WHITE,
          drawerItemStyle: {
            width: '90%',
            backgroundColor: COLORS.NEUTRAL.ACCENT,
          },
          drawerActiveTintColor: COLORS.NEUTRAL.WHITE,
          drawerInactiveTintColor: COLORS.NEUTRAL.WHITE,
          drawerLabelStyle: {
            color: COLORS.NEUTRAL.WHITE,
            marginLeft: moderateScale(20),
          },
        }}
        component={MandateChange}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.NEUTRAL.WHITE,
    flexDirection: 'row',
  },
  drawerContainer: {
    backgroundColor: COLORS.NEUTRAL.WHITE,
  },

  searchBoxWrapper: {
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },

  menuItemContainer: {
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  menuText: {
    ...FONTS.body2Regular,
    color: COLORS.NEUTRAL.WHITE,
    marginLeft: moderateScale(20),
  },
  drawerMenus: {
    marginVertical: verticalScale(20),
  },

  drawerLabelStyle: {
    color: COLORS.NEUTRAL.DARK,
    ...FONTS.body3Medium,
    marginLeft: 0,
  },
  drawerItemStyle: {
    borderRadius: 0,
    marginHorizontal: 0,
  },
  profileContainer: {
    height: 130,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: moderateScale(20),
  },
  nameEmailWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: moderateScale(3),
    marginHorizontal: moderateScale(10),
  },
  drawerProfileName: {
    ...FONTS.body3Bold,
  },
  drawerProfileEmail: {
    ...FONTS.body4Regular,
  },
  drawerProfilePIN: {
    ...FONTS.body4Bold,
  },
  viewProfileWrapper: {
    backgroundColor: COLORS.PRIMARY.NORMAL,
    width: 100,
    borderRadius: 5,
    height: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 55,
  },
  viewProfileText: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body4Bold,
  },
});
