export class DateCalculator {
  static milliseconds: number = 1000;
  static seconds: number = 60;
  static minutes: number = 60;
  static hours: number = 24;
  static days: number = 30;

  static get millisecondsInAMonth(): number {
    return this.millisecondsInADay * this.days;
  }

  static get millisecondsInADay(): number {
    return this.milliseconds * this.seconds * this.minutes * this.hours;
  }

  static monthsSince(date: Date): number {
    return (Date.now() - date.getTime()) / this.millisecondsInAMonth;
  }
}
