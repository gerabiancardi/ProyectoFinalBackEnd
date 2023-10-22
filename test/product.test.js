import supertest from 'supertest';
import chai from 'chai';
//import app from "../src/app.js";

const expect= chai.expect
const requester= supertest('http://localhost:8080')
describe("Products Test /", function() {
  it("it should has status code 200", async function() {
   const response = await requester
    .get('/api/products')
    .then(response => {
        return response;
    }); 
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property("payload")
  });

});

