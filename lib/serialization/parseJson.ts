import { parse, type ParseError, type ParseOptions } from 'jsonc-parser';
import type { ResultContainer } from '../ResultContainer.js';
import GeneralError from '../GeneralError.js';
import { z } from 'zod';

/**
 * Parses a json string into javascript.
 * @name parseJson
 * @param content The string to parse.
 * @param options Options to control how this file is parsed.
 * @returns The results of the parse.
 */
export default (
    content: unknown,
    options?: ParseOptions | number, // TODO: compatible with map but this can't be the best way??
): ResultContainer<unknown> => {
    const actualOptions = typeof options === 'object' ? options : undefined;

    try {
        const parsedToString = z.string().safeParse(content);

        if(parsedToString.success) {
            const parseErrors: Array<ParseError> = [];

            const data   = parse(parsedToString.data, parseErrors, actualOptions);
            const errors = parseErrors.map(GeneralError.fromJsonParseError);

            if(errors.length > 0) {
                return {
                    success: false,
                    errors,
                };
            } else {
                return {
                    success: true,
                    data,
                };
            }
        } else {
            const errors = parsedToString.error.issues.map(GeneralError.fromZodIssue);

            return {
                success: false,
                errors,
            };
        }
    } catch(error) {
        return {
            success: false,
            errors : [ GeneralError.fromError(error) ],
        };
    }
};