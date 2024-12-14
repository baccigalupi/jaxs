import { objectUpdater } from './updaters/object'
import { listUpdater } from './updaters/list'
import { booleanUpdater } from './updaters/boolean'

export const updaters = {
  object: objectUpdater,
  list: listUpdater,
  boolean: booleanUpdater,
}
