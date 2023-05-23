import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../global';
import { Ionicons } from '@expo/vector-icons';
import { normalize } from '../global';
import { Avatar } from '@rneui/base';
import UserAvatar from 'react-native-user-avatar';
import { menuIcon, menuIconDark, logoRoundRed } from '../global/images';
// import UserAvatar from '@muhzi/react-native-user-avatar';

type logoProps = {
  title?: string;
};

type profileImageProps = {
  profile?: any;
  onPress?: () => void;
};
type menuIconProps = {
  onPress?: () => void;
};

export const ProfileImage = ({ profile, onPress }: profileImageProps) => {
  return (
    <TouchableOpacity style={styles.profileImageWrapper} activeOpacity={0.5} onPress={onPress}>
      <UserAvatar
        size={normalize(40)}
        name={profile?.first_name + ' ' + profile?.surname}
        bgColor={COLORS.PRIMARY.NORMAL}
        style={{
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLORS.PRIMARY.NORMAL,
          borderRadius: 50,
          width: 45,
          height: 45,
        }}
        src={profile?.image}
      />
    </TouchableOpacity>
  );
};
export const MenuIcon = ({ onPress }: menuIconProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginLeft: 10,
        width: 70,
        height: 50,
        justifyContent: 'center',
      }}
    >
      <Image
        source={menuIconDark}
        style={{
          width: 30,
          height: 20,
        }}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const LogoRed = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logoRoundRed} resizeMode="cover" style={styles.imageLogo} />
      </View>
    </View>
  );
};

export default LogoRed;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImageWrapper: {
    height: 45,
    width: 45,
    backgroundColor: 'gray',
    borderRadius: 50,
    overflow: 'hidden',
  },

  profileImage: {
    height: 40,
    width: 40,
  },

  imageLogo: {
    height: 45,
    width: 45,
  },
  logoText: {
    ...FONTS.body1Medium,
    color: COLORS.PRIMARY.DARK,
  },
});
