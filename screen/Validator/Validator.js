import { View, Text, ScrollView } from "react-native";
import React from "react";
import Value from "./Value";
import ClaimedMissdata from "./ClaimedMissdata";
import AllGrant from "./AllGrant";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";

export default function Validator() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <Value />
          <View style={{ marginVertical: 25 }}>
            <ClaimedMissdata />
          </View>
          <View style={{ marginVertical: 25 }}>
            <AllGrant />
          </View>
        </View>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}
