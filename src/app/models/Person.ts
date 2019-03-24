export class Person {
  name: string;
  lenders: Map<string, string> = new Map();
  borrowers: Map<string, string> = new Map();

  constructor(name: string, lenders: Map<string, string> = new Map(), borrowers: Map<string, string> = new Map()) {
    this.name = name;
    this.lenders = lenders;
    this.borrowers = borrowers;
  }
}
