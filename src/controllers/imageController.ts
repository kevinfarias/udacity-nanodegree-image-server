import fs, { promises as fsPromises } from 'fs';
import sharp from 'sharp';

class imageController {
  static async convert(image: string): Promise<string> {
    const dirName = __dirname + '/../../images/converted';
    const dirFull = __dirname + '/../../images/full';
    const fileName = dirFull + '/' + image;

    /* create output dir if not exists */
    if (!fs.existsSync(dirName)) {
      await fsPromises.mkdir(dirName);
    }

    /* detect if file exists */
    if (!fs.existsSync(fileName)) {
      throw new Error(`Image ${fileName} does not exists!`);
    }
    const newFile = dirName + '/' + image;
    if (!fs.existsSync(newFile)) {
      await sharp(fileName)
        .resize({ width: 200 })
        .toFile(newFile)
        .catch((e: any) => {
          console.log('error', e);
        });
    }

    return newFile;
  }
}

export default imageController;
