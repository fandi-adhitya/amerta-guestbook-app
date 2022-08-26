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
  Alert,
  TextInput,
  ActivityIndicator
} from "react-native";
import { BLUE_COLOR, GREY_1_COLOR, GREY_COLOR, PURPLE_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../../constants/color";
import { BOLD, MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fonts";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomSheet, Button, Dialog, ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr";
import { VisitorType } from "../../typings/VisitorType";
import { VISITOR, VISITOR_CREATE, VISITOR_MANUAL } from "../../constants/urls";
import Toast from "react-native-toast-message";
import apiInstance from "../../constants/api";

const Header: React.FC = () => {
  const navigate = useNavigation()

  const [name, setName] = React.useState('')


  const getName = async () => {
    try {
      const data = await AsyncStorage.getItem("name")

      if (data) {
        setName(data)
      }

    } catch (e) {

    }
  }

  const handleLogout = async () => {
    await AsyncStorage.clear()
    navigate.navigate("Authentication" as never, {} as never)
  }

  React.useEffect(() => {
    getName()
  }, [])

  return (
    <View style={styles.header}>
      <View style={styles.headerBackgroundOverlay}>
        <Image source={require('../../assets/additionals/overlay-white.png')} />
      </View>
      <View style={styles.headerTitle}>
        <View style={{ width: 25 }}><Text></Text></View>
        <Text style={styles.headerTitleText}> the weeding of </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: WHITE_COLOR,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image
            style={{
              width: 15,
              height: 15
            }}
            source={require('../../assets/icons/ic_power.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerClient}>
        <View>
          <Image
            style={styles.headerClientImg}
            source={require('../../assets/additionals/default.png')} />
        </View>
        <View style={styles.headerClientText}>
          <Text style={styles.headerClientTextName}>
            {name}
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

  const [isVisibleMasterData, setIsVisibleMasterData] = React.useState(false)
  const [isVisibleVisitor, setIsVisibleVisitor] = React.useState(false)
  const [isVisibleManualVisitor, setIsVisibleManualVisitor] = React.useState(false)
  const [isOpenDialogSuccess, setIsOpenDialogSuccess] = React.useState(false)


  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState("")

  const [visitorName, setVisitorName] = React.useState("")
  const [visitorAddress, setVisitorAddress] = React.useState("")

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async () => {

    if (!name && !address) {
      Toast.show({
        type: "error",
        text1: "Nama & alamat tidak boleh kosong",
        position: "top"
      })

      return false;
    }

    setIsSubmitting(true)

    let values = {
      "nama": name,
      "alamat": address
    }

    try {
      const { data } = await apiInstance.post<VisitorType>(VISITOR_CREATE, values)

      if (data) {
        setIsSubmitting(false)
        setIsVisibleVisitor(false)
        setIsVisibleMasterData(false)
        setIsOpenDialogSuccess(true)
      }

    } catch (e: any) {
      setIsSubmitting(false)
      setIsVisibleVisitor(false)
      setIsVisibleMasterData(false)

      Toast.show({
        type: "error",
        text1: e.data.message,
        position: "top"
      })
    }
  }


  const handleManualSubmit = async () => {
    if (!visitorName && !visitorAddress) {
      Toast.show({
        type: "error",
        text1: "Nama & alamat tidak boleh kosong",
        position: "top"
      })

      return false;
    }

    setIsSubmitting(true)

    let values = {
      "nama": visitorName,
      "alamat": visitorAddress
    }

    try {
      const { data } = await apiInstance.post(VISITOR_MANUAL, values)

      if (data) {
        setIsSubmitting(false)
        setIsVisibleManualVisitor(false)
        setIsOpenDialogSuccess(true)
      }

    } catch (e: any) {
      setIsSubmitting(false)
      setIsVisibleManualVisitor(false)

      Toast.show({
        type: "error",
        text1: e.data.message,
        position: "top"
      })
    }
  }

  const goToVisitor = () => {
    setIsVisibleMasterData(!isVisibleMasterData)
    navigation.navigate('Visitor' as never, {} as never)
  }

  return (
    <>
      <Toast />
      <Dialog
        overlayStyle={{
          backgroundColor: '#EFF0F5',
          borderRadius: 20,
        }}
        isVisible={isOpenDialogSuccess}
        onBackdropPress={() => { setIsOpenDialogSuccess(!isOpenDialogSuccess) }}
      >
        <Text style={{
          fontFamily: BOLD,
          textAlign: 'center',
          fontSize: 14
        }}>
          Sukses
        </Text>

        <Text style={{
          fontFamily: REGULAR,
          textAlign: 'center',
          fontSize: 10,
          marginVertical: 16
        }}>
          Tamu berhasil ditambah
        </Text>
        <View
          style={{
            marginBottom: 16,
            borderBottomColor: GREY_COLOR,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TouchableOpacity onPress={() => { setIsOpenDialogSuccess(!isOpenDialogSuccess) }}>
          <Text style={{
            textAlign: 'center',
            fontFamily: REGULAR,
            fontSize: 12,
            color: BLUE_COLOR,
          }}>
            Tutup
          </Text>
        </TouchableOpacity>
      </Dialog>

      {/* Master Data Bottom Sheet */}
      <BottomSheet
        onBackdropPress={() => {
          setIsVisibleMasterData(!isVisibleMasterData)
        }}
        modalProps={{}}
        isVisible={isVisibleMasterData}>
        <View style={bottomSheetStyles.container}>
          <View style={bottomSheetStyles.header}>
            <Text style={{
              fontFamily: MEDIUM,
              color: GREY_COLOR
            }}>Master Data</Text>
            <TouchableOpacity onPress={() => { setIsVisibleMasterData(!isVisibleMasterData) }}>
              <Image
                style={{
                  width: 18,
                  height: 10,
                }}
                source={require('../../assets/icons/ic_close.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 16,
              borderBottomColor: GREY_COLOR,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <TouchableOpacity style={bottomSheetStyles.content} onPress={goToVisitor}>
            <View style={bottomSheetStyles.contentIconContainer}>
              <Image
                style={{
                  width: 10,
                  height: 10,
                }}
                source={require('../../assets/icons/ic_list.png')}
              />
            </View>
            <Text style={bottomSheetStyles.contentText}>
              Lihat List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={bottomSheetStyles.content} onPress={() => {
            setIsVisibleMasterData(!isVisibleMasterData)
            setIsVisibleVisitor(!isVisibleVisitor)
          }}>
            <View style={bottomSheetStyles.contentIconContainer}>
              <Image
                style={{
                  width: 16,
                  height: 16,
                }}
                source={require('../../assets/icons/ic_add_user.png')}
              />
            </View>
            <Text style={bottomSheetStyles.contentText}>
              Tambah Data
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Master Visitor Bottom Sheet */}
      <BottomSheet
        onBackdropPress={() => {
          setIsVisibleVisitor(!isVisibleVisitor)
        }}
        modalProps={{}}
        isVisible={isVisibleVisitor}>
        <View style={bottomSheetStyles.container}>
          <View style={bottomSheetStyles.header}>
            <Text style={{
              fontFamily: MEDIUM,
              color: GREY_COLOR
            }}>Tambah Tamu</Text>
            <TouchableOpacity onPress={() => {
              setIsVisibleMasterData(!isVisibleMasterData)
              setIsVisibleVisitor(!isVisibleVisitor)
            }}>
              <Image
                style={{
                  width: 18,
                  height: 10,
                }}
                source={require('../../assets/icons/ic_close.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 16,
              borderBottomColor: GREY_COLOR,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={formStyles.formInputContainer}>
            <Text style={formStyles.formLabel}>
              Nama tamu
            </Text>
            <TextInput
              onChangeText={(e) => { setName(e) }}
              style={formStyles.formInput}
            />
            <Text style={formStyles.formLabel}>
              Alamat
            </Text>
            <TextInput
              onChangeText={(e) => { setAddress(e) }}
              style={formStyles.formInput}
            />
            {/* <TouchableOpacity
                style={formStyles.formButton}
                onPress={() => {
                  setIsVisibleVisitor(false)
                  setIsVisibleMasterData(false)
                  setIsOpenDialogSuccess(!isOpenDialogSuccess)
                }}
              > */}

            <TouchableOpacity
              style={formStyles.formButton}
              onPress={handleSubmit}
            >
              <Text style={formStyles.formButtonText}>
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      {/* Manual Visitor Bottom Sheet */}
      <BottomSheet
        onBackdropPress={() => {
          setIsVisibleManualVisitor(!isVisibleManualVisitor)
        }}
        modalProps={{}}
        isVisible={isVisibleManualVisitor}>
        <View style={bottomSheetStyles.container}>
          <View style={bottomSheetStyles.header}>
            <Text style={{
              fontFamily: MEDIUM,
              color: GREY_COLOR
            }}>Input Manual</Text>
            <TouchableOpacity disabled={isSubmitting} onPress={() => {
              setIsVisibleManualVisitor(!isVisibleManualVisitor)
            }}>
              <Image
                style={{
                  width: 18,
                  height: 10,
                }}
                source={require('../../assets/icons/ic_close.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 16,
              borderBottomColor: GREY_COLOR,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={formStyles.formInputContainer}>
            <Text style={formStyles.formLabel}>
              Nama tamu
            </Text>
            <TextInput
              editable={!isSubmitting}
              onChangeText={(e) => { setVisitorName(e) }}
              style={formStyles.formInput}
            />
            <Text style={formStyles.formLabel}>
              Alamat
            </Text>
            <TextInput
              editable={!isSubmitting}
              onChangeText={(e) => { setVisitorAddress(e) }}
              style={formStyles.formInput}
            />

            <TouchableOpacity
              style={formStyles.formButton}
              onPress={handleManualSubmit}
            >
              <Text style={formStyles.formButtonText}>
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

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
            marginVertical: 20,
            borderBottomColor: GREY_1_COLOR,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.dashboardContainerMenus}>
          <TouchableOpacity style={styles.dashboardContainerMenuContainerItems} onPress={() => { setIsVisibleMasterData(!isVisibleMasterData) }}>
            <View
              style={styles.dashboardContainerMenuItems}
            >
              <Image
                style={{
                  width: 25,
                  height: 20
                }}
                source={require('../../assets/icons/ic_master.png')} />
            </View>
            <Text style={styles.dashboardContainerMenuItemsText}>Master Data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dashboardContainerMenuContainerItems} onPress={() => setIsVisibleManualVisitor(!isVisibleManualVisitor)}>
            <View
              style={styles.dashboardContainerMenuItems}
            >
              <Image
                style={{
                  width: 25,
                  height: 20
                }}
                source={require('../../assets/icons/ic_manual.png')} />
            </View>
            <Text style={styles.dashboardContainerMenuItemsText}>Manual</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dashboardContainerMenuContainerItems} onPress={goToScan}>
            <View
              style={styles.dashboardContainerMenuItems}
            >
              <Image
                style={{
                  width: 20,
                  height: 20
                }}
                source={require('../../assets/icons/ic_scan.png')} />
            </View>
            <Text style={styles.dashboardContainerMenuItemsText}>Scan +</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}


const Menu: React.FC = () => {

  const navigation = useNavigation()

  const goToVisitor = () => {
    navigation.navigate('Visitor' as never, {} as never)
  }

  return (
    <>
      <View style={menuStyles.menuContainer}>
        <View style={menuStyles.menuItems}>
          <Image
            style={menuStyles.menuItemsImage}
            source={require('../../assets/illustrations/ill_daftar_tamu.png')} />
          <TouchableOpacity onPress={goToVisitor}>
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
                  fontSize: 9
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
          <TouchableOpacity onPress={goToVisitor}>
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
                  fontSize: 9
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
            fontSize: 9,
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

const ListVisitorCard: React.FC<{
  name: string,
  address: string
}> = ({
  name,
  address
}) => {
    return (
      <View style={visitorStyles.container}>
        <View
          style={{
            height: 53,
            width: 7,
            borderRadius: 10,
            backgroundColor: BLUE_COLOR,
            marginRight: 11,
          }}
        />
        <View>
          <Text style={{
            fontFamily: SEMI_BOLD,
            fontSize: 18
          }}>
            {name}
          </Text>
          <Text style={{
            fontFamily: REGULAR,
            fontSize: 14
          }}>
            {address}
          </Text>
        </View>
      </View>
    )
  }

const ListVisitor: React.FC = () => {
  const navigation = useNavigation()

  const queryParams = {
    "type": 1,
    "limit": 3
  }

  const { data, error } = useSWR<VisitorType>([VISITOR, queryParams])

  const goToVisitor = () => {
    navigation.navigate('Visitor' as never, {} as never)
  }

  if (!data && !error) {
    return <ActivityIndicator size={"large"} />
  }

  return (
    <View style={listStyles.container}>
      <View style={listStyles.titleContainer}>
        <Text style={listStyles.titleText}>
          Tamu Hadir
        </Text>
        <TouchableOpacity onPress={goToVisitor}>
          <Text style={listStyles.titleButton}>
            Lihat lebih banyak
          </Text>
        </TouchableOpacity>
      </View>

      {
        data?.data.map((v, i) => (
          <ListVisitorCard
            key={i}
            name={v.nama}
            address={v.alamat}
          />
        ))
      }
    </View>
  )
}

const Home: React.FC = () => {
  const navigation = useNavigation()

  const backAction = () => {
    if (!navigation.isFocused()) {
      return false
    }
    Alert.alert("", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Keluar", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
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
    marginHorizontal: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingRight: 10,
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
    marginHorizontal: 21,
    paddingRight: 20
  },
  headerClientTextName: {
    color: WHITE_COLOR,
    fontFamily: MEDIUM,
    fontSize: 18,
    marginBottom: 8,
    // marginRight: 10,
  },
  headerClientTextDate: {
    color: WHITE_COLOR,
    fontFamily: REGULAR,
    fontSize: 12,
  },
  dashboardContainer: {
    position: 'absolute',
    top: 166,
    width: windowWidth - 40,
    height: 170,
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    marginHorizontal: 20,
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
    justifyContent: 'center'
  },
  dashboardContainerMenuIcons: {
    width: 20,
    height: 20,
  },
  dashboardContainerMenuItemsText: {
    marginTop: 8,
    fontFamily: MEDIUM,
    fontSize: 11
  }
})

const menuStyles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 125,
    marginHorizontal: 20,
  },
  menuItems: {
    flexDirection: 'column',
    width: (windowWidth / 2) - 30,
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
    marginVertical: 16,
    backgroundColor: WHITE_COLOR,
    marginHorizontal: 20,
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
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const listStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 11,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: SEMI_BOLD,
    fontSize: 14
  },
  titleButton: {
    fontFamily: REGULAR,
    fontSize: 10
  }
})

const visitorStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 11,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: 'center'
  }
})

const bottomSheetStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  contentIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BLUE_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentText: {
    fontFamily: MEDIUM,
    fontSize: 14,
    marginLeft: 10,
  }
})

const formStyles = StyleSheet.create({
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
    paddingHorizontal: 10
  },
  formLabel: {
    fontFamily: MEDIUM,
    color: GREY_1_COLOR,
    fontSize: 14,
    marginBottom: 2
  },
  formInput: {
    height: 40,
    backgroundColor: "#EEEEEE",
    padding: 10,
    borderRadius: 15,
    marginBottom: 24,
  },
  formButton: {
    backgroundColor: BLUE_COLOR,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center'
    // paddingVertical: 8
  },
  formButtonText: {
    textAlign: "center",
    fontSize: 14,
    color: WHITE_COLOR,
    fontFamily: SEMI_BOLD,
  },
  formHelpText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: REGULAR,
    color: GREY_1_COLOR,
  }
})
export default Home