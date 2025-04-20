import isEmpty from 'lodash-es/isEmpty';
import omitBy from 'lodash-es/omitBy';

export function trimObject<T extends object>(obj: T) {
  return omitBy<T>(obj, isEmpty) as T;
}
