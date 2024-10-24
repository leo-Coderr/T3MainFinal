import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import Token from "./Token";
import s from "../../Styling/Styling";
import Nft from "./Nft";

export default function TabViewExample({ balance }) {
  const [index, setIndex] = React.useState(0);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <View style={styles.tabButton}>
          <TouchableOpacity onPress={() => setIndex(0)}>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "white" }}>
              Token
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity
            onPress={() => setIndex(1)}
            style={styles.tabButton}
          >
            <Text>Nft</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {index == 0 ? (
        <View>
          <Token balance={balance} />
        </View>
      ) : (
        <View>
          <Nft />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    // borderBottomWidth: 1,
    // borderColor: "#ff00ff",
    // borderStyle: "solid",
    padding: 10,
    borderRadius: 5,
  },
  tabBar: {
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 4, // Add elevation for shadow effect in Android
      },
    }),
  },
  labelStyle: {
    color: "black",
  },
  indicatorStyle: {
    backgroundColor: "#ff00ff",
  },
});
