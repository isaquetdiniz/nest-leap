import * as crypto from 'crypto';

export class RandomCode {
  private readonly code: string;

  constructor(length: number) {
    this.code = crypto
      .randomBytes(length)
      .toJSON()
      .data.map((x) => `${x % 10}`)
      .join('');
  }

  getCode() {
    return this.code;
  }
}
