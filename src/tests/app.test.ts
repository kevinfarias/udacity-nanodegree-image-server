import app from "../index";
import supertest from "supertest";

describe("Test app main routes", (): void => {
    it("GET /convert = CONVERT IMAGES", async (): Promise<void> => {
        await supertest(app)
              .get("/convert")
              .expect(200)
              .then((response) => {
                expect(response.text).toEqual("Convertido com sucesso!");
              });
    });
});
