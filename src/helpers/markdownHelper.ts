import { marked } from 'marked'
import pkg from '../../package.json'

const renderer = new marked.Renderer()
renderer.link = function (href, title, text) {
  const html = marked.Renderer.prototype.link.call(
    this,
    href,
    title,
    text,
  ) as string
  return href.startsWith(pkg.homepage)
    ? html
    : html.replace(
        /^<a /,
        '<a target="_blank" rel="noreferrer noopener nofollow" ',
      )
}

marked.setOptions({
  renderer,
})
marked.use({
  gfm: true,
})

export const parse = marked.parse