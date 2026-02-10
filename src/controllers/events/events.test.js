const request = require("supertest");
const app = require("../../app");

describe("Test GET /events", () => {
    test("it should respond with 200 success", async () => {
        await request(app).get('/events').expect(200);
    });
});

describe("Test POST /events", () => {
    test('it should test with 201 success', async () => {
        const validEvent = {
            "name": "Test event", 
            "description": "Test description", 
            "city": "paris"
        }

        await request(app).post('/events').send(validEvent).expect(201)
    })

    test('it should catch missing required property', async () => {
        const invalidEvent = {
            "name": "Test event 2", 
            "description": "Test description 2" 
        }

        await request(app).post('/events').send(invalidEvent).expect(500)
    })
})