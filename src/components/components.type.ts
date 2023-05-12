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

export type logoProps = {
  title?: string;
  containerStyle?: any;
};

export type customInputProps = {
  password?: boolean;
  confirmPassword?: boolean;
  label?: any;
  keyboardType?: any;
  multiline?: any;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  error?: string;
  icon?: any;
  placeholder?: any;
  desc?: string;
  autoCapitalize?: 'characters' | 'sentences' | 'words' | 'none' | undefined;
  value?: any;
  onFocus?: any;
  containerStyle?: any;
  editable?: boolean;
  autoComplete?: any;
  contextMenuHidden?: boolean;
  [key: string]: any;
};

export type dropDownInputProps = {
  label?: string;
  isFocus?: boolean;
  setIsFocus?: any;
  data?: any;
  value?: any;
  onChange?: any;
};

export type textLinksProps = {
  linkContainerStyles?: any;
  linkTextStyle?: any;
  onPress: () => void;
  label: string;
};
