import { z } from 'zod';
import { clamp } from '../util.js';
import { byteSchema } from '../schemas.js';
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
    static toBag(data) {
        return {
            r: data.r,
            g: data.g,
            b: data.b,
        };
    }
    static toTuple(data) {
        return [
            data.r,
            data.g,
            data.b,
        ];
    }
    static toString(data) { return `rgb(${data.r}, ${data.g}, ${data.b})`; }
    #r;
    #g;
    #b;
    constructor(data) {
        if (Array.isArray(data)) {
            this.#r = clamp(data[0], 0, 255);
            this.#g = clamp(data[1], 0, 255);
            this.#b = clamp(data[2], 0, 255);
        }
        else if (data) {
            this.#r = clamp(data?.r ?? 0, 0, 255);
            this.#g = clamp(data?.g ?? 0, 0, 255);
            this.#b = clamp(data?.b ?? 0, 0, 255);
        }
        else {
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
