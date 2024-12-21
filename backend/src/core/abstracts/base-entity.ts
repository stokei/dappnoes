import { randomUUID } from 'node:crypto';

export abstract class BaseEntity {
  readonly id: string;

  constructor(data?: BaseEntity) {
    this.id = data?.id || randomUUID();
  }
}
