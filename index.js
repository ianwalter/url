export default class Url {
  constructor (...args) {
    Object.defineProperty(this, 'url', { enumerable: false, writable: true })
    this.url = args[0] instanceof URL ? args[0] : new URL(...args)
    this.toString = this.url.toString.bind(this.url)

    this.hash = this.url.hash
    this.host = this.url.host
    this.hostname = this.url.hostname
    this.href = this.url.href
    this.origin = this.url.origin
    this.password = this.url.password
    this.pathname = this.url.pathname
    this.port = this.url.port
    this.protocol = this.url.protocol
    this.username = this.url.username

    this.search = {}
    this.url.searchParams.forEach((value, key) => (this.search[key] = value))
  }
}
