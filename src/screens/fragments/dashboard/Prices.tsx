import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { FONTS } from '../../../global';

const Prices = ({ profile }: any) => {
  const priceFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 4,
  });
  const currencyFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });
  return (
    <View style={[styles.priceData]}>
      <Text style={styles.prevailingPriceText}>
        {'Prevailing Price:'} {priceFormatter.format(profile.price)}
      </Text>
      <View style={styles.priceDateAndGains}>
        <Text style={styles.priceDate}>
          {'Price Date'} {}
        </Text>
        <View>
          <Text style={styles.priceDate}>{'Gain/Loss:'}</Text>
          <Text style={styles.gainLoss}>{currencyFormatter.format(profile.gainLoss)}</Text>
        </View>
      </View>
    </View>
  );
};

export default Prices;

const styles = StyleSheet.create({
  priceData: {
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(15),
  },
  prevailingPriceText: {
    ...FONTS.body4Medium,
    fontSize: 14,
    paddingTop: moderateScale(10),
  },
  priceDate: {
    ...FONTS.body4Medium,
    marginTop: moderateScale(20),
  },
  priceDateAndGains: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  gainLoss: {
    ...FONTS.body3Bold,
  },
});
