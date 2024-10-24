import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import Toast from "react-native-easy-toast";
import * as Clipboard from "expo-clipboard";
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DocumentDuplicateIcon } from "react-native-heroicons/solid";
import Menu from "./Menu/Menu";
import PrivateKeyModal from "./PrivateKey/PrivateKeyModal";
import ModalDescriptionTransaction from "./Addnewaccount/Modal";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import { useRoute } from "@react-navigation/native";
import { balanceFetch } from "../BalanceFetch/BalanceFetch";
import axios from "axios";

function NewHome() {
  const toastRef = useRef(null);
  const route = useRoute();
  const { currency } = route.params;
  const [accountno, setaccountno] = useState(1);
  const [price_change, setprice_change] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [privatemodalVisible, setprivateModalVisible] = useState(false);
  const [wallet, setwallet] = useState("0x123...789");
  const [seedPhrase, setseedPhrase] = useState();
  const [privateKey, setprivateKey] = useState();
  const [balance, setBalance] = useState();

  const showCopiedToast = (content) => {
    Clipboard.setString(content);
    toastRef.current.show("Successfully copied");
  };

  useEffect(() => {
    const fetchDataFromStorage = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log("User data retrieved:", userData);
          setseedPhrase(userData.seedPhrase);

          if (userData[currency] && userData[currency].length > 0) {
            const selectedWallet = userData[currency][accountno - 1].wallet;
            const selectedPrivateKey =
              userData[currency][accountno - 1].privateKey;
            setwallet(selectedWallet);
            setprivateKey(selectedPrivateKey);
            const data = await balanceFetch(currency, selectedWallet);
            setBalance(data);
          }
        } else {
          console.log("No user data found in storage.");
        }
      } catch (error) {
        console.error("Error fetching data from storage:", error);
      }
    };

    fetchDataFromStorage();
  }, [currency, accountno]); // Ensure dependencies are correct
  useEffect(() => {
    const fetchPriceChange = async () => {
      try {
        if (currency === "SOLANA") {
          const data = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
          );
          setprice_change(data.data.solana.usd);
        } else if (currency === "ETH") {
          const data = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
          );
          setprice_change(data.data.ethereum.usd);
        } else if (currency === "SOID") {
          setprice_change(0.15);
        }
      } catch (error) {
        console.error("Error fetching price change:", error);
      }
    };

    fetchPriceChange();
  }, [currency]);

  return (
    <ImageBackground
      source={require("../../assets/T3background.jpg")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingVertical: 4,
                gap: 7,
                textAlign: "center",
                justifyContent: "center",
                marginBottom: 5,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  ...(currency === "SOID" && {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: 15,
                    borderRadius: 50,
                  }),
                }}
              >
                <Image
                  source={
                    currency == "ETH"
                      ? require("../../assets/ETH.png")
                      : currency == "SOLANA"
                      ? require("../../assets/Solana.png")
                      : currency == "SOID" && require("../../assets/mask.png")
                  }
                  style={{ width: 50, height: 50 }}
                  resizeMode="cover"
                  resizeMethod="scale"
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 26,
                  textAlign: "center",
                }}
              >
                {balance
                  ? currency == "SOID"
                    ? Number(balance / 1e6).toFixed(2)
                    : Number(balance).toFixed(2)
                  : "0.00"}
                &nbsp;
                {currency}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 30,
                }}
              >
                $&nbsp;
                {balance
                  ? currency == "SOID"
                    ? Number(balance / 1e6).toFixed(2) * 0.15
                    : Number(balance).toFixed(2) *
                      Number(price_change).toFixed(2)
                  : "0.00"}
              </Text>
            </View>
            <View
              style={{
                borderColor: "#fff",
                borderWidth: 1,
                borderRadius: 10,
                padding: 20,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 30,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Image
                    source={require("../../assets/profile.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={{ color: "white" }}>Account {accountno}</Text>
                </View>
                <ChevronDownIcon
                  color="white"
                  size={16}
                  onPress={() => setModalVisible(true)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Text style={{ color: "white" }}>Address:</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: 10,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      gap: 7,
                    }}
                    onPress={() => showCopiedToast(wallet)}
                  >
                    <Text style={{ color: "white" }}>
                      {wallet && wallet.slice(0, 6) + "..." + wallet.slice(-4)}
                    </Text>
                    <DocumentDuplicateIcon color="green" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Menu
              wallet={wallet}
              addressIndex={accountno}
              currency={currency}
              privateKey={privateKey}
            />
          </View>
          <Text style={{ color: "white" }}>
            <ModalDescriptionTransaction
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              accountno={accountno}
              setaccountno={setaccountno}
              setwallet={setwallet}
              balance={balance}
              currency={currency}
            />
            <PrivateKeyModal
              privatemodalVisible={privatemodalVisible}
              setprivateModalVisible={setprivateModalVisible}
              wallet={wallet}
            />
          </Text>
          <View></View>

          <BottomNavbar />
        </View>
        <Toast
          ref={toastRef}
          position="center"
          style={{ backgroundColor: "green" }}
        />
      </View>
    </ImageBackground>
  );
}

export default NewHome;
