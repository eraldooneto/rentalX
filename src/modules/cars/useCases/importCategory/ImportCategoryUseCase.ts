import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
};

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {};
    
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();

            const categories: IImportCategory[] = [];

            stream.pipe(parseFile);  

            parseFile.on("data", async(line) => {
                const [name, description] = line;
                
                categories.push({
                    name,
                    description
                });
            }).on("end", () => {
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);
    }
}

export { ImportCategoryUseCase };