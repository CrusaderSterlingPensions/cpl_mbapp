import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Calculator = () => {
  return (
    <View style={styles.container}>
      <Text>Calculator</Text>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
