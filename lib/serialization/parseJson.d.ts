import { type ParseOptions } from 'jsonc-parser';
import type { ResultContainer } from '../ResultContainer.js';
/**
 * Parses a json string into javascript.
 * @name parseJson
 * @param content The string to parse.
 * @param options Options to control how this file is parsed.
 * @returns The results of the parse.
 */
declare const _default: (content: unknown, options?: ParseOptions | number) => ResultContainer<unknown>;
export default _default;
