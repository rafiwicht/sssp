

export const encode = (url: string) => {
    return url
        .replace(/\//g, '%2F')
        .replace(/\./g, '%2E');
}