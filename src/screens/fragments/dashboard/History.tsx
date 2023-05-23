import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { COLORS, FONTS } from '../../../global';

const History = ({ transactionData }: any) => {
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
    const dateFormatter = (dateString: string) => {
      const dateParts = dateString.split('-');
      const year = dateParts[0];
      const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 to convert to zero-based index
      const date = new Date(Number(year), month);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      return formattedDate;
    };
    return (
      <View style={styles.transactionContainer}>
        <View style={[styles.subSectionHeader]}>
          {/* <Text style={styles.header}>PERIOD</Text> */}
          <Text style={styles.transactionValuePeriod}>{dateFormatter(period)}</Text>
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
            rsa={currencyFormatter.format(transactionData.rsa_1)}
            avc={currencyFormatter.format(transactionData.avc_1)}
            period={transactionData.period_1}
          />
          <Transaction
            rsa={currencyFormatter.format(transactionData.rsa_2)}
            avc={currencyFormatter.format(transactionData.avc_2)}
            period={transactionData.period_2}
          />
          <Transaction
            rsa={currencyFormatter.format(transactionData.rsa_3)}
            avc={currencyFormatter.format(transactionData.avc_3)}
            period={transactionData.period_3}
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
    gap: moderateScale(10),
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
    height: '60%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subSectionHeader: {
    backgroundColor: COLORS.NEUTRAL.LIGHT_ACTIVE,
    height: '40%',
    flexDirection: 'column',
    paddingHorizontal: moderateScale(10),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header: {
    ...FONTS.body4Regular,
  },
  transactionValue: {
    ...FONTS.body3Bold,
  },
  transactionValuePeriod: {
    ...FONTS.body4Bold,
    textTransform: 'uppercase',
  },
});
