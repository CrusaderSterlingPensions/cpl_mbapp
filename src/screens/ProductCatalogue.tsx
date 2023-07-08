import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../global';
import { moderateScale } from 'react-native-size-matters';
import { avcBanner, glfBanner, raBanner, rsaBanner } from '../global/images';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';

const ProductCatalogue = ({ navigation }: any) => {
  // const handleOpenLink = () => {
  //   Linking.openURL('https://example.com');
  // };

  const BannerDetails = ({ source, link }: any) => {
    return (
      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(link)}>
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
        <BannerDetails
          source={avcBanner}
          link="https://crusaderpensions.com/services/voluntary-contributions/"
        />
        <BannerDetails
          source={rsaBanner}
          link="https://crusaderpensions.com/services/retirement-saving/"
        />
        <BannerDetails
          source={raBanner}
          link="https://crusaderpensions.com/services/retiree-account/"
        />
        <BannerDetails
          source={glfBanner}
          link="https://crusaderpensions.com/services/gratuity-legal-funds/"
        />
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
