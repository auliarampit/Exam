/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/resources/colors';
import fonts from '../assets/resources/fonts';

const ButtonComp = ({ name, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.containerBtn}>
                    <Text style={styles.textName}>{name}</Text>
                </View>
            </TouchableOpacity>
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
    textName: {
        fontFamily: fonts.headerFontRegular,
        fontSize: 19,
        color: colors.white,
    },
});

export default ButtonComp;
