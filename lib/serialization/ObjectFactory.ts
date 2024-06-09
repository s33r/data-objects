import GeneralError from '../GeneralError.js';
import type { ResultContainer } from '../ResultContainer.js';
import { parseJson } from './parseJson.js';
import { z } from 'zod';
import * as DataFormat from './DataFormat.js';
import { parseYaml } from './parseYaml.js';

export interface ObjectFactoryPrototype<T_Bag, T_Class> {
    create         : (data: unknown) => T_Class;
    safeCreate     : (data: unknown) => ResultContainer<T_Class>;
    readonly schema: z.ZodSchema<T_Bag>;
    new(data: T_Bag):T_Class;
}

const parseData = (
    data: unknown,
    format: DataFormat.Formats,
): ResultContainer<unknown> => {
    if(format === 'json') {
        return parseJson(data);
    } else if(format === 'yaml') {
        return parseYaml(data);
    } else if(format === 'object') {
        return {
            success: true,
            data,
        };
    } else {
        return {
            success: false,
            errors : [ new GeneralError(`Unknown format: ${format}`) ],
        };
    }
};

/**
 * Creates a new object using the provided constructor, if the creation fails, a list of errors are returned.
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns A result that either contains the created object or a list of errors.
 */
export const safeCreate = <T_Bag, T_Class> (
    data: unknown,
    Constructor: ObjectFactoryPrototype<T_Bag, T_Class>,
    format: DataFormat.Formats = DataFormat.JsObject,
): ResultContainer<T_Class> => {
    try {
        const parseResult = parseData(data, format);

        if(parseResult.success) {
            return Constructor.safeCreate(parseResult.data);
        } else {
            return parseResult;
        }
    } catch(error) {
        if(error instanceof Error) {
            return {
                success: false,
                errors : [ GeneralError.fromError(error) ],
            };
        } else {
            return {
                success: false,
                errors : [ new GeneralError(`safeCreate failed: ${error}`) ],
            };
        }
    }
};

/**
 * Creates a new object using the provided constructor, if the creation fails an error will be thrown
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns The created object.
 */
export const create = <T_Bag, T_Class> (
    data: unknown,
    Constructor: ObjectFactoryPrototype<T_Bag, T_Class>,
): T_Class => Constructor.create(data);