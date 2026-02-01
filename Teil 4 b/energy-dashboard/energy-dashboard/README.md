# Energy Consumption Dashboard Project - Docs

## What I assumed and how I set things up

* Each data point is just a number showing how much energy (in watts) a device is using.
* Time is measured in seconds, with new data coming every 35 seconds.
* I simulated three devices: a fridge, a heater, and a washing machine.
* These devices generate random data every 5 seconds to mimic real usage.
* The time filter works by limiting how many data points to show, not by actual clock time.
* For analysis, I included a few methods: average consumption, peak usage, and possible energy savings.
* The whole thing is done in TypeScript, with an effort to keep the code clean and organized.
* There's no login system or users — just a simple app.
* The interface is basic, made with HTML and Chart.js, updating automatically.

## How to run the project

1. First, compile everything with `npx tsc`.
2. Then open `index.html` using a local server (I use the Live Server extension on VSCode).
3. That’s it — the dashboard updates itself every 5 seconds with simulated data. (The different analysis strategies can be found at the bottom of the site.)

## How to run the tests

1. Make sure you have installed the dependencies with `npm install`.
2. Run the tests using the command `npm test`.
3. Jest will execute the unit tests and show you which tests passed or failed.
4. All tests are in the `src` folder and check important logic like analysis strategies and device behavior.

## Ideas for later improvements

* Add real time filters with actual dates and times.
* Add more types of devices and analysis methods.
* Let users pick their language or preferences.


