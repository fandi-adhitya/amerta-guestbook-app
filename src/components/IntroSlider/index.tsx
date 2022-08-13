import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Svg, { Circle, Path,  } from 'react-native-svg';
import { FirstIllustration, SecondIllustration, ThirdIllustration } from "../Illustration";

const IntroSlider = () => {
  const [sliderState, setSliderState] = React.useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={19}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
      >
        <View style={{ width, height }}>
          <FirstIllustration/>
          <View style={styles.wrapper}>
            <Text style={styles.header}>Selamat Datang!</Text>
            <Text style={styles.paragraph}>Di aplikasi amerta buku tamu</Text>
          </View>
        </View>
        <View style={{ width, height }}>
          <SecondIllustration />        
          <View style={styles.wrapper}>
            <Text style={styles.header}>Buku Tamu Digital.</Text>
            <Text style={styles.paragraph}>Mendata tamu lebih mudah dengan menggunakan scan QR-Code</Text>
          </View>
        </View>
        <View style={{ width, height }}>
          <ThirdIllustration />
          <View style={styles.wrapper}>
            <Text style={styles.header}>Selamat</Text>
            <Text style={styles.paragraph}>Atas pernikahan nya.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(3).keys()).map((key, index) => (
          <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2, width: pageIndex === index ? 20 : 10 }]} key={index} />
        ))}
      </View>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 420,
    width: '100%',
  },
  wrapper: {
    marginVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 27,
    marginBottom: 8,
    textAlign: 'left',
    fontFamily: "Montserrat-Medium"
  },
  paragraph: {
    marginLeft: 27,
    fontSize: 18,
    fontFamily: "Montserrat-Light"
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
});

export default IntroSlider