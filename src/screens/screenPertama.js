/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// assets
import fonts from '../assets/resources/fonts';
import colors from '../assets/resources/colors';

// components
import ButtonComp from '../components/ButtonComp';
import TextInputComp from '../components/TextInputComp';

//helpers
import ActionHandler from '../helpers/ActionHandler';

// redux
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { getRandomCode, SubmitCode } from '../store/actions';

// library
import LinearGradient from 'react-native-linear-gradient';

const ScreenPertama = props => {
    const [code, setCode] = useState(0);

    const [codeRef, setCodeRef] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const randomCode = () => {
        props.onRandomCode(e => {
            console.log(e);
            if (e) {
                setCode(e.code);
            } else {
                ActionHandler.errorLocal(e.response.data.message);
            }
        });
    };

    useEffect(() => {
        randomCode();
    }, []);

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
                randomCode();
                setIsLoading(false);
            }
        });
    };

    return (
        <View style={styles.contrailer}>
            <View style={styles.containerBody}>
                <Text style={styles.textRandomCode}>
                    Random Code
                </Text>

                <View style={styles.containerCode}>
                    <Text style={styles.textCode}>
                        {code}
                    </Text>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.textRandomCode}>
                        Input Code
                    </Text>
                </View>
            </View>

            <View style={{ height: 80, marginHorizontal: 5 }}>
                <Field
                    name="code"
                    requiredField={true}
                    component={TextInputComp}
                    returnKeyType="done"
                    keyboardType={'numeric'}
                    inputRef={el => setCodeRef(el)}
                    placeholder={''}
                />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    textRandomCode: {
        fontSize: 20,
        fontFamily: fonts.headerFontBold,
    },
    containerCode: {
        height: 50,
        width: 120,
        borderRadius: 13,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue1,
    },
    containerInput: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: fonts.headerFontBold,
    },
    textCode: {
        fontFamily: fonts.headerFontRegular,
        color: colors.white,
        fontSize: 20,
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
    form: 'codeForm',
    touchOnBlur: false,
    validate: values => {
        const errors = {};
        console.log(values);

        errors.code = !values.code
            ? 'Code wajib diisi'
            : values.code.length > 4
                ? 'Maksimal code 4 digit'
                : undefined;

        return errors;
    },
})(
    connect(
        null,
        mapDispatchToProps,
    )(ScreenPertama)
);
