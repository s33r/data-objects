import type { ResultContainer } from '../ResultContainer.js';
import { z } from 'zod';
export interface ObjectFactoryPrototype<T_Bag, T_Class> {
    create: (data: unknown) => T_Class;
    safeCreate: (data: unknown) => ResultContainer<T_Class>;
    readonly schema: z.ZodSchema<T_Bag>;
    new (data: T_Bag): T_Class;
}
/**
 * Creates a new object using the provided constructor, if the creation fails, a list of errors are returned.
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns A result that either contains the created object or a list of errors.
 */
export declare const safeCreate: <T_Bag, T_Class>(data: unknown, Constructor: ObjectFactoryPrototype<T_Bag, T_Class>, json?: boolean) => ResultContainer<T_Class>;
/**
 * Creates a new object using the provided constructor, if the creation fails an error will be thrown
 * @param data The data used to construct the object.
 * @param Constructor The ObjectFactory used to construct the object.
 * @returns The created object.
 */
export declare const create: <T_Bag, T_Class>(data: unknown, Constructor: ObjectFactoryPrototype<T_Bag, T_Class>) => T_Class;
