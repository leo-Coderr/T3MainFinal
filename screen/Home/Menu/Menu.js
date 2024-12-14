import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  Image,
  ImageBackground,
} from "react-native";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import QRCode from "react-native-qrcode-svg";
import { useCustomNavigation } from "../../Redirect/Redirect_function";
import { QrCodeIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function Menu({ wallet, addressIndex, currency, privateKey }) {
  const { navigateTo } = useCustomNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const viewShotRef = useRef();

  const handleBuyPress = () => {
    Linking.openURL("https://onramp.money/");
  };

  const handleSharePress = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = `${FileSystem.cacheDirectory}QRCode.png`;

      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      if (!(await Sharing.isAvailableAsync())) {
        alert(`Sharing is not available on your platform`);
        return;
      }

      await Sharing.shareAsync(fileUri, {
        dialogTitle: "Share QR Code",
        mimeType: "image/png",
        UTI: "public.png",
        title: "Scan this to pay through T3 Wallet",
        message: "Scan this to pay through T3 Wallet",
      });
    } catch (error) {
      console.error("Error sharing QR code:", error);
    }
  };

  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: 15,
              borderRadius: 50,
            }}
            onPress={handleBuyPress}
          >
            <PlusIcon size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ marginTop: 5, color: "white" }}>Buy</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: 15,
              borderRadius: 50,
            }}
            onPress={() =>
              navigateTo("Scanner", {
                wallet: wallet,
                currency: currency,
                privateKey: privateKey,
              })
            }
          >
            <QrCodeIcon size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ marginTop: 5, color: "white" }}>Scanner</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: 15,
              borderRadius: 50,
            }}
            onPress={() =>
              navigateTo("Send", {
                wallet: wallet,
                addressIndex: addressIndex,
                currency: currency,
                privateKey: privateKey,
              })
            }
          >
            <ArrowUpIcon size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ marginTop: 5, color: "white" }}>Send</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: 15,
              borderRadius: 50,
            }}
            onPress={() => setModalVisible(true)}
          >
            <ArrowDownIcon size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ marginTop: 5, color: "white" }}>Receive</Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
            <View style={styles.modalContent}>
              <Text style={styles.logoText}>
                <Image
                  source={require("../../../assets/mask.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="cover"
                  resizeMethod="scale"
                />
                &nbsp; T3 Wallet
              </Text>
              <Text style={styles.acceptedText}>ACCEPTED HERE</Text>
              <Text style={styles.scanText}>
                Scan & Pay Using T3 Wallet App
              </Text>
              <QRCode value={wallet} size={200} />
              <Text style={styles.footerText}>
                © 2024, All rights reserved, SovereignT Lab LLC.
              </Text>
            </View>
          </ViewShot>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleSharePress}
            >
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a148c",
    marginBottom: 10,
  },
  acceptedText: {
    fontSize: 14,
    color: "#4a148c",
    marginBottom: 10,
  },
  scanText: {
    fontSize: 12,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  nameText: {
    fontSize: 18,
    color: "#000",
    marginTop: 20,
  },
  footerText: {
    fontSize: 10,
    color: "#000",
    marginTop: 20,
  },
  shareButton: {
    padding: 10,
    width: 100,
    textAlign: "center",
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    width: 100,
    textAlign: "center",
    backgroundColor: "#ff00ff",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
