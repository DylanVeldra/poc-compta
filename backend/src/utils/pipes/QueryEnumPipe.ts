import { Injectable, ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class QueryEnumPipeOptions {
  readonly optional: boolean = false;
}

@Injectable()
export class QueryEnumPipe<T> extends ParseEnumPipe<T | null> {
  constructor(
    enumType: T,
    readonly options = new QueryEnumPipeOptions(),
  ) {
    super(enumType);
  }

  async transform(value: T, metadata: ArgumentMetadata) {
    if (!value && this.options.optional) {
      return null;
    }
    return super.transform(value, metadata)!;
  }
}
