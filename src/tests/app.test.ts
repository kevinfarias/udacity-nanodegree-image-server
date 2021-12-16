import app from '../index';
import supertest from 'supertest';

describe('Test app main routes', (): void => {
  it('GET /convert/fjord.jpg = HAVE TO CONVERT THE IMAGE SUCCESSFULLY', async (): Promise<void> => {
    await supertest(app).get('/convert/fjord.jpg').expect(200);
  });

  it('GET /convert/fjord1.jpg = HAVE NOT TO CONVERT THE IMAGE', async (): Promise<void> => {
    await supertest(app).get('/convert/fjord1.jpg').expect(500);
  });
});
