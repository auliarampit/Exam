/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// assets
import fonts from '../assets/resources/fonts';
import colors from '../assets/resources/colors';

// components
import ButtonComp from '../components/ButtonComp';
import TextInputComp from '../components/TextInputComp';
import ImageComp from '../components/ImageComp';

//helpers
import ActionHandler from '../helpers/ActionHandler';

// redux
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { getRandomCode, SubmitCode } from '../store/actions';

// library
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

const ScreenKedua = props => {
  const [nameRef, setNameRef] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [dataImage, setDataImage] = useState(null);

  let sourceImage = [];
  if (dataImage !== null) {
    sourceImage.push({source: dataImage.uri});
  }

  const submit = async (values) => {
    setIsLoading(true);

    const data = {
      code: values.code,
    };

    props.onSubmit(data, e => {
      if (e.status === 'success') {
        props.navigation.navigate('ScreenKedua');
        setIsLoading(false);
      } else {
        console.log(e.response.data.message.code[0]);
        ActionHandler.errorLocal(e.response.data.message.code[0]);
        setIsLoading(false);
      }
    });
  };


  const takePhoto = () => {
    const options = {
      title: 'Ambil Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setDataImage(source)

      }
    });
  };

  return (
    <View style={styles.contrailer}>
      <View style={styles.containerBody}>
        <View style={styles.containerInput}>
          <Text style={styles.textRandomCode}>
            Nama
          </Text>
        </View>
      </View>

      <View style={{ height: 80, marginHorizontal: 0 }}>
        <Field
          name="name"
          requiredField={true}
          component={TextInputComp}
          returnKeyType="done"
          inputRef={el => setNameRef(el)}
          placeholder={''}
        />
      </View>

      <View style={styles.containerBody}>
        <View style={[styles.containerInput, { marginBottom: 0, marginTop: 20 }]}>
          <Text style={styles.textRandomCode}>
            Gambar
          </Text>

          <View>
            <ImageComp data={sourceImage} onPress={takePhoto} />
          </View>
        </View>
      </View>

      <View>
        {isLoading ? (
          <View style={styles.containerBtn}>
            <View style={styles.containerLinear}>
              <LinearGradient
                colors={[colors.red1, colors.red1]}
                style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.white} />
              </LinearGradient>
            </View>
          </View>
        ) : (
            <View style={styles.containerBtn}>
              <ButtonComp name={'SUBMIT'} onPress={props.handleSubmit(submit)} />
            </View>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contrailer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  containerBody: {
    marginHorizontal: 12,
  },
  textRandomCode: {
    fontSize: 20,
    fontFamily: fonts.headerFontBold,
  },
  containerInput: {
    fontSize: 20,
    fontFamily: fonts.headerFontBold,
    marginBottom: -12,
  },
  containerBtn: {
    marginTop: 35,
    backgroundColor: colors.white,
    width: '100%',
  },
  loadingContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    padding: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  containerLinear: {
    // marginTop: 33,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onRandomCode: async (callback) => {
      const result = await dispatch(getRandomCode());
      // console.log(result);
      callback(result);
    },
    onSubmit: async (data, callback) => {
      const result = await dispatch(SubmitCode(data, callback));
      // console.log(result);
      callback(result);
    },
  };
};
export default reduxForm({
  form: 'nameForm',
  touchOnBlur: false,
  validate: values => {
    const errors = {};
    console.log(values);

    errors.code = !values.code
      ? 'Nama wajib diisi'
      : undefined;

    return errors;
  },
})(
  connect(
    null,
    mapDispatchToProps,
  )(ScreenKedua)
);
