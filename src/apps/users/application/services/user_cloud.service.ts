export interface IUserCloudService {
  deleteByEmail(email: string): Promise<void>;
  getByEmail(email: string): Promise<{ email: string; status: string } | null>;
  save(email: string): Promise<void>;
}
