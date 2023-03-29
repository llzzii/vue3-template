export class DataQueue {
  comparator: any;
  sorted = false;
  contents: any = [];
  constructor(comparator) {
    this.comparator = comparator;
  }
  sort(fn?) {
    fn=fn?fn:this.comparator;
    this.contents.sort(fn);
    this.sorted = true;
  }
  push(data) {
    this.contents.push(data);
    this.sorted = false;
  }
  peek(index?) {
    if (!this.sorted) this.sort();
    if (index == undefined) index = this.contents.length - 1;
    return this.contents[index];
  }
  pop() {
    if (!this.sorted) this.sort();
    return this.contents.pop();
  }
  size() {
    return this.contents.length;
  }
  map(cb) {
    return this.contents.map(cb);
  }
  debug() {
    if (!this.sorted) this.sort();
    return this.contents;
  }
}
