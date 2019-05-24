export const success = <T>(x: T): Success<T> => ({ tag: 'success', value: x });
export const failure = <T>(x: T): Failure<T> => ({ tag: 'failure', value: x });
