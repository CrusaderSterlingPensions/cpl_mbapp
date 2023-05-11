import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Background, Button } from '../components';
import { COLORS, SIZES } from '../global';
import { ImageBackground } from 'react-native';
import { landingPageBackgroundImage, whiteLogo } from '../global/images';
import { StatusBar } from 'expo-status-bar';
import { moderateScale } from 'react-native-size-matters';

const LandingScreen = () => {
  return (
    <View>
      <StatusBar style="light" />
      <View
        style={{
          height: SIZES.height,
        }}
      >
        <ImageBackground
          source={landingPageBackgroundImage}
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
            <SafeAreaView>
              <View style={styles.container}>
                <Image source={whiteLogo} style={styles.whiteLogo} />
                <View>
                  <Button text="Login" onPress={() => {}} />
                  <Button
                    text="Open Pensions Account"
                    onPress={() => {}}
                    customBtnStyle={styles.customBtnStyle}
                  />
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  whiteLogo: {
    height: 50,
    width: 50,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: moderateScale(50),
    paddingHorizontal: moderateScale(20),
  },
  customBtnStyle: {
    backgroundColor: COLORS.NEUTRAL.TRANSPARENT_WHITE20,
    borderColor: COLORS.NEUTRAL.WHITE,
  },
});
