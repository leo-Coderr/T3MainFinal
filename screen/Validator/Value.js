import { View, Text } from "react-native";
import React from "react";

export default function AllGrant() {
  return (
    <View>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <View
          style={{
            width: 220,
            height: 220,
            borderRadius: 110,
            borderWidth: 7,
            borderColor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "lightgray",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{ fontSize: 28, fontWeight: "600", textAlign: "center" }}
          >
            87.00
            {"\n"}
            <Text style={{ fontSize: 16 }}>Total Reward</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
