import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Platform,
  ImageBackground,
  Linking,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS, SIZES, COLORS } from '../global';
import {
  BackButton,
  Button,
  CustomInput,
  Line,
  Loader,
  Logo,
  ModalScreen,
  TextLinks,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {
  landingPageBackgroundImage,
  loginPageBackgroundImage,
  signUpPageBackgroundImage,
} from '../global/images';
import { FontAwesome5, Entypo, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { color } from 'react-native-reanimated';
import { authSelector, clearState, forgetPassword, verifyOTP } from '../redux/authSlice';
import { userSelector } from '../redux/userSlice';

const VerifyOTP = ({ navigation }: any) => {
  type errorObjProps = {
    [key: string]: string;
  };

  type numberObjProps = {
    [key: string]: number;
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');
  const [errors, setErrors] = useState<errorObjProps>({});
  const [modalErrVisible, setModalErrVisible] = useState<boolean>(false);
  const [modalOTPSuccessVisible, setModalOTPSuccessVisible] = useState<boolean>(false);
  const [backConfirmModalVisible, setBackConfirmModalVisible] = useState<boolean>(false);
  const [otpResponseData, setOtpResponseData] = useState<any>({});
  const [resendOtpResponseData, setResendOtpResponseData] = useState<any>({});
  const [modalResendOTPVisible, setModalResendOTPVisible] = useState<boolean>(false);
  const [modalResendOTPErrorVisible, setModalResendOTPErrorVisible] = useState<boolean>(false);

  const phoneNumberRegex = /^0\d{10}$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/;

  const dispatch: any = useDispatch();
  const { isError, isSuccess, isLoading, error, errorMessage } = useSelector(authSelector);
  const { forgetPasswordPin } = useSelector(userSelector);

  useEffect(() => {
    dispatch(clearState());
    setOtpValue('');
  }, []);

  console.log('OTP Screen,=====>', forgetPasswordPin);

  // useEffect(() => {
  //   console.log(error);
  //   if (isSuccess) {
  //     setModalOTPSuccessVisible(true);
  //   }

  //   if (isError) {
  //     setModalErrVisible(true);
  //   }
  // }, [isSuccess, isError]);

  const validate = async () => {
    Keyboard.dismiss();
    try {
      if (otpValue) {
        handleVerifyOTP();
      }
      if (!otpValue) {
        handleError('OTP field cannot be empty', 'otpValue');
        setIsValid(false);
      }
    } catch (error) {
      throw new Error('Error in OTP verification');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleVerifyOTP = async () => {
    const otpResponse = await dispatch(
      verifyOTP({ username: forgetPasswordPin, password: otpValue })
    );
    console.log('otpResponse', otpResponse);
    setOtpResponseData(otpResponse);
    if (otpResponse?.meta?.requestStatus === 'fulfilled') {
      setModalOTPSuccessVisible(true);
    } else if (otpResponse?.meta?.requestStatus === 'rejected') {
      setModalErrVisible(true);
    }
  };
  const handleResendOTP = async () => {
    const response = await dispatch(forgetPassword({ username: forgetPasswordPin }));
    setResendOtpResponseData(response);
    if (response?.meta?.requestStatus === 'fulfilled') {
      setModalResendOTPVisible(true);
    } else if (response?.meta?.requestStatus === 'rejected') {
      setModalResendOTPErrorVisible(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent style="light" />
      <ImageBackground
        source={signUpPageBackgroundImage}
        style={{ flex: 1, justifyContent: 'flex-end' }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[COLORS.NEUTRAL.TRANSPARENT20, COLORS.NEUTRAL.TRANSPARENT80]}
          style={{
            flex: 1,
            width: SIZES.width,
          }}
        >
          <KeyboardAvoidingView behavior="height">
            <SafeAreaView style={styles.wrapper}>
              <ModalScreen
                icon={
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={40}
                    color={COLORS.NEUTRAL.GRAY}
                  />
                }
                titleLabel={'Success'}
                message={resendOtpResponseData.payload?.message}
                modalVisible={modalResendOTPVisible}
                setModalVisible={setModalResendOTPVisible}
                buttonLabelTwo={'Verify'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  setModalResendOTPVisible(!modalResendOTPVisible);
                }}
              />
              <ModalScreen
                icon={
                  <MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />
                }
                titleLabel={'Error'}
                message={resendOtpResponseData.payload?.message}
                modalVisible={modalResendOTPErrorVisible}
                setModalVisible={setModalResendOTPErrorVisible}
                buttonLabelTwo={'Retry'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  setModalResendOTPErrorVisible(!modalResendOTPErrorVisible);
                }}
              />

              <ModalScreen
                icon={
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={40}
                    color={COLORS.NEUTRAL.GRAY}
                  />
                }
                titleLabel={'Success'}
                message={otpResponseData.payload?.message}
                modalVisible={modalOTPSuccessVisible}
                setModalVisible={setModalOTPSuccessVisible}
                buttonLabelTwo={'Proceed'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  dispatch(clearState());
                  navigation.replace('SetPassword');
                  setModalOTPSuccessVisible(!modalOTPSuccessVisible);
                }}
              />

              <ModalScreen
                icon={
                  <MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />
                }
                titleLabel={'Error'}
                message={otpResponseData.payload?.message}
                modalVisible={modalErrVisible}
                setModalVisible={setModalErrVisible}
                buttonLabelTwo={'Retry'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  dispatch(clearState());
                  setModalErrVisible(!modalErrVisible);
                }}
              />

              <ModalScreen
                titleLabel={'Leave Page?'}
                message={'Are you sure you want to cancel the verification process?'}
                modalVisible={backConfirmModalVisible}
                setModalVisible={setBackConfirmModalVisible}
                buttonLabelOne={'Yes'}
                buttonLabelTwo={'No'}
                buttonTwoOnPress={() => {
                  setBackConfirmModalVisible(!backConfirmModalVisible);
                }}
                buttonOneOnPress={() => {
                  navigation.goBack();
                  setBackConfirmModalVisible(!backConfirmModalVisible);
                }}
                doubleButton={true}
              />
              {/* <Loader loading={isLoading} /> */}
              <BackButton
                onPress={() => setBackConfirmModalVisible(true)}
                label="Back"
                color="white"
              />
              <View style={styles.container}>
                <View>
                  <Logo
                    title="A member of the Custodian Investment plc group"
                    containerStyle={styles.logoContainerStyle}
                  />

                  <Text style={styles.title}>Verify OTP </Text>
                  <Text style={styles.subTitle}>
                    A One-Time Password was sent to your email. Check your inbox or spam{' '}
                  </Text>

                  <CustomInput
                    placeholder={'OTP'}
                    onChangeText={(text: string) => setOtpValue(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'otpValue')}
                    error={errors.otpValue}
                    editable={true}
                    maxLength={8}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    textContentType="oneTimeCode"
                    customTextStyle={styles.customTextStyle}
                  />

                  <Button
                    onPress={() => validate()}
                    text={'Verify'}
                    customTextStyle={styles.btnTextStyle}
                    customBtnStyle={styles.customBtnStyle}
                  />
                  <Text
                    style={{
                      color: COLORS.NEUTRAL.WHITE,
                      alignSelf: 'center',
                      marginTop: verticalScale(30),
                    }}
                  >
                    Didn’t receive the OTP?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleResendOTP();
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.NEUTRAL.WHITE,
                        alignSelf: 'center',
                        textTransform: 'uppercase',
                        ...FONTS.body3Bold,
                        borderBottomColor: COLORS.NEUTRAL.WHITE,
                        borderBottomWidth: 1,
                        marginTop: verticalScale(5),
                      }}
                    >
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: Platform.OS === 'ios' ? 0 : verticalScale(30),
  },
  container: {
    width: SIZES.width,
    paddingVertical: verticalScale(20),
    paddingHorizontal: verticalScale(25),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '95%',
    paddingBottom: verticalScale(30),
  },
  customStyle: {
    marginTop: 20,
  },
  btnTextStyle: {
    color: COLORS.PRIMARY.NORMAL,
  },
  customBtnStyle: {
    backgroundColor: COLORS.NEUTRAL.WHITE,
    borderColor: COLORS.NEUTRAL.TRANSPARENT,
    borderWidth: 0,
    paddingHorizontal: moderateScale(35),
    marginTop: verticalScale(25),
  },

  logoContainerStyle: {
    marginBottom: verticalScale(45),
  },
  title: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body3Bold,
    marginBottom: verticalScale(10),
    textAlign: 'center',
    fontSize: moderateScale(15),
  },
  subTitle: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body3Regular,
    marginBottom: verticalScale(10),
    textAlign: 'center',
    fontSize: 12,
  },
  socials: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    gap: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTextStyle: {
    ...FONTS.body2Bold,
  },
});
