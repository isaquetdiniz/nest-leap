export interface TesteRatinhoDTO {
  id?: string;
  enabled?: boolean;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TesteRatinho {
  id?: string;
  name: string;
  enabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(testeRatinhoParams: TesteRatinhoDTO) {
    const { id, enabled, name, createdAt, updatedAt } = testeRatinhoParams;

    this.id = id;
    this.enabled = enabled ?? true;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    Object.freeze(this);
  }
}
