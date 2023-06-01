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
  PasswordInstructions,
  TextLinks,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {
  landingPageBackgroundImage,
  loginPageBackgroundImage,
  signUpPageBackgroundImage,
} from '../global/images';
import { StatusBar } from 'expo-status-bar';
import { authSelector, clearState, resetPassword } from '../redux/authSlice';
import { userSelector } from '../redux/userSlice';
import { FontAwesome5, Entypo, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

const SetPassword = ({ navigation }: any) => {
  type errorObjProps = {
    [key: string]: string;
  };

  type numberObjProps = {
    [key: string]: number;
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [pinValue, setPinValue] = useState<string>('');
  const [errors, setErrors] = useState<errorObjProps>({});
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isChecked, setChecked] = useState<boolean>(false);
  const [timerError, setTimerError] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [modalOTPSuccessVisible, setModalOTPSuccessVisible] = useState<boolean>(false);
  const [modalOTPErrorVisible, setModalOTPErrorVisible] = useState<boolean>(false);
  const [passwordResponseData, setPasswordResponseData] = useState<any>({});
  const [modalSetPasswordVisible, setModalSetPasswordVisible] = useState<boolean>(false);
  const [modalSetPasswordErrorVisible, setModalSetPasswordErrorVisible] = useState<boolean>(false);

  const phoneNumberRegex = /^0\d{10}$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*\d).{8,}$/;

  const dispatch: any = useDispatch();
  const { userData, isLoading, isSuccess, isError } = useSelector(authSelector);
  const { forgetPasswordPin } = useSelector(userSelector);

  console.log('User data PIN', forgetPasswordPin, '=============');

  useEffect(() => {
    dispatch(clearState());
  }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setModalOTPSuccessVisible(true);
  //   }

  //   if (isError) {
  //     setModalOTPErrorVisible(true);
  //   }
  // }, [isSuccess, isError]);

  const validate = async () => {
    Keyboard.dismiss();
    try {
      if (passwordRegex.test(password) && password === confirmPassword) {
        handleSetPassword();
      }
      if (!password) {
        handleError('Password Field cannot be Empty', 'password');
        setIsValid(false);
      }
      if (confirmPassword !== password) {
        handleError('Confirm Your Password', 'confirmPassword');
        setIsValid(false);
      }
    } catch (error) {
      throw new Error('Error in Account Creation');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleSetPassword = async () => {
    const response = await dispatch(
      resetPassword({ username: forgetPasswordPin, password: password })
    );
    setPasswordResponseData(response);
    if (response?.meta?.requestStatus === 'fulfilled') {
      setModalSetPasswordVisible(true);
    } else if (response?.meta?.requestStatus === 'rejected') {
      setModalSetPasswordErrorVisible(true);
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
                titleLabel={'Success '}
                message={passwordResponseData.payload?.message}
                modalVisible={modalSetPasswordVisible}
                setModalVisible={setModalSetPasswordVisible}
                buttonLabelTwo={'Proceed'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  dispatch(clearState());
                  navigation.replace('Login');
                  setModalSetPasswordVisible(!modalSetPasswordVisible);
                }}
              />
              <ModalScreen
                icon={
                  <MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />
                }
                titleLabel={'Error'}
                message={passwordResponseData.payload?.message}
                modalVisible={modalOTPErrorVisible}
                setModalVisible={setModalOTPErrorVisible}
                buttonLabelTwo={'Try Again'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  dispatch(clearState());
                  navigation.replace('Login');
                  setModalOTPErrorVisible(!modalOTPErrorVisible);
                }}
              />
              <Loader loading={isLoading} />
              {/* <BackButton
                onPress={() => navigation.replace('LandingScreen')}
                label="Back"
                color="white"
              /> */}
              <View style={styles.container}>
                <View style={styles.upperSection}>
                  <Logo
                    title="A member of the Custodian Investment plc group"
                    containerStyle={styles.logoContainerStyle}
                  />

                  <Text style={styles.title}> Password Setup </Text>

                  <CustomInput
                    placeholder={'Set Password'}
                    onChangeText={(text: string) => setPassword(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'password')}
                    error={errors.password}
                    editable={true}
                    password={true}
                    customTextStyle={{ width: '90%' }}
                  />
                  <CustomInput
                    placeholder={'Confirm Password'}
                    onChangeText={(text: string) => setConfirmPassword(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'confirmPassword')}
                    error={errors.confirmPassword}
                    editable={true}
                    password={true}
                    customTextStyle={{ width: '90%' }}
                  />

                  {!passwordRegex.test(password) && <PasswordInstructions />}

                  <Button
                    onPress={() => validate()}
                    text={'Submit'}
                    customTextStyle={styles.btnTextStyle}
                    customBtnStyle={styles.customBtnStyle}
                  />
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default SetPassword;

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
    fontSize: moderateScale(15),
  },
  socials: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    gap: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerSection: {},
  upperSection: {},
});
