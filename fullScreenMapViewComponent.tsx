import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  StyleSheet,
  Text,
  Button,
  Modal,
 } from "react-native";
import Mapbox, {
  MapView, 
  Camera,
  PointAnnotation,
} from "@rnmapbox/maps";

// Define the prop types
interface FullScreenMapViewComponentProps {
  isVisible: boolean;
  onClose: () => void;
}

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButtonContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
});

export const FullScreenMapViewComponent: React.FC<FullScreenMapViewComponentProps> = ({ isVisible, onClose }) => {  // state to manage modal visibility
  Mapbox.setAccessToken("pk.eyJ1IjoiZWNhaWp3IiwiYSI6ImNsemoyeng1MTBtOGgyam9idmM5eXhwOXMifQ._03CaeKfpwuM0YWHpXndLg");
  const [coordinates] = useState([145.18759999427772, -37.83203894259072]);
  const [longitude, setLongitude] = useState(0);
  const [globeZoomLevel, setGlobeZoomLevel] = useState(2.3);  // Start with a slightly higher zoom level
  const globeCameraRef = useRef<Camera>(null);
  const animationRef = useRef<number>();

  const rotateGlobe = () => {
    setLongitude(prevLongitude => {
      const newLongitude = (prevLongitude + 0.3) % 360; // Small incremental update
      console.log(`newCoordinates: [${newLongitude}, ${0}`);
      if (globeCameraRef.current) {
        globeCameraRef.current.setCamera({
          zoomLevel: globeZoomLevel,
          centerCoordinate: [newLongitude, 0], // Only update longitude
          animationDuration: 0, // Ensure smooth continuous movement without sudden stops
        });
      }
      return newLongitude;
    });
    animationRef.current = requestAnimationFrame(rotateGlobe); // Continue the animation loop
  };
  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(rotateGlobe);
    } else {
      cancelAnimationFrame(animationRef.current!); // Stop animation if modal is closed
    }
    return () => cancelAnimationFrame(animationRef.current!); // Clean up on unmount
  }, [isVisible]);


  return (
      <Modal
        visible = {isVisible}
        animationType="slide"
        onRequestClose={onClose}
        >
        <View style = {styles.modalContainer}>
          <View style={styles.closeButtonContainer}>
            <Button title="Close" onPress={onClose} />
          </View>
          <MapView 
          style = {{flex: 1}} 
          projection="globe"  // Enable globe projection
          >
            <Mapbox.Camera 
            ref = {globeCameraRef}
            zoomLevel = {globeZoomLevel}
            centerCoordinate={[0, 0]} 
            />
            <PointAnnotation
              id="unique-id-2"
              coordinate={coordinates}
            >
              <Text style={styles.annotationText}>BZAI</Text>
            </PointAnnotation>
            </MapView>
        </View>
      </Modal>
  );
};
