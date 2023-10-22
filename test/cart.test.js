import supertest from 'supertest';
import chai from 'chai';
//import app from "../src/app.js";

const expect= chai.expect
const requester= supertest('http://localhost:8080')
describe("Test carts", function() {
  it("get all carts should has status code 200", async function() {
   const response = await requester
    .get('/api/carts')
    .then(response => {
        return response;
    }); 
    expect(response.status).to.equal(200)
    expect(response.body[0]).to.have.property("_id")
  });
});