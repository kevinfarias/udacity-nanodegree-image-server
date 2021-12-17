import express from 'express';
import imageController from '../controllers/imageController';
import path from 'path';
const router = express.Router();

router.get(
  '/:file?/:width?/:height?',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.params.file;
    const width = Number(req.params.width);
    const height = Number(req.params.height);
    if (!filename || !width || !height) {
      res
        .status(400)
        .send(
          'Sorry, one of the following required parameters was not passed: /convert/{filenameDotExtension}/{width}/{height}'
        );
      return;
    }
    try {
      const ret = await imageController.convert(filename, width, height);
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
