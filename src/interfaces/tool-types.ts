// eslint-disable-next-line @typescript-eslint/ban-types
export declare type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export declare type MFOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
