import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { url } from "../../../URL/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [email, setEmail] = useState("");
  const [hvi, setHvi] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(""); // Notification state
  const navigation = useNavigation();

  const generateRandomHVI = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 64; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  useEffect(() => {
    setHvi(generateRandomHVI());
  }, []);

  const sendEmail = async () => {
    if (!email) {
      setNotification("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const userDataString = await AsyncStorage.getItem("userData");
      let sovId;
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const urls = `https://explorer-restapi.sovereignty.one/identity/identity/id/${userData.SOID[0].wallet}`;

        const res = await fetch(urls);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        sovId = data.id.did;
      }
      const response = await axios.post(`${url}/send-email`, {
        to: email,
        from: "founder@sovereigntlabs.com",
        hvi: hvi,
        sovId: sovId,
        subject: "Your HVI Code",
        html: `
          <div style="font-family: Arial, sans-serif; color: white; background-color: #000; padding: 20px; text-align: center;">
            <img src="https://res.cloudinary.com/dmlbfqbox/image/upload/v1730102362/sodvfu0mol9ffcny4jlr.png" alt="Logo" style="width: 100px; height: auto; margin-bottom: 20px;" />
            <h2 style="color:white">Your Human Verification Identity (HVI)</h2>
            <p style="color:white">Your HVI is: <strong>${hvi}</strong></p>
            <p style="color:white">Please keep this code safe as it is required for login. If you lose this code, the platform will not be able to assist in recovery.</p>
            <p style="color:white">We have sent this code to your email for safekeeping.</p>
            <p style="color:white">Follow us on:</p>
            <a href="https://facebook.com" style="color: #3b5998;">Facebook</a> |
            <a href="https://twitter.com" style="color: #1da1f2;">Twitter</a> |
            <a href="https://instagram.com" style="color: #e1306c;">Instagram</a>
          </div>
        `,
      });
      console.log("Email sent:", response.data);
      setNotification("Email sent successfully");
      navigation.navigate("Chain");
    } catch (error) {
      console.error("Error sending email:", error);
      setNotification("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/T3background.jpg")}
      style={styles.background}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}

        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dmlbfqbox/image/upload/v1730102362/sodvfu0mol9ffcny4jlr.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.hviContainer}>
          <Text style={styles.hviText}>
            HVI (Human Verification Identity): {hvi}
          </Text>
          <Text style={styles.instructions}>
            Instructions: Please keep your HVI code safe. It is essential for
            logging into the platform. If you forget or lose this code, the
            platform will not be able to assist in recovery. We have sent this
            code to your email for safekeeping.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's email"
          placeholderTextColor="lightgray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={sendEmail} style={styles.button}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
        {notification ? (
          <Text style={styles.notification}>{notification}</Text>
        ) : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  hviContainer: {
    borderWidth: 1,
    padding: 20,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 50,
  },
  hviText: {
    color: "white",
    marginBottom: 10,
  },
  instructions: {
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "white",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#ff00ff",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  notification: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default App;
