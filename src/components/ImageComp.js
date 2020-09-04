/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../assets/resources/colors';
import fonts from '../assets/resources/fonts';

const ImageComp = ({ data, onPress }) => {
    console.log('image comp', data);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {
                    data !== undefined ?
                        data.length >= 4 ?
                            <>
                                {
                                    data.map((item) => {
                                        console.log('item', item);
                                        return (
                                            <View style={styles.containerImage}>
                                                <Image resizeMode={"cover"} source={item} style={styles.containerFoto} />
                                            </View>
                                        );
                                    })
                                }
                                <TouchableOpacity onPress={onPress} disabled={true} style={[styles.containerImage, { backgroundColor: colors.red1 }]}>
                                    <Text style={styles.textAdd}>+</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                {
                                    data.map((item) => {
                                        console.log('item', item);
                                        return (
                                            <View style={styles.containerImage}>
                                                <Image resizeMode={"cover"} source={item} style={styles.containerFoto} />
                                            </View>
                                        );
                                    })
                                }
                                <TouchableOpacity onPress={onPress} style={[styles.containerImage, { backgroundColor: colors.red1 }]}>
                                    <Text style={styles.textAdd}>+</Text>
                                </TouchableOpacity>
                            </>
                        :
                        <>
                            <TouchableOpacity onPress={onPress} style={[styles.containerImage, { backgroundColor: colors.red1 }]}>
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
        marginTop: 17,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAdd: {
        fontSize: 35,
        fontFamily: fonts.headerFontBold,
        color: colors.white,
    },
    containerFoto: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default ImageComp;
