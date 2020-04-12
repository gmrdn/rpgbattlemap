import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";

chai.use(chaiHttp);
chai.should();

describe("Rooms", () => {
  describe("GET /api/room", () => {
    it("should get all rooms record", (done) => {
      chai
        .request(app)
        .get("/api/room")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });

    it("should get a single room record", (done) => {
      const id = "jIvEPTjGW";
      chai
        .request(app)
        .get(`/api/room/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
