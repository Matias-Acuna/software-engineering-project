import { EnergyDataPublisher } from "./EnergyDataPublisher";

// Device class that generates energy data and sends it to the publisher
export class Device {
  constructor(public name: string, private publisher: EnergyDataPublisher) {}

  // Generates data and notifies the publisher
  generateData(): number {
    const value = this.simulateData();
    console.log(`Device ${this.name} generated value: ${value}`);
    this.publisher.notify(this, value);
    return value;
  }

  // Simulates random energy consumption data
  simulateData(): number {
    return Math.floor(Math.random() * 100 + 20);
  }
}
