import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation, useNavigationState } from "@react-navigation/native";

export default function AboutSovereignAi() {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const currentRoute = state.routes[state.index].name;

  const navigateToValidator = (value) => {
    navigation.navigate(value);
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "white",
        minHeight: "100%",
      }}
    >
      <TouchableOpacity
        style={{ marginBottom: 40 }}
        onPress={() => navigateToValidator("SovereignAi")}
      >
        <XMarkIcon size={24} color="black" />
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Image
          source={require("../../../assets/mask.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 10 }}>
          Sovereign-AI
        </Text>
      </View>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: "600" }}>Custom Instructions</Text>
      </View>
      <View style={{ marginBottom: 15 }}>
        <Text>
          What would you like Sovereign-AI to know about you to provide better
          responses?
        </Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text>How would you like Sovereign-AI to respond?</Text>
      </View>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: "600" }}>Model Info</Text>
      </View>
      <View style={{ marginBottom: 15 }}>
        <Text>Our fastest model, great for most everyday tasks.</Text>
      </View>
    </View>
  );
}
