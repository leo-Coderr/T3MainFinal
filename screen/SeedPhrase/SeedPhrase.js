import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SovereignHeading from "../Import/WalletSetup/SovereignHeading";
import { ethers } from "ethers";

const Chatbot = () => {
  const route = useRoute();
  const { password = "" } = route.params || {};

  const navigation = useNavigation();

  const [questions, setQuestions] = useState([
    "What's your favorite fruit?",
    "What's your favorite book?",
    "What's your favorite movie?",
    "What's your favorite hobby?",
    "What's your favorite season?",
    // "What's your favorite song?",
    // "What's your favorite dessert?",
    // "What's your favorite subject?",
    // "What's your favorite sport?",
    // "What's your favorite drink?",
    // "What's your favorite vacation spot?",
    // "What's your favorite TV show?",
    // "What's your favorite memory?",
    // "What's your favorite type of cuisine?",
    // "What's your favorite holiday?",
    // "What's your favorite type of music?",
    // "What's your favorite type of weather?",
    // "What's your favorite type of art?",
    // "What's your favorite childhood memory?",
    // "What's your favorite type of animal?",
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [trim_array, setTrimArray] = useState([]);
  const [inputfield, setInputField] = useState("");

  const handleAnswerChange = (text) => {
    setInputField(text); // Update input field value
  };

  const handleNext = () => {
    setAnswers([...answers, inputfield]); // Save the current input to answers array
    setInputField(""); // Clear the input field
    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
  };

  const trims = () => {
    const trimmedAnswers = answers.map((answer) => {
      let trimmedAnswer = answer.toLowerCase();
      // Replace specified words with an empty string and trim the answer
      trimmedAnswer = trimmedAnswer
        .replace(/my|name|is|i|am|year|old|favourite|from|color/gi, "")
        .trim();
      return trimmedAnswer;
    });
    setTrimArray(trimmedAnswers); // Update the trim_array with modified answers
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      trims(); // Call trims() when all questions are answered
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (trim_array.length > 0) {
      navigation.navigate("SecretRecoveryPhrase", {
        trimArray: trim_array,
        password: password,
      });
    }
  }, [trim_array]);

  return (
    <>
      <View style={{ padding: "20px" }}>
        <SovereignHeading redirectTo="CreatePassword" />

        <View style={{ marginTop: "100px" }}>
          <View>
            <Text
              style={{
                fontSize: "18px",
                textAlign: "center",
                marginBottom: "70px",
                fontWeight: "500",
              }}
            >
              There are 5 question in a quiz.
            </Text>
          </View>
          {currentQuestionIndex < questions.length ? (
            <>
              <Text style={styles.question}>
                {currentQuestionIndex + 1}. {questions[currentQuestionIndex]}
              </Text>
              <TextInput
                style={{
                  border: "1px solid #ff00ff",
                  outline: "0px",
                  width: "100%",
                  borderRadius: "10px",
                  marginVertical: "20px",
                  padding: "10px",
                }}
                value={inputfield}
                onChangeText={handleAnswerChange}
                multiline={true}
                numberOfLines={4}
              />
              <TouchableOpacity
                style={{
                  paddingVertical: "10px",
                  paddingHorizontal: "40px",
                  borderRadius: "50px",
                  textAlign: "center",
                  backgroundColor: "#ff00ff",
                  fontSize: "20px",
                  marginTop: "20px",
                  fontFamily: "Arial",
                  color: "white",
                  opacity: inputfield ? "1" : "0.5",
                }}
                onPress={() => handleNext()}
                disabled={!inputfield.trim()}
              >
                Next
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text>Your seed phrase is:</Text>
              {trim_array.map((answer, index) => (
                <span key={index}>{index === 0 ? answer : " " + answer}</span>
              ))}
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    marginBottom: 10,
  },
  answerInput: {
    height: 100,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
});

export default Chatbot;
