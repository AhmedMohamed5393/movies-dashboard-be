import { NestMiddleware } from "@nestjs/common";
import { logger } from "../../../shared/logger";
import { GetDeleteMovieInputValidator } from "../validators/getDeleteMovieInputValidator";
const tag = "movies-dashboard-be:movie:getDeleteMovieMiddleware";
export class GetDeleteMovieMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const validateRequestBody = new GetDeleteMovieInputValidator().validateInputs(req.params.id);
            if (!validateRequestBody.errorMessages) next();
            else {
                const middlewareErrorMessage = { tag, message: "Invalid inputs", error: validateRequestBody.errorMessages, status: 400 };
                logger(middlewareErrorMessage);
                return res.status(400).json({ message: "Invalid inputs", error: validateRequestBody.errorMessages });
            }
        } catch (error) {
            const middlewareErrorMessage = { tag: tag, message: "Internal Server Error", error, status: 500 };
            logger(middlewareErrorMessage);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
