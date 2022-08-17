import React from "react";
import { Image, View, Text } from "react-native";
import { BLUE_COLOR } from "../../constants/color";
import { SEMI_BOLD } from "../../constants/fonts";


const Empty : React.FC = () => {
  return (
    <View style={{
      justifyContent : 'center',
      alignSelf: 'center'
    }}>
      <Image 
        style={{
          marginTop: 100,
          width : 200,
          height : 200,
        }}
        source={require('../../assets/illustrations/ill_empty.png')}
      />
      <Text style={{
        marginTop: 20,
        fontSize: 18,
        fontFamily: SEMI_BOLD,
        color : BLUE_COLOR,
      }}>
        Data tidak ditemukan !
      </Text>
    </View>
  )
}

export default Empty