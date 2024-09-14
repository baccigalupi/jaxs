import type {
  ChangeInstructions,
  JaxsElement,
  JaxsNode,
  JaxsNodes,
  DiffPair,
} from '../../../types'
import {
  insertNode,
  removeNode,
  replaceNode,
  instructionsSorter,
} from './instructions'
import { createIdMap } from './id-map'
import { compileForNode } from './node'

export const compileCollection = (
  sourceList: JaxsNodes,
  targetList: JaxsNodes,
  parent: JaxsElement,
) => {
  const baseInstructions = [] as ChangeInstructions
  const length = largerLength(sourceList, targetList)
  const sourceMap = createIdMap(sourceList)
  const targetMap = createIdMap(targetList)
  const nodesPairsToDiff = [] as DiffPair[]

  let index = 0
  for (; index < length; index++) {
    const source = sourceList[index] as JaxsNode
    const target = targetList[index] as JaxsNode
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
      const matchingSource = sourceMap.pullMatch(target)
      targetMap.clear(target) // mark target as resolved

      if (matchingSource.element) {
        // debug('matching source found for target');
        if (matchingSource.index !== index) {
          // move source to index
          // debug('moving source', matchingSource.element.__jsx, index);
          baseInstructions.push(
            insertNode(matchingSource.element as JaxsElement, {
              parent,
              index,
            }),
          )
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
        })
      } else if (source) {
        // debug('NO matching source for target but source in slot', source.__jsx);

        if (targetMap.check(source)) {
          // the source is somewhere else in the target, so just add this
          // target element and assume the source will get resolved later.
          // debug('adding', target.__jsx, 'at', index);
          baseInstructions.push(
            insertNode(target as JaxsElement, { parent, index }),
          )
        } else {
          // no matching target, but something is in the index/slot ... so swap
          // debug('replacing', source.__jsx, target.__jsx, 'at', index);
          sourceMap.clear(source) // resolve source
          baseInstructions.push(
            replaceNode(source as JaxsElement, target as JaxsElement),
          )
        }
      } else {
        // extra targets, add these to the end of the parent in order received
        // debug('adding target to end', target.__jsx);
        baseInstructions.push(
          insertNode(target as JaxsElement, { parent, index }),
        )
      }
    } else if (source) {
      // stuff has been remove from the target
      // check to see if source has been resolved in map
      // if not remove from dom
      const matchingSource = sourceMap.pullMatch(source)
      if (matchingSource.element) {
        // debug('removing', source.__jsx);
        baseInstructions.push(removeNode(source as JaxsElement))
      }
    }
  }

  // deal with unresolved sources
  sourceMap.remaining().forEach(({ element }) => {
    // debug('removing', element.__jsx);
    baseInstructions.push(removeNode(element as JaxsElement))
  })

  const nodeInstructions = nodesPairsToDiff.reduce(
    (collection, { source, target }) => {
      return collection.concat(
        compileForNode(source, target, compileCollection),
      )
    },
    [] as ChangeInstructions,
  )

  return baseInstructions.concat(nodeInstructions).sort(instructionsSorter)
}

const largerLength = (sourceList: JaxsNodes, targetList: JaxsNodes) => {
  const sourceLength = sourceList.length
  const targetLength = targetList.length
  return sourceLength > targetLength ? sourceLength : targetLength
}
