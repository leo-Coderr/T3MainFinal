import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ImageBackground  } from 'react-native';

const Chatbot = () => {
  
  const [questions, setQuestions] = useState([
    "What is your name?",
    "How old are you?",
    "Where are you from?",
    "What is your favorite color?"
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [trim_array, setTrimArray] = useState([]);
  const [inputfield, setInputField] = useState('');

  const handleAnswerChange = (text) => {
    setInputField(text); // Update input field value
  };

  const handleNext = () => {
    setAnswers([...answers, inputfield]); // Save the current input to answers array
    setInputField(''); // Clear the input field
    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
  };

  const trims = () => {
    const trimmedAnswers = answers.map(answer => {
      let trimmedAnswer = answer.toLowerCase();
      // Replace specified words with an empty string and trim the answer
      trimmedAnswer = trimmedAnswer.replace(/my|name|is|i|am|year|old|favourite|from|color/gi, '').trim();
      return trimmedAnswer;
    });
    setTrimArray(trimmedAnswers); // Update the trim_array with modified answers
  };

  return (
      <ImageBackground source={require('./assets/bg2.jpg')} style={styles.background}>
    <View style={styles.container}>
      {currentQuestionIndex <= 3 ? (
        <>
          <Text style={styles.question}>{currentQuestionIndex + 1}. {questions[currentQuestionIndex]}</Text>  
          <TextInput
            style={styles.answerInput}
            value={inputfield}
            onChangeText={handleAnswerChange}
            multiline={true}
            numberOfLines={4}
          />
          <Button
            title={'Next'}
            onPress={() => { handleNext(); trims(); }}
            disabled={!inputfield.trim()} 
          />
        </>
      ) : (
        <>
          <Text>Your seed phrase is:</Text>
          {trim_array.map((answer, index) => (
            <span key={index}>{index === 0 ? answer : " " + answer}</span>
          ))}
        </>
      )}
      {/* {console.log(answers, trim_array)} */}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
  },
  answerInput: {
    height: 100,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
   background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    width:"100vw",
    height:"100vh"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Chatbot;
