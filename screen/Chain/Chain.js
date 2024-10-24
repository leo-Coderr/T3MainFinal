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
import { DocumentDuplicateIcon } from "react-native-heroicons/solid";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import axios from "axios";

export default function Chain() {
  const { navigateTo } = useCustomNavigation();
  const toastRef = useRef(null);
  const [sovId, setsovId] = useState();
  const [eth_price, seteth_price] = useState();
  const [sol_price, setsol_price] = useState();
  const [soid_price, setsoid_price] = useState();
  const [hide, sethide] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        // Retrieve the userData from AsyncStorage
        const userDataString = await AsyncStorage.getItem("userData");

        if (userDataString) {
          const userData = JSON.parse(userDataString);

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
            <Text
              style={{
                color: "lightgray",
                marginTop: 30,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Home
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "lightgray",

                  fontSize: 18,
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
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text style={{ color: "white" }}>
                  {sovId && sovId.slice(0, 20) + "...."}
                </Text>
                <DocumentDuplicateIcon color="green" size={20} />
              </TouchableOpacity>
            </View>
            {/* <View
            style={{
              flexDirection: "row",
              marginBottom: 40,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "lightgray",
                marginTop: 10,
                fontSize: 22,
                flexDirection: "row",
                fontWeight: 600,
                alignItems: "center",
                gap: 10,
              }}
            >
              $0.00
            </Text>
            {hide ? (
              <EyeSlashIcon color="gray" onPress={() => sethide(!hide)} />
            ) : (
              <EyeIcon color="gray" onPress={() => sethide(!hide)} />
            )}
          </View> */}
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
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View
                    style={{
                      backgroundColor: "rgba(0,0,0,0.3)",
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
                      <Text style={{ color: "white" }}>$ 0.15</Text>
                      <Text style={{ color: "lightgreen" }}>
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.0%
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  {/* <Text style={{ color: "white" }}>0.00</Text>
                <Text style={{ color: "white" }}>$ 0.00</Text> */}
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
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.0%
                      </Text>
                    </View>
                  </View>
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
                        <ArrowUpIcon color="lightgreen" size={12} /> + 0.0%
                      </Text>
                    </View>
                  </View>
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
