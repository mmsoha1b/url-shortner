const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const convertToBase62 = (num: number): string => {
    if (num === 0) return CHARS[0];
    let result = '';
    while (num > 0) {
        result = CHARS[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result;
};

export const convertFromBase62 = (str: string): number => {
    return str.split('').reduce((acc, char) => acc * 62 + CHARS.indexOf(char), 0);
};
