import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../../../global';
import { nairaLogoWhite } from '../../../global/images';

const Balances = ({ profile }: any) => {
  const currencyFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  return (
    <View>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        <View
          style={[
            styles.balancesContainer,
            {
              backgroundColor:
                profile.fund_id === 1
                  ? COLORS.DASHBOARD.FUND1LIGHT
                  : profile.fund_id === 2
                  ? COLORS.DASHBOARD.FUND2LIGHT
                  : profile.fund_id === 3
                  ? COLORS.DASHBOARD.FUND3LIGHT
                  : COLORS.DASHBOARD.FUND4LIGHT,
            },
          ]}
        >
          <View style={styles.totalRSA}>
            <Text style={styles.rsaAvcText}>TOTAL RSA</Text>
            <Text style={styles.rsaAvcAmountText}>
              {currencyFormatter.format(profile.total_rsa)}
            </Text>
          </View>
          <View style={styles.totalValueWrapper}>
            <Image source={nairaLogoWhite} style={styles.nairaLogo} />
            <View>
              <Text style={styles.totalBalanceText}>Total Balance</Text>
              <Text style={styles.totalBalanceAmountText}>
                {currencyFormatter.format(profile.current_value)}
              </Text>
            </View>
          </View>
          <View style={styles.totalAVC}>
            <Text style={styles.rsaAvcText}>TOTAL AVC</Text>
            <Text style={styles.rsaAvcAmountText}>
              {currencyFormatter.format(profile.total_avc)}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.balancesContainer,
            {
              backgroundColor:
                profile.fund_id === 1
                  ? COLORS.DASHBOARD.FUND1NORMAL
                  : profile.fund_id === 2
                  ? COLORS.DASHBOARD.FUND2NORMAL
                  : profile.fund_id === 3
                  ? COLORS.DASHBOARD.FUND3NORMAL
                  : COLORS.DASHBOARD.FUND4NORMAL,
            },
          ]}
        >
          <View style={styles.contributions}>
            <View style={styles.totalWithdrawal}>
              <Text style={styles.totalWithdrawalText}>Total Withdrawal</Text>
              <Text style={styles.contributionsAmount}>
                {currencyFormatter.format(profile.total_With_Inceptn)}
              </Text>
            </View>
            <View style={styles.totalWithdrawal}>
              <Text style={styles.totalWithdrawalText}>Contribution</Text>
              <Text style={styles.contributionsAmount}>
                {currencyFormatter.format(profile.contrib_Inceptn)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.balancesContainer,
            {
              backgroundColor:
                profile.fund_id === 1
                  ? COLORS.DASHBOARD.FUND1DARK
                  : profile.fund_id === 2
                  ? COLORS.DASHBOARD.FUND2DARK
                  : profile.fund_id === 3
                  ? COLORS.DASHBOARD.FUND3DARK
                  : COLORS.DASHBOARD.FUND4DARK,
            },
          ]}
        >
          <View style={styles.contributions}>
            <View style={styles.totalWithdrawal}>
              <Text style={styles.totalWithdrawalText}>Fund Type</Text>
              <Text style={styles.contributionsAmount}>{`Fund ${profile.fund_id}`}</Text>
            </View>
            <View style={styles.totalWithdrawal}>
              <Text style={styles.totalWithdrawalText}>Unit Held</Text>
              <Text style={styles.contributionsAmount}>
                {Number(profile.units_held).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Balances;

const styles = StyleSheet.create({
  horizontalScroll: {},

  totalRSA: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAVC: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rsaAvcText: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body4Regular,
    fontSize: 10,
  },
  rsaAvcAmountText: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body4Bold,
    fontSize: 12,
  },
  balancesContainer: {
    backgroundColor: COLORS.PRIMARY.NORMAL,
    height: 137,
    width: SIZES.width * 0.78,
    marginTop: verticalScale(10),
    marginHorizontal: moderateScale(5),
    borderRadius: moderateScale(10),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nairaLogo: {
    width: 50,
    height: 50,
  },
  totalBalance: {},
  totalValueWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  totalBalanceText: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body3Regular,
  },
  totalBalanceAmountText: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body2Bold,
  },
  contributions: {
    paddingHorizontal: moderateScale(25),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: moderateScale(10),
  },
  totalWithdrawal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  totalWithdrawalText: {
    ...FONTS.body3Regular,
    color: COLORS.NEUTRAL.WHITE,
  },
  contributionsAmount: {
    ...FONTS.body2Bold,
    color: COLORS.NEUTRAL.WHITE,
  },
});
