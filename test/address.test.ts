import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts:/contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan belum ada",
        city: "Jakarta",
        province: "DKI Jakarta",
        country: "Indonesia",
        postal_code: "111111",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe("Jalan belum ada");
    expect(response.body.data.city).toBe("Jakarta");
    expect(response.body.data.province).toBe("DKI Jakarta");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("111111");
  });

  it("should be return error if data is missing", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should be return error contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan belum ada",
        city: "Jakarta",
        province: "DKI Jakarta",
        country: "Indonesia",
        postal_code: "111111",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contacId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe(address.street);
    expect(response.body.data.city).toBe(address.city);
    expect(response.body.data.province).toBe(address.province);
    expect(response.body.data.country).toBe(address.country);
    expect(response.body.data.postal_code).toBe(address.postal_code);
  });

  it("should reject if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if contact is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
