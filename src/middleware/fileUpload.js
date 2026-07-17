import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            const uniqueName = uuidv4() + '_' + file.originalname;
            cb(null, uniqueName);
        }
    });

    const fileFilter = (req, file, cb) => {
        cb(null, true);
    };

    return multer({ storage, fileFilter });
};

export const uploadSingleFile = (fieldname) => {
    return fileUpload().single(fieldname);
};

export const uploadmixOfFiles = (fields) => {
    return fileUpload().fields(fields);
};
