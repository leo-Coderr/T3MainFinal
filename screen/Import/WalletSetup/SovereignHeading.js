import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useCustomNavigation } from "../../Redirect/Redirect_function";

export default function SovereignHeading({ redirectTo }) {
  const { navigateTo } = useCustomNavigation();
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <TouchableOpacity onPress={() => navigateTo(redirectTo)}>
          <ArrowLeftIcon color="#ff00ff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "white" }}>SovereignT³</Text>
        <Text></Text>
      </View>
    </View>
  );
}
