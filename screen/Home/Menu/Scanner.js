import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  ImageBackground,
} from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCustomNavigation } from "../../Redirect/Redirect_function";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const route = useRoute();
  const { wallet = "", currency = "", privateKey = "" } = route.params || {};
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [password, setpassword] = useState();

  const { navigateTo } = useCustomNavigation();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setpassword(userData.password);
        }
      } catch (error) {
        console.error("e5", error);
      }
    };

    loadAccounts();
  }, [currency]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    navigateTo("SendAmount", {
      fromwallet: wallet,
      towallet: data,
      currency: currency,
      privateKey: privateKey,
      password: password,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ImageBackground
      source={require("../../../assets/T3background.jpg")}
      style={styles.background}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.text}>Place a bar code on center</Text>
        </View>
        <View style={styles.cameraContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={styles.camera}
          />
          <View style={styles.overlay}>
            <View style={styles.border} />
          </View>
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.text}>Bottom Content</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  topContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  camera: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    width: "60%",
    height: "60%",
    borderWidth: 2,
    borderColor: "#00FF00",
    borderRadius: 10,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
