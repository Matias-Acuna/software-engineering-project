// This class manages a list of observers that listen for new data from devices
export class EnergyDataPublisher {
    constructor() {
        this.observers = [];
    }
    // Add a new observer to the list
    addObserver(observer) {
        this.observers.push(observer);
    }
    // Notify all observers when a device has new data
    notify(device, value) {
        this.observers.forEach(observer => observer.update(device, value));
    }
}
