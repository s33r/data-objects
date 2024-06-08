import { z } from 'zod';
import { clamp } from '../util.js';
import { byteSchema } from '../schemas.js';
import RGBAColor from './RGBAColor.js';

export type RBGColorBag   = z.infer<typeof RGBColor.bagSchema>;
export type RBGColorTuple = z.infer<typeof RGBColor.tupleSchema>;
export type RBGColorArgs  = z.infer<typeof RGBColor.schema>;

/**
 * Stores color data using three channels for Red, Green and Blue values.
 */
export default class RGBColor {
    static get bagSchema() {
        return z.object({
            r: byteSchema,
            g: byteSchema,
            b: byteSchema,
        });
    }

    static get tupleSchema() {
        return z.tuple([
            byteSchema, // Red
            byteSchema, // Green
            byteSchema, // Blue
        ]);
    }

    static get schema() { return this.tupleSchema.or(this.bagSchema.partial()).optional(); }

    static toBag(
        data: RGBColor,
    ): RBGColorBag {
        return {
            r: data.r,
            g: data.g,
            b: data.b,
        };
    }

    static toTuple(
        data: RGBColor,
    ): RBGColorTuple {
        return [
            data.r,
            data.g,
            data.b,
        ];
    }

    static toString(data: RGBColor) { return `rgb(${data.r}, ${data.g}, ${data.b})`; }

    readonly #r: number;
    readonly #g: number;
    readonly #b: number;

    constructor(data: RGBAColor);
    constructor(data?: RBGColorArgs); // Needed because: The call would have succeeded against this implementation, but implementation signatures of overloads are not externally visible
    constructor(data?: RBGColorArgs) {
        if(Array.isArray(data)) {
            this.#r = clamp(data[0], 0, 255);
            this.#g = clamp(data[1], 0, 255);
            this.#b = clamp(data[2], 0, 255);
        } else if(data) {
            this.#r = clamp(data?.r ?? 0, 0, 255);
            this.#g = clamp(data?.g ?? 0, 0, 255);
            this.#b = clamp(data?.b ?? 0, 0, 255);
        } else {
            this.#r = 0;
            this.#g = 0;
            this.#b = 0;
        }
    }

    get r() { return this.#r; }
    get g() { return this.#g; }
    get b() { return this.#b; }

    toString() { return RGBColor.toString(this); }
    toTuple() { return RGBColor.toTuple(this); }
    toBag() { return RGBColor.toBag(this); }
}