import { test, request, expect } from "@playwright/test";

test.describe("API testing", () => {
  // 1. GET request 
  test("GET #1", async ({ request }) => {
    const apiKey = 'K8IlbKrgEOMJNf6RdrKlxL1lfoCnZnljsy0ezxZU';
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    const response = await request.get(URL);

    console.log("Response status:", response.status());
    
    if (response.ok()) {
      const responseBody = await response.json();
      console.log("Success! Response:", responseBody);
    } else {
      const responseText = await response.text();
      console.log("Error response:", responseText.substring(0, 300));
    }
  });
});