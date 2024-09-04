import React, { useState } from "react";
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  Header,
  DebugInstructions,
  ReloadInstructions,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

import { VictoryChartComponent } from "./VictoryChartComponent";
import { GitChartComponent } from './ChartGitComponent';
import { MapViewComponent } from "./MapViewComponent";
import { TwrncComponent } from "./TwrncComponent";

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
    flex: 1,
    width: '100%',
    backgroundColor:  "#f5fcff"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  scrollViewContainer: {
    marginBottom: 50,
  },

  buttonContainerBottom: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',      // Center content horizontally
    minHeight: 50,            // Ensure the height doesn't go below 100px
    marginTop: 10,
    backgroundColor: '#56A192',  // Set background color
    borderRadius: 8,            // Add rounded corners
  },
});


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const [showVictoryChart, setShowVictoryChart] = useState(true);
  const [showMoreTesting, setShowMoreTesting] = useState(false);
  const [moreTestingButtonTitle, setmoreTestingButtonTitle] = useState("More Testing");
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const toggleMoreTesting = () => {
    const currentShowMoreTesting = showMoreTesting;
    setShowMoreTesting(!currentShowMoreTesting);
    setmoreTestingButtonTitle(currentShowMoreTesting ? "More Testing Features" : "Less Testing Features");
  };

  return (
    <SafeAreaView  style={{ flex: 1 }} >
      {showMoreTesting &&
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />}
      <View style={{ flex: 1}}>
        <ScrollView style = {styles.scrollViewContainer} >
      {showMoreTesting &&
        <Header />
      }
        <View style={styles.container}>
          <MapViewComponent 
            showMoreTesting = {showMoreTesting}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Victory" onPress={() => setShowVictoryChart(true)} />
          <Button title="Chart-Kit" onPress={() => setShowVictoryChart(false)} />
        </View>
        <View style={styles.container}>
          {showVictoryChart ? (
            <VictoryChartComponent />
          ) : (
            <GitChartComponent />
          )}
        </View>        

        {showMoreTesting &&
        <View style={styles.container}>
          <TwrncComponent />
        </View>        
        }

        {showMoreTesting &&
        <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.black : Colors.white }]}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
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
        }
      </ScrollView>
      <View style={ [styles.buttonContainerBottom, { position: 'absolute', bottom: 0, width: '100%'}]} >
          <Button title={moreTestingButtonTitle} onPress={() => toggleMoreTesting()} />
      </View>
    </View>
    </SafeAreaView>
  );
}

export default App;
