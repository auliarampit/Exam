/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../assets/resources/colors';
import fonts from '../assets/resources/fonts';
import {Input, Icon} from 'react-native-elements';
import CurrencyFormat from '../helpers/CurrencyFormat';

const TextInputComp = ({
  input: {onChange, value, ...restInput},
  placeholder,
  returnKeyType,
  keyboardType,
  label,
  autoCapitalize,
  secureTextEntry,
  disabled,
  onContentSizeChange,
  withQuestionMark,
  onPressQuestion,
  multiline,
  style,
  inputRef,
  submitEdit,
  touchStart,
  requiredField,
  meta: {touched, error},
}) => {
  // console.log(error)
  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }

  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.labelInput}>{label}</Text>
        {requiredField ? (
          <Text
            style={{
              color: colors.danger,
              fontSize: 20,
              fontFamily: fonts.headerFontRegular,
            }}>
            {' '}
          </Text>
        ) : null}

        {withQuestionMark ? (
          <TouchableOpacity onPress={onPressQuestion} style={{marginLeft: 5}}>
            <Icon name={'help'} size={20} color={colors.grey1} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Input
        disabled={disabled}
        value={
           value
        }
        onTouchStart={touchStart}
        // style={style}
        onContentSizeChange={onContentSizeChange}
        onSubmitEditing={submitEdit}
        ref={inputRef}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onChangeText={onChange}
        {...restInput}
        inputStyle={[styles.inputText, style]}
        inputContainerStyle={[styles.inputContainer]}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
      />
      {touched && hasError && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.blue1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: colors.white,
  },
  inputText: {
    fontFamily: fonts.headerFontRegular,
  },
  labelInput: {
    fontFamily: fonts.headerFontRegular,
    marginLeft: 20,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontFamily: fonts.headerFontRegular,
    marginTop: -18,
    marginLeft: 20,
  },
});

TextInputComp.defaultProps = {
  initialValue: {
    autoCapitalize: 'none',
    keyboardType: 'default',
    disabled: false,
    secureTextEntry: false,
    withQuestionMark: false,
    onPressQuestion: null,
    multiline: false,
    style: {},
    ref: null,
    onSubmitEditing: null,
    touchStart: null,
    requiredField: false,
    onContentSizeChange: null,
  },
};

export default TextInputComp;
