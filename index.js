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

  // TODO: comment
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

  //
  for (const prop of props) {
    // Create a descriptor with a setter that also sets the property on the src
    // URL instance so that it can
    let descriptor
    if (prop === 'search') {
      descriptor = {
        enumerable: true,
        set (val) {
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
      // TODO: comment
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
