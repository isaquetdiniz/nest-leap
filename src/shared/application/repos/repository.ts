export interface IRepository<T = unknown, K = unknown> {
  save(entity: T): Promise<T>;
  getById(id: string): Promise<T | null>;
  getByFilter(filter: K): Promise<T[]>;
  update(entity: T): Promise<T>;
  deleteById(id: string): void;
  count(filter: K): Promise<number>;
}
