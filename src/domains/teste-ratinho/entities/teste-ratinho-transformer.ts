import { TesteRatinho, TesteRatinhoDTO } from './teste-ratinho';

export class TesteRatinhoTransformer {
  static generateDTO(testeRatinho: TesteRatinho): TesteRatinhoDTO {
    return {
      id: testeRatinho.id,
      enabled: testeRatinho.enabled,
      name: testeRatinho.name,
      createdAt: testeRatinho.createdAt,
      updatedAt: testeRatinho.updatedAt,
    };
  }
}
