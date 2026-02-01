// This class implements the average calculation strategy
export class AverageStrategy {
    analyze(values) {
        const total = values.reduce((sum, v) => sum + v, 0);
        return values.length ? total / values.length : 0;
    }
}
