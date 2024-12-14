import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  View,
  Alert,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { url } from "../../URL/Url";
import { ArrowDownIcon, ChevronDownIcon } from "react-native-heroicons/outline";

const OCRComponent = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("Select Document Type");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
    }
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(`${url}/ocr`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      setText(data.text);
      verifyDocument(data.text);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyDocument = (extractedText) => {
    const inputText = `${firstName} ${dob} ${documentId}`;
    const similarity = calculateSimilarity(extractedText);

    if (similarity >= 0.25) {
      navigation.navigate("Liveness");
    } else {
      Alert.alert(
        "Warning",
        `Document is not correct. Please provide the document again. Match: ${(
          similarity * 100
        ).toFixed(2)}%`
      );
    }
  };

  const calculateSimilarity = (extractedText) => {
    console.log("Extracted Text:", extractedText);

    let score = 0;

    // Split the firstName into individual words
    const nameParts = firstName.split(" ").filter(Boolean);

    // Check for the presence of each part of the name
    for (const part of nameParts) {
      if (extractedText.includes(part)) {
        score += 1; // Increment score for each part of the name found
        console.log(`Found name part: ${part}, Score: ${score}`);
        break; // Exit loop once any part of the name is found
      }
    }

    // Check for the presence of the date of birth
    if (extractedText.includes(dob)) {
      score += 1; // Date of Birth is present
      console.log("Found DOB, Score:", score);
    }

    // Check for the presence of the document ID
    if (extractedText.includes(documentId)) {
      score += 1; // Document ID is present
      console.log("Found Document ID, Score:", score);
    }

    // Calculate the percentage based on the number of fields matched
    const percentage = (score / 3) * 100;
    console.log("Match Percentage:", percentage);
    return percentage / 100; // Return as a fraction for consistency with previous logic
  };

  const handleSubmit = () => {
    if (image) {
      uploadImage(image);
    } else {
      Alert.alert("Error", "Please upload an image first.");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectDocumentType = (type) => {
    setDocumentType(type);
    setDropdownVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/T3background.jpg")}
      style={styles.background}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require("../../assets/mask.png")}
          style={{ width: 70, height: 70 }}
          resizeMode="cover"
          resizeMethod="scale"
        />
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            fontWeight: "600",
            color: "white",
          }}
        >
          KYC
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="lightgray"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Date of Birth (DD/MM/YY)"
          placeholderTextColor="lightgray"
          value={dob}
          onChangeText={setDob}
          style={styles.input}
        />

        <TouchableOpacity onPress={toggleDropdown} style={styles.input}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white" }}>{documentType}</Text>
            <ChevronDownIcon color="white" size={16} />
          </View>
        </TouchableOpacity>
        <View style={{ position: "relative", width: "80%" }}>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                onPress={() => selectDocumentType("Government ID")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>Government ID</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectDocumentType("Passport")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>Passport</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectDocumentType("Electricity Bill")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>Electricity Bill</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TextInput
          placeholder="ID Number"
          placeholderTextColor="lightgray"
          value={documentId}
          onChangeText={setDocumentId}
          style={styles.input}
        />
        <View>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.uploadButton}>Upload Document</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>(jpg , png ) below 500kb</Text>
          {/* <Text>{text}</Text> */}
        </View>

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff00ff" />
          <Text style={styles.loadingText}>Document is verifying.</Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 5,
    zIndex: 10000000,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  dropdownItemText: {
    color: "black",
  },
  uploadButton: {
    marginTop: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ff00ff",
    fontSize: 18,
    fontWeight: "600",
  },
  noteText: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ff00ff",
    fontSize: 18,
    fontWeight: "600",
    width: "80%",
    alignItems: "center",
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "white",
  },
});

export default OCRComponent;
