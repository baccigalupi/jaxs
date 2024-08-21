import type { JaxsElement, ChangeInstructions } from '../../../../../types'
import { addEvent, removeEvent, updateEvent } from '../../instructions'

export const compileForEvents = (source: JaxsElement, target: JaxsElement) => {
  const instructions = [] as ChangeInstructions
  const sourceEventMaps = source.eventMaps
  const targetEventMaps = target.eventMaps
  const sourceDomEvents = Object.keys(sourceEventMaps)
  const targetDomEvents = Object.keys(targetEventMaps)

  sourceDomEvents.forEach((domEvent) => {
    const sourceEventMap = sourceEventMaps[domEvent]
    const targetEventMap = targetEventMaps[domEvent]

    if (!targetEventMap) {
      instructions.push(
        removeEvent(source, target, {
          name: sourceEventMap.domEvent,
          value: sourceEventMap.listener,
        }),
      )
    } else if (targetEventMap.busEvent !== sourceEventMap.busEvent) {
      instructions.push(
        updateEvent(source, target, {
          name: domEvent,
          targetValue: targetEventMap.listener,
          sourceValue: sourceEventMap.listener,
        }),
      )
    } // else events the same
  })

  targetDomEvents.forEach((domEvent) => {
    const sourceEventMap = sourceEventMaps[domEvent]
    const targetEventMap = targetEventMaps[domEvent]

    if (!sourceEventMap) {
      instructions.push(
        addEvent(source, target, {
          name: targetEventMap.domEvent,
          value: targetEventMap.listener,
        }),
      )
    }
  })

  return instructions
}
