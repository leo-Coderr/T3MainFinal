import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { balanceFetch } from "../BalanceFetch/BalanceFetch";
import axios from "axios";
import { url } from "../../URL/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import FingerprintScanner from "react-native-fingerprint-scanner";
import PasswordModal from "./PasswordModal";

const SOIDSendComponent = () => {
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [verified, setverified] = useState(false);

  const navigateToValidator = (value) => {
    navigation.navigate(value);
  };

  const route = useRoute();
  const {
    fromwallet = "",
    towallet = "",
    fromAccNo = "",
    toAccNo = "",
    currency = "",
    privateKey = "",
    password = "",
  } = route.params || {};

  useEffect(() => {
    const balancefetch = async () => {
      const res = await balanceFetch(currency, fromwallet);
      setBalance(res);
    };
    balancefetch();
  }, []);

  // const authenticateUser = async () => {
  //   try {
  //     await FingerprintScanner.authenticate({
  //       description: "Authenticate to proceed",
  //     });
  //     return true;
  //   } catch (error) {
  //     console.error("Fingerprint authentication failed:", error);
  //     setModalVisible(true);
  //     return false;
  //   }
  // };

  const handlePasswordSubmit = (enteredPassword) => {
    if (enteredPassword === password) {
      setverified(true);
      setModalVisible(false);
      handleTokenTransfer();
    } else {
      Alert.alert(
        "Authentication Failed",
        "Incorrect password. Please try again."
      );
    }
  };

  const handleTokenTransfer = async () => {
    // const isAuthenticated = await authenticateUser();
    if (verified) return;

    try {
      setIsLoading(true);
      let res;
      if (currency == "SOLANA") {
        res = await axios.post(`${url}/send-sol`, {
          recipientPublicKey: towallet,
          amount: amount,
          senderPrivateKey: privateKey,
        });
      } else if (currency == "ETH") {
        res = await axios.post(`${url}/send-eth`, {
          walletB: towallet,
          amount: amount,
          privateKeyA: privateKey,
        });
      } else if (currency == "SOID") {
        res = await axios.post(`${url}/sendTokens`, {
          senderAddress: fromwallet,
          amount: amount,
          recipientAddress: towallet,
          privateKey: privateKey,
        });
      } else if (currency == "BTC") {
        res = await axios.post(`${url}/send-bitcoin`, {
          fromAddress: fromwallet,
          amountSatoshis: amount,
          toAddress: towallet,
          privateKeyWIF: privateKey,
        });
      }
      if (res.data || res.data.signature || res.success) {
        let transactionHash;
        if (currency == "SOLANA") {
          transactionHash = res.data.signature;
        } else if (currency == "SOID") {
          transactionHash = res.data.result.transactionHash;
        }
        const txTime = new Date().toISOString();
        const transaction = {
          chain: currency,
          time: txTime,
          amount: currency == "SOID" ? amount * 1e6 : amount,
          txhash: transactionHash,
        };

        const existingData = await AsyncStorage.getItem("userData");
        let localStorageData = existingData ? JSON.parse(existingData) : {};

        if (!localStorageData.Transaction) {
          localStorageData.Transaction = [];
        }

        localStorageData.Transaction.push(transaction);

        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(localStorageData)
        );

        navigateToValidator("Transaction");
      } else {
        console.error("Transaction failed", res.data);
      }
    } catch (error) {
      console.error(
        "Error occurred during token transfer",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/T3background.jpg")}
        style={{ flex: 1 }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            borderRadius: 10,
            padding: 20,
            margin: 10,
            paddingTop: 70,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              paddingBottom: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              From : Account {fromAccNo}
            </Text>
            <Text
              style={{
                color: "lightgray",
                fontSize: 14,
              }}
            >
              {fromwallet}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              paddingBottom: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              To : Account {toAccNo}
            </Text>
            <Text
              style={{
                color: "lightgray",
                fontSize: 14,
              }}
            >
              {towallet}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              Asset:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                paddingBottom: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {currency}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "lightgray",
                }}
              >
                Balance: {currency === "SOID" ? balance / 1e6 : balance}{" "}
                {currency}
              </Text>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              Amount:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                fontSize: 16,
                marginBottom: 5,
                color: "white",
              }}
              onChangeText={setAmount}
              value={amount}
              keyboardType="numeric"
              placeholder={`enter amt of ${currency.toLowerCase()}`}
              placeholderTextColor="gray"
            />
            {amount > (currency === "SOID" ? balance / 1e6 : balance) ? (
              <Text style={{ color: "red" }}>
                You don't have enough balance...
              </Text>
            ) : (
              ""
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#ff00ff",
                  borderRadius: 5,
                  padding: 10,
                  width: "45%",
                }}
                onPress={() => navigateToValidator("Chain")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ff00ff",
                  borderRadius: 5,
                  padding: 10,
                  width: "45%",
                  opacity:
                    amount > (currency === "SOID" ? balance / 1e6 : balance) ||
                    !amount ||
                    amount == 0
                      ? 0.5
                      : 1,
                }}
                onPress={
                  amount > (currency === "SOID" ? balance / 1e6 : balance) ||
                  !amount ||
                  amount == 0
                    ? () => {}
                    : handleTokenTransfer
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}

      <PasswordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default SOIDSendComponent;
