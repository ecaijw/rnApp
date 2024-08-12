import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from '@rnmapbox/maps';
import MapboxGL from '@rnmapbox/maps';
import { australiaMap } from "./AustraliaMap";

export type RegionAlias =
  | "Asia"
  | "Europe"
  | "Australia"
  | "New Zealand"
  | "Americas"
  | "Global";

export type RegionType = {
  regionName: string;
  regionAlias: RegionAlias;
  centerCoordinates: [number, number];
  labelCoordinates: [number, number];
  zoomLevel: number;
  regionRank: number;
  mapAvailable: boolean;
  compareAvailable: boolean;
};

// Define the types directly here
export const mapSourceSwitcher = (region: RegionAlias) => {
    const defaultMap: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    };
    switch (region) {
      case "Australia":
        return australiaMap;
      case "Americas":
      case "Asia":
      case "Europe":
      case "New Zealand":
      case "Global":
      default:
        return defaultMap;
    }
};


export const allRegions: RegionType[] = [
    {
      regionName: "americas",
      regionAlias: "Americas",
      centerCoordinates: [-95.873779, 38.269649],
      labelCoordinates: [-95.873779, 38.269649],
      zoomLevel: 3,
      regionRank: 4,
      mapAvailable: false,
      compareAvailable: false,
    },
  
    {
      regionName: "australia",
      regionAlias: "Australia",
      centerCoordinates: [134.5655, -32.54],
      labelCoordinates: [134.7, -26.1377],
      zoomLevel: 3.8,
      regionRank: 1,
      mapAvailable: true,
      compareAvailable: true,
    },
    {
      regionName: "new-zealand",
      regionAlias: "New Zealand",
      centerCoordinates: [172.203336, -43.28148461],
      labelCoordinates: [172.203336, -43.28148461],
      zoomLevel: 4,
      regionRank: 3,
      mapAvailable: false,
      compareAvailable: false,
    },
    {
      regionName: "europe",
      regionAlias: "Europe",
      centerCoordinates: [15.855538, 48.569199],
      labelCoordinates: [15.855538, 48.569199],
      zoomLevel: 3,
      regionRank: 2,
      mapAvailable: false,
      compareAvailable: false,
    },
    {
      regionName: "asia",
      regionAlias: "Asia",
      centerCoordinates: [88.594037, 35.729724],
      labelCoordinates: [88.594037, 35.729724],
      zoomLevel: 3,
      regionRank: 5,
      mapAvailable: false,
      compareAvailable: false,
    },
    {
      regionName: "global",
      regionAlias: "Global",
      centerCoordinates: [135.2955, -24.8962],
      labelCoordinates: [135.2955, -24.8962],
      zoomLevel: 1.87,
      regionRank: 0,
      mapAvailable: false,
      compareAvailable: true,
    },
  ];
  

const regionObjSwitcher = (
  region: RegionAlias | undefined | string
): RegionType => {
  switch (region) {
    case "Americas":
    case "americas":
      return allRegions[0];
    case "Asia":
    case "asia":
      return allRegions[4];
    case "Australia":
    case "australia":
      return allRegions[1];
    case "Europe":
    case "europe":
      return allRegions[3];
    case "New Zealand":
    case "new-zealand":
      return allRegions[2];
    case "Global":
    case "global":
    default:
      return allRegions[5];
  }
};

export const MapboxDemo = () => {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionType>();
  const [showMapCover, setShowMapCover] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);

  const mapLayerRef = useRef<"global" | "region">("global");
  const spinRef = useRef<boolean>(true);

  const currentViewPortHeight = Dimensions.get("window").height;
  const global = regionObjSwitcher("Global");

  const zoomCalculator = (baseZoom: number) => {
    const ratio = currentViewPortHeight / 1080 - 1;
    return baseZoom + ratio;
  };

  const updateSpinRef = () => {
    spinRef.current = mapLayerRef.current === "global";
  };

    // Assuming you have a ref to the Camera component
    const cameraRef = useRef<Camera>(null);

    const flyTo = (coordinate: [number, number] | undefined, zoom: number) => {
    if (cameraRef.current && coordinate) {
        cameraRef.current.setCamera({
        centerCoordinate: coordinate,
        zoomLevel: zoom,
        animationDuration: 2000,  // duration is in milliseconds
        });
    }
    };

  const flyToSelectedRegion = () => {
    if (selectedRegion)
      flyTo(
        selectedRegion.centerCoordinates,
        zoomCalculator(selectedRegion.zoomLevel)
      );
  };

  const spinGlobe = () => {
    if (spinRef.current) {
      const map = mapRef.current;
      if (map) {
        // Implement the spinning logic here
      }
    }
  };

  const onClickMap = () => {
    if (selectedRegion?.regionAlias !== "Global") {
      flyToSelectedRegion();
    } else {
      spinGlobe();
    }
  };

  const handleClickRegionMarker = (name: string) => {
    setSelectedRegion(regionObjSwitcher(name));
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Disable double click zoom and set cursor style
      // MapboxGL.MapView doesn't support DOM manipulations, so no need for cursor change

      // Implement spin logic if necessary
    }
  }, [mapRef.current]);

  useEffect(() => {
    if (transition) {
      const timeout = setTimeout(() => {
        setTransition(false);
        updateSpinRef();
        spinGlobe();
        setSelectedRegion(selectedRegion);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [transition]);

  return (
    <View style={styles.regionMapContainer}>
      <View style={styles.regionSelector}>
      {allRegions.map((region) => {
            const isSelected = region.regionAlias === selectedRegion?.regionAlias;
            const isAvailable = region.mapAvailable;

            return (
            <TouchableOpacity
                key={region.regionAlias}
                style={[
                styles.regionButton,
                {
                    opacity: isSelected ? 1 : 0.4,
                    backgroundColor: isAvailable ? '#fff' : '#ccc', // Example conditional styling
                },
                ]}
                disabled={!isAvailable}
                onPress={() => {
                if (isAvailable) {
                    setSelectedRegion(region);
                }
                }}
            >
                {/* <Text>{region.regionAlias.toUpperCase()? "good": "test"}</Text> */}
                <Text>regionAlias</Text>
            </TouchableOpacity>
            );
        })}        
        <View style={styles.globeButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedRegion(regionObjSwitcher("Global"));
            }}
          >
            <Text>Global Icon</Text> {/* A simple globe emoji as a placeholder for the globe icon */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapContainer}>
        {showMapCover && <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.8)" }} />}

        <MapboxGL.MapView
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
          styleURL={MapboxGL.StyleURL.Street}
          onPress={onClickMap}
          onDidFinishLoadingMap={() => {
            setGlobeLoaded(true);
            setSelectedRegion(global);
          }}
          scrollEnabled={false}
          pitchEnabled={false}
          zoomEnabled={false}
          attributionEnabled={false}
        >
          <MapboxGL.Camera
            zoomLevel={zoomCalculator(global.zoomLevel)}
            centerCoordinate={global.centerCoordinates}
          />
          <MapboxGL.ShapeSource id="regionMap" shape={mapSourceSwitcher(selectedRegion?.regionAlias || "Global")}>
            {/* Remove unnecessary layers */}
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  regionButton: {
      padding: 10, // Example padding
    },
    text: {
      fontSize: 16,
      color: '#000',
    },

  regionMapContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  regionSelector: {
    width: '100%',
    height: 40,
    backgroundColor: '#fbfbfb',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    color: '#464646',
    fontSize: 16,
    letterSpacing: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  globeButtonContainer: {
    position: 'absolute',
    right: 48,
    top: 120,
    zIndex: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
});

export default MapboxDemo;
