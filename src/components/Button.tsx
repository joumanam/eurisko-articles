import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../config/Colors';

export interface ButtonProps {
    label?: string;
    onPress?: (arg?: any) => void;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button({ label, onPress, disabled = false, loading = false }: ButtonProps) {
    return (
        <TouchableOpacity
            style={{ ...styles.container, backgroundColor: disabled ? Colors.grey : Colors.red }}
            onPress={onPress} 
            disabled={loading ? true : disabled}>
            {!loading ? <Text style={styles.label}>{label}</Text> :
                <ActivityIndicator color={Colors.beige} size="small" />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.red,
        width: "90%",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5
    },
    label: {
        color: Colors.whiteBlue,
        fontWeight: 'bold'
    }
})