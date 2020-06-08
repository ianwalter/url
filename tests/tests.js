const { test } = require('@ianwalter/bff')
const merge = require('@ianwalter/merge')
const Url = require('..')

test('simple url', ({ expect }) => {
  const urlString = 'https://ianwalter.dev/'
  const url = new Url(urlString)
  expect(url.toString()).toBe(urlString)
  expect(url.hostname).toBe('ianwalter.dev')
  expect(url.origin).toBe('https://ianwalter.dev')
  expect(JSON.stringify(url)).toMatchSnapshot()
})

test('url with query', ({ expect }) => {
  const urlString = 'https://ianwalter.dev/search?query=MacBook&page=1'
  const url = new Url(urlString)
  expect(url.toString()).toBe(urlString)
  expect(JSON.stringify(url)).toMatchSnapshot()
})

test('url with base', ({ expect }) => {
  const path = '/spotlight-on-decision-tree'
  const url = new Url(path, 'https://ianwalter.dev')
  expect(url.toString()).toBe(`https://ianwalter.dev${path}`)
  expect(url.pathname).toBe(path)
})

test('URL instance', ({ expect }) => {
  const url = new Url(new URL('https://ianwalter.dev'))
  expect(url).toMatchSnapshot()
})

test('merge', ({ expect }) => {
  const urlString = 'https://ianwalter.dev'
  const url = new Url(urlString)
  const newHost = 'mybinxhealth.com'
  const merged = merge({ name: newHost }, url)
  expect(merged.name).toBe(newHost)
  expect(merged.origin).toBe(urlString)
})
