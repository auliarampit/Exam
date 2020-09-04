/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';

// assets
import fonts from '../assets/resources/fonts';
import colors from '../assets/resources/colors';

// components
import ButtonComp from '../components/ButtonComp';
import TextInputComp from '../components/TextInputComp';
import ImageComp from '../components/ImageComp';

//helpers

// redux
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SubmitImage } from '../store/actions';

// library
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

const ScreenKedua = props => {
  const [nameRef, setNameRef] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [dataImageState, setDataImageState] = useState([]);

  const submit = async (values) => {
    setIsLoading(true);

    const dataToSubmit = {
      name: values.name,
      images: dataImageState,
    };

    props.onSubmit(dataToSubmit, e => {
      if (e.status === 'success') {
        console.log('e', e);
        Alert.alert('Success', e.status);
        setIsLoading(false);
      } else {
        Alert.alert('Error', e.response.data.message.name[0]);
        setIsLoading(false);
      }
    });

  };

  const takePhoto = () => {
    const options = {
      title: 'Ambil Gambar',
      multiple: true,
      maxFiles: 5,
      maxWidth: 500,
      maxHeight: 500,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {
        const source = { uri: response.uri };
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setDataImageState(dataImageState.concat([source]));
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
        <View style={[styles.containerInput, { marginBottom: 0, marginTop: 24 }]}>
          <Text style={styles.textRandomCode}>
            Gambar
          </Text>

          <View>
            <ImageComp data={dataImageState} onPress={takePhoto} />
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

const mapStateToProps = state => {
  // console.log('state', state);
  return {
    //
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: async (data, callback) => {
      const result = await dispatch(SubmitImage(data, callback));
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

    const isName = val => {
      if (/^[a-zA-Z\\'.,\s]*$/.test(val)) {
        return true;
      }
      return false;
    };

    errors.name = !values.name
      ? 'Nama wajib diisi'
      : !isName(values.email)
        ? 'Nama tidak valid'
        : !values.name.length > 50
          ? 'Maksimal 50 karakter'
          : undefined;

    return errors;
  },
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScreenKedua)
);
