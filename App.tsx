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
import ReactApexChart from 'react-apexcharts';
import { LineChart } from 'react-native-chart-kit';

import { 
  VictoryBar, VictoryChart, VictoryTheme,
  VictoryStack, VictoryAxis, 
 } from "victory-native";

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

const myDataset = [
  [
      { x: "01/08", y: 5 },
      { x: "02/08", y: 2 },
      { x: "03/08", y: 3 },
      { x: "04/08", y: 2 },
      { x: "05/08", y: 1 }
  ],
  [
      { x: "01/08", y: 2 },
      { x: "02/08", y: 3 },
      { x: "03/08", y: 4 },
      { x: "04/08", y: 5 },
      { x: "05/08", y: 5 }
  ],
  [
      { x: "01/08", y: 1 },
      { x: "02/08", y: 2 },
      { x: "03/08", y: 3 },
      { x: "04/08", y: 4 },
      { x: "05/08", y: 4 }
  ]
];
function randomizeDataset(dataset: { x: string; y: number; }[][]) {
  return dataset.map(data => 
    data.map(datum => ({
      ...datum,
      y: Math.floor(Math.random() * 8) + 1  // Randomize y between 1 and 8
    }))
  );
}


// export default class App extends Component {
function App(): React.JSX.Element {
  const [showVictoryChart, setShowVictoryChart] = useState(true);
  const [dataset, setDataset] = useState(randomizeDataset(myDataset));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataset(randomizeDataset(myDataset));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  // Mapbox.setConnected(true);
  Mapbox.setTelemetryEnabled(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const chartOptions = {
    // Define your chart options here
    chart: {
      type: 'line',
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  };

  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
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
          <VictoryChart domainPadding={{ x: 30, y: 20 }} animate={{ duration: 500 }}>
            <VictoryStack
              colorScale={["#019783", "#7BD4C2", "#E9C060"]} // Your color scale here
            >
              {dataset.map((data, i) => (
                <VictoryBar
                  key={i}
                  data={data}
                  style={{ data: { width: 12 } }}
                  animate={{
                    onExit: {
                      duration: 500,
                      before: () => ({
                        _y: 0,
                        fill: "orange",
                        label: "BYE"
                      })
                    }
                  }}
                />
              ))}
            </VictoryStack>
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `${tick}`}
            />
            <VictoryAxis
              tickFormat={["01/08", "02/08", "03/08", "04/08", "05/08"]}
            />
          </VictoryChart>
        ): (
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
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
