import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { COLORS, FONTS } from '../global';

const PasswordInstructions = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.instructionHeader}>{'Password must contain the following:'}</Text>
        <Text style={styles.instructionText}>- {'Be at Least 8 characters'}</Text>
        <Text style={styles.instructionText}>- {'Contains a capital letter'}</Text>
        <Text style={styles.instructionText}>- {'Contains a special key'}</Text>
      </View>
    </View>
  );
};

export default PasswordInstructions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: verticalScale(8),
  },
  instructionHeader: {
    ...FONTS.body4Bold,
    color: COLORS.ERROR.LIGHT_HOVER,
  },
  instructionText: {
    ...FONTS.body4Regular,
    color: COLORS.ERROR.LIGHT_HOVER,
  },
});
