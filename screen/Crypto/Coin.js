import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import s from "../Styling/Styling";

export default function Coin() {
  return (
    <View>
      <View style={[s.px15, s.py3, s.br10, s.bcw, s.mb2]}>
        <View style={[s.fdr, s.jcsb, s.g1]}>
          <View style={[s.fdr, s.g1, s.aic]}>
            <View>
              <Image
                source={require("../../assets/btc.png")}
                resizeMode="contain"
                style={[s.w4, s.h3]}
              />
            </View>
            <View>
              <View style={[s.fw600]}>Bitcoin</View>
              <View>₹ 5758949</View>
            </View>
          </View>
          <View>
            <TouchableOpacity style={[s.br5, s.py05, s.px1, s.bcg]}>
              Buy
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[s.px15, s.py3, s.br10, s.bcw, s.mb3]}>
        <View style={[s.fdr, s.jcsb, s.g1]}>
          <View style={[s.fdr, s.g1, s.aic]}>
            <View>
              <Image
                source={require("../../assets/eth.webp")}
                resizeMode="contain"
                style={[s.w4, s.h3]}
              />
            </View>
            <View>
              <View style={[s.fw600]}>Ethereum</View>
              <View>₹ 5758949</View>
            </View>
          </View>
          <View>
            <TouchableOpacity style={[s.br5, s.py05, s.px1, s.bcg]}>
              Buy
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
