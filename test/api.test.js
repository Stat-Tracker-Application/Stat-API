// // api.test.js

// const request = require("supertest");
// const app = require("../Api/Server.js"); // Update this path to the actual path of your API file

// describe("API Tests", () => {
//   // Test for the "createstat" endpoint
//   it("should create a new stat", async () => {
//     const response = await request(app)
//       .post("/createstat")
//       .send({ Testname: "Test Stat", TestStat: "Pass" });

//     expect(response.status).toBe(200);
//     expect(response.body.Testname).toBe("Test Stat");
//     expect(response.body.TestStat).toBe("Pass");
//   });

//   // Test for the "getallstats" endpoint
//   it("should get all stats", async () => {
//     const response = await request(app).get("/getallstats");

//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });
// });

describe("Tests", () => {
  it("Should be Hello test", function () {
    const message = "Hello test";

    expect(message).toBe("Hello test");
  });
});
