import { diskStorage } from "multer";
import { ForbiddenException } from "@nestjs/common";

export const saveImageStorage = {
    storage: diskStorage({
        destination: "./upload/avatar",
        filename: (req, file, cb) => {
            const name = file.originalname.split('.')[0];
            const suffix = Date.now()
            cb(null, `${name}-${suffix}.jpg`);
        }
    }),
    filter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(
              new ForbiddenException('Only image files are allowed!'),
              false,
            );
          }
          cb(null, true);
    }
}

//const upload = multer({ storage: saveImageStorage });

