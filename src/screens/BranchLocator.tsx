import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BranchLocator = () => {
  return (
    <View style={styles.container}>
      <Text>BranchLocator</Text>
    </View>
  );
};

export default BranchLocator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
