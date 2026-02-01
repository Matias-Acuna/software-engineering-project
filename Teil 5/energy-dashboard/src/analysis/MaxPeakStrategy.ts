import { IAnalysisStrategy } from "./IAnalysisStrategy";

// This class implements the IAnalysisStrategy interface
export class MaxPeakStrategy implements IAnalysisStrategy {
  // The analyze method returns the highest value in the data array
  analyze(data: number[]): number {
    if (data.length === 0) return 0; // Return 0 if no data
    return Math.max(...data); // Return max value
  }
}
