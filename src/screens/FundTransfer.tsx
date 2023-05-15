import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Platform,
  StatusBar,
  ImageBackground,
  Linking,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS, SIZES, COLORS } from '../global';
import { BackButton, Button, CustomInput, Line, Loader, Logo, TextLinks } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { landingPageBackgroundImage, loginPageBackgroundImage } from '../global/images';
import { FontAwesome5, Entypo, EvilIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const FundTransfer = ({ navigation }: any) => {
  type errorObjProps = {
    [key: string]: string;
  };

  type numberObjProps = {
    [key: string]: number;
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [withdrawalReason, setWithdrawalReason] = useState<string>('');
  const [errors, setErrors] = useState<errorObjProps>({});
  const [fundChoice, setFundChoice] = useState<string>('');
  const [smsChecked, setSmsChecked] = useState<boolean>(false);
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [phoneChecked, setPhoneChecked] = useState<boolean>(false);

  const validate = async () => {
    Keyboard.dismiss();
    setIsValid(true);
    if (!withdrawalReason) {
      handleError('Please Provide a Reason', 'withdrawalReason');
      setIsValid(false);
    }
    if (!fundChoice) {
      handleError('Please provide Fund Type', 'fundChoice');
      setIsValid(false);
    }
    if (isValid) {
      alert('Statement Requested Successfully');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <View
      style={{
        height: SIZES.height,
      }}
    >
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={{ ...FONTS.body4Bold, marginVertical: moderateScale(10) }}>
            Please kindly fill the form below appropiately
          </Text>
          <CustomInput
            placeholder={'Reason for Withdrawal'}
            multiline={true}
            onChangeText={(text: string) => setWithdrawalReason(text)}
            autoCapitalize="none"
            onFocus={() => handleError(null, 'withdrawalReason')}
            error={errors.withdrawalReason}
            editable={true}
            dark={true}
          />
          <Text style={{ ...FONTS.body4Bold, marginTop: moderateScale(10) }}>To</Text>
          <CustomInput
            placeholder={'Fund Type'}
            onChangeText={(text: string) => setFundChoice(text)}
            autoCapitalize="none"
            onFocus={() => handleError(null, 'fundChoice')}
            error={errors.fundChoice}
            editable={true}
            dark={true}
          />

          <Text style={{ ...FONTS.body4Bold, marginTop: moderateScale(20) }}>
            Kindly Indicate how you would want your notification to be dispatched to you
          </Text>
          <View style={styles.dispatchChoice}>
            <View style={styles.checkBoxWrapper}>
              <Text style={styles.checkText}>EMAIL</Text>
              <Checkbox
                style={styles.checkbox}
                value={emailChecked}
                onValueChange={setEmailChecked}
                color={emailChecked ? COLORS.PRIMARY.NORMAL : undefined}
              />
            </View>
            <View style={styles.checkBoxWrapper}>
              <Text style={styles.checkText}>SMS</Text>
              <Checkbox
                style={styles.checkbox}
                value={smsChecked}
                onValueChange={setSmsChecked}
                color={smsChecked ? COLORS.PRIMARY.NORMAL : undefined}
              />
            </View>
            <View style={styles.checkBoxWrapper}>
              <Text style={styles.checkText}>PHONE</Text>
              <Checkbox
                style={styles.checkbox}
                value={phoneChecked}
                onValueChange={setPhoneChecked}
                color={phoneChecked ? COLORS.PRIMARY.NORMAL : undefined}
              />
            </View>
          </View>

          <Button
            onPress={() => {
              validate();
            }}
            text={'Submit'}
            customBtnStyle={styles.customBtnStyle}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FundTransfer;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: SIZES.height,
    backgroundColor: COLORS.NEUTRAL.WHITE,
  },
  container: {
    width: SIZES.width,
    paddingVertical: verticalScale(20),
    paddingHorizontal: verticalScale(25),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(30),
    backgroundColor: COLORS.NEUTRAL.WHITE,
  },
  customStyle: {
    marginTop: 20,
  },
  customBtnStyle: {
    borderColor: COLORS.NEUTRAL.TRANSPARENT,
    borderWidth: 0,
    paddingHorizontal: moderateScale(35),
    marginTop: verticalScale(40),
  },

  logoContainerStyle: {
    marginBottom: verticalScale(45),
  },
  dispatchChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(5),
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  checkText: {
    ...FONTS.body4Medium,
  },
  checkbox: {
    margin: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY.NORMAL,
  },
});
