import { NextFunction, Response } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";

export const authMiddleware = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.get("X-API-TOKEN");
    logger.debug(`Token di terima: ${token}`);

    if (!token) {
        res.status(400)
            .json({
                errors: "Unauthorized",
            })
            .end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
            },
        });
        logger.debug(`User di temukan : ${user ? user.name : "tidak ada"}`);

        if (!user) {
            res.status(401)
                .json({
                    errors: "Unauthorized",
                })
                .end();
        } else {
            req.user = user;
            next();
        }
    }
};
