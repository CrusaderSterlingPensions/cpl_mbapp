import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { COLORS, FONTS } from '../../../global';

const History = ({ profile }: any) => {
  type transactionProps = {
    period: string;
    rsa: string;
    avc: string;
  };

  const currencyFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });
  const Transaction = ({ period, rsa, avc }: transactionProps) => {
    return (
      <View style={styles.transactionContainer}>
        <View style={[styles.subSection, { backgroundColor: COLORS.NEUTRAL.LIGHT_ACTIVE }]}>
          <Text style={styles.header}>Period</Text>
          <Text style={styles.transactionValue}>{period}</Text>
        </View>
        <View style={[styles.subSection, { backgroundColor: COLORS.NEUTRAL.LIGHT }]}>
          <View>
            <Text style={styles.header}>RSA</Text>
            <Text style={styles.transactionValue}>{rsa}</Text>
          </View>
          <View>
            <Text style={styles.header}>AVC</Text>
            <Text style={styles.transactionValue}>{avc}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical>
        <View style={styles.container}>
          <Transaction
            rsa={currencyFormatter.format(profile.rsa_1)}
            avc={currencyFormatter.format(profile.avc_1)}
            period={profile.period_1}
          />
          <Transaction
            rsa={currencyFormatter.format(profile.rsa_2)}
            avc={currencyFormatter.format(profile.avc_2)}
            period={profile.period_2}
          />
          <Transaction
            rsa={currencyFormatter.format(profile.rsa_3)}
            avc={currencyFormatter.format(profile.avc_3)}
            period={profile.period_3}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  sectionTitle: {
    ...FONTS.body3Bold,
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  container: {
    marginHorizontal: moderateScale(5),
    flexDirection: 'column',
    gap: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(60),
  },
  transactionContainer: {
    flexDirection: 'column',
    borderRadius: moderateScale(10),
    height: 130,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  subSection: {
    backgroundColor: COLORS.NEUTRAL.WHITE,
    height: '50%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    ...FONTS.body4Regular,
  },
  transactionValue: {
    ...FONTS.body3Bold,
  },
});
