import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../URL/Url";

export default function ModalDescriptionTransaction({
  modalVisible,
  setModalVisible,
}) {
  const [data, setData] = useState([]);
  const [newacc, setnewacc] = useState([]);

  const handleAccount = async () => {
    try {
      const sovId = await AsyncStorage.getItem("sovId");
      const seedPhrase = await axios.post(`${url}/findseedPhrase`, {
        sovId: sovId,
      });
      console.log("seed", seedPhrase.data);
      const res = await axios.post(`${url}/createWallet`, {
        seedPhrase: seedPhrase.data,
        sovId: sovId,
      });
      setnewacc(res.data);
    } catch (error) {
      console.error("Error generating account", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const sovId = await AsyncStorage.getItem("sovId");
        const res = await axios.post(`${url}/findWalletAddress`, {
          sovId: sovId,
        });
        setData(res.data);
      } catch (error) {}
    };
    init();
  }, [newacc]);

  return (
    <>
      <View style={{}}>
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
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 10,
                margin: 20,
                width: 300,
                padding: 20,
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 600, marginBottom: 30 }}
                  >
                    Transaction
                  </Text>
                  <Text>Progress...</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
