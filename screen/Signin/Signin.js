import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../URL/Url";

// Utility function to generate a random alphanumeric string of 10 characters
const generateUsername = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function SeedPhraseInput() {
  const { navigateTo } = useCustomNavigation();
  const route = useRoute();
  const { password } = route.params || {}; // Retrieve the password from route parameters
  const [seedPhrase, setSeedPhrase] = useState(new Array(12).fill(""));
  const username = generateUsername(); // Generate the username

  const handleInputChange = (text, index) => {
    setSeedPhrase((prevValues) =>
      prevValues.map((item, idx) => (idx === index ? text : item))
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/sign-in-seed`, {
        seedPhrase: seedPhrase.join(" "),
        password: password,
        username: username,
      });

      if (response.data) {
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        navigateTo("Chain");
      } else {
        Alert.alert(
          "Error",
          "Failed to sign in with the provided seed phrase."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while signing in.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/T3background.jpg")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
            padding: 20,
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Enter Your Seed Phrase
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingHorizontal: 30,
            marginBottom: 50,
          }}
        >
          The Seed Phrase will sign in your SovereignT³ wallet only on this
          device.
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          {seedPhrase.map((word, index) => (
            <TextInput
              key={index}
              style={{
                color: "white",
                borderWidth: 1,
                borderColor: "#ff00ff",
                borderRadius: 5,
                padding: 10,
                margin: 5,
                width: 160,
                textAlign: "center",
              }}
              onChangeText={(text) => handleInputChange(text, index)}
              value={seedPhrase[index]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#ff00ff",
            padding: 15,
            borderRadius: 50,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
