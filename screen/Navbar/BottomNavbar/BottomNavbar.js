import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import {
  ArrowsUpDownIcon,
  ClockIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  WalletIcon,
} from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

function BottomNavbar() {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const currentRoute = state.routes[state.index].name;

  const navigateToValidator = (value) => {
    navigation.navigate(value);
  };

  const isActive = (routeName) => {
    return currentRoute === routeName;
  };

  return (
    <View>
      <View
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.2)",
          // borderTopWidth: 1,
          // borderColor: "darkwhite",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            // backgroundColor: "black",
            alignItems: "center",

            paddingVertical: 15,
          }}
        >
          <TouchableOpacity onPress={() => navigateToValidator("Chain")}>
            <WalletIcon
              color={isActive("Chain") ? "#ff00ff" : "white"}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToValidator("Transaction")}>
            <ClockIcon
              color={isActive("Transaction") ? "#ff00ff" : "white"}
              size={24}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigateToValidator("SovereignAi")}>
            <MagnifyingGlassIcon
              color={isActive("SovereignAi") ? "#ff00ff" : "white"}
              size={24}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigateToValidator("Setting")}>
            <Cog6ToothIcon
              color={isActive("Setting") ? "#ff00ff" : "white"}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default BottomNavbar;
