import { StyleSheetProperties } from 'react-native';

export type buttonProps = {
  onPress: () => void;
  text: string | undefined;
  customBtnStyle?: any;
  customTextStyle?: any;
  icon?: any;
  disabled?: boolean;
};

export type textComponentProps = {
  onPress?: () => void;
  text: string | undefined;
  contentContainerStyle?: any;
  labelStyle?: any;
  disabled?: boolean;
  label?: string | undefined;
};
