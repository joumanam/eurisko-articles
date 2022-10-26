import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../config/Colors';

export interface ButtonProps {
  label?: string;
  onPress?: (arg?: any) => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  type?: 'primary' | 'secondary'
}

export default function Button({ label, onPress, disabled = false, loading = false, style, type = 'primary' }: ButtonProps) {

  function getColor() {
    switch (type) {
      case "primary":
        return Colors.red;
      case "secondary":
        return Colors.whiteBlue;
      default:
        return Colors.red;
    }
  }

  function getTextColor() {
    switch (type) {
      case "primary":
        return Colors.whiteBlue;
      case "secondary":
        return Colors.red;
      default:
        return Colors.whiteBlue;
    }
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: disabled ? Colors.grey : getColor(), ...style }}
      onPress={onPress}
      disabled={loading ? true : disabled}>
      {!loading ? <Text style={{ ...styles.label, color: getTextColor() }}>{label}</Text> :
        <ActivityIndicator color={Colors.whiteBlue} size="small" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5
  },
  label: {
    fontWeight: 'bold'
  }
})