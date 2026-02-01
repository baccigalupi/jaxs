/** @jsx jsx */
/** @jsxFrag jsx.fragment */

import { jsx, Props, withViewModel } from '@lib/jaxs'
import { createRenderKit } from '@support/render-kit'
import { domToString } from '@support/test-dom'
import { expect, describe, it } from 'vitest'

describe('withViewModel', () => {
  it('transforms the inbound props to the calculated props needed by the Template', () => {
    const renderKit = createRenderKit()

    const AccordionTemplate = ({
      class: className,
      children,
    }: Props<{ class: string }>) => {
      return <div class={className}>{children}</div>
    }

    const viewModel = ({
      flush,
      class: className,
    }: {
      flush: boolean
      class: string
    }) => {
      const flushClasses = flush ? 'flush' : ''
      return {
        class: `${className} accordion ${flushClasses}`,
      }
    }

    const Accordion = withViewModel({
      Template: AccordionTemplate,
      viewModel,
    })

    const accordionElement = (
      <Accordion flush={true} class="custom-accordion">
        <span>Item 1</span>
        <span>Item 2</span>
      </Accordion>
    )

    const [node] = accordionElement.render(renderKit)

    expect(domToString(node)).toEqual(
      '<div class="custom-accordion accordion flush"><span>Item 1</span><span>Item 2</span></div>',
    )
  })

  it('combines props passed in with those calculated in the view model', () => {
    const renderKit = createRenderKit()

    const AccordionTemplate = ({
      id,
      class: className,
      children,
    }: Props<{ class: string; id: string }>) => {
      return (
        <div class={className} id={id}>
          {children}
        </div>
      )
    }

    const viewModel = ({
      flush,
      class: className,
    }: {
      flush: boolean
      class: string
    }) => {
      const flushClasses = flush ? 'flush' : ''
      return {
        class: `${className} accordion ${flushClasses}`,
      }
    }

    const Accordion = withViewModel({
      Template: AccordionTemplate,
      viewModel,
    })

    const accordionElement = (
      <Accordion flush={false} class="custom-accordion" id="accordion1">
        Content here
      </Accordion>
    )

    const [node] = accordionElement.render(renderKit)

    expect(domToString(node)).toEqual(
      '<div class="custom-accordion accordion " id="accordion1">Content here</div>',
    )
  })
})
