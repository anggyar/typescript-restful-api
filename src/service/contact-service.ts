import { Contact, User } from "@prisma/client";
import {
    ContactResponse,
    CreateContactRequest,
    GetContactRequest,
    toContactResponse,
    UpdateContactRequest,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

export class ContactService {
    // ! CREATE CONTACT SKENARIO
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
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

    // FUNCTION HELPER
    static async checkConcactMustExist(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });

        if (!contact) {
            throw new ResponseError(404, "Contact not found");
        }

        return contact;
    }
    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkConcactMustExist(user.username, id);
        return toContactResponse(contact);
    }

    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request) as UpdateContactRequest;
        await this.checkConcactMustExist(user.username, updateRequest.id);

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username,
            },
            data: updateRequest,
        });

        return toContactResponse(contact);
    }
}
