import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ProductCatalogue = () => {
  return (
    <View style={styles.container}>
      <Text>ProductCatalogue</Text>
    </View>
  );
};

export default ProductCatalogue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
