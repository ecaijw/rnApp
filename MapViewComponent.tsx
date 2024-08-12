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
  // First map states
  const [coordinates] = useState([145.18759999427772, -37.83203894259072]);
  const [zoomLevel, setZoomLevel] = useState(8);
  const cameraRef = useRef<Camera>(null);

  // Second map (3D Globe) states
  const [globeZoomLevel, setGlobeZoomLevel] = useState(2.0);  // Start with a slightly higher zoom level
  const globeCameraRef = useRef<Camera>(null);

  Mapbox.setAccessToken("your-mapbox-access-token");

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

  // Zoom functions for the globe map
  const globeZoomIn = () => {
    setGlobeZoomLevel(prev => Math.min(prev + 0.5, 10)); // Max zoom level is 10
  };

  const globeZoomOut = () => {
    setGlobeZoomLevel(prev => Math.max(prev - 0.5, 1)); // Min zoom level is 1
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {/* First Map View */}
        <View style={styles.buttonContainer}>
          <Button title="Zoom In" onPress={zoomIn} />
          <Button title="Zoom Out" onPress={zoomOut} />
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

      <View style={styles.mapContainer}>
        {/* Second Map View (3D Globe) */}
        <View style={styles.buttonContainer}>
          <Button title="Globe Zoom In" onPress={globeZoomIn} />
          <Button title="Globe Zoom Out" onPress={globeZoomOut} />
        </View>
        <MapView 
          style={styles.map}
          projection="globe"  // Enable globe projection
        >
          <Mapbox.Camera 
            ref={globeCameraRef}
            zoomLevel={globeZoomLevel}  // Controlled by buttons
            centerCoordinate={[0, 0]}  // Center the globe on the prime meridian
          />
        </MapView>
        </View>
    </View>
  );
};
