import { IObserver } from "./IObserver";
import { Device } from "./Device";

// This class manages a list of observers that listen for new data from devices
export class EnergyDataPublisher {
  private observers: IObserver[] = [];

  // Add a new observer to the list
  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  // Notify all observers when a device has new data
  notify(device: Device, value: number): void {
    this.observers.forEach(observer => observer.update(device, value));
  }
}
