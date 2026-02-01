import { Device } from "./Device";

// Interface that defines the update method for observers
export interface IObserver {
  update(device: Device, value: number): void;
}
