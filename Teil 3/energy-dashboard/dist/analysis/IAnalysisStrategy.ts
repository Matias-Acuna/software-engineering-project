// Interface for analysis strategies
export interface IAnalysisStrategy {
  // Method that takes an array of numbers and returns a number result
  analyze(values: number[]): number;
}
