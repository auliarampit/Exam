/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/resources/colors';
import fonts from '../assets/resources/fonts';

const ImageComp = ({ data, onPress }) => {
    console.warn('image comp', data);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {
                    data !== undefined ?
                        data.length >= 4 ?
                            <>
                                {
                                    data.map((item) => {
                                        return (
                                            <View style={styles.containerImage}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        );
                                    })
                                }
                                <TouchableOpacity onPress={onPress} disabled={true} style={styles.containerImage}>
                                    <Text style={styles.textAdd}>+</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                {
                                    data.map((item) => {
                                        return (
                                            <View style={styles.containerImage}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        );
                                    })
                                }
                                <TouchableOpacity onPress={onPress} style={styles.containerImage}>
                                    <Text style={styles.textAdd}>+</Text>
                                </TouchableOpacity>
                            </>
                        :
                        <>
                            <TouchableOpacity onPress={onPress} style={styles.containerImage}>
                                <Text style={styles.textAdd}>+</Text>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    containerBtn: {
        height: 50,
        borderRadius: 13,
        marginHorizontal: 9,
        backgroundColor: colors.red1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerImage: {
        height: 58,
        width: 57,
        backgroundColor: colors.red1,
        marginTop: 17,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAdd: {
        fontSize: 25,
        fontFamily: fonts.headerFontBold,
    },
});

export default ImageComp;
