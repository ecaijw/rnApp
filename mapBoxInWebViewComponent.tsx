import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
} from "react-native";
import { WebView } from 'react-native-webview';
import { htmlContentForMapBoxInWebView } from "./globeMapContent";

// Define the prop types
interface MapBoxInWebViewComponentProps {
  isVisible: boolean;
  onClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonImage: {
    width: 30,  
    height: 30,  // Set the height of the image
    marginRight: 10,  // Space between image and button
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',  // Center content vertically
    marginVertical: 10,
    backgroundColor: '#56A192',  // Set background color
    padding: 10,  // Add padding
    borderRadius: 8,  // Add rounded corners
  },
});

export const MapBoxInWebViewComponent: React.FC<MapBoxInWebViewComponentProps> = ({ isVisible, onClose }) => {
  const webViewRef = useRef<WebView>(null);
  const [coordinates] = useState([145.18759999427772, -37.83203894259072]);

  const handleFlyToBZAI = () => {
    // Send the coordinates to the WebView
    webViewRef.current?.postMessage(JSON.stringify({
      lng: coordinates[0],
      lat: coordinates[1]
    }));
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
        <Image
            src = "https://d220yz93drhwe7.cloudfront.net/smp/general/bzai/gsp-app-icon.png"  // Replace with your image URL
            style={styles.buttonImage}
          />
          <Button title="Close WebView" onPress={onClose} />
          <Button title="Fly to BZAI" onPress={handleFlyToBZAI} />
        </View>
        <WebView
          ref={webViewRef}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{ html: htmlContentForMapBoxInWebView }}
          javaScriptEnabled={true}
        />
      </View>
    </Modal>
  );
};
