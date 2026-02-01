export class Device {
    constructor(name, publisher) {
        this.name = name;
        this.publisher = publisher;
    }
    generateData() {
        const value = this.simulateData();
        console.log(`Device ${this.name} generated value: ${value}`);
        this.publisher.notify(this, value);
        return value;
    }
    simulateData() {
        return Math.floor(Math.random() * 100 + 20);
    }
}
