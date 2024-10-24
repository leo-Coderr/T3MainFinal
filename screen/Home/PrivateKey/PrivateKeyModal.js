import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../URL/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalDescriptionTransaction({
  privatemodalVisible,
  setprivateModalVisible,
  wallet,
}) {
  const [password, setPassword] = useState("");
  const [checkpassword, setcheckpassword] = useState(false);
  const [privateKey, setprivateKey] = useState();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [timer, setTimer] = useState(null);

  const handlePassword = async () => {
    try {
      const sovId = await AsyncStorage.getItem("sovId");
      const res = await axios.post(`${url}/password`, {
        password: password,
        sovId: sovId,
      });
      if (res.data) {
        const data = await axios.post(`${url}/findPrivateKey`, {
          wallet: wallet,
        });
        setprivateKey(data.data);
        setcheckpassword(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={privatemodalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setprivateModalVisible(!privatemodalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            // backgroundColor: "rgba(30, 30, 30, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              alignItems: "center",
              elevation: 5,
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setcheckpassword(false);
                  setprivateModalVisible(false);
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    width: 150,
                    height: 7,
                    backgroundColor: "gray",
                    borderRadius: 30,
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                ></Text>
              </TouchableOpacity>
              {checkpassword ? (
                <>
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Private Key
                    </Text>

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: 600,
                        padding: 30,
                      }}
                    >
                      {privateKey}
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          marginVertical: 20,
                          backgroundColor: "#ff00ff",
                          paddingHorizontal: 30,
                          paddingVertical: 8,
                          borderRadius: 5,
                          color: "white",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "white" }}>Copy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{ color: "white", textAlign: "left", marginTop: 20 }}
                  >
                    Please input password to show Private Key :{" "}
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "lightgray",
                      width: 200,
                      height: 40,
                      paddingHorizontal: 10,
                      marginTop: 20,
                      borderRadius: 5,
                      color: "white",
                    }}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder="Password"
                    value={password}
                  />
                  <View>
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ff00ff",
                        paddingHorizontal: 30,
                        paddingVertical: 8,
                        borderRadius: 5,
                        color: "white",
                      }}
                      onPress={() => handlePassword()}
                    >
                      <Text style={{ color: "white" }}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
