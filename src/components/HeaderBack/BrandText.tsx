import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colors} from '../../styles/colors';
const defaultFontSize = 13;

export type BrandTextProps = {
  primary?: boolean;
  color?: string;
} & Partial<typeof defaultProps> &
  TextProps;

export type FontType =
  | 'Muli'
  | 'Muli-Black'
  | 'Muli-BlackItalic'
  | 'Muli-Bold'
  | 'Muli-BoldItalic'
  | 'Muli-ExtraLight'
  | 'Muli-ExtraLightItalic'
  | 'Muli-ExtraBold'
  | 'Muli-ExtraBoldItalic'
  | 'Muli-Italic'
  | 'Muli-Light'
  | 'Muli-LightItalic'
  | 'Muli-Medium'
  | 'Muli-MediumItalic'
  | 'Muli-Regular'
  | 'Muli-SemiBold'
  | 'Muli-SemiBoldItalic';

const defaultProps = {
  fontFamily: 'Muli-Regular' as FontType,
  fontSize: defaultFontSize,
  fontWeight: 'normal' as
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
};

export const BrandText: React.SFC<BrandTextProps> = React.memo(
  ({children, primary, fontWeight, fontFamily, fontSize, color, ...props}) => {
    return (
      <Text
        {...props}
        style={StyleSheet.flatten([
          {
            color: primary ? colors.primaryColor : color,
            fontWeight,
          },
          {fontFamily, fontSize},
          props.style,
        ])}>
        {children}
      </Text>
    );
  },
);

BrandText.defaultProps = defaultProps;

// export default BrandText;
