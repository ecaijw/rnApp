import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  StyleSheet,
  Text,
  Button,
 } from "react-native";
import Mapbox, {
  MapView, 
  Camera,
  PointAnnotation,
} from "@rnmapbox/maps";

import {
  FullScreenMapViewComponent,
} from "./fullScreenMapViewComponent"

import {
  MapBoxInWebViewComponent,
} from "./mapBoxInWebViewComponent"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "#f5fcff",
    justifyContent: 'flex-start',
  },
  mapContainer: {
    height: 400, // Adjusted height to ensure the MapView is large enough
    width: '100%',
    marginBottom: 20, // Space between the two maps
    backgroundColor: "#00fcff", // Temporary color for debugging
  },
  map: {
    flex: 1, // Ensure the MapView takes the full height of its container
  },
  annotationText: {
    color: 'green',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export const MapViewComponent = () => {
  // map states
  const [coordinates] = useState([145.18759999427772, -37.83203894259072]);
  const [zoomLevel, setZoomLevel] = useState(8);
  const cameraRef = useRef<Camera>(null);

  // state to manage modal visibility
  const [isRNMapBoxVisible, setIsRNMapBoxVisible] = useState(false);
 
  const [isMapBoxInWebViewVisible, setisMapBoxInWebViewVisible] = useState(false);
  
  Mapbox.setAccessToken("pk.eyJ1IjoiZWNhaWp3IiwiYSI6ImNsemoyeng1MTBtOGgyam9idmM5eXhwOXMifQ._03CaeKfpwuM0YWHpXndLg");

  useEffect(() => {
    // Disable telemetry when component mounts
    Mapbox.setTelemetryEnabled(false);
  }, []);

  // Zoom functions for the first map
  const zoomIn = () => {
    setZoomLevel(12);
  };

  const zoomOut = () => {
    setZoomLevel(6);
  };

  // function to handle full screen button click
  const openRNMapBox = () => {
    setIsRNMapBoxVisible(true);
  };
  const closeRNMapBox = () => {
    setIsRNMapBoxVisible(false);
  };

  const openMapBoxInWebViewVisible = () => {
    setisMapBoxInWebViewVisible(true);
  };
  const closeMapBoxInWebViewVisible = () => {
    setisMapBoxInWebViewVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapBoxInWebViewComponent 
          isFullScreen = {false}
          isVisible={isMapBoxInWebViewVisible}
          onClose={closeMapBoxInWebViewVisible}
        />
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Zoom In" onPress={zoomIn} />
          <Button title="Zoom Out" onPress={zoomOut} />
          <Button title="WebView" onPress={() => openMapBoxInWebViewVisible()} />
          <Button title="RN MapBox" onPress={() => openRNMapBox()} />
        </View>
        <MapView style={styles.map}>
          <Mapbox.Camera 
            ref={cameraRef}
            zoomLevel={zoomLevel}
            centerCoordinate={coordinates} 
          />
          <PointAnnotation 
            id="unique-id-1"  // Add a unique id here
            coordinate={coordinates}
          >
            <Text style={styles.annotationText}>BZAI</Text>
          </PointAnnotation>
        </MapView>
      </View>

      <View style={styles.container}>
        <MapBoxInWebViewComponent 
          isFullScreen = {true}
          isVisible={isMapBoxInWebViewVisible}
          onClose={closeMapBoxInWebViewVisible}
        />

        <FullScreenMapViewComponent
          isVisible={isRNMapBoxVisible}
          onClose={closeRNMapBox}
        />
      </View>
    </View>
  );
};
