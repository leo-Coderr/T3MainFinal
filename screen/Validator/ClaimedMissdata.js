import { View, Text } from "react-native";
import React from "react";

export default function ClaimedMissdata() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "gray" }}>Claimed</Text>
          <Text style={{ fontWeight: "600" }}>7.00</Text>
        </View>
        <View></View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "gray" }}>UnClaimed</Text>
          <Text style={{ fontWeight: "600" }}>33.00</Text>
        </View>
      </View>
    </View>
  );
}
