export class MaxPeakStrategy {
    analyze(data) {
        if (data.length === 0)
            return 0;
        return Math.max(...data);
    }
}
