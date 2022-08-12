import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable
} from "react-native";
import { BLUE_COLOR, GREY_COLOR, WHITE_COLOR } from "../../constants/color";
import AppIntroSlider from 'react-native-app-intro-slider';
import IntroSlider from "../../components/IntroSlider";
import { LIGHT, REGULAR } from "../../constants/fonts";


const Header: React.FC = () => {
  return (
    <Image
      style={{
        width: 115,
        height: 37
      }}
      source={require('../../assets/brands/logo.png')}
    />
  )
}


const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Siap, untuk mendata tamu undangan !
      </Text>
      <Pressable style={styles.footerButton} onPress={() => { console.log('tes') }}>
        <Text style={styles.footerButtonText}> Masuk </Text>
      </Pressable>
    </View>
  )
}

const Welcome: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        
        <View style={styles.content}>
          <Header />
        </View>
        
        {/* <View> */}
          <IntroSlider/>
        {/* </View> */}

        <View style={styles.content}>
          <Footer />
        </View>
    
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between"
  },
  content: {
    padding: 20,
    margin: 4,
  },
  footer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: "center"
  },
  footerText : {
    fontFamily : LIGHT,
    fontSize : 12,
    marginBottom : 12
  },
  footerButton: {
    width: "100%",
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: BLUE_COLOR,
    borderRadius: 11,
    marginLeft: 10
  },
  footerButtonText: {
    fontSize: 18,
    color: WHITE_COLOR,
    fontFamily : REGULAR,
    textAlign: 'center',
    alignSelf : 'center'
    // alignItems : 'center'
  }
})

export default Welcome