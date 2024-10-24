import { View, Text, Image } from "react-native";
import React, { useState } from "react";

export default function AllGrant() {
  const [image, setImage] = useState([
    0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ]);

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 30,
          fontWeight: "600",
          fontSize: 18,
        }}
      >
        All Grants
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <View style={{ margin: 5 }}>
          <Image
            source={require("../../assets/cheque.jpg")}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        </View>
        {image.map((res, index) => {
          return (
            <View key={index} style={{ margin: 5 }}>
              <Image
                source={require("../../assets/expiredcheque.jpg")}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
