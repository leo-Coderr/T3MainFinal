import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import SovereignHeading from "./SovereignHeading";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useCustomNavigation } from "../../Redirect/Redirect_function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../../URL/Url";

export default function SecretRecoveryPhrase() {
  const { navigateTo } = useCustomNavigation();

  const [sovid, setSovid] = useState(""); // State for SOVID
  const [password, setPassword] = useState(""); // State for Password

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/signIn`, {
        sovId: sovid, // sending sovId
        password: password, // sending password
      });

      if (response.data === "true") {
        Alert.alert("Success", "You are signed in!");
        // Optionally, navigate to another screen if sign in is successful
        navigateTo("SomeOtherScreen"); // Adjust based on your actual navigation
      } else {
        Alert.alert("Error", "Invalid SOVID or password");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during sign-in");
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <SovereignHeading redirectTo="WalletSetup" />
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "600",
                padding: 20,
                color: "white",
              }}
            >
              Sign In
            </Text>
          </View>

          {/* Properly render the image */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              source={require("../../../assets/maskbg.png")}
              style={{
                width: 150,
                height: 150,
                marginBottom: 30,
              }}
            />
          </View>

          {/* SOVID Input Field */}
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ff00ff",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 15,
                color: "white",
              }}
              placeholder="Enter SOVID"
              placeholderTextColor="#d3d3d3"
              value={sovid}
              onChangeText={(text) => setSovid(text)}
            />
          </View>

          {/* Password Input Field */}
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ff00ff",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 15,
                color: "white",
              }}
              placeholder="Enter Password"
              placeholderTextColor="#d3d3d3"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ff00ff",
              padding: 15,
              borderRadius: 50,
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
