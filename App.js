import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/Home/HomeScreen";
import Send from "./screen/Send/Send";
import SendAmount from "./screen/Send/SendAmount";
import Validator from "./screen/Validator/Validator";
import Scanner from "./screen/Home/Menu/Scanner";
import Setting from "./screen/setting/Setting";
import Transaction from "./screen/Transaction/Transaction";
import SovereignAi from "./screen/Identity/Chatbot/Chatbot";
import AboutSovereignAi from "./screen/Identity/Chatbot/AboutSovereignAi";
import GetStart from "./screen/GetStartedScreen/GetStart";
import WalletSetup from "./screen/Import/WalletSetup/WalletSetup";
import CreatePassword from "./screen/Import/WalletSetup/CreatePassword";
import SignIn from "./screen/Signin/CreatePassword";
import HviLogin from "./screen/Signin/HviLogin";
import SovId from "./screen/SovId/SovId";
import VerifySeedPhrase from "./screen/Signin/Signin";
import SecretRecoveryPhrase from "./screen/SeedPhrase/SecretRecoveryPhrase";
import VerifySecretRecoveryPhrase from "./screen/SeedPhrase/VerifySecretRecoveryPhrase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./screen/Login/Login";
import Chain from "./screen/Chain/Chain";
import Security from "./screen/setting/Security/Security";
import { Text, View } from "react-native";
import OCRComponent from "./screen/Ocr/Ocr";
import Liveness from "./screen/LivenessDetection/Liveness";
import Gmail from "./screen/Import/WalletSetup/Gmail";
import SeedPhrase from "./screen/setting/Security/SeedPhrase/SeedPhrase";

// const MyTheme = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     // background: "black",
//     text: "white",
//     border: "gray",
//     inputBackground: "#202020",
//     inputText: "white",
//     placeholderText: "gray",
//   },
// };

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSovidExists, setIsSovidExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSovid = async () => {
      const sovId = await AsyncStorage.getItem("userData");
      setIsSovidExists(sovId);
      setIsLoading(false);
    };

    checkSovid();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const initialRoute = isSovidExists ? "Chain" : "GetStart";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="SovId"
          component={SovId}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chain"
          component={Chain}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ocr"
          component={OCRComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Send"
          component={Send}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeedPhrase"
          component={SeedPhrase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutSovereignAi"
          component={AboutSovereignAi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SovereignAi"
          component={SovereignAi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Security"
          component={Security}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HviLogin"
          component={HviLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendAmount"
          component={SendAmount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gmail"
          component={Gmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Liveness"
          component={Liveness}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifySeedPhrase"
          component={VerifySeedPhrase}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} sovid={isSovidExists} />}
        </Stack.Screen>
        <Stack.Screen
          name="Validator"
          component={Validator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifySecretRecoveryPhrase"
          component={VerifySecretRecoveryPhrase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecretRecoveryPhrase"
          component={SecretRecoveryPhrase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WalletSetup"
          component={WalletSetup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStart"
          component={GetStart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
