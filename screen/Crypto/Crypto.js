import { View, Text } from "react-native";
import React from "react";
import CryptoCard from "./CryptoCard";
import SparklineChart from "./CryptoChart";
import Coin from "./Coin";

export default function Crypto() {
  return (
    <View style={{ padding: "15px", fontFamily: "arial" }}>
      <CryptoCard />
      <View style={{ marginVertical: "40px" }}>
        <Coin />
      </View>
    </View>
  );
}
