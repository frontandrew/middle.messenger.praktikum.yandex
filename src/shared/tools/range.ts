// function range(end: number, step?: number, isRigth?: boolean): number[];
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
function range(start: number, end: number, step: number, isRigth: boolean): number[];
function range(end: number, start?: number, step?: number, isRigth?: boolean): number[] {
  const conf = { start: 0, end, step: 1, isRigth: false };

  if (typeof start === 'number') conf.start = start;
  if (typeof step === 'number' && step !== 0) conf.step = step;
  if (typeof isRigth === 'boolean') conf.isRigth = isRigth;

  const empty = new Array(conf.step);

  const filled = empty.fill(conf.start, 0);

  const stepped = filled.map((item, index) => {
    const next = (index * conf.step * Math.sign(conf.end)) + item;

    return Math.abs(next) >= Math.abs(conf.end) ? undefined : next;
  });

  const cleared = stepped.filter((item) => item !== undefined);

  const result = conf.isRigth ? cleared.reverse() : cleared;
  return result;
}

export { range };

range(7);
range(1, 5);
range(3, 7, 8);
range(6, 3, 9, false);
