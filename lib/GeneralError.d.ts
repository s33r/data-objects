import { ParseError } from 'jsonc-parser';
import { z } from 'zod';
export interface GeneralErrorBag {
    message: string;
    location?: string;
    code?: string;
}
/**
 * An error that can come from a variety of sources.
 */
export default class GeneralError {
    #private;
    /**
     * Transforms a JSONC parse error into a GeneralError
     * @param error The JSONC parse error
     * @returns A GeneralError with the data from the parse error.
     */
    static fromJsonParseError(error: ParseError): GeneralError;
    /**
     * Transforms a zod Issue into a GeneralError
     * @param error The Issue to convert
     * @returns A GeneralError with the data from the zod Issue.
     */
    static fromZodIssue(error: z.ZodIssue): GeneralError;
    /**
     * Transforms a native Error into a GeneralError
     * @param error The Error to convert. If this is not an error, it is converted to a string and used as the message.
     * @returns A GeneralError with the data from the native Error.
     */
    static fromError(error: unknown): GeneralError;
    /**
     *Converts a GeneralError into a property bag
    * @param data The GeneralError to convert
    * @returns The property bag that contains the GeneralError's data
    */
    static toBag(data: GeneralError): Required<GeneralErrorBag>;
    static toError(data: GeneralError): Error;
    /**
     * Converts a GeneralError into a string.
     * @param data The GeneralError to convert to a string
     * @returns Returns data about this GeneralError in string form.
     */
    static toString(data: GeneralError | Array<GeneralError>): string;
    /**
     * Creates a new GeneralError object.
     * @param data The error data. If this is a string the data will be used as the GeneralError's message.
     */
    constructor(data: GeneralErrorBag | string);
    get message(): string;
    get location(): string;
    get code(): string;
    toBag(): Required<GeneralErrorBag>;
    toString(): string;
}
