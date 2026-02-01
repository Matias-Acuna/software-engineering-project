export class EnergyDataPublisher {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notify(device, value) {
        this.observers.forEach(observer => observer.update(device, value));
    }
}
