import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import React from "react";
import { useCustomNavigation } from "../../Redirect/Redirect_function";

export default function WalletSetup() {
  const { navigateTo } = useCustomNavigation();
  return (
    <ImageBackground
      source={require("../../../assets/T3background.jpg")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ color: "white", flex: 1 }}>
        <View style={{ color: "white", padding: 20 }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              marginTop: 20,
              fontWeight: "500",
              marginBottom: 50,
            }}
          >
            SOVEREIGN-T3
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              textAlign: "center",
              marginBottom: 20,
              fontWeight: "600",
            }}
          >
            Wallet setup
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 100,
            }}
          >
            Import an existing wallet or create a new one
          </Text>
        </View>
        <View
          style={{
            color: "white",
            position: "absolute",
            bottom: 50,
            width: "100%",
            padding: 20,
          }}
        >
          <TouchableOpacity
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "#ff00ff",
              padding: 15,
              width: "100%",
              borderRadius: 50,
              marginBottom: 15,
            }}
            onPress={() => navigateTo("HviLogin")}
          >
            <Text
              style={{
                color: "white",
                color: "#ff00ff",
                textAlign: "center",

                fontSize: 14,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "#ff00ff",
              padding: 15,
              width: "100%",
              borderRadius: 50,
              backgroundColor: "#ff00ff",
            }}
            onPress={() => navigateTo("Ocr")}
          >
            <Text
              style={{
                color: "white",
                color: "white",
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Create a new wallet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
