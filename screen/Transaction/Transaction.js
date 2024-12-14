import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  Linking,
} from "react-native";
import moment from "moment";
import Toast from "react-native-easy-toast";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDownCircleIcon,
  DocumentDuplicateIcon,
} from "react-native-heroicons/outline";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import ModalDescriptionTransaction from "./ModalDescriptionTransaction";
import axios from "axios";
import { url } from "../../URL/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Transaction() {
  const toastRef = useRef(null);
  const [transaction, setTransaction] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [txhash, settxhash] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const transactions = parsedData.Transaction || [];
          const reversedTransactions = transactions.reverse();
          setTransaction(reversedTransactions);
        }
      } catch (error) {
        console.error("Error fetching transactions from local storage:", error);
      }
    };
    init();
  }, []);

  const showCopiedToast = (content) => {
    Clipboard.setString(content);
    toastRef.current.show("Successfully copied");
  };

  return (
    <ImageBackground
      source={require("../../assets/T3background.jpg")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <View>
              <View style={{ padding: 10, fontSize: 14 }}>
                {/* --------heading----------- */}
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 40,
                    marginTop: 30,
                  }}
                >
                  <View style={{ textAlign: "center", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Transactions
                    </Text>
                  </View>
                </View>

                {/* ------------transaction-data-------- */}
                {transaction.map((res, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        const url =
                          res.chain == "SOID"
                            ? `https://identityforge.sovereignty.one/transactions/${res.txhash}`
                            : res.chain == "SOLANA"
                            ? `https://explorer.solana.com/tx/${res.txhash}?ref=hub.despread.io&cluster=devnet`
                            : res.chain == "ETH"
                            ? `https://sepolia.etherscan.io/tx/${res.txhash}`
                            : res.chain == "BTC" &&
                              `https://www.blockchain.com/explorer/transactions/btc/${res.txhash}`;
                        if (url) {
                          Linking.openURL(url);
                        }
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          marginBottom: 35,
                          borderBottom: "3px solid gray",
                        }}
                      >
                        <View>
                          <View
                            style={{
                              fontSize: 12,
                              marginBottom: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "white" }}>
                              {moment(res.time).format("D MMMM, h:mm a")}
                            </Text>
                            <Text style={{ color: "white" }}>
                              TxHash :&nbsp;
                              {res.txhash &&
                                res.txhash.slice(0, 4) +
                                  "..." +
                                  res.txhash.slice(
                                    res.chain == "SOLANA"
                                      ? 85
                                      : res.chain == "SOID"
                                      ? 60
                                      : 65
                                  )}
                              &nbsp;
                              <DocumentDuplicateIcon
                                color="gray"
                                size={16}
                                onPress={() => showCopiedToast(res.txhash)}
                              />
                            </Text>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                              }}
                            >
                              <View>
                                <ArrowDownCircleIcon
                                  size={40}
                                  color="#ff00ff"
                                />
                              </View>
                              <View>
                                <View style={{ marginBottom: 5 }}>
                                  <Text style={{ color: "white" }}>
                                    {" "}
                                    Sent {res.chain}
                                  </Text>
                                </View>
                                <View style={{ color: "green" }}>
                                  <Text style={{ color: "white" }}>
                                    Confirmed
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={{ textAlign: "left" }}>
                              <View>
                                <Text style={{ color: "white" }}>
                                  {res.chain == "SOID"
                                    ? Number(res.amount) / 1e6
                                    : res.amount}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                {transaction.length > 0 ? (
                  ""
                ) : (
                  <View style={{ marginVertical: 100 }}>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      No data to show...
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View>
            <Text style={{ color: "white" }}>
              <Toast
                ref={toastRef}
                position="center"
                style={{ backgroundColor: "green" }}
              />
            </Text>
          </View>
        </ScrollView>
        <BottomNavbar />
        <ModalDescriptionTransaction
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          txhash={txhash}
        />
      </View>
    </ImageBackground>
  );
}
