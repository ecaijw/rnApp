import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  StyleSheet,
  Text,
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
  closeButtonContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
});

export const MapBoxInWebViewComponent: React.FC<MapBoxInWebViewComponentProps> = ({ isVisible, onClose }) => {  // state to manage modal visibility
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const loadHtmlContent = async () => {
      try {
        console.log(`loadHtmlContent: start`);
        setHtmlContent(htmlContentForMapBoxInWebView);
        console.log(`loadHtmlContent: end`);
      } catch (error) {
        console.error("Error loading HTML content:", error);
      }
    };

    if (isVisible) {
      loadHtmlContent();
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <Button title="Close WebView" onPress={onClose} />
        </View>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{ html: htmlContent }}
        />
      </View>
    </Modal>
  );
};
