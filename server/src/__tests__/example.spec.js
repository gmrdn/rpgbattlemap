const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);

describe("Test the room path", () => {
  it("gets the api/room endpoint", async done => {
    jest.setTimeout(30000);

    const response = await request.get("/api/room");

    expect(response.status).toBe(200);
    done();
  });
});
