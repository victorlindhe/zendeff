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
      console.log(entry);
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
   * Sorts entries by date
   */
  getSorted() {
    return this.entries.sort((e1, e2) => {
      let e1time = e1.date.getTime(), e2time = e2.date.getTime();

      if(e1time === e2time) return 0;
      return e1time > e2time ? 1 : -1;
    });
  }

};