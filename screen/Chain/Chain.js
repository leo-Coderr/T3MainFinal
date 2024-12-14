import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import * as Clipboard from "expo-clipboard";
import {
  ArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-easy-toast";
import { balanceFetch } from "../BalanceFetch/BalanceFetch";
import { DocumentDuplicateIcon } from "react-native-heroicons/solid";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import axios from "axios";

export default function Chain() {
  const { navigateTo } = useCustomNavigation();
  const toastRef = useRef(null);
  const [sovId, setsovId] = useState();
  const [eth_price, seteth_price] = useState();
  const [btc_price, setbtc_price] = useState();
  const [sol_price, setsol_price] = useState();
  const [soid_price, setsoid_price] = useState();
  const [hide, sethide] = useState(false);

  const [btc_balance, setBtcBalance] = useState(0);
  const [eth_balance, setEthBalance] = useState(0);
  const [sol_balance, setSolBalance] = useState(0);
  const [soid_balance, setSoidBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      let userData = JSON.parse(userDataString);

      if (userData) {
        const btcWallets = userData.BTC;
        const ethWallets = userData.ETH;
        const solWallets = userData.SOLANA;
        const soidWallets = userData.SOID;

        // Fetch balances for each chain
        if (btcWallets) {
          const btcTotal = await balanceFetch(
            "BTC",
            btcWallets.map((wallet) => wallet.wallet)
          );
          setBtcBalance(btcTotal);
        }

        if (ethWallets) {
          const ethTotal = await balanceFetch(
            "ETH",
            ethWallets.map((wallet) => wallet.wallet)
          );
          setEthBalance(ethTotal);
        }

        if (solWallets) {
          const solTotal = await balanceFetch(
            "SOLANA",
            solWallets.map((wallet) => wallet.wallet)
          );
          setSolBalance(solTotal);
        }

        if (soidWallets) {
          const soidTotal = await balanceFetch(
            "SOID",
            soidWallets.map((wallet) => wallet.wallet)
          );
          setSoidBalance(soidTotal);
        }

        // Update SOV-ID
        if (userData.sovId) {
          setsovId(userData.sovId);
        }
      }
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      // Retrieve the userData from AsyncStorage
      const userDataString = await AsyncStorage.getItem("userData");
      let userData = JSON.parse(userDataString);
      if (userData.sovId) {
        setsovId(userData.sovId);
      }
      if (userDataString) {
        const url = `https://explorer-restapi.sovereignty.one/identity/identity/id/${userData.SOID[0].wallet}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const sovId = data.id.did;

        userData.sovId = sovId;

        const updatedUserDataString = JSON.stringify(userData);

        await AsyncStorage.setItem("userData", updatedUserDataString);
        setsovId(sovId);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const btc_data = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
        );

        setbtc_price(btc_data.data.bitcoin.usd);
        const eth_data = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );

        seteth_price(eth_data.data.ethereum.usd);

        // Fetch Solana price
        const sol_data = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
        );

        setsol_price(sol_data.data.solana.usd);
      } catch (error) {
        console.error("Error fetching prices: ", error);
      }
    };
    init();
  }, []);

  const showCopiedToast = (content) => {
    Clipboard.setString(content);
    toastRef.current.show("Successfully copied");
  };

  const toggleHide = () => {
    sethide(!hide);
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
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 16,
                paddingHorizontal: 20,
                marginTop: 40,
                marginBottom: 30,
                paddingVertical: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  borderBottomColor: "rgba(255, 255, 255, 0.2)",
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",

                    fontSize: 14,
                  }}
                >
                  SOV-ID :
                </Text>
                <TouchableOpacity
                  onPress={() => showCopiedToast(sovId)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {sovId && sovId.slice(0, 15) + "...." + sovId.slice(46)}
                  </Text>
                  <DocumentDuplicateIcon color="#ff00ff" size={20} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  alignContent: "center",
                  //  marginBottom: 50,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      marginTop: 10,
                      fontSize: 22,
                      lineHeight: 30,
                      flexDirection: "row",
                      fontWeight: 600,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {hide
                      ? `$ ${Number(
                          (soid_balance / 1e6) * 0.025 +
                            btc_balance * btc_price +
                            sol_balance * sol_price +
                            eth_balance * eth_price
                        ).toFixed(4)}`
                      : "*********"}
                  </Text>
                </View>
                <View>
                  <Text>
                    <TouchableOpacity onPress={toggleHide}>
                      {hide ? (
                        <Text style={{ marginTop: 11 }}>
                          <EyeIcon color="lightgray" />
                        </Text>
                      ) : (
                        <Text style={{ marginTop: 0 }}>
                          <EyeSlashIcon color="lightgray" />
                        </Text>
                      )}
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: "lightgray",

                    fontSize: 12,
                    flexDirection: "row",
                    fontWeight: 600,
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {hide
                    ? `${Number(
                        ((soid_balance / 1e6) * 0.025 +
                          btc_balance * btc_price +
                          sol_balance * sol_price +
                          eth_balance * eth_price) /
                          0.025
                      ).toFixed(2)} SOID`
                    : ""}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ color: "white", marginVertical: 20 }}>Crypto</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigateTo("Home", { currency: "SOID" })}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 20,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      padding: 10,
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={require("../../assets/mask.png")}
                      style={{ width: 25, height: 25 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>SOID</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Text style={{ color: "white" }}>$ 0.025</Text>
                      <Text style={{ color: "lightgreen" }}>
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.5%
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={{ color: "white", textAlign: "right" }}>
                    {hide && soid_balance
                      ? Number(soid_balance / 1e6).toFixed(2)
                      : "***"}
                  </Text>
                  <Text style={{ color: "darkgray", textAlign: "right" }}>
                    {hide
                      ? `$ ${Number((soid_balance / 1e6) * 0.025).toFixed(2)}`
                      : "*****"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo("Home", { currency: "BTC" })}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 20,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View>
                    <Image
                      source={require("../../assets/Btc.png")}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>BTC</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Text style={{ color: "white" }}>
                        $ {btc_price || "Loading..."}
                      </Text>
                      <Text style={{ color: "lightgreen" }}>
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.3%
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ color: "white", textAlign: "right" }}>
                    {hide ? btc_balance && btc_balance.toFixed(2) : "***"}
                  </Text>
                  <Text style={{ color: "darkgray", textAlign: "right" }}>
                    {hide
                      ? `$ ${Number(btc_balance * btc_price).toFixed(2)}`
                      : "*****"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo("Home", { currency: "ETH" })}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 20,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View>
                    <Image
                      source={require("../../assets/ETH.png")}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>ETH</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Text style={{ color: "white" }}>
                        $ {eth_price || "Loading..."}
                      </Text>
                      <Text style={{ color: "lightgreen" }}>
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.1%
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ color: "white", textAlign: "right" }}>
                    {hide ? eth_balance && eth_balance.toFixed(2) : "***"}
                  </Text>
                  <Text style={{ color: "darkgray", textAlign: "right" }}>
                    {hide
                      ? `$ ${Number(eth_balance * eth_price).toFixed(2)}`
                      : "*****"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo("Home", { currency: "SOLANA" })}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View>
                    <Image
                      source={require("../../assets/Solana.png")}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>SOLANA</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Text style={{ color: "white" }}>
                        $ {sol_price || "Loading..."}
                      </Text>
                      <Text style={{ color: "lightgreen" }}>
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.2%
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ color: "white", textAlign: "right" }}>
                    {hide ? sol_balance && sol_balance.toFixed(2) : "***"}
                  </Text>
                  <Text style={{ color: "darkgray", textAlign: "right" }}>
                    {hide
                      ? `$ ${Number(sol_balance * sol_price).toFixed(2)}`
                      : "*****"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNavbar />
        <Toast
          ref={toastRef}
          position="center"
          style={{ backgroundColor: "green" }}
        />
      </View>
    </ImageBackground>
  );
}
