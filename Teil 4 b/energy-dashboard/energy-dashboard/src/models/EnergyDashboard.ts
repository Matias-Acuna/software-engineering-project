import { IObserver } from "./IObserver";
import { Device } from "./Device";
import { IAnalysisStrategy } from "../analysis/IAnalysisStrategy";
declare const Chart: any;

type TimeFilter = "all" | "lastMinute" | "lastHour";

// EnergyDashboard class implements observer interface to get updates from devices
export class EnergyDashboard implements IObserver {
  // Stores data by device name with values and timestamps
  private data: Map<string, { value: number; timestamp: Date }[]> = new Map();
  private chart: any;  // Chart.js instance
  private currentStrategy: IAnalysisStrategy; // Current analysis strategy used
  private currentTimeFilter: TimeFilter = "all"; // Filter for showing data by time

  // Colors for devices on the chart
  private deviceColors: { [deviceName: string]: string } = {
    "Kühlschrank": "rgba(0, 191, 255, 1)",
    "Heizung": "rgba(128, 128, 128, 1)",
    "Waschmaschine": "rgba(0, 128, 0, 1)"
  };

      // Here we create the chart using Chart.js library, setting type, labels and options
  constructor(strategy: IAnalysisStrategy) {
    this.currentStrategy = strategy;
    const ctx = document.getElementById("energyChart") as HTMLCanvasElement;

    // Initialize chart with empty data and axes labels
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Time" } },
          y: { title: { display: true, text: "Watts (W)" } }
        }
      }
    });
    console.log("EnergyDashboard initialized with strategy:", strategy.constructor.name);
  }

  // Method called when device sends new data
  update(device: Device, value: number): void {
    console.log(`Received update from ${device.name}: ${value}`);

    const name = device.name;
    const now = new Date();

    // If device not tracked yet, add it to data and chart datasets
    if (!this.data.has(name)) {
      this.data.set(name, []);
      this.chart.data.datasets.push({
        label: name,
        data: [],
        borderWidth: 2,
        fill: false,
        borderColor: this.deviceColors[name] || "rgba(0,0,0,1)",
        backgroundColor: this.deviceColors[name] || "rgba(0,0,0,1)",
        pointRadius: 3,
        pointHoverRadius: 6,
      });
    }

    // Add new value with timestamp to device data
    this.data.get(name)!.push({ value, timestamp: now });

    // Apply current time filter and update chart display
    this.applyTimeFilter();
    this.chart.update();

    // Render textual data and analysis results
    this.render();
  }

  // Applies the time filter to data shown on chart
  private applyTimeFilter() {
    const labelsSet = new Set<string>();
    this.chart.data.labels = [];
    this.chart.data.datasets.forEach((dataset: any) => {
      dataset.data = [];
    });

    const now = new Date();

    // Filter data per device according to selected time filter
    this.data.forEach((values, deviceName) => {
      const filteredValues = values.filter(({ timestamp }) => {
        switch (this.currentTimeFilter) {
          case "lastMinute":
            return now.getTime() - timestamp.getTime() <= 60000;
          case "lastHour":
            return now.getTime() - timestamp.getTime() <= 3600000;
          case "all":
          default:
            return true;
        }
      });

      // Find dataset for device and update with filtered values
      const dataset = this.chart.data.datasets.find((d: any) => d.label === deviceName);
      if (!dataset) return;

      filteredValues.forEach(({ value, timestamp }) => {
        const timeLabel = timestamp.toLocaleTimeString();
        if (!labelsSet.has(timeLabel)) {
          labelsSet.add(timeLabel);
          this.chart.data.labels.push(timeLabel);
        }
        dataset.data.push(value);
      });
    });

    // Sort labels so the chart shows time in order
    this.chart.data.labels.sort();
  }

  // Render info below chart with latest value and analysis
  render() {
    const output = document.getElementById("output");
    if (!output) return;

    let html = "";
    this.data.forEach((values, deviceName) => {
      const now = new Date();
      const filteredValues = values
        .filter(({ timestamp }) => {
          switch (this.currentTimeFilter) {
            case "lastMinute":
              return now.getTime() - timestamp.getTime() <= 60000;
            case "lastHour":
              return now.getTime() - timestamp.getTime() <= 3600000;
            case "all":
            default:
              return true;
          }
        })
        .map(v => v.value);

      // Use strategy to analyze filtered data values
      const analysisValue = this.currentStrategy.analyze(filteredValues);
      // Get latest value for display
      const latestValue = filteredValues.length > 0 ? filteredValues[filteredValues.length - 1] : 0;

      html += `
        <p><strong>${deviceName}</strong>: ${latestValue.toFixed(2)} W</p>
        <p>Analysis: ${analysisValue.toFixed(2)} W</p>
        <hr>
      `;
    });

    output.innerHTML = html;
  }

  // Change the analysis strategy used
  setStrategy(strategy: IAnalysisStrategy) {
    console.log("Dashboard strategy set to", strategy.constructor.name);
    this.currentStrategy = strategy;
    this.render();
  }

  // Change the time filter and update chart and display
  setTimeFilter(filter: TimeFilter) {
    console.log("Dashboard time filter set to", filter);
    this.currentTimeFilter = filter;
    this.applyTimeFilter();
    this.chart.update();
    this.render();
  }
}
