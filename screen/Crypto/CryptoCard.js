import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";

export default function CryptoCard() {
  return (
    <View style={{ borderRadius: "20px", overflow: "hidden" }}>
      <ImageBackground
        source={require("../../assets/line.jpg")}
        style={{
          height: "200px ",
          width: "100%",
          resizeMode: "contain",
          marginTop: "30px",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(1,1,1)",
            borderRadius: "20px",
            padding: "20px",
            color: "black",
            height: "200px",
            fontWeight: "600",
            boxShadow: "0px 0px 10px lightgray",
            fontSize: "20px",
            // marginTop: "30px",
          }}
        >
          <View
            style={{
              fontSize: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              gap: "10px",
            }}
          >
            Crypto
            <Text>Invest in Bitcoin and Ethereum</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
