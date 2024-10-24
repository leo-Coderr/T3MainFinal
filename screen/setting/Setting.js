import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  Linking,
} from "react-native";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useCustomNavigation } from "../Redirect/Redirect_function";

const ChatComponent = () => {
  const { navigateTo } = useCustomNavigation();
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const currentRoute = state.routes[state.index].name;
  const navigateToValidator = (value) => {
    navigation.navigate(value);
  };

  const openAboutSovereign = () => {
    Linking.openURL("https://sovereigntlabs.com/about-us/");
  };

  const openContactSupport = () => {
    Linking.openURL("https://sovereigntlabs.com/contacts/");
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
          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 30,
                marginTop: 30,
              }}
            >
              Setting
            </Text>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>General</Text>
                  <Text style={{ color: "white", maxWidth: 300 }}>
                    Currency conversion, primary currency, language, and search
                    engine
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => navigateToValidator("Validator")}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Validator
                  </Text>
                  <Text style={{ color: "white", maxWidth: 300 }}></Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Security & Privacy
                  </Text>
                  <Text style={{ color: "white", maxWidth: 300 }}>
                    Privacy settings, MetaMetrics, private key, and wallet
                    Secret Recovery Phrase
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>Advanced</Text>
                  <Text style={{ color: "white", maxWidth: 300 }}>
                    Access developer features, reset account, setup testnets,
                    state logs, IPFS gateway, and custom RPC
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>Contacts</Text>
                  <Text style={{ color: "white", maxWidth: 300 }}>
                    Add, edit, remove, and manage your accounts
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>Networks</Text>
                  <Text style={{ color: "white", maxWidth: 300 }}>
                    Add and edit custom RPC networks
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openAboutSovereign}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  About Sovereign
                </Text>
                <ChevronRightIcon size={16} color="gray" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Request a feature
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openContactSupport}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Contact support
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("Login")}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{ color: "white", color: "#ff00ff", fontSize: 18 }}
                >
                  Lock
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomNavbar />
      </View>
    </ImageBackground>
  );
};

export default ChatComponent;
