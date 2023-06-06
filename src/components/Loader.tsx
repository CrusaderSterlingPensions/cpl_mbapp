import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { Flow, Swing } from 'react-native-animated-spinkit';
import { COLORS } from '../global';

const Loader = ({ loading }: any) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.modalBackground}>
        {/* <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color="#000000"
            size="large"
            style={styles.activityIndicator}
          />
        </View> */}
        <Swing color={COLORS.NEUTRAL.ACCENT} size={90} />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
