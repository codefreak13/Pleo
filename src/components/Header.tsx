import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../styles/utils';
import {COLORS} from '../styles';

export type HeaderButton = {
  text?: string;
  child: ReactNode;
  onclick(): void;
};

export type HeaderProps = {
  leftButton?: HeaderButton;
  rightButton?: HeaderButton;
  customMiddleIcon?: ReactNode;
  showBottomBorder?: boolean;
  customHeaderStyles?: ViewStyle;
};

/**
 * Custom Navigation Header component
 */
const Header = (props: HeaderProps) => {
  const {
    leftButton,
    rightButton,
    showBottomBorder,
    customMiddleIcon,
    customHeaderStyles,
  } = props;

  return (
    <View
      style={[
        styles.header,
        showBottomBorder ? styles.bottomBorder : null,
        customHeaderStyles ? customHeaderStyles : null,
      ]}>
      {leftButton && (
        <View style={styles.leftButton}>
          <TouchableOpacity onPress={() => leftButton?.onclick()}>
            {leftButton.child}
          </TouchableOpacity>
        </View>
      )}

      {customMiddleIcon && (
        <View style={styles.customMiddleIcon}>{customMiddleIcon}</View>
      )}

      {rightButton && (
        <View style={styles.rightButton}>
          <TouchableOpacity onPress={() => rightButton?.onclick()}>
            {rightButton.child}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const headerImageSize = DEVICE_HEIGHT / 8;
const height = DEVICE_HEIGHT / 16;

const styles = StyleSheet.create({
  header: {
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH,
  },
  leftButton: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  headerIcon: {
    height: headerImageSize,
    width: headerImageSize,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  customMiddleIcon: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    borderRadius: 5,
  },
  bottomBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.Grey,
  },
  rightButton: {
    position: 'absolute',
    right: 15,
    alignItems: 'flex-end',
  },
});
