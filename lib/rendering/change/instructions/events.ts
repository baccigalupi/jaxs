import { ExpandedElement, Instructions } from '../../../types.ts';
import { addEvent, removeEvent, updateEvent } from './generate.ts';

export const compileForEvents = (
  source: ExpandedElement,
  target: ExpandedElement,
) => {
  const instructions = [] as Instructions;
  const sourceEventMaps = source.eventMaps;
  const targetEventMaps = target.eventMaps;
  const sourceDomEvents = Object.keys(sourceEventMaps);
  const targetDomEvents = Object.keys(targetEventMaps);

  sourceDomEvents.forEach((domEvent) => {
    const sourceEventMap = sourceEventMaps[domEvent];
    const targetEventMap = targetEventMaps[domEvent];

    if (!targetEventMap) {
      instructions.push(
        removeEvent(source, target, { name: sourceEventMap.domEvent }),
      );
    } else if (targetEventMap.busEvent !== sourceEventMap.busEvent) {
      instructions.push(
        updateEvent(source, target, {
          name: domEvent,
          value: targetEventMap.listener,
        }),
      );
    } // else events the same
  });

  targetDomEvents.forEach((domEvent) => {
    const sourceEventMap = sourceEventMaps[domEvent];
    const targetEventMap = targetEventMaps[domEvent];

    if (!sourceEventMap) {
      instructions.push(
        addEvent(source, target, {
          name: targetEventMap.domEvent,
          value: targetEventMap.listener,
        }),
      );
    }
  });

  return instructions;
};
