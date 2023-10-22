import supertest from 'supertest';
import chai from 'chai';
//import app from "../src/app.js";

const expect= chai.expect
const requester= supertest('http://localhost:8080')
describe("Session Test", function() {
  it("it should has status code 401", async function() {
    const data= {email:"pruba@gmail.com",password:"1234"}
    const response = await requester
    .post('/api/session/login')
    .send(data)
    .then(response => {
        return response;
    }); 
    expect(response.status).to.equal(401)
    expect(response.body.message).to.equal("usuario no registrado/existente")
  });
});