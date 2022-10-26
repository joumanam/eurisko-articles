import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
// import { TextInput } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../config/Colors';


export interface InputProps {
    placeholder?: string;
    secured?: boolean;
    value: any;
    onChangeText: (arg?: any) => void;
    left?: string;
    right?: React.ReactNode;
    onPressRight?: () => void;

}

export default function Input({ placeholder, secured = false, value, onChangeText, left, right, onPressRight }: InputProps) {

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                height: 40,
            }}
        >
            <View
                style={{
                    zIndex: 1,
                    left: 25,
                }}
            >
                <Ionicons name={left} size={16} color={Colors.red} />
            </View>
            <View style={styles.container}>
                <TextInput secureTextEntry={secured} placeholder={placeholder} value={value} onChangeText={onChangeText} style={styles.input} />
                {right ?
                    <TouchableOpacity style={styles.rightIcon} onPress={onPressRight}>
                        <Ionicons name={right} size={20} color={Colors.red} />
                    </TouchableOpacity> : null}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center'

    },
    input: {
        height: 40,
        paddingLeft: 30
    },
    rightIcon: {
        marginLeft: 'auto',
        marginRight: 20
    }
})