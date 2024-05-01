import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
    async createFiles(files) {
        try {
            const filesNames = []
            files.map(file => {
                const fileName = uuid.v4() + '.jpg';
                const filePath = path.resolve(__dirname, "..", "static")
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true})
                }
                fs.writeFileSync(path.join(filePath, fileName), file.buffer);
                filesNames.push(fileName);
            })
            console.log(filesNames);
            
            return filesNames;
        } catch(e) {
            throw new HttpException("Images don't added!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
