// This strategy calculates energy saving potential
export class EnergySavingStrategy {
    analyze(data) {
        if (data.length === 0)
            return 0;
        // Simplified example: saving = max consumption - min consumption
        const max = Math.max(...data);
        const min = Math.min(...data);
        return max - min;
    }
}
