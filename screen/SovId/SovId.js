import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BottomNavbar from "../Navbar/BottomNavbar/BottomNavbar";
import { useCustomNavigation } from "../Redirect/Redirect_function";

export default function SovId() {
  const { navigateTo } = useCustomNavigation();
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Image
            source={require("../../assets/sovid.jpg")}
            style={{
              width: 300,
              height: 200,
              resizeMode: "contain",
              borderRadius: 25,
            }}
          />
        </View>
        <View>
          <View
            style={{
              backgroundColor: "#48F300",
              borderRadius: 20,
              padding: 20,
              color: "white",
              height: 100,
              fontWeight: "600",
              boxShadow: "0px 0px 10px lightgray",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
              Digital Dollars
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#FAFAFA",
              borderRadius: 20,
              padding: 20,
              height: 100,
              fontWeight: "600",
              boxShadow: "0px 0px 10px lightgray",
              fontSize: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              console.log("saur");
              navigateTo("Crypto");
            }}
          >
            <Text style={{ color: "black", fontWeight: "600", fontSize: 20 }}>
              Crypto
            </Text>
          </TouchableOpacity>

          <ImageBackground
            source={require("../../assets/sovid.jpg")}
            style={{ height: 150, width: "100%", resizeMode: "contain" }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.95)",
                borderRadius: 20,
                padding: 20,
                height: 200,
                fontWeight: "600",
                boxShadow: "0px 0px 10px lightgray",
                fontSize: 20,
                marginTop: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 20 }}
                >
                  Sovereign
                </Text>
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 20 }}
                >
                  $1,741
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../../assets/mask.png")}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    marginRight: 10,
                  }}
                />
                <Text style={{ color: "gray", fontSize: 14 }}>0</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <BottomNavbar />
    </View>
  );
}
