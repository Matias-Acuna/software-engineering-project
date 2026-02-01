import { Device } from "./Device";
import { EnergyDataPublisher } from "./EnergyDataPublisher";

describe("Device", () => {
  // Test for Device class
it("should call publisher.notify with the generated value", () => {
  // Create fake publisher with notify mocked
  const publisherMock = { notify: jest.fn() } as unknown as EnergyDataPublisher;
  const device = new Device("TestDevice", publisherMock);
  
  // Make simulateData return fixed number 42
  jest.spyOn(device, "simulateData").mockReturnValue(42);

  // Call generateData and save result
  const returned = device.generateData();

  // Check if returned value is 42
  expect(returned).toBe(42);

  // Check if notify was called with device and 42
  expect(publisherMock.notify).toHaveBeenCalledWith(device, 42);

  // Restore original simulateData method
  (device.simulateData as jest.Mock).mockRestore();
});
});
