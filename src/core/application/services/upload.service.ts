import { File } from '@/core/domain';

export interface IUploadService {
  upload(file: File, folder?: string): Promise<string>;
  signUrl(url: string): Promise<string>;
  delete(url: string): Promise<void>;
}
