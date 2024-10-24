import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { chatGPTRequest } from "./OpenAI";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import {
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const ChatComponent = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [togglemenu, settogglemenu] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() === "") return;
    const newUserMessage = { text: inputText, isUser: true };
    setChatHistory((currentChatHistory) => [
      ...currentChatHistory,
      newUserMessage,
    ]);
    setInputText("");
    const response = await chatGPTRequest(inputText);
    setChatHistory((currentChatHistory) => [
      ...currentChatHistory,
      { text: response, isUser: false },
    ]);
  };

  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const currentRoute = state.routes[state.index].name;

  const navigateToValidator = (value) => {
    navigation.navigate(value);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigateToValidator("Home")}>
          <ArrowUturnLeftIcon size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>AuthentiQ</Text>
        <TouchableOpacity
          style={{ position: "relative" }}
          onPress={() => {
            console.log("Toggle menu clicked");
            settogglemenu((currentToggle) => !currentToggle);
          }}
        >
          <EllipsisVerticalIcon size={24} color="black" />
          {togglemenu && (
            <TouchableOpacity
              onPress={() => navigateToValidator("AboutSovereignAi")}
              style={{
                position: "absolute",
                top: 25,
                backgroundColor: "#e3e3e3",
                padding: 15,
                borderRadius: 5,
                width: 140,
                right: 0,
                fontSize: 14,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <InformationCircleIcon size={18} />
              <Text>&nbsp; View Detail</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {chatHistory.map((message, index) => (
            <View
              key={index}
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: message.isUser ? "flex-end" : "flex-start",
              }}
            >
              {message.isUser ? (
                <>
                  <Text style={{ maxWidth: 250, marginHorizontal: 10 }}>
                    {message.text}
                  </Text>
                  <Image
                    source={require("../../../assets/profile.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../../assets/mask.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={{ maxWidth: 250, marginHorizontal: 10 }}>
                    {message.text}
                  </Text>
                </>
              )}
            </View>
          ))}
          {chatHistory.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/mask.png")}
                style={{ width: 150, height: 150, borderRadius: 75 }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message"
          style={{
            flex: 1,
            borderRadius: 25,
            backgroundColor: "#e3e3e3",
            padding: 10,
            fontSize: 16,
          }}
        />
        <TouchableOpacity onPress={handleSend}>
          <PaperAirplaneIcon
            color="white"
            style={{
              backgroundColor: "indigo",
              padding: 10,
              borderRadius: 25,
              marginLeft: 10,
            }}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatComponent;
