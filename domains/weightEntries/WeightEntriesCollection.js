import moment from 'moment';

/*
 * Class for handling weight entries
 */
export default class WeightEntriesCollection {
  
  /*
   * Constructor. Parses JSON object if necessary.
   */
  constructor(entries) {
    if(typeof entries === 'string') {
      entries = JSON.parse(entries);
    }

    this.entries = entries || [];
  }

  /*
   * For saving to AsyncStorage database
   */
  toJSON() {
    return JSON.stringify(this.entries);
  }

  /*
   * Returns entry for a date
   */
  getByDate(date) {
    return this.entries.find((entry) => {
      return new Date(entry.date).getTime() === date.getTime();
    });
  }

  /*
   * Adds (or updates entry)
   */
  addEntry(entry) {
    let existing = this.getByDate(entry.date);
    if(existing) {
      existing.weight = entry.weight;
      existing.waist = entry.waist;
    } else {
      this.entries.push(entry);
    }
  }

  /*
   * Sorts entries by date. Copies first to avoid unexpected changes.
   */
  getSorted(inverse = false) {
    return this.entries.slice().sort((e1, e2) => {
      const i = inverse ? -1 : 1;

      if(e1 === e2) return 0;
      return moment(e1).isAfter(e2) ? i*1 : i*-1;
    });
  }

  /*
   * Returns average of last N days, for key K
   */
  getAverage(n, k, m) {
    const sorted = this.getSorted(true);
    const index = sorted.length <= n ? 0 : sorted.length - n;
    const lastDays = sorted.slice(index, m ? (index+m) : undefined);
    const reducer = (acc, day) => {
      return acc + day[k];
    }

    return lastDays.reduce(reducer, 0) / lastDays.length;
  }

};