import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MinusIcon, XMarkIcon } from "react-native-heroicons/outline";
import axios from "axios";
import { url } from "../../URL/Url";
import moment from "moment";
import { Link } from "@react-navigation/native";

export default function ModalDescriptionTransaction({
  modalVisible,
  setModalVisible,
  txhash,
}) {
  const [data, setdata] = useState();
  useEffect(() => {
    const init = async () => {
      const res = await axios.post(`${url}/fetchtx`, { txHash: txhash });
      setdata(res.data);
    };
    init();
  }, [txhash]);

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
              alignItems: "center",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: "100%",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text
                      style={{
                        fontWeight: "600",
                        width: 150,
                        height: 7,
                        backgroundColor: "#c3c3c3",
                        borderRadius: 30,
                        marginBottom: 20,
                        marginTop: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "600" }}>Received SOVID-USD</Text>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 40 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                      width: "100%",
                    }}
                  >
                    <Text>Status</Text>
                    <Text>Date</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                      paddingBottom: 15,
                    }}
                  >
                    <Text>Confirmed</Text>
                    <Text>
                      {data && moment(data.date).format("D MMMM, h:mm a")}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                      paddingBottom: 15,
                    }}
                  >
                    <View>
                      <Text>From</Text>
                      <Text>
                        {" "}
                        {data &&
                          data.fromWallet.slice(0, 4) +
                            "..." +
                            data.fromWallet.slice(38)}
                      </Text>
                    </View>
                    <View style={{ textAlign: "right" }}>
                      <Text>To</Text>
                      <Text>
                        {data &&
                          data.toWallet.slice(0, 4) +
                            "..." +
                            data.toWallet.slice(38)}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 15,
                      borderRadius: 10,
                      fontWeight: "600",
                      marginBottom: 20,
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    <Text>Amount</Text>
                    <Text>{data && data.amount} SOV-USD</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ff00ff",
                      alignItems: "center",
                      borderRadius: 20,
                      paddingVertical: 15,
                    }}
                    onPress={() => {
                      Linking.openURL(
                        `https://identityforge.sovereignty.one/transactions/${
                          data && data.txHash
                        }`
                      );
                    }}
                  >
                    <Text style={{ color: "#fff" }}>
                      VIEW ON Identity Forge
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
