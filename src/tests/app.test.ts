import app from '../index';
import supertest from 'supertest';
import imageController from '../controllers/imageController';
import fs, { promises as fsPromises } from 'fs';

describe('Test app main routes', (): void => {
  it('GET /convert/fjord.jpg = HAVE TO CONVERT THE IMAGE SUCCESSFULLY', async (): Promise<void> => {
    await supertest(app).get('/convert/fjord.jpg').expect(200);
  });

  it('GET /convert/fjord1.jpg = HAVE NOT TO CONVERT THE IMAGE', async (): Promise<void> => {
    await supertest(app).get('/convert/fjord1.jpg').expect(500);
  });
});

describe('Unit testing', async (): Promise<void> => {
  const dirName = __dirname + '/../../images/converted';
  const fileName = 'fjord.jpg';
  beforeAll(async () => {
    if (fs.existsSync(dirName + '/' + fileName)) {
      await fsPromises.unlink(dirName + '/' + fileName);
    }
  });
  it('Test creating image', async () => {
    await imageController.convert(fileName);
    const exists = fs.existsSync(dirName + '/' + fileName);
    expect(exists).toBeTruthy();
  });
});
