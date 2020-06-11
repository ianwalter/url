const { test } = require('@ianwalter/bff')
const createUrl = require('.')

test('simple url', t => {
  const urlString = 'https://ianwalter.dev/'
  const url = createUrl(urlString)
  t.expect(url.toString()).toBe(urlString)
  t.expect(url.hostname).toBe('ianwalter.dev')
  t.expect(url.origin).toBe('https://ianwalter.dev')
  t.expect(JSON.parse(JSON.stringify(url))).toMatchSnapshot()
})

test('url with query', async t => {
  const urlString = 'https://ianwalter.dev/q?product=ipad&product=ipod&page=1'
  const url = createUrl(urlString)
  t.expect(url.toString()).toBe(urlString)
  t.expect(JSON.parse(JSON.stringify(url))).toMatchSnapshot()
})

test('url with base', t => {
  const path = '/spotlight-on-decision-tree'
  const url = createUrl('https://ianwalter.dev', path)
  t.expect(url.toString()).toBe(`https://ianwalter.dev${path}`)
  t.expect(url.pathname).toBe(path)
})

test('url from url instance', t => {
  const base = createUrl('https://ianwalter.dev')
  const url = createUrl(base, '/spotlight-on-decision-tree#aboutAuthor')
  t.expect(JSON.parse(JSON.stringify(url))).toMatchSnapshot()
})

test('updating a url property', t => {
  const url = createUrl('https://ianwalter.dev')
  url.host = 'app.mybinxhealth.com'
  t.expect(url.href.includes(url.host)).toBe(true)
})
