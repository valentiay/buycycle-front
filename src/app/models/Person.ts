export class Person {
  name: string;
  lenders: Map<string, number> = new Map();
  borrowers: Map<string, number> = new Map();

  constructor(name: string, lenders: Map<string, number> = new Map(), borrowers: Map<string, number> = new Map()) {
    this.name = name;
    this.lenders = lenders;
    this.borrowers = borrowers;
  }
}
