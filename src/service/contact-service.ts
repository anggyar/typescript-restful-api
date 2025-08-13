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
}
