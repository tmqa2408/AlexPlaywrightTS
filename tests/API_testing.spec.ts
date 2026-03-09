import { test, request, expect } from "@playwright/test";
import pageAllObjects from "../test-data/pageAllObjects.json";

test.describe("API testing", () => {
  // 1. GET request to retrieve all objects
  test("GET All objects", async ({ request }) => {
    const response = await request.get("https://social-network.samuraijs.com/api/1.0/users");

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toEqual(pageAllObjects);
  });

  // 2. GET requesr a single object
  test("GET a single object", async ({ request }) => {
    const response = await request.get("https://social-network.samuraijs.com/api/1.0/profile/32747");

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    //console.log(responseBody);

    expect(responseBody.fullName).toBe("pozdn");
  });

  // 3. POST create object
  test("POST create object", async ({ request }) => {
    const response = await request.post("https://social-network.samuraijs.com/api/1.0/follow/1");

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
  });

  // 4. DELETE an object
  test("DELETE an object", async ({ request }) => {
    const response = await request.delete(
      "https://api.restful-api.dev/objects/6",
    );

    console.log(response.status());
  });
});
