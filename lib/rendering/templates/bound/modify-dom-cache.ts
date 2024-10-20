import {
  ChangeInstructions,
  ChangeInstruction,
  JaxsNode,
  ChangeInstructionTypes,
  InsertNodeData,
  JaxsElement,
} from '../../../types'

/*
  There are somethings about the efficiency of this that make me a bit worried:
    1. There are two passes through these instructions, once for dom mod and
       once for the cache modification.
    2. Most of the instructions in a deeply nested change will be no-ops but
       will still go through this process.

  Two thought:
    1. Maybe the modification should happen one pass for both, but that would
       add a lot of responsibilities to that pretty simple work.
    2. Maybe the parent should exist in all the instruction data, and then the
       processing could be short cut by checking that the parent is the bound
       root parent.

  Anyway, I'm not going to worry about performance until I can bench mark it and
  know it's a problem.
*/
export const modifyDomCache = (
  instructions: ChangeInstructions,
  dom: JaxsNode[],
  parentElement: JaxsElement,
) => {
  const changedDom = [...dom]
  instructions.forEach((instruction: ChangeInstruction) => {
    performInstruction(instruction, changedDom, parentElement)
  })
  return changedDom
}

type DomCacheModifier = (
  instuction: ChangeInstruction,
  dom: JaxsNode[],
  parentElement: JaxsElement,
) => void

const performInstruction: DomCacheModifier = (
  instruction,
  dom,
  parentElement,
) => {
  const performer = performers[instruction.type]
  if (performer) {
    performer(instruction, dom, parentElement)
  }
}

const removeNode: DomCacheModifier = (instruction, dom) => {
  const { source } = instruction
  const index = dom.indexOf(source)

  if (index >= 0) {
    dom.splice(index, 1)
  }
}

const insertNode: DomCacheModifier = (instruction, dom, parentElement) => {
  const { target } = instruction
  const data = instruction.data as InsertNodeData
  const { index, parent } = data

  if (parentElement === parent) {
    dom.splice(index, 0, target)
  }
}

const replaceNode: DomCacheModifier = (instruction, dom) => {
  const { target, source } = instruction
  const index = dom.indexOf(source)

  if (index >= 0) {
    dom[index] = target
  }
}

const performers = {
  [ChangeInstructionTypes.removeNode]: removeNode,
  [ChangeInstructionTypes.insertNode]: insertNode,
  [ChangeInstructionTypes.replaceNode]: replaceNode,
}
