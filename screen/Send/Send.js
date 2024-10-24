import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import { useRoute } from "@react-navigation/native";

const ChatComponent = () => {
  const route = useRoute();
  const {
    wallet = "",
    addressIndex = "",
    currency = "",
    privateKey = "",
  } = route.params || {};

  const [data, setData] = useState([]);
  const [password, setpassword] = useState();

  const { navigateTo } = useCustomNavigation();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setpassword(userData.password);
          const accounts = userData[currency] || [];
          setData(accounts);
        }
      } catch (error) {
        console.error("e5", error);
      }
    };

    loadAccounts();
  }, [currency]);

  return (
    <ImageBackground
      source={require("../../assets/T3background.jpg")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <View
          style={{
            height: "100vh",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              padding: 20,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 50,
                }}
              >
                <Text style={{ color: "white", width: 10 }}></Text>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  Send to
                </Text>
                <TouchableOpacity onPress={() => navigateTo("Home")}>
                  <Text
                    style={{ color: "white", fontSize: 16, color: "white" }}
                  ></Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 5,
                  padding: 15,
                  marginBottom: 20,
                  color: "white",
                }}
                placeholder="Enter public address (0x) or ENS name"
                placeholderTextColor="gray"
              />
              {data.length > 0 && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "white",
                  }}
                >
                  Your accounts
                </Text>
              )}

              {data &&
                data
                  .filter((res) => res.wallet !== wallet)
                  .map((res, index) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                        onPress={() =>
                          navigateTo("SendAmount", {
                            fromwallet: wallet,
                            towallet: res.wallet,
                            fromAccNo: addressIndex,
                            toAccNo: res.Sno,
                            currency: currency,
                            privateKey: privateKey,
                            password: password,
                          })
                        }
                        key={index}
                      >
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: "orange",
                            marginRight: 10,
                          }}
                        ></View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          Account {res.Sno}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "white",
                            marginLeft: "auto",
                          }}
                        >
                          {res.wallet &&
                            res.wallet.slice(0, 4) +
                              "..." +
                              res.wallet.slice(-4)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ChatComponent;
