import { Dimensions, PixelRatio, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import { normalizeProps, SizesProps } from "./global.types";

export const normalize = (size: normalizeProps): number => {
  const newSize = (size * width) / 360;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
  }
};

export const SIZES: SizesProps = {
  base: 10,
  font: 14,
  radius: 10,
  padding: 12,
  margin: 12,

  h1: normalize(60),
  h2: normalize(48),
  h3: normalize(40),
  h4: normalize(34),
  h5: normalize(30),
  body1: normalize(24),
  body2: normalize(20),
  body3: normalize(16),
  body4: normalize(12),

  width,
  height,
};
