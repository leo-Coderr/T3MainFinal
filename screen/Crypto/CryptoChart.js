import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const BezierLineChart = () => {
  const screenWidth = Dimensions.get("window").width;

  // Set labels to empty strings to hide them
  const data = {
    labels: ["Jan", "Feb", "a", "d", "we", "asd"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: (opacity = 0) => `rgba(1, 1, 1, ${opacity})`, // Making the text color transparent
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, // Making the label color transparent
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        withInnerLines={false}
        withOuterLines={false}
        formatYLabel={() => ""}
        formatXLabel={() => ""} // This function returns an empty string for Y-axis labels
      />
    </View>
  );
};

export default BezierLineChart;
