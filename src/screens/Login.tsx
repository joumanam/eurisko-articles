import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Colors } from '../config/Colors';
import { loginRequest } from '../api/api';
import { useAppDispatch } from '../redux/rtkHooks';
import { setUser } from '../redux/userSlice';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secured, setSecured] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch();

  const onLogin = () => {
    setLoading(true)
    console.warn("pressed")
    loginRequest({ username, password })
      .then(async (response: any) => {
        await AsyncStorage.setItem('token', response.accessToken);
        dispatch(setUser({ username, accessToken: response.accessToken }));
      })
      .catch(err => {
        console.log(err)
        Alert.alert('Oops!', `${err?.data?.message}.`, [
          {
            text: 'Ok',
            onPress: () => { },
            style: 'cancel',
          }])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (username && password) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [username, password, loading])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <ImageBackground source={require("../../assets/background.jpg")} resizeMode="stretch" style={styles.container}>
          <View style={styles.card}>
            <Image source={require("../../assets/finalLogo.png")} resizeMode="contain" style={styles.logo} />
            <View style={{ marginBottom: 30 }}>
              <Input placeholder="Username" value={username} onChangeText={(value) => setUsername(value)} left="person" />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Input placeholder="Password" value={password} onChangeText={(value) => setPassword(value)} left="md-lock-closed" right={secured ? "ios-eye-off-outline" : "ios-eye-outline"} onPressRight={() => setSecured(!secured)} secured={secured} />
            </View>
            <View style={styles.buttonContainer}>
              <Button label='Login' onPress={onLogin} disabled={disabled} loading={loading} />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.whiteBlue,
    borderRadius: 15,
    padding: 10,
    alignSelf: 'center',
    marginTop: Dimensions.get("screen").height * 1 / 10,
    width: "85%",
    height: 550,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 40
  }
})