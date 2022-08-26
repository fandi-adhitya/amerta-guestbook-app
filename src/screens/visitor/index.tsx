import { useNavigation } from "@react-navigation/native";
import { Tab, TabView } from "@rneui/themed";
import React from "react";
import { ActivityIndicator, BackHandler, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useSWR from "swr";
import Empty from "../../components/empty";
import { BLUE_COLOR, WHITE_COLOR } from "../../constants/color";
import { MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fonts";
import { VisitorType } from "../../typings/VisitorType";
import { VISITOR } from "../../constants/urls";
const windowWidth = Dimensions.get('window').width;

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

  
const Visitor: React.FC = () => {
  const navigate = useNavigation()
  const [indexPage, setIndexPage] = React.useState(0)

  let queryParams = {
    "type": indexPage
  }

  const { data, error } = useSWR<VisitorType>([VISITOR, queryParams])

  const goToHome = () => {
    navigate.navigate("Home" as never, {} as never)
  }

  const backAction = () => {
    if (!navigate.isFocused()) {
      return false
    }

    navigate.navigate("Home" as never, {} as never)
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);

  return (
    <>
      <View style={headerStyles.container}>
        <View style={headerStyles.backgroundOverlay}>
          <Image source={require('../../assets/additionals/overlay-white.png')} />
        </View>
        <View style={headerStyles.titleContainer}>
          <TouchableOpacity
            onPress={goToHome}
            style={headerStyles.backButton}>
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
            DAFTAR TAMU
          </Text>
          <View />
        </View>
        <View style={{
          marginVertical: 50
        }}>
          <Tab
            containerStyle={{
              backgroundColor: 'transparent',
              width: "100%",
              justifyContent: 'space-between',
            }}
            value={indexPage}
            onChange={(e) => setIndexPage(e)}
            indicatorStyle={{
              backgroundColor: 'white',
              height: 4,
            }}
            variant="primary"
          >
            <Tab.Item
              title="Hadir"
              containerStyle={(active) => ({
                backgroundColor: active ? "transparent" : undefined,
              })}
              buttonStyle={{
                padding: 0,
              }}
              titleStyle={{ fontSize: 12, fontFamily: MEDIUM, marginBottom: 10 }}
            />
            <Tab.Item
              containerStyle={(active) => ({
                backgroundColor: active ? "transparent" : undefined,
              })}
              buttonStyle={{
                padding: 0,
              }}
              title="Tidak Hadir"
              titleStyle={{ fontSize: 12, fontFamily: MEDIUM, marginBottom: 10 }}
            />
            <Tab.Item
              containerStyle={(active) => ({
                backgroundColor: active ? "transparent" : undefined,
              })}
              buttonStyle={{
                padding: 0,
              }}
              title="Semua"
              titleStyle={{ fontSize: 12, fontFamily: MEDIUM, marginBottom: 10 }}
            />
          </Tab>

        </View>
      </View>


      <TabView value={indexPage} onChange={setIndexPage} animationType="spring" >
        <TabView.Item style={{ width: '100%' }}>
          {!data && !error ? (
            <View style={{ marginTop: 80 }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : data?.data.length == 0 ? (
            <Empty />
          ) : (
            <ScrollView>
              <View style={listStyles.container}>
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
            </ScrollView>
          )}
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          {!data && !error ? (
            <View style={{ marginTop: 80 }}>
              <ActivityIndicator size={"large"} />
            </View>) : data?.data.length == 0 ? (
              <Empty />
            ) : (
            <ScrollView>
              <View style={listStyles.container}>
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
            </ScrollView>
          )}
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          {!data && !error ? (
            <View style={{ marginTop: 80 }}>
              <ActivityIndicator size={"large"} />
            </View>) : data?.data.length == 0 ? (
              <Empty />
            ) : (
            <ScrollView>
              <View style={listStyles.container}>
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
            </ScrollView>
          )}
        </TabView.Item>
      </TabView>
    </>
  )
}

const headerStyles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: BLUE_COLOR,
    paddingTop: 60,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40

  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: WHITE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
export default Visitor