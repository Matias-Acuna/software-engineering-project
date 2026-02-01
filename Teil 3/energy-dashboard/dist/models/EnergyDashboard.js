export class EnergyDashboard {
    constructor(strategy) {
        this.data = new Map();
        this.currentTimeFilter = "all";
        this.deviceColors = {
            "Kühlschrank": "rgba(0, 191, 255, 1)",
            "Heizung": "rgba(128, 128, 128, 1)",
            "Waschmaschine": "rgba(0, 128, 0, 1)"
        };
        this.currentStrategy = strategy;
        const ctx = document.getElementById("energyChart");
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
    update(device, value) {
        console.log(`Received update from ${device.name}: ${value}`);
        const name = device.name;
        const now = new Date();
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
        this.data.get(name).push({ value, timestamp: now });
        this.applyTimeFilter();
        this.chart.update();
        this.render();
    }
    applyTimeFilter() {
        const labelsSet = new Set();
        this.chart.data.labels = [];
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        const now = new Date();
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
            const dataset = this.chart.data.datasets.find((d) => d.label === deviceName);
            if (!dataset)
                return;
            filteredValues.forEach(({ value, timestamp }) => {
                const timeLabel = timestamp.toLocaleTimeString();
                if (!labelsSet.has(timeLabel)) {
                    labelsSet.add(timeLabel);
                    this.chart.data.labels.push(timeLabel);
                }
                dataset.data.push(value);
            });
        });
        this.chart.data.labels.sort();
    }
    render() {
        const output = document.getElementById("output");
        if (!output)
            return;
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
            const analysisValue = this.currentStrategy.analyze(filteredValues);
            const latestValue = filteredValues.length > 0 ? filteredValues[filteredValues.length - 1] : 0;
            html += `
        <p><strong>${deviceName}</strong>: ${latestValue.toFixed(2)} W</p>
        <p>Analysis: ${analysisValue.toFixed(2)} W</p>
        <hr>
      `;
        });
        output.innerHTML = html;
    }
    setStrategy(strategy) {
        console.log("Dashboard strategy set to", strategy.constructor.name);
        this.currentStrategy = strategy;
        this.render();
    }
    setTimeFilter(filter) {
        console.log("Dashboard time filter set to", filter);
        this.currentTimeFilter = filter;
        this.applyTimeFilter();
        this.chart.update();
        this.render();
    }
}
