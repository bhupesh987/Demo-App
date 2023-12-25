import React, {useRef, useState} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import Reanimated, {FadeInRight, FadeOut} from 'react-native-reanimated';
import {COLORS, FONTS} from '../Assets';

const InputBox = ({
  placeholder,
  label,
  error,
  value,
  style,
  onBlur,
  onFocus,
  keyboardType,
  secure = false,
  inputStyle = {},
  onChangeText,
  numberOfLines,
  title = '',
  ...restOfProps
}) => {
  const [isFocused, setIsFoinputcused] = useState(false);
  const [show, setShow] = useState(secure);
  const inputRef = useRef();

  return (
    <>
      <View style={{...styles.container, ...style}}>
        {title && <Text style={styles.title}>{title}</Text>}
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.black}
          numberOfLines={numberOfLines}
          style={[styles.inputBox(isFocused), inputStyle]}
          ref={inputRef}
          secureTextEntry={show}
          value={value}
          keyboardType={keyboardType}
          onBlur={event => {
            setIsFoinputcused(false);
            onBlur?.(event);
          }}
          onFocus={event => {
            setIsFoinputcused(true);
            onFocus?.(event);
          }}
          {...restOfProps}
        />
        {!!error && <ErrorBox error={error} />}
      </View>
    </>
  );
};

export const ErrorBox = ({error}) => {
  return (
    <Reanimated.Text
      entering={FadeInRight}
      exiting={FadeOut}
      numberOfLines={2}
      adjustsFontSizeToFit
      style={{
        fontSize: 10,
        fontFamily: FONTS.regular,
        color: COLORS.lightRed,
        marginVertical: 4,
        textAlign: 'right',
        alignSelf: 'flex-end',
        width: '100%',
      }}>
      {error}
    </Reanimated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 10,
  },
  title: {
    marginVertical: 3,
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  inputBox: isFocused => ({
    color: COLORS.black,
    fontFamily: FONTS.regular,
    fontSize: 13,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: isFocused ? COLORS.black : COLORS.lightGrey,
  }),
});

export default InputBox;
