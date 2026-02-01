import { IAnalysisStrategy } from "./IAnalysisStrategy";

// This strategy calculates energy saving potential
export class EnergySavingStrategy implements IAnalysisStrategy {
  analyze(data: number[]): number {
    if (data.length === 0) return 0;
    //  example: saving = max consumption - min consumption
    const max = Math.max(...data);
    const min = Math.min(...data);
    return max - min;
  }
}
