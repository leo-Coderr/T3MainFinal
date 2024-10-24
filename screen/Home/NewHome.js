import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { chatGPTRequest } from "../Identity/Chatbot/OpenAI";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import * as Icons from "react-native-heroicons/outline";
import Tab from "./Tab/Tab";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatComponent = () => {
  const navigation = useNavigation();
  const navigateToValidator = (value) => {
    navigation.navigate(value);
  };

  return (
    <ImageBackground
      source={require("../../assets/bg3.webp")}
      style={styles.background}
    >
      <View style={{ backgroundColor: "#2f2f2f63", height: "100vh" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  flex: "1",
                  flexDirection: "row",
                  width: "160px",
                  marginTop: "3rem",
                  gap: "2px",
                  marginBottom: "2rem",
                  borderRadius: "5px",
                  backgroundColor: "#1a1a1aba",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                <Text style={{ color: "white" }}>0x3sdf...wef3d </Text>
                <Text>
                  <Icons.DocumentDuplicateIcon color="white" size={18} />
                </Text>
              </View>
            </View>
            <View
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                alignItems: "center",
              }}
            >
              0 ETH
            </View>
            <View style={{ alignItems: "center", marginBottom: "2rem" }}>
              $ 0.00 USD
            </View>
            <View
              style={{
                width: "2rem",
                height: "2rem",
                paddingBottom: "2rem",
                borderRadius: "50%",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "inline-flex",
                  width: "2rem",
                  height: "2rem",
                }}
                onPress={() => "Send"}
              >
                <FontAwesome name="send" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ marginTop: "0.5rem", color: "white" }}>Send</Text>
            </View>
            <View
              style={{
                marginTop: "10rem",
                height: "100%",
                backgroundColor: "white",
              }}
            >
              <Tab />
            </View>
          </View>
          <BottomNavbar />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100vw",
    height: "100vh",
    color: "white",
    fontFamily: "Arial",
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    height: 50,
    objectFit: "cover",
  },
});

export default ChatComponent;
