import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Token({ balance }) {
  return (
    <View>
      <View>
        <Text style={{ color: "white", fontSize: 18 }}>Balance</Text>
      </View>
      <View>
        <Text style={{ color: "white", fontSize: 32, marginVertical: 16 }}>
          {" "}
          {balance ? Number(balance).toFixed(2) : "0.00"}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/mask.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              objectFit: "cover",
            }}
          />
          <View>
            <Text style={{ color: "white", fontWeight: "600" }}>SOID</Text>
            <Text style={{ color: "white", fontSize: 12 }}>
              {balance ? Number(balance).toFixed(2) : "0.00"} SOID
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: "white" }}>
            $ {balance ? (Number(balance) * 0.15).toFixed(2) : "0.00"}
          </Text>
        </View>
      </View>
    </View>
  );
}
