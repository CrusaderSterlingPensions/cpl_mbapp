import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  TextStyle,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../global';
import Button from '../components/Button';

const LogoutModal = ({ navigation }: any) => {
  return (
    <SafeAreaView
      style={{
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: COLORS.NEUTRAL.LIGHT,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.iconContainer}>Kindly Confirm Sign out</Text>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => navigation.goBack()}
              text="Cancel"
              customBtnStyle={{
                ...styles.btnStyle,
                backgroundColor: COLORS.NEUTRAL.TRANSPARENT,
                borderWidth: 1,
                borderColor: COLORS.NEUTRAL.ACCENT,
              }}
              customTextStyle={{ color: COLORS.NEUTRAL.ACCENT, ...FONTS.body3Medium }}
            />
            <Button
              // onPress={() => dispatch(logout())}
              onPress={() => navigation.replace('Login')}
              text="Sign Out"
              customBtnStyle={styles.btnStyle}
              customTextStyle={{ color: COLORS.NEUTRAL.WHITE, ...FONTS.body3Medium }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.NEUTRAL.LIGHT,
  },
  modalView: {
    backgroundColor: COLORS.NEUTRAL.WHITE,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(35),
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 1,
    width: '90%',
  },
  iconContainer: {
    paddingBottom: verticalScale(10),
    ...FONTS.body3Medium,
    textAlign: 'center',
  },
  modalTitleText: {
    ...FONTS.body2Bold,
    paddingBottom: verticalScale(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalMessageText: {
    ...FONTS.body3Regular,
    paddingBottom: verticalScale(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnTextStyle: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body2Bold,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  btnStyle: {
    width: 'auto',
    paddingHorizontal: 30,
    marginHorizontal: 10,
    height: 'auto',
    paddingVertical: 15,
    backgroundColor: COLORS.NEUTRAL.ACCENT,
    borderWidth: 0,
  },
});
