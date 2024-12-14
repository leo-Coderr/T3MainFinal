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
import BottomNavbar from "../../Navbar/BottomNavbar/BottomNavbar";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useCustomNavigation } from "../../Redirect/Redirect_function";

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
      source={require("../../../assets/T3background.jpg")}
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

            <TouchableOpacity onPress={() => navigateToValidator("SeedPhrase")}>
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
                    SeedPhrase
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="gray" />
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
