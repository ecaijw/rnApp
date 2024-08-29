// TwrncComponent.tsx

import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Pressable } from "react-native";
import { Text, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { Image } from 'react-native';

import { create } from 'twrnc';
import customTwrncConfig from './twrnc.config.js';
const tailwind = create(customTwrncConfig);
export default tailwind;

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
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  const isSmallerThanSm = width < 640;
  const isSm = width >= 640 && width < 768;
  const isMd = width >= 768 && width < 1024; // md corresponds to min-width: 768px and max-width: 1023px
  const isLg = width >= 1024 && width < 1280; // lg corresponds to min-width: 1024px and max-width: 1279px
  const isXl = width >= 1280 && width < 1536;
  const is2Xl = width >= 1536;
  console.log(`screen width: ${width}, ${isSmallerThanSm}, ${isSm}, ${isMd}, ${isLg}, ${isXl}, ${is2Xl}`);
  console.log(`screen width isSmallerThanSm: ${isSm}`);
  console.log(`screen width md: ${isMd}`);


  return (
    <View style={tailwind`h-full w-full bg-[#f5fcff] justify-center items-center`}>
      <View style={tailwind`max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-visible md:max-w-4xl mb-[20px]`}>
        <View style={tailwind`flex ${isPortrait ? 'flex-col' : 'flex-row'}`}>
          {/* Adjusting the Image View to handle both portrait and landscape correctly */}
          <View style={tailwind`md:shrink-0 ${isPortrait ? 'mb-4' : 'mr-4'} items-center justify-center`}>
            <Image
              style={tailwind`h-16 w-48 ml-5`}
              source={{ uri: 'https://d220yz93drhwe7.cloudfront.net/smp/general/bzai/bzai-logo.png' }}
              resizeMode="contain"
              alt="Modern building architecture"
            />
          </View>
          {/* Text Content */}
          <View style={tailwind`p-2 ${isXl ? 'hidden' : ''}`}>
            <Text style={tailwind`uppercase tracking-wide text-sm ${isPortrait ? 'text-indigo-500' : 'text-lukeBlue'} font-semibold`}>
              Company retreats
            </Text>
            <TouchableOpacity style={tailwind`mt-1`} onPress={() => {}}>
              <Text style={tailwind`text-lg leading-tight font-medium text-black hover:underline`}>
                Incredible accommodation for your team
              </Text>
            </TouchableOpacity>
            <Text style={tailwind`mt-2 text-slate-500`}>
              Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.
            </Text>
          </View>
        </View>
      </View>
      <Button />
    </View>
  );
};
