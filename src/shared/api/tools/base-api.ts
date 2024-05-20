export class BaseAPI {
  create({}: PlainObject): Promise<unknown> { throw new Error('Not implemented'); }

  request({}: PlainObject): Promise<unknown> { throw new Error('Not implemented'); }

  update({}: PlainObject): Promise<unknown> { throw new Error('Not implemented'); }

  delete({}: PlainObject): Promise<unknown> { throw new Error('Not implemented'); }
}
