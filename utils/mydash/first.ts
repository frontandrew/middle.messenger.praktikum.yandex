export function first(list: any[]): any[] | undefined {
    if (!Array.isArray(list)) return undefined

    const length = list.length

    return length ? list[0] : undefined
}