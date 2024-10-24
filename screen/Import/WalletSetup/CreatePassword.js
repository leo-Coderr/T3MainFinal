import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useCustomNavigation } from "../../Redirect/Redirect_function";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SovereignHeading from "./SovereignHeading";
import axios from "axios";
import { url } from "../../../URL/Url";

export default function CreatePassword() {
  const route = useRoute();
  const { sovid = "" } = route.params || {};
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { navigateTo } = useCustomNavigation();

  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow);
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return false;
    }

    if (!password.match(/[A-Z]/)) {
      setErrorMessage("Password must have at least one uppercase letter");
      return false;
    }

    if (!password.match(/[0-9]/)) {
      setErrorMessage("Password must have at least one numerical value");
      return false;
    }

    if (!password.match(/[^a-zA-Z0-9]/)) {
      setErrorMessage("Password must have at least one special character");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const generateSovid = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleCreatePassword = async () => {
    if (validatePassword() && isChecked) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${url}/create-wallet`, {
          password: password,
          username: generateSovid(),
        });
        if (response.data) {
          await AsyncStorage.setItem("userData", JSON.stringify(response.data));
          navigateTo("Chain");
        }
      } catch (error) {
        setErrorMessage(error.message || "Failed to create wallet");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/T3background.jpg")}
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 40 }}>
        <SovereignHeading redirectTo="WalletSetup" />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 25,
            fontWeight: "600",
            marginBottom: 40,
          }}
        >
          Create password
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingHorizontal: 30,
            marginBottom: 40,
          }}
        >
          The password will unlock your SovereignT³ wallet only on this device.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>New Password</Text>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={{ color: "white" }}>
              {passwordShow ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            color: "white",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 40,
          }}
          secureTextEntry={!passwordShow}
          onChangeText={setPassword}
          placeholder="New Password"
          placeholderTextColor="gray"
        />
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "white" }}>Confirm Password</Text>
        </View>
        <TextInput
          style={{
            color: "white",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 40,
          }}
          secureTextEntry={!passwordShow}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
        />
        {errorMessage !== "" && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 20 }}>
            {errorMessage}
          </Text>
        )}

        <View
          style={{
            borderRadius: 10,
            marginBottom: 20,
            padding: 10,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch value={isChecked} onValueChange={setIsChecked} />
            <Text style={{ color: "white", marginLeft: 10 }}>
              I understand that SovereignT³ cannot recover this password for me.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#ff00ff",
            padding: 15,
            borderRadius: 50,
            alignItems: "center",
            opacity: password ? 1 : 0.5,
          }}
          onPress={handleCreatePassword}
          disabled={!password || isLoading}
        >
          <Text style={{ color: "white" }}>Create Password</Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </ImageBackground>
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
});
