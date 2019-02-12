export class Person {
  id: string;
  name: string;
  lenders: Map<string, string>;
  borrowers: Map<string, string>;

  constructor(name: string, id: string, lenders: Map<string, string> = new Map(), borrowers: Map<string, string> = new Map()) {
    this.id = id;
    this.name = name;
    this.lenders = lenders;
    this.borrowers = borrowers;
  }
}
