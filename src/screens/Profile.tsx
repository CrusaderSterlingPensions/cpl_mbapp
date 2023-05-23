import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../global';
import { BackButton, MenuIcon, ProfileImage } from '../components';
import { LinearGradient } from 'expo-linear-gradient';
import { profileBackground } from '../global/images';
import { round } from 'react-native-reanimated';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Profile = ({ navigation, route }: any) => {
  const profile = route.params.data;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={profileBackground}
        style={{ height: SIZES.height, width: SIZES.width }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <BackButton
            onPress={() => navigation.goBack()}
            label="Back"
            color={COLORS.NEUTRAL.DARK}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: moderateScale(20), marginBottom: moderateScale(80) }}
          >
            <View style={styles.profileImageWrapper}>
              <ProfileImage profile={profile} />
              <Text style={styles.strong}>
                {profile?.first_name?.toUpperCase() + ' ' + profile?.surname?.toUpperCase()}
              </Text>
              <Text style={styles.strong}>{profile?.pin}</Text>
            </View>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <View style={styles.sectionBody}>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>FullName</Text>
                    <Text style={styles.infoBody}>
                      {profile?.first_name?.toUpperCase() + ' ' + profile?.surname?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={[styles.infoContainer, { alignItems: 'flex-end' }]}>
                    <Text style={styles.infoTitle}>Gender</Text>
                    <Text style={styles.infoBody}>{profile.sex}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Email</Text>
                    <Text style={styles.infoBody}>{profile?.email?.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.infoContainer, { alignItems: 'flex-end' }]}>
                    <Text style={styles.infoTitle}>D.O.B</Text>
                    <Text style={styles.infoBody}>{profile?.date_of_birth}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Phone Number</Text>
                    <Text style={styles.infoBody}>{profile?.phone_number?.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.infoContainer, { alignItems: 'flex-end' }]}>
                    <Text style={styles.infoTitle}>Martital Status</Text>
                    <Text style={styles.infoBody}>{profile?.marital_status}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Address</Text>
                    <Text style={styles.infoBody}>{profile?.postal_address?.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>L.G.A</Text>
                    <Text style={styles.infoBody}>{profile?.local_g_area?.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.infoContainer, { alignItems: 'flex-end' }]}>
                    <Text style={styles.infoTitle}>State</Text>
                    <Text style={styles.infoBody}>{profile?.state_of_origin?.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <View style={styles.sectionBody}>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Account Number</Text>
                    <Text style={styles.infoBody}>{profile?.pin}</Text>
                  </View>
                  <View style={[styles.infoContainer, { alignItems: 'flex-end' }]}>
                    <Text style={styles.infoTitle}>Fund Type</Text>
                    <Text style={styles.infoBody}>{profile?.fund_id}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Account Manager</Text>
                    <Text style={styles.infoBody}>{profile?.accountOfficer}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Employer</Text>
                    <Text style={styles.infoBody}>{profile?.employerName}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Next of Kin Information</Text>
              <View style={styles.sectionBody}>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Full Name</Text>
                    <Text style={styles.infoBody}>
                      {profile?.nok_firstname?.toUpperCase() +
                        ' ' +
                        profile?.nok_middlename?.toUpperCase() +
                        ' ' +
                        profile?.nok_surname?.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Address</Text>
                    <Text style={styles.infoBody}>{profile?.nok_address}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Email</Text>
                    <Text style={styles.infoBody}>{profile?.nok_email}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.NEUTRAL.GRAY,
    height: SIZES.height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: verticalScale(30),
  },
  profileImageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(5),
    marginVertical: moderateScale(20),
  },

  strong: {
    ...FONTS.body3Bold,
  },
  sectionTitle: {
    ...FONTS.body3Bold,
    marginBottom: verticalScale(20),
  },
  sectionBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: verticalScale(10),
  },
  sectionWrapper: {
    marginVertical: moderateScale(5),
    paddingVertical: moderateScale(10),
    borderTopColor: COLORS.NEUTRAL.GRAY,
    borderTopWidth: 1,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    ...FONTS.body3Regular,
    fontSize: 12,
  },
  infoBody: {
    ...FONTS.body3Bold,
  },
});
