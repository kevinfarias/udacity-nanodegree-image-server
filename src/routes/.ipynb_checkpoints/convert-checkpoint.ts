import express from 'express';
import fs, { promises as fsPromises } from 'fs';
import sharp from 'sharp';
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const dirName = __dirname + '/../../images/converted';
    const dirFull = __dirname + '/../../images/full';
    console.log('dirname', dirName);
    if (!fs.existsSync(dirName)) {
        await fsPromises.mkdir(dirName);
    }
    const dir = await fsPromises.readdir(dirFull);
    dir.map(async (item: string) => {
        const newFile = dirName + '/' + item;
        if (!fs.existsSync(newFile)) {
            try {
                await sharp(`${dirFull}/${item}`)
                  .resize({ width: 200 })
                  .toFile(dirName + '/' + item);
            } catch (e) {
                res.status(500).send(`Error converting ${item}: ${e.message} (${e.name})`);
            }
        }
     });
      
     res.status(200).send('Convertido com sucesso!');
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
});

export default router;