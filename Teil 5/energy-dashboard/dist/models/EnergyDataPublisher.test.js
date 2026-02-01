import { EnergyDataPublisher } from "./EnergyDataPublisher";
describe("EnergyDataPublisher", () => {
    // Test for EnergyDataPublisher class
    it("should notify all observers when notify is called", () => {
        const publisher = new EnergyDataPublisher();
        // Create two fake observers with update function mocked
        const observer1 = { update: jest.fn() };
        const observer2 = { update: jest.fn() };
        // Add observers to publisher
        publisher.addObserver(observer1);
        publisher.addObserver(observer2);
        // Fake device and value to send
        const fakeDevice = {};
        const fakeValue = 123;
        // Call notify to send data to observers
        publisher.notify(fakeDevice, fakeValue);
        // Check if update called on both observers with correct params
        expect(observer1.update).toHaveBeenCalledWith(fakeDevice, fakeValue);
        expect(observer2.update).toHaveBeenCalledWith(fakeDevice, fakeValue);
    });
});
