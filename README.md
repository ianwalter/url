# @ianwalter/url
> The URL constructor / class without tears

[![npm page][npmImage]][npmUrl]
[![CI][ciImage]][ciUrl]

## Installation

```console
yarn add @ianwalter/url
```

## Usage

```js
const Url = require('@ianwalter/url')

const url = new Url('https://ianwalter.dev')
// or use a URL instance:
// let url = new URL('https://ianwalter.dev')
// url = new Url(url)

url.hostname //=> ianwalter.dev
```

## License

Hippocratic License - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[npmImage]: https://img.shields.io/npm/v/@ianwalter/url.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/url
[ciImage]: https://github.com/ianwalter/url/workflows/CI/badge.svg
[ciUrl]: https://github.com/ianwalter/url/actions
[licenseUrl]: https://github.com/ianwalter/url/blob/master/LICENSE
