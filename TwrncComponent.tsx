// TwrncComponent.tsx

import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Pressable } from "react-native";
import { Text, TouchableOpacity, Alert } from 'react-native';
import { Button as MyButton, Image } from 'react-native';
import tailwind from "twrnc";

const Button = () => {
  return (
    <TouchableOpacity
      style={tailwind`bg-red-400 p-4 rounded mb-[50px]`}
      onPress={() => Alert.alert('Button Pressed')}
    >
      <Text style={tailwind`text-gray-400 text-center font-bold ml-4 mt-4`}>Tailwind Button</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    backgroundColor: "#f5fcff"
  }
});

export const TwrncComponent = () => {

  return (
    <View style={tailwind`h-75 w-full bg-[#f5fcff] justify-center items-center`}>
      <Button />
      <View style={tailwind`p-6 max-w-xs bg-white rounded-lg shadow-lg flex-row items-center`}>
        <Image
          style={tailwind`w-12 h-12`}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Replace with your actual image source
        />
        <View style={tailwind`ml-4`}>
          <Text style={tailwind`text-xl font-bold text-blue-600`}>ChitChat</Text>
          <Text style={tailwind`text-slate-500`}>You have a new message!</Text>
        </View>
      </View>
    </View>
  );
};
