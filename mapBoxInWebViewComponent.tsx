import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
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
