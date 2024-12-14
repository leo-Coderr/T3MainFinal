import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { url } from "../../URL/Url";
import SovereignHeading from "../Import/WalletSetup/SovereignHeading";

export default function CreatePassword() {
  const route = useRoute();
  const { sovid = "" } = route.params || {};
  // const navigation = useNavigation();
  const [hvi, sethvi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { navigateTo } = useCustomNavigation();

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axios.post(`${url}/fetch-hvi`, {
        hvi: hvi,
      });
      if (res.data) {
        navigateTo("SignIn", { sovId: res.data });
      } else {
        Alert.alert("HVI is not correct");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/T3background.jpg")}
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 40 }}>
        <SovereignHeading redirectTo="WalletSetup" />

        <View style={{ alignItems: "center", margin: 30 }}>
          <Image
            source={require("../../assets/mask.png")}
            resizeMode="contain"
          />
          <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>
            T3 Wallet
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 70,
          }}
        >
          <Text style={{ color: "white" }}>
            HVI (Human Verification Identity)
          </Text>
        </View>
        <TextInput
          style={{
            color: "white",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            borderColor: "white",
            padding: 10,
            marginBottom: 40,
          }}
          onChangeText={sethvi}
          placeholder="Enter your hvi"
          placeholderTextColor="lightgray"
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#ff00ff",
            padding: 15,
            borderRadius: 50,
            alignItems: "center",
            opacity: hvi ? 1 : 0.5,
          }}
          onPress={handleSubmit}
          disabled={!hvi || isLoading}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
