// VictoryChartComponent.tsx

import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis } from "victory-native";

// Define your dataset here or pass it as a prop if needed
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

export const VictoryChartComponent = () => {
  const [dataset, setDataset] = useState(randomizeDataset(myDataset));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataset(randomizeDataset(myDataset));
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <VictoryChart domainPadding={{ x: 30, y: 20 }} animate={{ duration: 200 }}>
        <VictoryStack colorScale={["#019783", "#7BD4C2", "#E9C060"]}>
          {dataset.map((data, i) => (
            <VictoryBar
              key={i}
              data={data}
              style={{ data: { width: 12 } }}
              animate={{
                onExit: {
                  duration: 200,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    backgroundColor: "#f5fcff"
  }
});
