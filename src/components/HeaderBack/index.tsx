import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {faArrowLeft} from 'nvquang-font-icon/pro-light-svg-icons';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../styles/colors';
import {BrandText} from './BrandText';

type Props = {
  title?: String;
  noBack?: Boolean;
  rightIcon?: IconDefinition;
  rightPress?: () => void;
};
const Header = React.memo<Props>(({title, noBack, rightIcon, rightPress}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Animated.View style={[styles.topHeader, {height: 60}]}>
      <View style={{flexDirection: 'row'}}>
        {!noBack ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.viewBack}
            onPress={goBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={24}
              style={{color: colors.btnBack, marginRight: 6}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
            }}
          />
        )}
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BrandText
            numberOfLines={1}
            style={{color: colors.blackColor, fontSize: 16}}>
            {title}
          </BrandText>
        </View>
        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.viewRight}
            onPress={rightPress && rightPress}>
            <FontAwesomeIcon
              icon={rightIcon}
              size={26}
              style={{color: colors.btnBack, marginLeft: 6}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
            }}
          />
        )}
      </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  topHeader: {
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 0.5,
  },
  viewBack: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 14,
    alignItems: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  viewRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default Header;
