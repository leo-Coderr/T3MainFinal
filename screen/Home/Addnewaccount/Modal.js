import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "../../../URL/Url";

export default function ModalDescriptionTransaction({
  modalVisible,
  setModalVisible,
  accountno,
  setaccountno,
  setwallet,
  currency,
}) {
  const [data, setData] = useState([]);

  const handleAccount = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      let userData;
      if (userDataString) {
        userData = JSON.parse(userDataString);
      }
      console.log("userData", userData);

      let res = await axios.post(`${url}/createWallet/seeds`, {
        seedPhrase: userData.seedPhrase,
        chain: currency,
        addressIndex: userData[currency].length,
      });

      // console.log("res", res.data);

      // Update the local storage with the new account data
      const newAccount = {
        Sno: userData[currency].length + 1,
        privateKey: res.data.privateKey,
        wallet: res.data.wallet,
      };

      // Add the new account to the appropriate chain
      userData[currency].push(newAccount);

      // Save the updated userData back to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      // Update the local state to reflect the changes
      setData(userData[currency]);
    } catch (error) {
      console.error("Error generating account", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Fetch user data from AsyncStorage
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          // Set the data for the current currency
          setData(userData[currency] || []);
        }
      } catch (error) {
        console.log("Error fetching accounts from storage:", error);
      }
    };
    init();
  }, [currency]); // Re-run when currency changes

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                // elevation: 5,
                width: "100%",
              }}
            >
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "600",
                            width: 150,
                            height: 7,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            opacity: 20,
                            borderRadius: 30,
                            marginBottom: 20,
                            marginTop: 10,
                          }}
                        ></Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ fontWeight: "600" }}>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 18,
                          color: "white",
                        }}
                      >
                        Accounts
                      </Text>
                    </View>
                  </View>
                </View>
                <ScrollView style={{ maxHeight: 300 }}>
                  {data &&
                    data.map((res, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 40,
                            fontSize: 20,
                            width: 300,
                          }}
                          onPress={() => {
                            setaccountno(index + 1);
                            setwallet(res.wallet);
                            setModalVisible(false);
                          }}
                          key={index}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              width: 300,
                              gap: 20,
                            }}
                          >
                            <View>
                              <Image
                                source={require("../../../assets/profile.png")}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 50,
                                  objectFit: "cover",
                                }}
                              />
                            </View>
                            <View>
                              <Text style={{ color: "white" }}>
                                Account {index + 1}
                              </Text>
                              <Text style={{ color: "white" }}>
                                {res.wallet &&
                                  res.wallet.slice(0, 4) +
                                    "..." +
                                    res.wallet.slice(-4)}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
                <View style={{ padding: 20 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ff00ff",
                      alignItems: "center",
                      paddingVertical: 15,
                      marginVertical: 30,
                      borderRadius: 20,
                    }}
                    onPress={() => handleAccount()}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>
                      Add New Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
