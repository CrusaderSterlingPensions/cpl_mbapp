import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../global';
import { moderateScale } from 'react-native-size-matters';
import { avcBanner, glfBanner, raBanner, rsaBanner } from '../global/images';
import { StatusBar } from 'expo-status-bar';

const ProductCatalogue = ({ navigation }: any) => {
  const BannerDetails = ({ source }: any) => {
    return (
      <TouchableOpacity>
        <Image source={source} resizeMode="contain" style={{ width: SIZES.width, height: 120 }} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
          paddingBottom: moderateScale(20),
        }}
      >
        <BannerDetails source={avcBanner} />
        <BannerDetails source={rsaBanner} />
        <BannerDetails source={raBanner} />
        <BannerDetails source={glfBanner} />
      </View>
    </View>
  );
};

export default ProductCatalogue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NEUTRAL.WHITE,
  },
});
