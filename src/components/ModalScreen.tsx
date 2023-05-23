import { Modal, StyleSheet, Text, View, Platform, TextStyle } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../global';
import Button from './Button';
import Logo from './Logo';
import { StyleProp } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

type modalScreenProps = {
  error?: boolean;
  modalVisible: boolean | undefined;
  setModalVisible: any;
  titleLabel?: string;
  message?: string;
  icon?: any;
  buttonLabelOne?: string;
  buttonLabelTwo?: string;
  customTitleStyle?: any;
  customMessageStyle?: any;
  doubleButton?: boolean;
  buttonOneOnPress: () => void;
  buttonTwoOnPress: () => void;
};

const ModalScreen = ({
  error,
  modalVisible,
  setModalVisible,
  titleLabel,
  message,
  icon,
  buttonLabelOne,
  buttonLabelTwo,
  buttonOneOnPress,
  buttonTwoOnPress,
  customTitleStyle,
  customMessageStyle,
  doubleButton,
}: modalScreenProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={{ ...styles.modalTitleText, ...customTitleStyle }}>{titleLabel}</Text>
          <Text style={{ ...styles.modalMessageText, ...customMessageStyle }}>{message}</Text>
          <View style={styles.buttonWrapper}>
            {doubleButton && (
              <Button
                onPress={buttonOneOnPress}
                text={buttonLabelOne}
                customTextStyle={styles.btnTextStyle}
                customBtnStyle={{ ...styles.btnStyle, backgroundColor: COLORS.ERROR.NORMAL }}
              />
            )}
            <Button
              onPress={buttonTwoOnPress}
              text={buttonLabelTwo}
              customTextStyle={{ ...styles.btnTextStyle, color: COLORS.NEUTRAL.ACCENT }}
              customBtnStyle={{ ...styles.btnStyle }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.NEUTRAL.TRANSPARENT85,
  },
  modalView: {
    backgroundColor: COLORS.NEUTRAL.WHITE,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(35),
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 1,
    width: '90%',
  },
  iconContainer: {
    paddingBottom: verticalScale(10),
  },
  modalTitleText: {
    ...FONTS.body2Bold,
    paddingBottom: verticalScale(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalMessageText: {
    ...FONTS.body3Regular,
    paddingBottom: verticalScale(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnTextStyle: {
    color: COLORS.NEUTRAL.WHITE,
    ...FONTS.body2Bold,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  btnStyle: {
    width: 'auto',
    paddingHorizontal: 30,
    marginHorizontal: 10,
    height: 'auto',
    paddingVertical: 15,
    borderColor: COLORS.NEUTRAL.ACCENT,
    borderWidth: 1,
    backgroundColor: COLORS.NEUTRAL.TRANSPARENT,
  },
});
