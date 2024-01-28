export interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    if (opts.default !== undefined) {
      newValue = opts.default;
    } else {
      throw new Error('TODO: Malo, Dylan : voila.');
    }
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }
  }

  if (opts.max) {
    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}
