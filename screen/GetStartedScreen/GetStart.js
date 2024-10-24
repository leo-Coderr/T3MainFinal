import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useCustomNavigation } from "../Redirect/Redirect_function";

// Get the full height of the device
const screenHeight = Dimensions.get("window").height;

export default function GetStart() {
  const { navigateTo } = useCustomNavigation();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotation, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.delay(2000),
        ])
      ).start();
    };

    startRotation();
  }, [rotation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "120deg"],
  });

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
            fontSize: 18,
            marginTop: 20,
            fontWeight: "500",
            marginBottom: 50,
          }}
        >
          SovereignT³
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
          Welcome to T³ Wallet
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
            marginBottom: 100,
          }}
        >
          Innovative DID solution. SovereignT³ is a secure wallet making the
          world of web3 accessible to all.
        </Text>
        <Animated.Image
          source={require("../../assets/maskbg.png")}
          style={{
            width: 250,
            height: 250,
            alignSelf: "center",
            borderRadius: 50,
            transform: [{ rotate: rotateInterpolation }],
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ff00ff",
            padding: 20,
            width: "100%",
            alignItems: "center",
            borderRadius: 50,
          }}
          onPress={() => navigateTo("WalletSetup")}
        >
          <Text style={{ color: "white" }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
