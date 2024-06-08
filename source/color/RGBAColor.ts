import { z } from 'zod';
import { clamp } from '../util.js';
import { byteSchema, percentSchema } from '../schemas.js';
import type RGBColor from './RGBColor.js';

export type RGBAColorBag   = z.infer<typeof RGBAColor.bagSchema>;
export type RGBAColorTuple = z.infer<typeof RGBAColor.tupleSchema>;
export type RGBAColorArgs  = z.infer<typeof RGBAColor.schema>;

/**
 * Stores color data using three channels for Red, Green and Blue values with and additional channel for transparency.
 */
export default class RGBAColor {
    static get bagSchema() {
        return z.object({
            r: byteSchema,
            g: byteSchema,
            b: byteSchema,
            a: percentSchema,
        });
    }

    static get tupleSchema() {
        return z.tuple([
            byteSchema, // Red
            byteSchema, // Green
            byteSchema, // Blue
            percentSchema, // Alpha
        ]);
    }

    static get schema() { return this.tupleSchema.or(this.bagSchema.partial()).optional(); }

    static toBag(
        data: RGBAColor,
    ): RGBAColorBag {
        return {
            r: data.r,
            g: data.g,
            b: data.b,
            a: data.a,
        };
    }

    static toTuple(
        data: RGBAColor,
    ): RGBAColorTuple {
        return [
            data.r,
            data.g,
            data.b,
            data.a,
        ];
    }

    static toString(data: RGBAColor) { return `rgba(${data.r}, ${data.g}, ${data.b}, ${data.a})`; }

    readonly #r: number;
    readonly #g: number;
    readonly #b: number;
    readonly #a: number;

    constructor(data: RGBColor);
    constructor(data?: RGBAColorArgs); // Needed because: The call would have succeeded against this implementation, but implementation signatures of overloads are not externally visible
    constructor(data?: RGBAColorArgs) {
        if(Array.isArray(data)) {
            this.#r = clamp(data[0], 0, 255);
            this.#g = clamp(data[1], 0, 255);
            this.#b = clamp(data[2], 0, 255);
            this.#a = clamp(data[3], 0, 100);
        } else if(data) {
            this.#r = clamp(data?.r ?? 0, 0, 255);
            this.#g = clamp(data?.g ?? 0, 0, 255);
            this.#b = clamp(data?.b ?? 0, 0, 255);
            this.#a = clamp(data?.a ?? 1, 0, 100);
        } else {
            this.#r = 0;
            this.#g = 0;
            this.#b = 0;
            this.#a = 1;
        }
    }

    get r() { return this.#r; }
    get g() { return this.#g; }
    get b() { return this.#b; }
    get a() { return this.#a; }

    toString() { return RGBAColor.toString(this); }
    toTuple() { return RGBAColor.toTuple(this); }
    toBag() { return RGBAColor.toBag(this); }
}