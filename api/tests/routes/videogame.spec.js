/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const request = require('supertest');
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");
const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  desciption: "The best game",
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });
  describe("Create Videogame: ", () => {
    it("Should Create a videogame", (done) => {
        request(app)
        .post("/videogame")
        .send({ name: "undertale"})
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
