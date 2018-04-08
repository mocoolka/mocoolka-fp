
import { truncate } from './truncate';
/**
 * Truncate string at full words.
 */
const crop = (str: string, maxChars: number, append?: string) => truncate(str, maxChars, append);

export {
    crop
};
