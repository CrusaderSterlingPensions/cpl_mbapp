import React, { useEffect, useRef } from 'react';
import { Video } from 'expo-av';
import SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../global';

const SplashVideo = ({ navigation, onFinish }: any) => {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const video = videoRef.current;

    const onPlaybackStatusUpdate = (playbackStatus: any) => {
      if (playbackStatus.didJustFinish) {
        navigation.navigate('LandingScreen');
      }
    };

    video?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    return () => {
      video?.setOnPlaybackStatusUpdate(null);
    };
  }, []);

  return (
    <Video
      ref={videoRef}
      source={require('../assets/videos/video_bk.mp4')}
      style={{ flex: 1, width: SIZES.width, height: SIZES.height }}
      shouldPlay
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      onPlaybackStatusUpdate={(status) => {
        if (status.isLoaded && status.positionMillis === status.playableDurationMillis) {
          onFinish();
        }
      }}
    />
  );
};

export default SplashVideo;
