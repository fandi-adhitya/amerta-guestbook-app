import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import apiInstance from "../../constants/api";
import { BLUE_COLOR, GREY_1_COLOR, GREY_COLOR, RED_COLOR, WHITE_COLOR } from "../../constants/color";
import { MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fonts";
import { AUTH } from "../../constants/urls";
import storage from "../../lib/storage";
import { AuthType } from "../../typings/AuthType";
import AsyncStorage from "@react-native-async-storage/async-storage";

type formType = {
  username: string,
  password: string
}

const Form: React.FC = () => {
  const navigation = useNavigation()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(!isSubmitting)

    if(!username && !password){
      Toast.show({
        type : "error",
        text1 : "Gagal Masuk ke-Aplikasi",
        text2 : "Username & password tidak boleh kosong",
        position : "top"
      })
      
      return false;
    }

    let values : formType = {
      username : username,
      password : password
    }

    try {
      const { data } = await apiInstance.post<AuthType>(AUTH, values)
      
      setIsSubmitting(false)

      AsyncStorage.setItem("name", data.namamempelai)
      AsyncStorage.setItem("token", data.token)

      navigation.navigate("Home" as never, {} as never)
    } catch (e : any) {
      setIsSubmitting(false)

      Toast.show({
        type : "error",
        text1 : e.data.message,
        position : "top"
      })
    } 

  }

  return (
    <>
    <Toast />
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={{
          fontSize: 18
        }}>
          <Text style={{
            fontFamily: SEMI_BOLD,
            color: BLUE_COLOR
          }}>
            Masuk
          </Text>
          <Text style={{
            fontFamily: SEMI_BOLD,
            color: GREY_1_COLOR,
          }}>
            {" "}ke Buku Tamu
          </Text>
        </Text>
      </View>

      <View style={styles.formInputContainer}>

        <View style={styles.textInputContainer}>
          <Text style={styles.formLabel}>
            Username
          </Text>
          <TextInput
            editable={!isSubmitting} 
            value={username}
            onChangeText={(e) => setUsername(e)}
            style={styles.formInput}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.formLabel}>
            Password
          </Text>
          <TextInput
            editable={!isSubmitting}
            value={password}
            onChangeText={(e) => setPassword(e)}
            secureTextEntry
            style={styles.formInput}
          />
        </View>

        <TouchableOpacity
          style={[styles.formButton, { backgroundColor: BLUE_COLOR }]}
          onPress={handleSubmit}
        >
          <Text style={styles.formButtonText}>
            Masuk
          </Text>
        </TouchableOpacity>
      </View>


      <View>
        <Text style={styles.formHelpText}>
          Punya masalah saat login ? {"\n"}
          Hubungi Admin
        </Text>
      </View>

      <View>
        <Text style={{
          textAlign: "center",
          fontSize: 14,
          fontFamily: REGULAR,
          color: BLUE_COLOR,
        }}>
          By Amerta Invitation
        </Text>
      </View>
    </View>
    </>
  )
}

const Authentication: React.FC = () => {
  return (

    <View style={styles.container}>
      <View style={{
        backgroundColor: "#fff"
      }}>
        <View style={styles.backgroundOverlay}>
          <Image source={require('../../assets/additionals/overlay.png')} />
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/brands/logo-yellow.png')}
            style={{
            }}
          />
        </View>
      </View>

      <Form />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0
  },
  logo: {
    margin: 40,
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
  },
  formHeader: {
    alignItems: "center"
  },
  formInputContainer: {
    paddingHorizontal: 38
  },
  formLabel: {
    fontFamily: MEDIUM,
    color: GREY_1_COLOR,
    fontSize: 14,
    marginBottom: 2
  },
  formInput: {
    height: 40,
    backgroundColor: WHITE_COLOR,
    padding: 10,
    borderRadius: 15,
  },
  formButton: {
    height: 40,
    borderRadius: 15,
    paddingVertical: 8,
    marginVertical: 10,
  },
  formButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: WHITE_COLOR,
    fontFamily: SEMI_BOLD,
  },
  formHelpText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: REGULAR,
    color: GREY_1_COLOR,
  },
  textInputContainer: {
    marginVertical: 10
  },
  errorMessage: {
    fontFamily: MEDIUM,
    color: RED_COLOR,
    marginTop: 5,
  }
})

export default Authentication