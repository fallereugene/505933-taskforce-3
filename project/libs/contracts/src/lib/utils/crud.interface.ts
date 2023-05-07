export interface CRUDRepository<E, R, I extends any = any> {
  findById(id: I): Promise<R | null>;
  create(item: E): Promise<R>;
  update(id: I, item: R): Promise<R>;
  delete(id: I): Promise<void>;
}
