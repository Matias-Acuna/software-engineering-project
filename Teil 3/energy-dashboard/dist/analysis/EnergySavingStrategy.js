export class EnergySavingStrategy {
    analyze(data) {
        if (data.length === 0)
            return 0;
        const max = Math.max(...data);
        const min = Math.min(...data);
        return max - min;
    }
}
