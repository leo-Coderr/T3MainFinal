import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FingerprintScanner from "react-native-fingerprint-scanner";

function Login({ navigation }) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(() => {
        FingerprintScanner.authenticate({
          description: "Please authenticate in order to use T3 WAllet",
        })
          .then(() => {
            navigation.navigate("Chain");
          })
          .catch((error) => {
            console.error("Fingerprint authentication failed:", error);
          });
      })
      .catch((error) => {
        console.error("Fingerprint sensor not available:", error);
      });

    return () => {
      FingerprintScanner.release();
    };
  }, []);

  const login = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const storedPassword = userData.password;

        if (password === storedPassword) {
          navigation.navigate("Chain");
        } else {
          Alert.alert("Error", "Incorrect password. Please try again.");
        }
      } else {
        Alert.alert("Error", "No user data found.");
      }
    } catch (error) {
      console.error("Error accessing local storage:", error);
      Alert.alert("Error", "An error occurred while accessing local storage.");
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
      <View
        style={{
          flex: 1,
          padding: 20,
          color: "white",
        }}
      >
        <View style={{ marginTop: 70, alignItems: "center" }}>
          <Image
            source={require("../../assets/mask.png")}
            style={{ width: 75, height: 75 }}
          />
        </View>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
              marginTop: 40,
              marginBottom: 100,
              textTransform: "capitalize",
            }}
          >
            welcome to t3 wallet
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, color: "#fff" }}>Password</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 10,
              fontSize: 20,
              borderRadius: 5,
              marginTop: 10,
              color: "#fff",
            }}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            marginTop: 70,
            borderRadius: 30,
            marginBottom: 50,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            onPress={login}
            style={{
              backgroundColor: "#ff00ff",
              padding: 15,
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              UNLOCK
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{ textAlign: "center", marginVertical: 20, color: "#fff" }}
          >
            Wallet won't unlock? You can ERASE your current wallet and setup a
            new one.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Login;
