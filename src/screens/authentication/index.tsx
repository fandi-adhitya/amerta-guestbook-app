import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { BLACK_COLOR, BLUE_COLOR, GREY_1_COLOR, WHITE_COLOR } from "../../constants/color";
import { MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fonts";

const Form: React.FC = () => {
  return (
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
        <Text style={styles.formLabel}>
          Username
        </Text>
        <TextInput
          style={styles.formInput}
        />
        <Text style={styles.formLabel}>
          Password
        </Text>
        <TextInput
          secureTextEntry
          style={styles.formInput}
        />
        <TouchableOpacity
          style={styles.formButton}
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
          textAlign : "center",
          fontSize : 14,
          fontFamily : REGULAR,
          color : BLUE_COLOR,
        }}>
          By Amerta Invitation
        </Text>
      </View>
      
    </View>
  )
}

const Authentication: React.FC = () => {
  return (
    <View style={styles.container}>

      <View style={{
        backgroundColor : "#fff"
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
    marginBottom: 24,
  },
  formButton: {
    backgroundColor : BLUE_COLOR,
    height : 70,
    borderRadius : 15,
    paddingVertical : 23
  },
  formButtonText : {
    textAlign : "center",
    fontSize : 18,
    color : WHITE_COLOR,
    fontFamily : SEMI_BOLD,
  },
  formHelpText : {
    textAlign : 'center',
    fontSize : 14,
    fontFamily : REGULAR,
    color : GREY_1_COLOR,
  }
})

export default Authentication