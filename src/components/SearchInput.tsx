import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../config/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface props {
  value: string;
  onChangeText: (arg?: any) => void;
  onPressClear: () => void;
}

export default function SearchInput({ value, onChangeText, onPressClear }: props) {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Search for articles...' value={value} style={styles.input} onChangeText={onChangeText} />
      {value ? <TouchableOpacity style={{ marginRight: 10 }} onPress={onPressClear}>
        <Ionicons name="close" size={24} />
      </TouchableOpacity> : null}
      <TouchableOpacity style={{ marginLeft: 'auto', paddingLeft: value ? 0 : 30 }}>
        <Ionicons name="search" size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.whiteBlue,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  input: {
    width: "80%",
  }
})