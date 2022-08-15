import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Alert
} from "react-native";
import { BLUE_COLOR, GREY_1_COLOR, PURPLE_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../../constants/color";
import { MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fonts";
import { VISITOR } from "../../constants/visitor_mocks";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerBackgroundOverlay}>
        <Image source={require('../../assets/additionals/overlay-white.png')} />
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}> the weeding of </Text>
      </View>
      <View style={styles.headerClient}>
        <View>
          <Image
            style={styles.headerClientImg}
            source={require('../../assets/additionals/default.png')} />
        </View>
        <View style={styles.headerClientText}>
          <Text style={styles.headerClientTextName}>
            Agam & Dara
          </Text>
          <Text style={styles.headerClientTextDate}>
            23 Juli 2023
          </Text>
        </View>
      </View>
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;

const Dashboard: React.FC = () => {
  const navigation = useNavigation()

  const goToScan = () => {
    navigation.navigate("Scan" as never, {} as never)
  }

  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.dashboardContainerCountVisitor}>
        <Text style={styles.dashboardContainerCountVisitorText}>
          Tamu Hadir
        </Text>
        <Text style={styles.dashboardContainerCountVisitorNumber}>
          100
        </Text>
      </View>
      <View
        style={{
          marginVertical: 10,
          borderBottomColor: GREY_1_COLOR,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.dashboardContainerMenus}>
        <TouchableOpacity style={styles.dashboardContainerMenuContainerItems}>
          <View
            style={styles.dashboardContainerMenuItems}
          >
            <Image
              style={styles.dashboardContainerMenuIcons}
              source={require('../../assets/icons/ic_master.png')} />
          </View>
          <Text style={styles.dashboardContainerMenuItemsText}>Master Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardContainerMenuContainerItems}>
          <View
            style={styles.dashboardContainerMenuItems}
          >
            <Image
              style={styles.dashboardContainerMenuIcons}
              source={require('../../assets/icons/ic_manual.png')} />
          </View>
          <Text style={styles.dashboardContainerMenuItemsText}>Manual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardContainerMenuContainerItems} onPress={goToScan}>
          <View
            style={styles.dashboardContainerMenuItems}
          >
            <Image
              style={styles.dashboardContainerMenuIcons}
              source={require('../../assets/icons/ic_scan.png')} />
          </View>
          <Text style={styles.dashboardContainerMenuItemsText}>Scan +</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Menu: React.FC = () => {
  return (
    <>
      <View style={menuStyles.menuContainer}>
        <View style={menuStyles.menuItems}>
          <Image
            style={menuStyles.menuItemsImage}
            source={require('../../assets/illustrations/ill_daftar_tamu.png')} />
          <TouchableOpacity>
            <View style={menuStyles.menuItemsContentContainer}>
              <View style={menuStyles.menuItemsTextContainer}>
                <Text style={{
                  fontFamily: SEMI_BOLD,
                  color: PURPLE_COLOR,
                  fontSize: 12
                }}>
                  Daftar Tamu
                </Text>
                <Text style={{
                  fontFamily: REGULAR,
                  color: GREY_1_COLOR,
                  fontSize: 8
                }}>
                  Lihat Daftar Tamu
                </Text>
              </View>
              <View style={menuStyles.menuItemsButton}>
                <Image
                  style={{
                    width: 9,
                    height: 9
                  }}
                  source={require('../../assets/icons/ic_arrow.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={menuStyles.menuItems}>
          <Image
            style={menuStyles.menuItemsImage}
            source={require('../../assets/illustrations/ill_undangan.png')} />
          <TouchableOpacity>
            <View style={menuStyles.menuItemsContentContainer}>
              <View style={menuStyles.menuItemsTextContainer}>
                <Text style={{
                  fontFamily: SEMI_BOLD,
                  color: YELLOW_COLOR,
                  fontSize: 12
                }}>
                  Undangan
                </Text>
                <Text style={{
                  fontFamily: REGULAR,
                  color: GREY_1_COLOR,
                  fontSize: 8
                }}>
                  Lihat Undangan Saya
                </Text>
              </View>
              <View style={menuStyles.menuItemsButtonSecondary}>
                <Image
                  style={{
                    width: 9,
                    height: 9
                  }}
                  source={require('../../assets/icons/ic_arrow.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={menuStyles.menuItemsBottomContainer}>
        <Image
          style={{
            width: 100,
            height: 80,
          }}
          source={require('../../assets/illustrations/ill_help.png')} />
        <TouchableOpacity style={menuStyles.menuItemsBottomText}>
          <Text style={{
            color: BLUE_COLOR,
            fontFamily: MEDIUM,
            fontSize: 14,
            marginBottom: 8,
          }}>
            Panduan Penggunaan
          </Text>
          <Text style={{
            color: GREY_1_COLOR,
            fontFamily: REGULAR,
            fontSize: 8,
          }}>
            Lihat tutorial cara penggunaan aplikasi {"\n"}guestbook disini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={menuStyles.menuItemsBottomButton}>
            <Image
              style={{
                width: 9,
                height: 9
              }}
              source={require('../../assets/icons/ic_arrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

const ListVisitorCard : React.FC<{
  name : string,
  address : string
}> = ({
  name,
  address
}) => {
  return (
    <View style={visitorStyles.container}>
      <View 
        style={{
          height : 53,
          width: 7,
          borderRadius : 10,
          backgroundColor : BLUE_COLOR,
          marginRight : 11,
        }}
      />
      <View>
        <Text style={{
          fontFamily : SEMI_BOLD,
          fontSize : 18
        }}>
          {name}
        </Text>
        <Text style={{
          fontFamily : REGULAR,
          fontSize : 14
        }}>
          {address}
        </Text>
      </View>
    </View>
  )
}

const ListVisitor : React.FC = () => {
  return (
    <View style={listStyles.container}>
      <View style={listStyles.titleContainer}>
        <Text style={listStyles.titleText}>
          Tamu Hadir
        </Text>
        <TouchableOpacity>
          <Text style={listStyles.titleButton}>
            Lihat lebih banyak
          </Text>
        </TouchableOpacity>
      </View>

      {
        VISITOR.map((v, i) => (
          <ListVisitorCard
            key={v.name} 
            name={v.name}
            address={v.address}
          />
        ))
      }
    </View>
  )
}

const Home: React.FC = () => {
  const backAction = () => {
    Alert.alert("Discard changes?", "Are you sure you want to exit?", [
      {
        text: "NO",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  React.useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Dashboard />
      <Menu />
      <ListVisitor /> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF6F6"
  },
  header: {
    height: 230,
    backgroundColor: BLUE_COLOR,
    // borderBottomLeftRadius : 20,
    // borderBottomRightRadius : 20,
  },
  headerBackgroundOverlay: {
    position: "absolute",
    top: 0
  },
  headerTitle: {
    alignItems: 'center',
    marginTop: 35
  },
  headerTitleText: {
    textTransform: "uppercase",
    color: WHITE_COLOR,
    fontFamily: MEDIUM,
    fontSize: 14,
  },
  headerClient: {
    flexDirection: 'row',
    marginHorizontal: 26,
    marginVertical: 24,
    alignItems: 'center'
  },
  headerClientImg: {
    width: 62,
    height: 62,
    borderRadius: 31
  },
  headerClientText: {
    flexDirection: 'column',
    marginHorizontal: 21
  },
  headerClientTextName: {
    color: WHITE_COLOR,
    fontFamily: MEDIUM,
    fontSize: 18,
    marginBottom: 8
  },
  headerClientTextDate: {
    color: WHITE_COLOR,
    fontFamily: REGULAR,
    fontSize: 12,
  },
  dashboardContainer: {
    position: 'absolute',
    top: 166,
    width: 350,
    height: 142,
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    marginHorizontal: (windowWidth - 350) / 2,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  dashboardContainerCountVisitor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardContainerCountVisitorText: {
    fontFamily: REGULAR,
    fontSize: 12
  },
  dashboardContainerCountVisitorNumber: {
    fontFamily: SEMI_BOLD,
    fontSize: 12
  },
  dashboardContainerMenus: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  dashboardContainerMenuContainerItems: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  dashboardContainerMenuItems: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    padding: 12
  },
  dashboardContainerMenuIcons: {
    // marginTop : 12
  },
  dashboardContainerMenuItemsText: {
    marginTop: 8,
    fontFamily: REGULAR,
    fontSize: 11
  }
})

const menuStyles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 90,
    marginHorizontal: (windowWidth - 350) / 2,

  },
  menuItems: {
    flexDirection: 'column',
    width: 170,
    borderRadius: 20,
    padding: 12,
    backgroundColor: WHITE_COLOR,
  },
  menuItemsImage: {
    width: 137,
    height: 76
  },
  menuItemsContentContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  menuItemsTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuItemsButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PURPLE_COLOR,
    alignItems: 'center',
    paddingTop: 3
  },
  menuItemsButtonSecondary: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: YELLOW_COLOR,
    alignItems: 'center',
    paddingTop: 3
  },
  menuItemsBottomContainer: {
    marginVertical: 11,
    backgroundColor: WHITE_COLOR,
    marginHorizontal: (windowWidth - 350) / 2,
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuItemsBottomText: {
    flexDirection: 'column',
  },
  menuItemsBottomButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    paddingTop: 3
  },
})

const listStyles = StyleSheet.create({
  container : {
    marginHorizontal: (windowWidth - 350) / 2,
    marginVertical : 11,
  },
  titleContainer: {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center'
  },
  titleText : {
    fontFamily : SEMI_BOLD,
    fontSize: 14
  },
  titleButton : {
    fontFamily : REGULAR,
    fontSize: 10
  }
})


const visitorStyles = StyleSheet.create({
  container : {
    backgroundColor : "#fff",
    borderRadius : 10,
    padding : 11,
    marginVertical : 11,
    flexDirection: "row",
    alignItems : 'center'
  }
})
export default Home