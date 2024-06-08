import { z } from 'zod';
import RGBAColor from './RGBAColor.js';
export type RBGColorBag = z.infer<typeof RGBColor.bagSchema>;
export type RBGColorTuple = z.infer<typeof RGBColor.tupleSchema>;
export type RBGColorArgs = z.infer<typeof RGBColor.schema>;
/**
 * Stores color data using three channels for Red, Green and Blue values.
 */
export default class RGBColor {
    #private;
    static get bagSchema(): z.ZodObject<{
        r: z.ZodNumber;
        g: z.ZodNumber;
        b: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        r: number;
        b: number;
        g: number;
    }, {
        r: number;
        b: number;
        g: number;
    }>;
    static get tupleSchema(): z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>;
    static get schema(): z.ZodOptional<z.ZodUnion<[z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>, z.ZodObject<{
        r: z.ZodOptional<z.ZodNumber>;
        g: z.ZodOptional<z.ZodNumber>;
        b: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        r?: number | undefined;
        b?: number | undefined;
        g?: number | undefined;
    }, {
        r?: number | undefined;
        b?: number | undefined;
        g?: number | undefined;
    }>]>>;
    static toBag(data: RGBColor): RBGColorBag;
    static toTuple(data: RGBColor): RBGColorTuple;
    static toString(data: RGBColor): string;
    constructor(data: RGBAColor);
    constructor(data?: RBGColorArgs);
    get r(): number;
    get g(): number;
    get b(): number;
    toString(): string;
    toTuple(): [number, number, number];
    toBag(): {
        r: number;
        b: number;
        g: number;
    };
}
