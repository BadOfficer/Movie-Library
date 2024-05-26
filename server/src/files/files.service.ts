import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    private readonly staticFolderPath = path.resolve(__dirname, '..', '..', '..', 'client', 'public', 'images');

    constructor() {
        this.ensureStaticFolderExists();
    }

    private async ensureStaticFolderExists() {
        try {
            await fs.access(this.staticFolderPath);
        } catch (e) {
            await fs.mkdir(this.staticFolderPath, { recursive: true });
        }
    }

    async createFiles(files: Express.Multer.File[]): Promise<string[]> {
        
        try {
            await this.ensureStaticFolderExists(); // Ensure the static folder exists before saving files

            const filesNames = await Promise.all(files.map(async file => {
                const fileName = `${uuid.v4()}.jpg`;
                const filePath = path.join(this.staticFolderPath, fileName);
                await fs.writeFile(filePath, file.buffer);
                return fileName;
            }));

            return filesNames;
        } catch (e) {
            throw new HttpException("Images don't added!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
