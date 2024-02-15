export function last(list: any[]): any[] | undefined {
    if (!Array.isArray(list)) return undefined;

    const length = list.length;

    return length ? list[list.length - 1] : undefined
}
