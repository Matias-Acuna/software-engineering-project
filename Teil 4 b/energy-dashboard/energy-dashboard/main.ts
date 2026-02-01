import { EnergyDataPublisher } from "./src/models/EnergyDataPublisher";
import { EnergyDashboard } from "./src/models/EnergyDashboard";
import { Device } from "./src/models/Device";
import { AverageStrategy } from "./src/analysis/AverageStrategy";
import { MaxPeakStrategy } from "./src/analysis/MaxPeakStrategy";
import { EnergySavingStrategy } from "./src/analysis/EnergySavingStrategy";
// Waits for the entire HTML document to be fully loaded before starting
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting app...");

  // Creates an instance of the data publisher and the dashboard using the average strategy
  const publisher = new EnergyDataPublisher();
  const dashboard = new EnergyDashboard(new AverageStrategy());

  // Registers the dashboard as an observer to the publisher
  publisher.addObserver(dashboard);

  // Simulates three different devices ( fridge, heater, washing machine)
  const devices = [
    new Device("Kühlschrank", publisher),
    new Device("Heizung", publisher),
    new Device("Waschmaschine", publisher)
  ];

  // Every 5 seconds, each device generates new data and it gets published
  setInterval(() => {
    devices.forEach(device => {
      const val = device.generateData(); // generateData probably notifies the dashboard
      console.log(`Device ${device.name} generated data: ${val}`);
    });
  }, 5000);

  // Gets the dropdown for selecting analysis strategy
  const strategySelect = document.getElementById("strategySelect");
  if (strategySelect) {
    // Listens for changes in selected strategy
    strategySelect.addEventListener("change", () => {
      const val = (strategySelect as HTMLSelectElement).value;
      console.log("Strategy changed:", val);

      // Updates the strategy in the dashboard based on the selected option
      switch (val) {
        case "average":
          dashboard.setStrategy(new AverageStrategy());
          break;
        case "maxPeak":
          dashboard.setStrategy(new MaxPeakStrategy());
          break;
        case "energySaving":
          dashboard.setStrategy(new EnergySavingStrategy());
          break;
      }

      dashboard.render(); // Refreshes the dashboard with the new strategy
    });
  }

  // Gets the dropdown for selecting a time filter
  const timeFilterSelect = document.getElementById("timeFilter");
  if (timeFilterSelect) {
    // Listens for changes in selected time filter (all time, last hour, last minute)
    timeFilterSelect.addEventListener("change", () => {
      const val = (timeFilterSelect as HTMLSelectElement).value as "all" | "lastMinute" | "lastHour";
      console.log("Time filter changed:", val);

      // Sets the selected time filter on the dashboard and re-renders
      dashboard.setTimeFilter(val);
      dashboard.render(); // Immediately updates the dashboard view
    });
  }
});
