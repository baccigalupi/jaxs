/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '../../../lib/jaxs'
import { Props } from '../../../lib/types'
import { describe, expect, it } from 'vitest'
import { createTestDom, domToString } from '../../support/test-dom'
import { createApp } from '../../../lib/jaxs'

describe('Bug with passed down string children', () => {
  // Global HTML attribute types
  type AutoCapitalizeValues =
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters'
  type Direction = 'ltr' | 'rtl' | 'auto'
  type Translate = 'yes' | 'no'
  type HTMLAttributes = {
    id?: string
    class?: string
    disabled?: boolean
    autocapitalize?: AutoCapitalizeValues
    dir?: Direction
    hidden?: boolean
    lang?: string
    tabindex?: number
    spellcheck?: boolean
    title?: string
    translate?: Translate
  }

  type BreadcrumbProps = Props<HTMLAttributes>
  const Breadcrumb = ({
    class: propClasses,
    children,
    ...rest
  }: BreadcrumbProps) => {
    return (
      <nav aria-label="breadcrumb" class={propClasses} {...rest}>
        <ol class="breadcrumb">{children}</ol>
      </nav>
    )
  }

  class ActiveInfo {
    active: boolean

    constructor(active: boolean) {
      this.active = active
    }

    activeClass() {
      if (!this.active) return ''

      return 'active'
    }

    itemClass() {
      return `breadcrumb-item ${this.activeClass()}`
    }

    ariaCurrent() {
      if (!this.active) return undefined

      return 'page'
    }

    useLink(href?: string) {
      return href && !this.active
    }
  }
  const getActiveInfo = (active: boolean | undefined) => {
    return new ActiveInfo(!!active)
  }

  type BreadcrumbItemProps = Props<
    {
      href?: string
      active?: boolean
    } & HTMLAttributes
  >
  const BreadcrumbItem = ({
    active = false,
    children,
    ...rest
  }: BreadcrumbItemProps) => {
    const activeInfo = getActiveInfo(active)

    return (
      <li
        class={activeInfo.itemClass()}
        aria-current={activeInfo.ariaCurrent()}
      >
        <BreadcrumbBody active={active} {...rest}>
          {children}
        </BreadcrumbBody>
      </li>
    )
  }

  const BreadcrumbBody = ({
    href,
    active,
    children,
    ...rest
  }: BreadcrumbItemProps) => {
    const useLink = getActiveInfo(active).useLink(href)

    if (useLink)
      return (
        <a href={href} {...rest}>
          {children}
        </a>
      )

    return <>{children}</>
  }

  it('correctly renders breadcrumb with string children', () => {
    const document = createTestDom()
    const app = createApp({ document })

    const template = (
      <Breadcrumb>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#library">Library</BreadcrumbItem>
        <BreadcrumbItem href="#data" active={true}>
          Data
        </BreadcrumbItem>
      </Breadcrumb>
    )

    app.render(template, '#app')

    expect(domToString(document)).toContain(
      '<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item "><a href="#">Home</a></li><li class="breadcrumb-item "><a href="#library">Library</a></li><li class="breadcrumb-item active" aria-current="page">Data</li></ol></nav>',
    )
  })
})
