import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    ) as CreateAddressRequest;

    await ContactService.checkConcactMustExist(
      user.username,
      request.contact_id
    );

    const address = await prismaClient.address.create({
      data: createRequest,
    });

    return toAddressResponse(address);
  }

  static async checkAddressMustExists(
    contactId: number,
    addressId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(
      AddressValidation.GET,
      request
    ) as GetAddressRequest;

    await ContactService.checkConcactMustExist(
      user.username,
      request.contact_id
    );

    const address = await this.checkAddressMustExists(
      getRequest.contact_id,
      getRequest.id
    );

    return toAddressResponse(address);
  }
}
