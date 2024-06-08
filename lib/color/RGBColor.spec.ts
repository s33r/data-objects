import { expect, test } from 'vitest';
import RGBColor from './RGBColor.js';

test('adds 1 + 2 to equal 3', () => {
    const r = 255;
    const g = 128;

    const color = new RGBColor({
        r,
        g,
    });
    expect(color.r).toBe(255);
    expect(color.g).toBe(128);
});