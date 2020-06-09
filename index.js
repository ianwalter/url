const props = [
  'hash',
  'host',
  'hostname',
  'href',
  'origin',
  'password',
  'pathname',
  'port',
  'protocol',
  'username',
  'search'
]

export default function createUrl (base, path) {
  // Create the url Object which will be returned.
  const url = {
    toString () {
      return this.src.toString()
    }
  }

  // Re-arrange the arguments for the URL class since it's API is backwards IMO.
  const args = []
  if (base && typeof base === 'object') {
    if (path) {
      args.push(path, base.origin)
    } else {
      args.push(base.href)
    }
  } else {
    if (path) args.push(path)
    args.push(base)
  }

  // Creates a URL instance from the given arguments and adds it to the url
  // Object as a non-enumerable property.
  const desc = { enumerable: false, writable: true, value: new URL(...args) }
  Object.defineProperty(url, 'src', desc)

  // Go through all the props and set up getters and setters for them on the url
  // Object.
  for (const prop of props) {
    let descriptor
    if (prop === 'search') {
      descriptor = {
        enumerable: true,
        set (val) {
          // Convert the search Object into a query string.
          const entries = Object.entries(val).reduce(
            (acc, [k, v]) => {
              if (Array.isArray(v)) return acc.concat(v.map(vs => [k, vs]))
              return acc.concat([[k, v]])
            },
            []
          )
          const last = entries.length - 1
          let search = entries.length ? '?' : ''
          for (let i = 0; i <= last; i++) {
            search += `${entries[i][0]}=${entries[i][1]}`
            if (i < last) search += '&'
          }
          this.src.search = search
        },
        get () {
          // Convert the searchParams instance into a normal key-value Object.
          const obj = {}
          for (const [k, v] of this.src.searchParams) {
            if (obj[k] !== undefined && Array.isArray(obj[k])) {
              obj[k].push(v)
            } else if (obj[k] !== undefined) {
              obj[k] = [obj[k], v]
            } else {
              obj[k] = v
            }
          }
          return obj
        }
      }
    } else {
      descriptor = {
        enumerable: true,
        get () {
          return this.src[prop]
        },
        set (val) {
          this.src[prop] = val
        }
      }
    }

    Object.defineProperty(url, prop, descriptor)
  }

  return url
}
