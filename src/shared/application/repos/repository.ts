export type DefaultFilterParams = {};

export interface ISaveRepository<T = any> {
  save(entity: T): Promise<T>;
}

export interface IGetByIdRepository<T> {
  getById(id: string): Promise<T | null>;
}

export interface IUpdateRepository<T> {
  update(entity: T): Promise<T>;
}

export interface IDeleteByIdRepository<T> {
  deleteById(id: string): Promise<T>;
}

export interface IGetByFilterRepository<K, T> {
  getByFilter(filter: K): Promise<T[]>;
}

export interface ICountRepository<K> {
  count(filter: K): Promise<number>;
}
