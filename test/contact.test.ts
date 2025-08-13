import supertest from "supertest";
import { ContactTest, UserTest } from "./test-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should create new contact", async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Anggyar",
                last_name: "Muhamad Yahya",
                email: "anggyar@mail.com",
                phone: "08900112233",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("Anggyar");
        expect(response.body.data.last_name).toBe("Muhamad Yahya");
        expect(response.body.data.email).toBe("anggyar@mail.com");
        expect(response.body.data.phone).toBe("08900112233");
    });
    it("should create new contact", async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "anggyar",
                phone: "08900112233830802348028",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});
