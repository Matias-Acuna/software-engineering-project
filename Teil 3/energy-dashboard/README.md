# Energy Consumption Dashboard Project - Docs

## What I assumed and how I set things up

- Each data point is just a number showing how much energy (in watts) a device is using.
- Time is measured in seconds, with new data coming every 35 seconds.
- I simulated three devices: a fridge, a heater, and a washing machine.
- These devices generate random data every 5 seconds to mimic real usage.
- The time filter works by limiting how many data points to show, not by actual clock time.
- For analysis, I included a few methods: average consumption, peak usage, and possible energy savings.
- The whole thing is done in TypeScript, with an effort to keep the code clean and organized.
- There's no login system or users — just a simple app.
- The interface is basic, made with HTML and Chart.js, updating automatically.

## How to run the project

1. First, compile everything with `npx tsc`.
2. Then open `index.html` using a local server (I use the Live Server extension on VSCode).
3. That’s it — the dashboard updates itself every 5 seconds with simulated data.(The diferents analysis strategys find them on the bootom of the sit)

## Ideas for later improvements

- Add real time filters with actual dates and times.
- Add more types of devices and analysis methods.
- Let users pick their language or preferences.

---

