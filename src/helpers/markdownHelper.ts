import { marked } from 'marked'
import { Dark } from 'quasar'
import pkg from '../../package.json'

const renderer = new marked.Renderer()
renderer.link = function (href, title, text) {
  if (href === '#' && title?.length > 0) {
    return `<span style="cursor: help" title="${title}">${text}</span>`
  }
  const anchor = document.createElement('a')
  if (!href.startsWith(pkg.homepage)) {
    anchor.target = '_blank'
    anchor.rel = 'noreferrer noopener nofollow'
  }
  anchor.classList.add(Dark.isActive ? 'text-white' : 'text-dark')
  if (href) {
    anchor.href = href
  }
  if (title) {
    anchor.title = title
  }
  if (text) {
    anchor.text = text
  }
  return anchor.outerHTML
}

marked.setOptions({
  renderer,
})
marked.use({
  gfm: true,
})

export const parse = marked.parse
