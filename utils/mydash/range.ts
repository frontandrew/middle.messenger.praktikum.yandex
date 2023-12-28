// @ts-nocheck

interface RangeConfig {
    start: number;
    end: number;
    step: number;
}

export function range(start?: number, end: number, step?: number): number[] {

    const conf: RangeConfig = { start: 0, end: 0, step: 1 };

    const args: Array<number> = [start, end, step].filter(item => item === 0 ? true : Boolean(item));

    if (args.length === 1) {
        conf.end = args[0]
    }

    if (args.length === 2) {
        conf.start = args[0]
        conf.end = args[1]
    }

    if (args.length === 3) {
        conf.start = args[0]
        conf.end = args[1]
        conf.step = args[2]
    }

    const arrayItemsQauntity = conf.step === 0 ? conf.step : Math.ceil(Math.abs(conf.end) / Math.abs(conf.step))

    const empty: number[] = new Array(arrayItemsQauntity)

    const filled = empty.fill(conf.start, 0)    

    const stepped = filled.map(function (item, index) {
        const next = (index * conf.step * Math.sign(conf.end)) + item

        return Math.abs(next) >= Math.abs(conf.end) ? undefined : next
    })

    const result = stepped.filter((item) => item !== undefined)
    return result
}

