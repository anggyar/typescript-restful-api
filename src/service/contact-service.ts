import { User } from "@prisma/client";
import {
    ContactResponse,
    CreateContactRequest,
    toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

export class ContactService {
    // ! CREATE CONTACT SKENARIO
    static async create(
        user: User,
        request: CreateContactRequest
    ): Promise<ContactResponse> {
        const createRequest: CreateContactRequest = Validation.validate(
            ContactValidation.CREATE,
            request
        ) as CreateContactRequest; //DIpakai jika, kondisi kepepet :D

        const record = {
            ...createRequest, //CANGGIH!!
            ...{ username: user.username },
        };

        const contact = await prismaClient.contact.create({
            data: record,
        });

        logger.debug("record : " + JSON.stringify(contact));
        return toContactResponse(contact);
    }

    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: id,
                username: user.username,
            },
        });

        if (!contact) {
            throw new ResponseError(404, "Contact not found");
        }

        return toContactResponse(contact);
    }
}
