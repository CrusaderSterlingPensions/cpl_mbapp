import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SIZES } from '../global';

const BenefitApplication = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LogoutModal');
        }}
      >
        <Text>BenefitApplication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BenefitApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: SIZES.height,
    alignItems: 'center',
  },
});
