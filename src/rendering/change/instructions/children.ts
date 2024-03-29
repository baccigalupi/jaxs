import type {
  Dom,
  ExpandedElement,
  HtmlChildren,
  Instruction,
  Instructions,
} from '../../../types';
import { insertNode, removeNode, replaceNode } from './generate';
import { createIdMap } from './idMap';
import { compileForNodeGenerator } from './node';

type DiffPair = {
  source: Dom;
  target: Dom;
};

export const compileChildren = (
  sourceList: HtmlChildren,
  targetList: HtmlChildren,
  parent: ExpandedElement,
) => {
  const baseInstructions = [] as Instructions;
  const length = largerLength(sourceList, targetList);
  const sourceMap = createIdMap(sourceList);
  const targetMap = createIdMap(targetList);
  const nodesPairsToDiff = [] as DiffPair[];

  let index = 0;
  for (; index < length; index++) {
    const source = sourceList[index] as ExpandedElement;
    const target = targetList[index] as ExpandedElement;
    // debug(
    //   '\n',
    //   'loop index',
    //   index,
    //   source && source.__jsx,
    //   target && target.__jsx,
    // );

    // This algorithm uses the target as the source of truth, iterating
    // through it first figuring out what to do. The length could be larger than
    // the target length, which means that there are unresolved sources to remove.
    // Part of the goal of this flow is to ensure that insertions happen in
    // accending order.
    if (target && targetMap.check(target)) {
      // debug('target', target.__jsx, 'index', index);
      const matchingSource = sourceMap.pullMatch(target);
      targetMap.clear(target); // mark target as resolved

      if (matchingSource.element) {
        // debug('matching source found for target');
        if (matchingSource.index !== index) {
          // move source to index
          // debug('moving source', matchingSource.element.__jsx, index);
          baseInstructions.push(
            insertNode(matchingSource.element, { parent, index }),
          );
        }
        // update element for attribute, event and child changes
        // debug('updating to match target',
        //   matchingSource.element.__jsx,
        //   matchingSource.element.classList,
        //   target.__jsx,
        //   target.classList
        // );
        nodesPairsToDiff.push({
          source: matchingSource.element,
          target,
        });
      } else if (source) {
        // debug('NO matching source for target but source in slot', source.__jsx);

        if (targetMap.check(source)) {
          // the source is somewhere else in the target, so just add this
          // target element and assume the source will get resolved later.
          // debug('adding', target.__jsx, 'at', index);
          baseInstructions.push(insertNode(target, { parent, index }));
        } else {
          // no matching target, but something is in the index/slot ... so swap
          // debug('replacing', source.__jsx, target.__jsx, 'at', index);
          sourceMap.clear(source); // resolve source
          baseInstructions.push(replaceNode(source as Dom, target as Dom));
        }
      } else {
        // extra targets, add these to the end of the parent in order received
        // debug('adding target to end', target.__jsx);
        baseInstructions.push(insertNode(target, { parent, index }));
      }
    } else if (source) {
      // stuff has been remove from the target
      // check to see if source has been resolved in map
      // if not remove from dom
      const matchingSource = sourceMap.pullMatch(source);
      if (matchingSource.element) {
        // debug('removing', source.__jsx);
        baseInstructions.push(removeNode(source));
      }
    }
  }

  // deal with unresolved sources
  sourceMap.remaining().forEach(({ element }) => {
    // debug('removing', element.__jsx);
    baseInstructions.push(removeNode(element));
  });

  const nodeInstructions = nodesPairsToDiff
    .reduce((collection, { source, target }) => {
      return collection.concat(compileForNode(source, target));
    }, [] as Instructions);

  return baseInstructions.concat(nodeInstructions).sort(instructionsSorter);
};

const instructionsSorter = (left: Instruction, right: Instruction) => {
  if (left.type > right.type) return 1;
  if (left.type < right.type) return -1;
  return 0;
};

const largerLength = (sourceList: HtmlChildren, targetList: HtmlChildren) => {
  const sourceLength = Array.from(sourceList).length;
  const targetLength = Array.from(targetList).length;
  return sourceLength > targetLength ? sourceLength : targetLength;
};

const compileForNode = compileForNodeGenerator(compileChildren);
