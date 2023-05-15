import { StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native';
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

//https://bentracker.crusaderpensions.com/recapweb/
//https://www.crusaderpensions.com/data-privacy-policy/"

const CustomDrawer = (props: any) => {
  const profile = props.data;

  const OpenLink = ({ label, link }: any) => {
    const handleOpenLink = async (url: any) => {
      try {
        await Linking.openURL(url);
      } catch (err) {
        console.error(err);
      }
    };
    return (
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.NEUTRAL.ACCENT,
          borderRadius: moderateScale(3),
          marginHorizontal: moderateScale(15),
        }}
        onPress={() => handleOpenLink(link)}
      >
        <Text
          style={{
            color: COLORS.NEUTRAL.WHITE,
            ...FONTS.body3Bold,
            paddingVertical: moderateScale(12),
            paddingLeft: moderateScale(22),
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

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

        <DrawerItemList {...props} />
        <View
          style={{
            flexDirection: 'column',
            gap: moderateScale(8),
            justifyContent: 'center',
            marginVertical: moderateScale(20),
          }}
        >
          <OpenLink
            label={'Data Recapture'}
            link={'https://bentracker.crusaderpensions.com/recapweb/'}
          />
          <OpenLink
            label={'Privacy Policy'}
            link={'https://www.crusaderpensions.com/data-privacy-policy/'}
          />
          <OpenLink
            label={'Mandate Change'}
            link={'https://www.crusaderpensions.com/data-privacy-policy/'}
          />
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        label={'Sign Out'}
        onPress={() => {
          props.navigation.navigate('LogoutModal');
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
        icon={() => <MaterialIcons name="logout" size={24} color={COLORS.NEUTRAL.DARK} />}
      />
    </View>
  );
};

const DrawerMenu = ({ navigation }: any) => {
  const { profile } = data;
  const profileData = profile[0];
  const HeaderTitle = (props?: any) => {
    const { title, subTitle, customTitleStyle } = props;
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="auto" translucent />
        <Text style={{ ...FONTS.body2Bold, marginBottom: 5, ...customTitleStyle }}>{title}</Text>
        {subTitle && <Text>{subTitle}</Text>}
      </View>
    );
  };
  // const { profile } = useSelector(userSelector);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} data={profileData} />}
      screenOptions={({ navigation }) => ({
        headerTitle: () => (
          <HeaderTitle
            title={`Hi, ${profileData?.title?.toUpperCase()} ${profileData?.surname?.toUpperCase()}`}
            subTitle={profileData?.pin}
          />
        ),
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
        drawerActiveBackgroundColor: COLORS.NEUTRAL.LIGHT_HOVER,
        drawerInactiveBackgroundColor: COLORS.NEUTRAL.TRANSPARENT,
      })}
    >
      <Drawer.Screen
        name={'DashBoard'}
        options={{
          title: `Dashboard`,
          drawerIcon: () => (
            <MaterialIcons
              name="dashboard"
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
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
          headerTitle: () => (
            <HeaderTitle title="Statement Request" customTitleStyle={{ ...FONTS.body3Bold }} />
          ),
        }}
        component={StatementRequest}
      />
      <Drawer.Screen
        name={'FundTransfer'}
        options={{
          title: 'Funds Movement',
          headerShown: true,
          drawerIcon: () => (
            <Feather
              name="briefcase"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
          headerTitle: () => (
            <HeaderTitle title="Fund Movement" customTitleStyle={{ ...FONTS.body3Bold }} />
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
            <FontAwesome5
              name="location-arrow"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
          headerTitle: () => (
            <HeaderTitle title="Branch Locator" customTitleStyle={{ ...FONTS.body3Bold }} />
          ),
          headerStyle: { backgroundColor: COLORS.NEUTRAL.LIGHT, height: 120 },
        }}
        component={BranchLocator}
      />
      {/* <Drawer.Screen
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
          headerTitle: () => (
            <HeaderTitle title="Benefit Application" customTitleStyle={{ ...FONTS.body3Bold }} />
          ),
        }}
        component={BenefitApplication}
      /> */}
      <Drawer.Screen
        name={'ProductCatalogue'}
        options={{
          title: 'Product Catalogue',
          headerShown: true,
          drawerIcon: () => (
            <SimpleLineIcons
              name="graph"
              size={24}
              color={COLORS.NEUTRAL.DARK}
              style={{ marginLeft: 10 }}
            />
          ),
          headerTitle: () => (
            <HeaderTitle title="Product Catalogue" customTitleStyle={{ ...FONTS.body3Bold }} />
          ),
        }}
        component={ProductCatalogue}
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
