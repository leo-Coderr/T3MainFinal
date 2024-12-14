import React, { useState, useEffect } from "react";
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
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(""); // To store username error message

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

  // Function to check if username exists (case-insensitive)
  const checkUsernameExists = async (username) => {
    try {
      const lowercaseUsername = username.toLowerCase(); // Convert to lowercase before checking
      const response = await axios.get(
        `https://explorer-restapi.sovereignty.one/identity/identity/id/${lowercaseUsername}`
      );

      if (
        response.data &&
        response.data.id &&
        response.data.id.username === lowercaseUsername
      ) {
        setUsernameError("Username already exists");
      } else {
        setUsernameError(""); // No error if username is available
      }
    } catch (error) {
      setUsernameError(""); // Handle case when username is not found
    }
  };

  useEffect(() => {
    if (username.length > 0) {
      // Debounce logic or delay before checking username
      const timeoutId = setTimeout(() => {
        checkUsernameExists(username);
      }, 500);

      // Clear previous timeout if username changes quickly
      return () => clearTimeout(timeoutId);
    } else {
      setUsernameError(""); // Reset error if username is cleared
    }
  }, [username]);

  const handleCreatePassword = async () => {
    if (!isChecked) {
      setErrorMessage("You must agree to the terms before proceeding.");
      return;
    }

    if (validatePassword() && !usernameError) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${url}/create-wallet`, {
          password: password,
          username: username.toLowerCase(), // Send lowercase username to the server
        });
        if (response.data) {
          await AsyncStorage.setItem("userData", JSON.stringify(response.data));
          navigateTo("Gmail");
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 40 }}>
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
            The password will unlock your SovereignT³ wallet only on this
            device.
          </Text>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>Username</Text>
          </View>
          <TextInput
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            onChangeText={setUsername}
            value={username}
            placeholder="username"
            placeholderTextColor="lightgray"
          />
          {usernameError ? (
            <Text style={{ color: "red", textAlign: "center" }}>
              {usernameError}
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
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
              borderColor: "white",
              borderRadius: 5,
              padding: 10,
              marginBottom: 20,
            }}
            secureTextEntry={!passwordShow}
            onChangeText={setPassword}
            placeholder="New Password"
            placeholderTextColor="lightgray"
          />
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "white" }}>Confirm Password</Text>
          </View>
          <TextInput
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 5,
              padding: 10,
              marginBottom: 40,
            }}
            secureTextEntry={!passwordShow}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="lightgray"
          />
          {errorMessage !== "" && (
            <Text
              style={{ color: "red", textAlign: "center", marginBottom: 20 }}
            >
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
              <Switch
                value={isChecked}
                onValueChange={setIsChecked}
                style={{ width: 35 }}
                trackColor={{ false: "#767577", true: "#ff00ff" }}
                thumbColor={isChecked ? "#ff00ff" : "#f4f3f4"}
              />
              <Text style={{ color: "white", marginLeft: 10 }}>
                I understand that SovereignT³ cannot recover this password for
                me.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#ff00ff",
              padding: 15,
              borderRadius: 50,
              alignItems: "center",
              opacity: !username || usernameError || !password ? 0.5 : 1,
            }}
            onPress={handleCreatePassword}
            disabled={!password || usernameError || isLoading}
          >
            <Text style={{ color: "white" }}>Create Password</Text>
          </TouchableOpacity>
        </View>
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
