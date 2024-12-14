import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Clipboard,
  StyleSheet,
  Modal,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function SeedPhrase() {
  const [isModalVisible, setModalVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from local storage
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  const handlePasswordSubmit = () => {
    if (userData && password === userData.password) {
      setSeedPhrase(userData.seedPhrase);
      setModalVisible(false);
    } else {
      Alert.alert("Incorrect Password", "Please try again.");
    }
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(seedPhrase);
    Toast.show({
      type: "success",
      text1: "The seed phrase has been copied.",
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/T3background.jpg")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Enter Password:</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handlePasswordSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {!isModalVisible && (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "white" }}>Seed Phrase: {seedPhrase}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCopyToClipboard}
            >
              <Text style={styles.buttonText}>Copy Seed Phrase</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ff00ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
