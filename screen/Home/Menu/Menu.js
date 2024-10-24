import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
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

export default function Menu({ wallet, addressIndex, currency, privateKey }) {
  const { navigateTo } = useCustomNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleBuyPress = () => {
    Linking.openURL("https://onramp.money/");
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
              backgroundColor: "rgba(0,0,0,0.2)",
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
              backgroundColor: "rgba(0,0,0,0.2)",
              padding: 15,
              borderRadius: 50,
            }}
            // onPress={() => navigation.navigate("Scanner")}
          >
            <QrCodeIcon size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ marginTop: 5, color: "white" }}>Scanner</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
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
              backgroundColor: "rgba(0,0,0,0.2)",
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
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Your Wallet Address</Text>
            <QRCode value={wallet} size={200} />
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
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff00ff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
