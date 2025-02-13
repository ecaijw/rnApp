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
  isFullScreen: boolean;
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
    marginTop: 40,  // Add top margin
    borderRadius: 8,  // Add rounded corners
  },
});

export const MapBoxInWebViewComponent: React.FC<MapBoxInWebViewComponentProps> = ({ isFullScreen, isVisible, onClose }) => {
  const webViewRef = useRef<WebView>(null);
  const [coordinates] = useState([145.18759999427772, -37.83203894259072]);

  const handleFlyToBZAI = () => {
    // Send the coordinates to the WebView
    console.log("handleFlyToBZAI: start");
    const current = webViewRef.current
    if (current) {
      console.log("handleFlyToBZAI: postMessage");
      current.postMessage(JSON.stringify({
        lng: coordinates[0],
        lat: coordinates[1]
      }));

      let jsCode = "flyToCoordinate();"
      current.injectJavaScript(jsCode);
    }
  };

  const handleMessage = (event: any) => {
    console.log("Message received from WebView:", event.nativeEvent.data);
  };

  const closeButton = (
    <Button title="Close WebView" onPress={onClose} />
  );

  const content = (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Image
          source={{ uri: "https://d220yz93drhwe7.cloudfront.net/smp/general/bzai/gsp-app-icon.png" }}  // Use source prop with uri for the image
          style={styles.buttonImage}
        />
        {isFullScreen && closeButton}
        <Button title="Fly to BZAI" onPress={handleFlyToBZAI} />
      </View>
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        source={{ html: htmlContentForMapBoxInWebView }}
        javaScriptEnabled={true}
        onMessage={handleMessage}  // Add onMessage prop to handle communication
      />
    </View>
  );

  if (isFullScreen) {
    return (
      <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
        {content}
      </Modal>
    );
  } else {
    return content;
  }
};
