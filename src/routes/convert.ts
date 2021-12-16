import express from 'express';
import imageController from '../controllers/imageController';
import path from 'path';
const router = express.Router();

router.get(
  '/:file',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.params.file;
    try {
      const ret = await imageController.convert(filename);
      if (ret) {
        res.sendFile(path.resolve(ret));
      } else {
        res.status(500).send('Erro desconhecido!');
      }
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);

export default router;
