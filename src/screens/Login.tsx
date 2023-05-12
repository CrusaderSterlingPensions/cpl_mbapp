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

const Login = ({ navigation }: any) => {
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
  const [isChecked, setChecked] = useState<boolean>(false);
  const [timerError, setTimerError] = useState<boolean>(false);

  const pinRegex = /^PEN\d{12}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/;

  useEffect(() => {}, []);

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
    setLoading(true);
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
            height: SIZES.height,
            width: SIZES.width,
          }}
        >
          <SafeAreaView style={styles.wrapper}>
            <Loader loading={isLoading} />
            <BackButton onPress={() => navigation.goBack()} label="Back" />
            <View style={styles.container}>
              <View style={styles.upperSection}>
                <Logo
                  title="A member of the Custodian Investment plc group"
                  containerStyle={styles.logoContainerStyle}
                />

                <CustomInput
                  placeholder={'PIN'}
                  onChangeText={(text: string) => setPinValue(text)}
                  autoCapitalize="none"
                  onFocus={() => handleError(null, 'pinValue')}
                  error={errors.pinValue}
                  editable={true}
                />

                <CustomInput
                  placeholder="Password"
                  confirmPassword={true}
                  onFocus={() => handleError(null, 'password')}
                  error={errors.password}
                  onChangeText={(text: string) => setPassword(text)}
                  autoCapitalize="none"
                  editable={true}
                />

                <TextLinks
                  label="Forget Password?"
                  onPress={() => {}}
                  linkContainerStyles={{
                    justifyContent: 'flex-end',
                    marginTop: moderateScale(10),
                  }}
                />

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
                <TextLinks label="Open Pension Account" onPress={() => {}} />
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
