import { expect } from "chai";
import { app } from "../server.js"

import supertest from "supertest";
const request = supertest(app);

describe('testing books controllers', async function() {
    it('testing get all books', async function() {
        const res = await request.get("/api/Books");
        expect(res.status).to.equal(200);
    });

    it('testing get a specific book', async function() {
        const res = await request.get("/api/Books/1");
        expect(res.status).to.equal(200);
    });

    it('testing creating a book', async function() {
        const res = await request.post("/api/Books");
        expect(res.status).to.equal(200);
    });

    it('testing updating a specific book', async function() {
        const res = await request.patch("/api/Books/1");
        expect(res.status).to.equal(200);
    });

    it('testing deleting a specific book', async function() {
        const res = await request.delete("/api/Books/1");
        expect(res.status).to.equal(200);
    });

});

// it('2. The surface area of the Cube', function(done) {

//     const res = await request
//     .get("/api/Books")
//     .set("content-type", "application/json")
//     .set("Authorization", `Bearer ${token}`)
//     .send({
//       name: "testProduct",
//       price: 31.9,
//       category: "test",
//     });

    
// let c2 = new Cube(5);
// expect(c2.getSurfaceArea()).to.equal(150);
// done();
// });

// it('3. The volume of the Cube', function(done) {
// let c3 = new Cube(7);
// expect(c3.getVolume()).to.equal(343);
// done();
// });

// });