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
      const id = "5eb3006a6fb25ec2e272a290";
      chai
        .request(app)
        .get(`/api/room/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should return 404 when room is not found", (done) => {
      const id = "5eb3006a6fb25ec2e272a299";
      chai
        .request(app)
        .get(`/api/room/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
