export interface IRepository<T = any, K = any> {
  save(entity: T): Promise<T>;
  getById(id: string): Promise<T | null>;
  getByFilter(filter: K): Promise<T[]>;
  update(entity: T): Promise<T>;
  deleteById(id: string): Promise<T>;
  count(filter: K): Promise<number>;
}
