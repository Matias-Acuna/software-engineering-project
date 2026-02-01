// This class implements the IAnalysisStrategy interface
export class MaxPeakStrategy {
    // The analyze method returns the highest value in the data array
    analyze(data) {
        if (data.length === 0)
            return 0; // Return 0 if no data
        return Math.max(...data); // Return max value
    }
}
