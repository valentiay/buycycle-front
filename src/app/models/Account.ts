export class Account {
  name: string;
  createdAt: string;

  mode: 'public' | 'publicRestricted' | 'private';

  constructor(name: string, mode: 'public' | 'publicRestricted' | 'private') {
    this.name = name;
    this.mode = mode;
  }
}
