import {stegaClean} from '@sanity/client/stega';

export function isType<T extends {_type: string}, K extends T['_type']>(
  obj: T,
  type: K,
): obj is Extract<T, {_type: K}> {
  return stegaClean(obj._type) === type;
}
