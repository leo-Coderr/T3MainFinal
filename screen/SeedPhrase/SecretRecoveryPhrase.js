import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import SovereignHeading from "../Import/WalletSetup/SovereignHeading";
import { useCustomNavigation } from "../Redirect/Redirect_function";
import { ethers } from "ethers";
import { useRoute } from "@react-navigation/native";
import { url } from "../../URL/Url";
import axios from "axios";

export default function SecretRecoveryPhrase() {
  const [trimArray, setTrimArray] = useState([]);
  const [wallet_addr, setwallet_addr] = useState();
  const [privKey, setprivKey] = useState();
  const [addressIndex, setaddressIndex] = useState();
  const route = useRoute();

  const generateWallet = async () => {
    try {
      const res = await axios.post(`${url}/generateNewAccount`);
      console.log("res", res.data);
      const seedPhrase = res.data.seedPhrase.split(" ");
      setTrimArray(seedPhrase);
      setwallet_addr(res.data.address);
      setprivKey(res.data.privkey);
      console.log("priv10", res.data.privkey);

      setaddressIndex(res.data.addressIndex);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("priv1", privKey);
  useEffect(() => {
    generateWallet();
    const generateMnemonic = () => {
      const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
      return mnemonic;
    };

    const mnemonic = generateMnemonic();
    const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    // setwallet_addr(mnemonicWallet.address);
    const words = mnemonic.split(" ");
    setTrimArray(words);
  }, []);

  const { navigateTo } = useCustomNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <SovereignHeading redirectTo="SeedPhrase" />
        <Text style={styles.title}>Write down your Secret Recovery Phrase</Text>
        <Text style={styles.description}>
          This is your Secret Recovery Phrase. Write it down on paper and keep
          it in a safe place. You'll be asked to re-enter this phrase (in order)
          on the next step.
        </Text>
        <View style={styles.phraseContainer}>
          {trimArray.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <Text style={styles.word}>
                {index + 1}. {word}
              </Text>
            </View>
          ))}
          {trimArray.length > 0 ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigateTo("VerifySecretRecoveryPhrase", {
                  trimArray: trimArray,
                  password: route.params?.password,
                  wallet_addr: wallet_addr,
                  privKey: privKey,
                  addressIndex: addressIndex,
                });
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ paddingVertical: 50, border: "1px solid white" }}>
              <Text style={{ textAlign: "center", color: "white" }}>
                Loading...
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
    flex: 1,
    padding: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    padding: 20,
  },
  description: {
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  phraseContainer: {
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  wordContainer: {
    color: "white",
    borderWidth: 1,
    borderColor: "#ff00ff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    width: 130,
  },
  word: {
    color: "white",
    textAlign: "center",
  },
  button: {
    color: "white",
    backgroundColor: "#ff00ff",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});
