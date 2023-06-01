import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Background, Button } from '../components';
import { COLORS, SIZES } from '../global';
import { ImageBackground } from 'react-native';
import { landingPageBackgroundImage, whiteLogo } from '../global/images';
import { StatusBar } from 'expo-status-bar';
import { moderateScale } from 'react-native-size-matters';
import { Video } from 'expo-av';

const LandingScreen = ({ navigation, onFinish }: any) => {
  const [status, setStatus] = useState({});
  const [videoComplete, setVideoComplete] = useState(false);

  const videoRef = useRef<Video>(null);
  useEffect(() => {
    const video = videoRef.current;

    const onPlaybackStatusUpdate = (playbackStatus: any) => {
      if (playbackStatus.didJustFinish) {
        setVideoComplete(true);
      }
    };

    video?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    return () => {
      video?.setOnPlaybackStatusUpdate(null);
    };
  }, []);
  return (
    <View >
      <StatusBar style="light" />
      <View
        style={{
          height: '100%',
        }}
      >
        {videoComplete ? (
          <ImageBackground
            source={landingPageBackgroundImage}
            style={{ flex: 1, justifyContent: 'flex-end' }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[COLORS.NEUTRAL.TRANSPARENT20, COLORS.NEUTRAL.TRANSPARENT60]}
              style={{
                height: SIZES.height,
                width: SIZES.width,
              }}
            ></LinearGradient>
          </ImageBackground>
        ) : (
          <Video
            ref={videoRef}
            source={require('../assets/videos/video_bk.mp4')}
            useNativeControls
            shouldPlay
            volume={0}
            resizeMode="cover"
            isLooping
            isMuted={true}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && status.positionMillis === status.playableDurationMillis) {
                onFinish();
              }
            }}
            style={{ flex: 1, height: '100%', width: SIZES.width }}
          />
        )}
        <View style={styles.whiteLogoContainer}>
          <Image source={whiteLogo} style={styles.whiteLogo} />
        </View>
        <View style={styles.container}>
          <View>
            <Button
              text="Login"
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
            <Button
              text="Register"
              onPress={() => {
                navigation.navigate('OpenAccount');
              }}
              customBtnStyle={styles.customBtnStyle}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  whiteLogoContainer: {
    position: 'absolute',
    top: '13%',
    left: 0,
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  whiteLogo: {
    height: 50,
    width: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: moderateScale(50),
    paddingHorizontal: moderateScale(20),
    position: 'absolute',
    top: '65%',
    left: 0,
  },
  customBtnStyle: {
    backgroundColor: COLORS.NEUTRAL.TRANSPARENT_WHITE20,
    borderColor: COLORS.NEUTRAL.WHITE,
  },
});
