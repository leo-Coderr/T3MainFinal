import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import SovereignHeading from "../Import/WalletSetup/SovereignHeading";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../URL/Url";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function VerifySecretRecoveryPhrase() {
  const { navigateTo } = useCustomNavigation();
  const route = useRoute();
  const {
    wallet_addr = "",
    trimArray = [],
    password = "",
    addressIndex = "",
    privKey = "",
  } = route.params || {};

  console.log("priv2", privKey);
  const [seedphrasevalue, setSeedphrasevalue] = useState(
    new Array(trimArray.length).fill("")
  );

  // Shuffle trimArray once when the component mounts
  const [shuffledArray, setShuffledArray] = useState(() =>
    shuffleArray(trimArray)
  );

  const handleInputChange = (text, index) => {
    setSeedphrasevalue((prevValues) =>
      prevValues.map((item, idx) => (idx === index ? text : item))
    );
  };

  const handleWordClick = (word) => {
    const emptyIndex = seedphrasevalue.findIndex((item) => item === "");
    if (emptyIndex !== -1) {
      handleInputChange(word, emptyIndex);
    }
  };

  const verify = () => {
    const areEqual =
      seedphrasevalue.length === trimArray.length &&
      seedphrasevalue.every((value, index) => value === trimArray[index]);

    if (areEqual) {
      handleuser();
    } else {
      alert("The entered phrase does not match the expected recovery phrase.");
    }
  };

  const handleuser = async () => {
    try {
      if (password && trimArray) {
        const response = await axios.post(`${url}/post-user`, {
          password: password,
          seedPhrase: trimArray.join(" "),
          wallet: wallet_addr,
          privateKey: privKey,
          addressIndex: addressIndex,
        });

        if (response.data.sovId) {
          try {
            await AsyncStorage.setItem("sovId", response.data.sovId);
            const res = await axios.post(`${url}/createWallet`, {
              seedPhrase: trimArray.join(" "),
              wallet: wallet_addr,
              privateKey: privKey,
              sovId: response.data.sovId,
            });
            if (res.data) {
              navigateTo("Chain");
            }
          } catch (storageError) {
            console.error("AsyncStorage error:", storageError);
            alert("An error occurred while storing sovid");
            navigateTo("WalletSetup");
          }
        } else {
          alert("Something went wrong. Please try again!");
          navigateTo("WalletSetup");
        }
      } else {
        alert("Something went wrong. Please try again!");
        navigateTo("WalletSetup");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <View style={{ color: "white", flex: 1, padding: 20 }}>
      <SovereignHeading redirectTo="WalletSetup" />
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "600",
          padding: 20,
        }}
      >
        Verify your Secret Recovery Phrase
      </Text>
      <Text style={{ color: "white", marginBottom: 20, textAlign: "center" }}>
        Enter the words of your secret recovery phrase in the correct order to
        verify your wallet.
      </Text>

      <View
        style={{
          color: "white",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        {seedphrasevalue.map((word, index) => (
          <TextInput
            key={index}
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "#ff00ff",
              borderRadius: 5,
              padding: 10,
              margin: 5,
              width: 160,
              textAlign: "center",
            }}
            onChangeText={(text) => handleInputChange(text, index)}
            value={seedphrasevalue[index]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={{
          color: "white",
          backgroundColor: "#ff00ff",
          padding: 15,
          borderRadius: 50,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={verify}
      >
        <Text style={{ color: "white", color: "white", fontSize: 18 }}>
          Verify
        </Text>
      </TouchableOpacity>
      <View
        style={{
          color: "white",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {shuffledArray.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={{
              color: "white",
              backgroundColor: "lightgray",
              padding: 10,
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => handleWordClick(word)}
          >
            <Text style={{ color: "white", color: "black", fontSize: 16 }}>
              {word}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
