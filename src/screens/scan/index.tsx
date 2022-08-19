import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import * as Animatable from "react-native-animatable";

import {
  BLUE_COLOR,
  WHITE_COLOR
} from "../../constants/color";
import {
  MEDIUM,
  SEMI_BOLD
} from "../../constants/fonts";
import {
  useNavigation
} from "@react-navigation/native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const windowWidth = Dimensions.get('window').width;

const Scanner: React.FC = () => {
  const navigate = useNavigation()
  const [isFlashActive, setIsFlashActive] = React.useState(false)
  
  const backAction = () => {
    navigate.goBack()
    return false;
  }
  const onSuccess = () => {
    return console.log("Camera Testing");
  }


  const makeSlideOutTranslation = (translationType: any, fromValue: any) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.32
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  return (
    <QRCodeScanner
      showMarker
      onRead={onSuccess}
      cameraStyle={{ height: SCREEN_HEIGHT }}
      flashMode={isFlashActive ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off }
      customMarker={
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <TouchableOpacity 
              onPress={() => navigate.goBack()}
              style={styles.backButton}>
              <Image
                style={{
                  width: 20,
                  height: 20
                }}
                source={require('../../assets/icons/ic_arrow_left_blue.png')}
              />
            </TouchableOpacity>
            <Text style={{
              fontFamily: SEMI_BOLD,
              fontSize: 18,
              color: "white"
            }}>
              QR CODE SCANNER
            </Text>
            <View></View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.leftAndRightOverlay} />

            <View style={styles.rectangle}>
              <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={makeSlideOutTranslation(
                  "translateY",
                  SCREEN_WIDTH - 270
                )}
              />
            </View>

            <View style={styles.leftAndRightOverlay} />
          </View>

          <View style={styles.bottomOverlay}>
            <Text style={{
              fontFamily: SEMI_BOLD,
              fontSize: 18,
              color: "white"
            }}>
              Silahkan Scan QR Tamu
            </Text>
            <TouchableOpacity
              onPress={() => setIsFlashActive(!isFlashActive)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isFlashActive ? BLUE_COLOR : WHITE_COLOR
              }}>

              {isFlashActive ? (
                <Image
                  style={{
                    width: 20,
                    height: 30
                  }}
                  source={require('../../assets/icons/ic_flash_active.png')}
                />
              ) : (
                <Image
                  style={{
                    width: 20,
                    height: 30
                  }}
                  source={require('../../assets/icons/ic_flash.png')}
                />
              )}

            </TouchableOpacity>
          </View>
        </View>
      } />
  )
}


const overlayColor = "rgba(0,0,0,0.5)";

const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = BLUE_COLOR;

const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = BLUE_COLOR;

const iconScanColor = "blue";

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  topOverlay: {
    flex: 1,
    flexDirection: 'row',
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    paddingHorizontal: (SCREEN_WIDTH - 300) / 2,
    backgroundColor: overlayColor,
    justifyContent: "space-between",
    // paddingTop: 60,
    alignItems : 'center'
  },

  bottomOverlay: {
    flex: 1,
    // height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
    paddingHorizontal: (SCREEN_WIDTH - 300) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: WHITE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Scanner