/**
 * Helper functions for url encoding
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

export const encode = (url: string) => {
    return url
        .replace(/\//g, '%2F')
        .replace(/\./g, '%2E');
}
