// TwrncComponent.tsx

import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Pressable } from "react-native";
import { Text, TouchableOpacity, Alert } from 'react-native';
import { Button as MyButton } from 'react-native';
import tailwind from "twrnc";

const Button = () => {
  return (
    <TouchableOpacity
      style={tailwind`bg-red-400 p-4 rounded`}
      onPress={() => Alert.alert('Button Pressed')}
    >
      <Text style={tailwind`text-red text-center`}>Tailwind Button</Text>
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
    <View style={styles.container}>
      <Button />
    </View>
  );
};
