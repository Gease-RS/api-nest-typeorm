import { Request } from 'express';
import { extname } from 'path';
import { promisify } from 'util';
import { unlink } from 'fs';

const unlinkAsync = promisify(unlink);

export class FileHelper {
  static saveImageStorage(file: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }
  static customFilename(req: Request, file: Express.Multer.File, cb: any) {
    const filename = `${Date.now()}${extname(file.originalname)}`;
    const nameFile = cb(null, filename);

    return nameFile;
  }

  static async removeFile(file: string) {
    try {
      await unlinkAsync(file);
    } catch (err) {
      throw new Error('Arquivo não encontrado');
    }
    return true;
  }
}