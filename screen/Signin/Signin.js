import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
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
  const [isLoading, setisLoading] = useState(false);
  const { password, sovId } = route.params || {}; // Retrieve the password from route parameters
  const [seedPhrase, setSeedPhrase] = useState(new Array(12).fill(""));
  const [warningMessage, setWarningMessage] = useState(""); // State for the warning message
  const username = generateUsername(); // Generate the username

  const handleInputChange = (text, index) => {
    setSeedPhrase((prevValues) =>
      prevValues.map((item, idx) => (idx === index ? text : item))
    );
    setWarningMessage(""); // Clear the warning message when user types
  };

  const handleSubmit = async () => {
    // Check if all seed phrase fields are filled
    const isAllFieldsFilled = seedPhrase.every((word) => word.trim() !== "");
    if (!isAllFieldsFilled) {
      setWarningMessage("Please fill in all seed phrase fields."); // Set warning message
      return; // Do not proceed with submit
    }

    try {
      setisLoading(true);
      const response = await axios.post(`${url}/sign-in-seed`, {
        seedPhrase: seedPhrase.join(" "),
        password: password,
        username: username,
      });

      if (response.data) {
        const userData = {
          ...response.data,
          sovId: sovId,
        };

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
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
    <>
      <ImageBackground
        source={require("../../assets/T3background.jpg")}
        style={{
          flex: 1,
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      color: "white",
                      borderWidth: 1,
                      borderColor: "#ff00ff",
                      borderRadius: 5,
                      margin: 5,
                    }}
                  >
                    <Text style={{ color: "white", paddingLeft: 5 }}>
                      {index + 1}
                    </Text>
                    <TextInput
                      key={index}
                      style={{ padding: 10, width: 150 }}
                      onChangeText={(text) => handleInputChange(text, index)}
                      value={seedPhrase[index]}
                    />
                  </View>
                </>
              ))}
            </View>

            {warningMessage ? (
              <Text style={styles.warningText}>{warningMessage}</Text>
            ) : null}

            <TouchableOpacity
              style={{
                backgroundColor: "#ff00ff",
                padding: 15,
                borderRadius: 50,
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={handleSubmit}
              disabled={isLoading} // Disable submit when loading
            >
              <Text style={{ color: "white", fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </>
  );
}

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
  warningText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
