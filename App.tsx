/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useState,useEffect } from "react";
import Mapbox, {MapView} from "@rnmapbox/maps";
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { MapboxDemo } from "./mapboxDemo"; // Import the MapboxDemo component
import { GitChartComponent } from './ChartGitComponent';
import { VictoryChartComponent } from "./VictoryChartComponent"; // Import the VictoryChartComponent

Mapbox.setAccessToken("pk.eyJ1IjoiZWNhaWp3IiwiYSI6ImNsemoyeng1MTBtOGgyam9idmM5eXhwOXMifQ._03CaeKfpwuM0YWHpXndLg");

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: '100%',
    backgroundColor:  "#f5fcff"
  },
  map: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});


// export default class App extends Component {
function App(): React.JSX.Element {
  useEffect(() => {
      // This will be called once the component is mounted
      Mapbox.setTelemetryEnabled(false);
    }, []); // The empty dependency array ensures this effect runs only once

  const [showVictoryChart, setShowVictoryChart] = useState(true);
  // Mapbox.setConnected(true);
  Mapbox.setTelemetryEnabled(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={styles.buttonContainer}>
          <Button title="Victory" onPress={() => setShowVictoryChart(true)} />
          <Button title="Chart-Kit" onPress={() => setShowVictoryChart(false)} />
        </View>
        <View style={styles.container}>
        {showVictoryChart ? (
          <VictoryChartComponent /> 
        ): (
          <GitChartComponent />
        )}
        </View>        
        <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
