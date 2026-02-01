// Device class that generates energy data and sends it to the publisher
export class Device {
    constructor(name, publisher) {
        this.name = name;
        this.publisher = publisher;
    }
    // Generates data and notifies the publisher
    generateData() {
        const value = this.simulateData();
        console.log(`Device ${this.name} generated value: ${value}`);
        this.publisher.notify(this, value);
        return value;
    }
    // Simulates random energy consumption data
    simulateData() {
        return Math.floor(Math.random() * 100 + 20);
    }
}
