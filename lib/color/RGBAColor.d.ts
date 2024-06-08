import { z } from 'zod';
import type RGBColor from './RGBColor.js';
export type RGBAColorBag = z.infer<typeof RGBAColor.bagSchema>;
export type RGBAColorTuple = z.infer<typeof RGBAColor.tupleSchema>;
export type RGBAColorArgs = z.infer<typeof RGBAColor.schema>;
/**
 * Stores color data using three channels for Red, Green and Blue values with and additional channel for transparency.
 */
export default class RGBAColor {
    #private;
    static get bagSchema(): z.ZodObject<{
        r: z.ZodNumber;
        g: z.ZodNumber;
        b: z.ZodNumber;
        a: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        r: number;
        a: number;
        b: number;
        g: number;
    }, {
        r: number;
        a: number;
        b: number;
        g: number;
    }>;
    static get tupleSchema(): z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
    static get schema(): z.ZodOptional<z.ZodUnion<[z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber, z.ZodNumber], null>, z.ZodObject<{
        r: z.ZodOptional<z.ZodNumber>;
        g: z.ZodOptional<z.ZodNumber>;
        b: z.ZodOptional<z.ZodNumber>;
        a: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        r?: number | undefined;
        a?: number | undefined;
        b?: number | undefined;
        g?: number | undefined;
    }, {
        r?: number | undefined;
        a?: number | undefined;
        b?: number | undefined;
        g?: number | undefined;
    }>]>>;
    static toBag(data: RGBAColor): RGBAColorBag;
    static toTuple(data: RGBAColor): RGBAColorTuple;
    static toString(data: RGBAColor): string;
    constructor(data: RGBColor);
    constructor(data?: RGBAColorArgs);
    get r(): number;
    get g(): number;
    get b(): number;
    get a(): number;
    toString(): string;
    toTuple(): [number, number, number, number];
    toBag(): {
        r: number;
        a: number;
        b: number;
        g: number;
    };
}
