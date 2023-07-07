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
import { authSelector, clearState, createAccount } from '../redux/authSlice';
import { setForgetPasswordPin } from '../redux/userSlice';

const OpenAccount = ({ navigation }: any) => {
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
  const [isChecked, setChecked] = useState<boolean>(false);
  const [timerError, setTimerError] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [modalCreateSuccessVisible, setModalCreateSuccessVisible] = useState<boolean>(false);
  const [modalCreateErrorVisible, setModalCreateErrorVisible] = useState<boolean>(false);
  const [createAccountResponseData, setCreateAccountResponseData] = useState<any>({});

  const phoneNumberRegex = /^0\d{10}$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*\d).{8,}$/;

  const dispatch: any = useDispatch();
  const { isLoading } = useSelector(authSelector);

  useEffect(() => {
    dispatch(clearState());
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    try {
      if (emailRegex.test(email) && pinValue && phoneNumber) {
        handleLogin();
      }
      if (!email || !emailRegex.test(email)) {
        handleError('Please Provide a Valid Email Address', 'email');
        setIsValid(false);
      }
      if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
        handleError('Please provide a Valid Phone Number', 'phoneNumber');
        setIsValid(false);
      }
      if (!pinValue) {
        handleError('Please provide a Valid PIN', 'pinValue');
        setIsValid(false);
      }
    } catch (error) {
      throw new Error('Error in Account Creation');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleLogin = async () => {
    const response = await dispatch(createAccount({ username: pinValue, password: email }));
    setCreateAccountResponseData(response);
    if (response?.meta?.requestStatus === 'fulfilled') {
      setModalCreateSuccessVisible(true);
    } else if (response?.meta?.requestStatus === 'rejected') {
      setModalCreateErrorVisible(true);
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
                message={'Verification code sent to your email address.'}
                modalVisible={modalCreateSuccessVisible}
                setModalVisible={setModalCreateSuccessVisible}
                buttonLabelTwo={'Proceed'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  navigation.navigate('VerifyOTP');
                  setModalCreateSuccessVisible(!modalCreateSuccessVisible);
                }}
              />
              <ModalScreen
                icon={
                  <MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />
                }
                titleLabel={'Error '}
                message={createAccountResponseData.payload?.message}
                modalVisible={modalCreateErrorVisible}
                setModalVisible={setModalCreateErrorVisible}
                buttonLabelTwo={'Retry'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  dispatch(clearState());
                  setModalCreateErrorVisible(!modalCreateErrorVisible);
                }}
              />
              <Loader loading={isLoading} />
              <BackButton
                onPress={() => navigation.replace('LandingScreen')}
                label="Back"
                color="white"
              />
              <View style={styles.container}>
                <View style={styles.upperSection}>
                  <Logo
                    title="A member of the Custodian Investment plc group"
                    containerStyle={styles.logoContainerStyle}
                  />

                  <Text style={styles.title}>Quick Sign Up </Text>

                  <CustomInput
                    placeholder={'PIN'}
                    onChangeText={(text: string) => {
                      dispatch(setForgetPasswordPin(text));
                      setPinValue(text);
                    }}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'pinValue')}
                    error={errors.pinValue}
                    editable={true}
                  />
                  {/* <CustomInput
                    placeholder={'Email'}
                    onChangeText={(text: string) => setEmail(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'email')}
                    error={errors.email}
                    editable={true}
                  /> */}
                  <CustomInput
                    placeholder={'Phone Number'}
                    onChangeText={(text: string) => setPhoneNumber(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'phoneNumber')}
                    error={errors.phoneNumber}
                    editable={true}
                  />

                  <Button
                    onPress={() => validate()}
                    text={'Sign Up'}
                    customTextStyle={styles.btnTextStyle}
                    customBtnStyle={styles.customBtnStyle}
                  />

                  <TextLinks
                    label="Already Have an Account? Log In"
                    onPress={() => {
                      navigation.replace('Login');
                    }}
                    linkContainerStyles={{
                      justifyContent: 'center',
                      marginTop: moderateScale(20),
                    }}
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

export default OpenAccount;

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
    ...FONTS.body3Medium,
    marginBottom: verticalScale(10),
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
