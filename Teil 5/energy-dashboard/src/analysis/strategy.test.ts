import { AverageStrategy } from './AverageStrategy';
import { EnergySavingStrategy } from './EnergySavingStrategy';
import { MaxPeakStrategy } from './MaxPeakStrategy';

// Tests for AverageStrategy class
describe('AverageStrategy', () => {
  // Check if it calculates the average of numbers correctly
  it('should calculate the average consumption', () => {
    const strategy = new AverageStrategy();
    const data = [10, 20, 30];
    expect(strategy.analyze(data)).toBe(20); // average of 10, 20, 30 is 20
  });

  // Check behavior with empty array (should return 0)
  it('should return 0 for empty array', () => {
    const strategy = new AverageStrategy();
    expect(strategy.analyze([])).toBe(0);
  });
});

// Tests for EnergySavingStrategy class
describe('EnergySavingStrategy', () => {
  // Check if it calculates difference between max and min consumption
  it('should calculate the difference between max and min consumption', () => {
    const strategy = new EnergySavingStrategy();
    const data = [5, 5, 10, 20];
    // According to implementation: max = 20, min = 5, result = 20 - 5 = 15
    expect(strategy.analyze(data)).toBe(15);
  });

  // Check behavior with empty array (should return 0)
  it('should return 0 for empty array', () => {
    const strategy = new EnergySavingStrategy();
    expect(strategy.analyze([])).toBe(0);
  });

  // Additional test for single element input
  it('should handle single-element array', () => {
    const strategy = new EnergySavingStrategy();
    expect(strategy.analyze([42])).toBe(0); // max = min = 42, 42 - 42 = 0
  });
});

// Tests for MaxPeakStrategy class
describe('MaxPeakStrategy', () => {
  // Check if it returns the max peak value from data array
  it('should return the max peak value', () => {
    const strategy = new MaxPeakStrategy();
    const data = [7, 12, 3, 18, 9];
    expect(strategy.analyze(data)).toBe(18); // max value is 18
  });

  // Check behavior with empty array (should return 0)
  it('should return 0 for empty array', () => {
    const strategy = new MaxPeakStrategy();
    expect(strategy.analyze([])).toBe(0);
  });
});
