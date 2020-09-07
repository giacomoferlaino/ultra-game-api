import { v4 as uuidv4 } from 'uuid';

export class Publisher {
  constructor(
    readonly id: string = '',
    readonly name: string = '',
    readonly siret: number = 0.0,
    readonly phone: string = '',
  ) {}

  // Publisher factory method
  static create(name: string, siret: number, phone: string): Publisher {
    const newId: string = uuidv4();
    return new Publisher(newId, name, siret, phone);
  }
}
