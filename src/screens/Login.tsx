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
import { landingPageBackgroundImage, loginPageBackgroundImage } from '../global/images';
import { FontAwesome5, Entypo, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {
  authSelector,
  clearRememberLogInDetails,
  clearState,
  handleCheck,
  setRememberLogInDetails,
  userLogin,
} from '../redux/authSlice';
import { setLoginPassword, setLoginPin, userSelector } from '../redux/userSlice';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
// import Constants from 'expo-constants';

const Login = ({ navigation }: any) => {
  type errorObjProps = {
    [key: string]: string;
  };

  type numberObjProps = {
    [key: string]: number;
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [pinValue, setPinValue] = useState<any>('');
  const [errors, setErrors] = useState<errorObjProps>({});
  const [password, setPassword] = useState<string>('');
  const [isChecked, setChecked] = useState<boolean>(false);
  const [timerError, setTimerError] = useState<boolean>(false);
  const [modalOTPSuccessVisible, setModalOTPSuccessVisible] = useState<boolean>(false);
  const [modalOTPErrorVisible, setModalOTPErrorVisible] = useState<boolean>(false);
  const [modalLoginVisible, setModalLoginVisible] = useState<boolean>(false);
  const [modalLoginErrorVisible, setModalLoginErrorVisible] = useState<boolean>(false);
  const [loginResponseData, setLoginResponseData] = useState<any>({});

  const pinRegex = /^PEN\d{12}$/i;
  const passwordRegex = /^(?=.*\d).{8,}$/;

  const dispatch: any = useDispatch();
  const { isError, isSuccess, isLoading, error, checked } = useSelector(authSelector);
  const { loginPin, loginPassword } = useSelector(userSelector);

  // const pin = SecureStore.getItemAsync('rememberPin');
  const getPin = async () => {
    const check = await AsyncStorage.getItem('rememberCheckBox');
    return check;
  };

  useEffect(() => {
    dispatch(clearState());

    getRememberedEmail();

    // setPinValue('');
    setPassword('');
  }, []);

  const saveEmail = async (pin: string) => {
    try {
      await AsyncStorage.setItem('rememberedEmail', pin);
      await AsyncStorage.setItem('checked', 'true');
    } catch (error) {
      console.log('Error saving email:', error);
    }
  };

  const getRememberedEmail = () => {
    AsyncStorage.getItem('rememberedEmail')
      .then((email) => {
        if (email) {
          console.log('Email', email);
          setPinValue(email);
        }
      })
      .catch((error) => {
        console.log('Error retrieving email:', error);
      });
    AsyncStorage.getItem('checked')
      .then((isChecked) => {
        if (isChecked) {
          console.log('isChecked', isChecked);
          setChecked(isChecked === 'true' ? true : false);
        }
      })
      .catch((error) => {
        console.log('Error retrieving email:', error);
      });
  };

  // Call getRememberedEmail in your app's startup logic

  const clearRememberedEmail = async () => {
    AsyncStorage.removeItem('rememberedEmail')
      .then(() => {
        setPinValue('');
      })
      .catch((error) => {
        console.log('Error removing PIN:', error);
      });
    AsyncStorage.removeItem('checked')
      .then(() => {
        setChecked(false);
      })
      .catch((error) => {
        console.log('Error removing PIN:', error);
      });
  };

  // useEffect(() => {
  //   dispatch(clearState());
  //   console.log(isChecked);
  // }, [checked]);

  const validate = async () => {
    Keyboard.dismiss();
    try {
      if (pinRegex.test(pinValue) && passwordRegex.test(password)) {
        handleLogin();
      }
      if (!pinValue || !pinRegex.test(pinValue)) {
        handleError('Please Provide Valid PIN', 'pinValue');
        setIsValid(false);
      }
      if (!password || !passwordRegex.test(password)) {
        handleError("Check Password. It doesn't meet Requirement", 'password');
        setIsValid(false);
      }
    } catch (error) {
      throw new Error('Error in Login');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleLogin = async () => {
    const response = await dispatch(userLogin({ username: pinValue, password: password }));
    setLoginResponseData(response);
    if (response?.meta?.requestStatus === 'fulfilled') {
      navigation.replace('DrawerMenu');
    } else if (response?.meta?.requestStatus === 'rejected') {
      setModalLoginErrorVisible(true);
    }
  };

  const OpenSocials = ({ icon, link }: any) => {
    const handleSocialMediaLink = async (url: any) => {
      try {
        await Linking.openURL(url);
      } catch (err) {
        console.error(err);
      }
    };
    return <TouchableOpacity onPress={() => handleSocialMediaLink(link)}>{icon}</TouchableOpacity>;
  };

  return (
    <View
      style={{
        height: SIZES.height,
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ImageBackground
        source={loginPageBackgroundImage}
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
          <SafeAreaView style={styles.wrapper}>
            <Loader loading={isLoading} />

            <ModalScreen
              icon={<MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />}
              titleLabel={'Error'}
              message={
                loginResponseData.payload?.message === 'Customer Firsttime User'
                  ? 'First time User..., Kindly Register a Mobile Account'
                  : loginResponseData.payload?.message
              }
              modalVisible={modalLoginErrorVisible}
              setModalVisible={setModalLoginErrorVisible}
              buttonLabelTwo={'Retry'}
              buttonOneOnPress={() => {}}
              buttonTwoOnPress={() => {
                setModalLoginErrorVisible(!modalLoginErrorVisible);
                dispatch(clearState());
              }}
            />

            {/* <BackButton onPress={() => navigation.goBack()} label="Back" color="white" /> */}
            <View style={styles.container}>
              <View style={styles.upperSection}>
                <Logo
                  title="A member of the Custodian Investment plc group"
                  containerStyle={styles.logoContainerStyle}
                />

                <CustomInput
                  placeholder={'PIN'}
                  onChangeText={(text: string) => {
                    setPinValue(text);
                    dispatch(setLoginPin(text));
                  }}
                  autoCapitalize="none"
                  onFocus={() => handleError(null, 'pinValue')}
                  error={errors.pinValue}
                  editable={true}
                  value={pinValue}
                />

                <CustomInput
                  placeholder="Password"
                  confirmPassword={true}
                  onFocus={() => handleError(null, 'password')}
                  error={errors.password}
                  onChangeText={(text: string) => {
                    setPassword(text);
                    dispatch(setLoginPassword(text));
                  }}
                  autoCapitalize="none"
                  editable={true}
                  customTextStyle={{ width: '90%' }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.rememberMeWrapper}>
                    <Checkbox
                      value={isChecked}
                      onValueChange={(value) => {
                        setChecked(value);
                        value === true ? saveEmail(pinValue) : clearRememberedEmail();
                      }}
                      color={COLORS.NEUTRAL.ACCENT}
                    />
                    <Text style={styles.rememberMe}>Remember Me</Text>
                  </View>
                  <TextLinks
                    label="Forget Password?"
                    onPress={() => {
                      navigation.replace('ForgetPassword');
                    }}
                    linkContainerStyles={{
                      justifyContent: 'flex-end',
                      marginTop: moderateScale(10),
                    }}
                  />
                </View>

                <Button
                  onPress={() => validate()}
                  text={'Login'}
                  customTextStyle={styles.btnTextStyle}
                  customBtnStyle={styles.customBtnStyle}
                />
              </View>
              <View style={styles.lowerSection}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    gap: moderateScale(20),
                  }}
                >
                  <Line />
                  <Text
                    style={{
                      color: COLORS.NEUTRAL.WHITE,
                      ...FONTS.body3Medium,
                    }}
                  >
                    Or
                  </Text>
                  <Line />
                </View>
                <TextLinks
                  label="Register Account"
                  onPress={() => {
                    navigation.replace('OpenAccount');
                  }}
                />
                <View style={styles.socials}>
                  <OpenSocials
                    icon={<FontAwesome5 name="facebook" size={24} color={COLORS.NEUTRAL.WHITE} />}
                    link="https://web.facebook.com/cspensions/?ref=bookmarks"
                  />
                  <OpenSocials
                    icon={
                      <Entypo name="instagram-with-circle" size={30} color={COLORS.NEUTRAL.WHITE} />
                    }
                    link="https://www.instagram.com/cspensions/?hl=en"
                  />
                  <OpenSocials
                    icon={
                      <Entypo name="twitter-with-circle" size={30} color={COLORS.NEUTRAL.WHITE} />
                    }
                    link="https://twitter.com/CSPensions"
                  />
                  <OpenSocials
                    icon={<Entypo name="youtube" size={24} color={COLORS.NEUTRAL.WHITE} />}
                    link="https://www.youtube.com/channel/UCwx_XVUvXhVHuNB1_LAnyKw"
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  container: {
    width: SIZES.width,
    paddingHorizontal: verticalScale(25),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: verticalScale(30),
    paddingTop: verticalScale(40),
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
  socials: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    gap: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerSection: {},
  upperSection: {},
  rememberMeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: moderateScale(10),
  },
  rememberMe: {
    ...FONTS.body4Regular,
    color: COLORS.NEUTRAL.WHITE,
    marginLeft: moderateScale(8),
  },
});
