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
import { FontAwesome5, Entypo, EvilIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const SetPassword = ({ navigation }: any) => {
  type errorObjProps = {
    [key: string]: string;
  };

  type numberObjProps = {
    [key: string]: number;
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
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

  const phoneNumberRegex = /^0\d{10}$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/;

  useEffect(() => {}, []);

  console.log(phoneNumberRegex.test(phoneNumber), phoneNumber);

  const validate = async () => {
    Keyboard.dismiss();
    try {
      if (passwordRegex.test(password) && password === confirmPassword) {
        handleSetPassword();
        setLoading(true);
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
    setModalOTPSuccessVisible(true);
  };

  return (
    <View
      style={{
        height: SIZES.height,
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
            height: SIZES.height,
            width: SIZES.width,
          }}
        >
          <KeyboardAvoidingView behavior="height">
            <SafeAreaView style={styles.wrapper}>
              <ModalScreen
                titleLabel={'Password Set Successfully '}
                message={'Proceed to Login to Access your Account'}
                modalVisible={modalOTPSuccessVisible}
                setModalVisible={setModalOTPSuccessVisible}
                buttonLabelTwo={'Proceed'}
                buttonOneOnPress={() => {}}
                buttonTwoOnPress={() => {
                  setLoading(false);
                  navigation.navigate('Login');
                  setModalOTPSuccessVisible(!modalOTPSuccessVisible);
                }}
              />
              {/* <Loader loading={isLoading} /> */}
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

                  <Text style={styles.title}> Set up Password </Text>

                  <CustomInput
                    placeholder={'Set Password'}
                    onChangeText={(text: string) => setPassword(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'password')}
                    error={errors.password}
                    editable={true}
                    password={true}
                  />
                  <CustomInput
                    placeholder={'Confirm Password'}
                    onChangeText={(text: string) => setConfirmPassword(text)}
                    autoCapitalize="none"
                    onFocus={() => handleError(null, 'confirmPassword')}
                    error={errors.confirmPassword}
                    editable={true}
                    password={true}
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
    textAlign: 'center',
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
