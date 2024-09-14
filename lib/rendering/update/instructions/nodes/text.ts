import type { ChangeInstructions } from '../../../../types'
import { changeText } from '../instructions'

export const compileForText = (source: Text, target: Text) => {
  if (source.textContent !== target.textContent) {
    return [changeText(source, target)]
  }

  return [] as ChangeInstructions
}
