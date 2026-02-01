import { EnergyDataPublisher } from "./dist/models/EnergyDataPublisher.js";
import { EnergyDashboard } from "./dist/models/EnergyDashboard.js";
import { Device } from "./dist/models/Device.js";
import { AverageStrategy } from "./dist/analysis/AverageStrategy.js";
import { MaxPeakStrategy } from "./dist/analysis/MaxPeakStrategy.js";
import { EnergySavingStrategy } from "./dist/analysis/EnergySavingStrategy.js";

// This waits until the full HTML DOM is loaded before running the app logic
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, starting app...");

    // Create an instance of the publisher and a dashboard using the average strategy by default
    const publisher = new EnergyDataPublisher();
    const dashboard = new EnergyDashboard(new AverageStrategy());

    // Register the dashboard as an observer of the publisher so it reacts to data updates
    publisher.addObserver(dashboard);

    // Simulate three devices sending energy consumption data to the publisher
    const devices = [
        new Device("Kühlschrank", publisher), // Fridge
        new Device("Heizung", publisher),     // Heater
        new Device("Waschmaschine", publisher) // Washing Machine
    ];

    // Every 5 seconds, each device generates and sends new data
    setInterval(() => {
        devices.forEach(device => {
            const val = device.generateData(); // Simulate data generation
            console.log(`Device ${device.name} generated data: ${val}`); // Log the new data
        });
    }, 5000);

    // When the user changes the strategy from the dropdown
    const strategySelect = document.getElementById("strategySelect");
    if (strategySelect) {
        strategySelect.addEventListener("change", () => {
            const val = strategySelect.value;
            console.log("Strategy changed:", val);

            // Switch to the selected strategy and update the dashboard
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

            dashboard.render(); // Refresh the dashboard with the new strategy
        });
    }

    // When the user changes the time filter option
    const timeFilterSelect = document.getElementById("timeFilter");
    if (timeFilterSelect) {
        timeFilterSelect.addEventListener("change", () => {
            const val = timeFilterSelect.value;
            console.log("Time filter changed:", val);

            dashboard.setTimeFilter(val); // Update the dashboard's filter
            dashboard.render(); // Refresh the dashboard with the new filter
        });
    }
});
