import { z } from 'zod';
import GeneralError from '../GeneralError.js';
import { parseDocument } from 'yaml';
import type { ResultContainer } from '../ResultContainer.js';

/**
 * Parses a yaml string into a javascript object.
 * @param content The string to parse.
 * @returns The results of the parse.
 */
export const parseYaml = (
    content: unknown,
): ResultContainer<unknown> => {
    try {
        const validatedContent = z.string().safeParse(content);

        if(validatedContent.success) {
            const document = parseDocument(validatedContent.data);

            if(document.errors.length > 0 || document.warnings.length > 0) {
                const errors = [
                    ...document.errors.map(GeneralError.fromYamlParseError),
                    ...document.warnings.map(GeneralError.fromYamlParseError),
                ];

                return {
                    success: false,
                    errors,
                };
            } else {
                return {
                    success: true,
                    data   : document.toJS(),
                };
            }
        } else {
            return {
                success: false,
                errors : validatedContent.error.issues.map(GeneralError.fromZodIssue),
            };
        }
    } catch(error) {
        return {
            success: false,
            errors : [ GeneralError.fromError(error) ],
        };
    }
};