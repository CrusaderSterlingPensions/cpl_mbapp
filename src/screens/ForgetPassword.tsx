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
import { authSelector, clearState, forgetPassword } from '../redux/authSlice';
import { setForgetPasswordPin } from '../redux/userSlice';

const ForgetPassword = ({ navigation }: any) => {
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
  const [modalOTPSuccessVisible, setModalOTPSuccessVisible] = useState<boolean>(false);
  const [modalOTPErrorVisible, setModalOTPErrorVisible] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>({});

  const pinRegex = /^PEN\d{12}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/;

  const dispatch: any = useDispatch();
  const { isError, isSuccess, isLoading, error, errorMessage, userData } =
    useSelector(authSelector);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setModalOTPSuccessVisible(true);
  //   }

  //   if (isError) {
  //     setModalOTPErrorVisible(true);
  //   }
  // }, [isError, isSuccess]);

  useEffect(() => {
    dispatch(clearState());
    setPinValue('');
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    try {
      if (pinRegex.test(pinValue)) {
        handleLogin();
      }
      if (!pinValue || !pinRegex.test(pinValue)) {
        handleError('Please Provide Valid PIN', 'pinValue');
        setIsValid(false);
      }
    } catch (error) {
      throw new Error('Error in Forget Password');
    }
  };

  const handleError = (error: any, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleLogin = async () => {
    const response = await dispatch(forgetPassword({ username: pinValue }));
    setResponseData(response);
    if (response?.meta?.requestStatus === 'fulfilled') {
      setModalOTPSuccessVisible(true);
    } else if (response?.meta?.requestStatus === 'rejected') {
      setModalOTPErrorVisible(true);
    }
  };

  return (
    <View
      style={{
        flex:1,
        backgroundColor: 'white',
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
            flex:1,
            width: SIZES.width,
          }}
        >
          <SafeAreaView style={styles.wrapper}>
            <Loader loading={isLoading} />
            <ModalScreen
              icon={
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={40}
                  color={COLORS.NEUTRAL.GRAY}
                />
              }
              titleLabel={'Success'}
              message={responseData.payload?.message}
              modalVisible={modalOTPSuccessVisible}
              setModalVisible={setModalOTPSuccessVisible}
              buttonLabelTwo={'Proceed'}
              buttonOneOnPress={() => {}}
              buttonTwoOnPress={() => {
                dispatch(clearState());
                navigation.navigate('VerifyOTP');
                setModalOTPSuccessVisible(!modalOTPSuccessVisible);
              }}
            />
            <ModalScreen
              icon={<MaterialIcons name="error-outline" size={40} color={COLORS.NEUTRAL.ACCENT} />}
              titleLabel={'Error '}
              message={responseData?.payload?.message}
              modalVisible={modalOTPErrorVisible}
              setModalVisible={setModalOTPErrorVisible}
              buttonLabelTwo={'Retry'}
              buttonOneOnPress={() => {}}
              buttonTwoOnPress={() => {
                dispatch(clearState());
                setModalOTPErrorVisible(!modalOTPErrorVisible);
              }}
            />
            <BackButton onPress={() => navigation.replace('Login')} label="Back" color="white" />
            <View style={styles.container}>
              <View>
                <Logo
                  title="A member of the Custodian Investment plc group"
                  containerStyle={styles.logoContainerStyle}
                />

                <Text style={{ ...FONTS.body3Bold, color: COLORS.NEUTRAL.WHITE }}>
                  Forget Password
                </Text>

                <CustomInput
                  placeholder={'PIN'}
                  onChangeText={(text: string) => {
                    setPinValue(text);
                    dispatch(setForgetPasswordPin(text));
                  }}
                  autoCapitalize="none"
                  onFocus={() => handleError(null, 'pinValue')}
                  error={errors.pinValue}
                  editable={true}
                />

                <Button
                  onPress={() => validate()}
                  text={'Proceed'}
                  customTextStyle={styles.btnTextStyle}
                  customBtnStyle={styles.customBtnStyle}
                />
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ForgetPassword;

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
    marginTop: verticalScale(55),
  },

  logoContainerStyle: {
    marginBottom: verticalScale(45),
  },
});
