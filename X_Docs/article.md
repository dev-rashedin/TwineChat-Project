# Say Goodbye to Status Code Numbers: Why I Built `http-status-toolkit`


In my backend projects, writing raw status code numbers (`res.status(200)`, `res.status(404)`, etc.) repeatedly started to feel tedious and less readable. Like many developers, I wanted a cleaner, more expressive alternative.

## First, I Tried `http-status-codes`

[`http-status-codes`](https://www.npmjs.com/package/http-status-codes) is a popular choice. It lets you write:

  

```ts

import { StatusCodes } from "http-status-codes";

res.status(StatusCodes.OK);

```

  

Much better than using raw numbers, right? But it had **some drawbacks**:

  

| Feature                    | `http-status-codes` | `http-status` | `http-status-toolkit` |

|---------------------------|----------------------|----------------|------------------------|

| ESM Support               | ❌ No                | ✅ Yes         | ✅ Yes                 |

| CommonJS Support          | ✅ Yes               | ✅ Yes         | ✅ Yes                 |

| TypeScript Types          | ❌ No                | ✅ Partial     | ✅ Full                |

| Localization              | ❌ No                | ❌ No          | ✅ Yes (10+ languages) |

| Short Messages            | ✅ Yes               | ✅ Yes         | ✅ Yes                 |

| Detailed Messages         | ❌ No                | ❌ No          | ✅ Yes                 |

| Tree-shakable             | ❌ No                | ❌ No          | ✅ Yes                 |

| Lightweight (minified)    | ~7.4 KB              | ~9.6 KB        | ✅ ~4.4 KB             |

  

So I wanted something better.

  

## Then I Discovered `http-status`

  

[`http-status`](https://www.npmjs.com/package/http-status) does have **ESM support**, and supports **CommonJS** too. But still:

  

- No localization

- No detailed messages

- No modern TypeScript typings

- Slightly heavier

  

## So I Built My Own: `http-status-toolkit`

  

I created [`http-status-toolkit`](https://www.npmjs.com/package/http-status-toolkit) to solve these problems. It’s:

  

- ✅ Fully TypeScript supported

- ✅ Works in both CommonJS & ESM

- ✅ Comes with **short** and **detailed** human-readable messages

- ✅ Supports **localization** in 10+ languages

- ✅ Tree-shakable and subpath exportable

- ✅ Built with [`tsup`](https://github.com/egoist/tsup) for modern builds

  

## Example Usage

  

```ts

import { StatusCodes, getStatusMessage } from "http-status-toolkit";

  

console.log(StatusCodes.OK); // 200

  

// Get short message

console.log(getStatusMessage(StatusCodes.NOT_FOUND));

// Output: "Not Found"

  

// Get detailed message

import Detailed from "http-status-toolkit/messages-detailed";

console.log(getStatusMessage(StatusCodes.NOT_FOUND, { variant: Detailed }));

// Output: "Not Found: The requested resource could not be found..."

  

// Get localized message (e.g., Bengali)

import Bengali from "http-status-toolkit/messages-bn";

console.log(getStatusMessage(StatusCodes.NOT_FOUND, { variant: Bengali }));

```

  

## Why It Matters

  

This package improves:

  

- **Developer Experience**: More expressive, readable, and typed

- **Internationalization**: Localized reason phrases

- **Flexibility**: Works in modern and legacy environments

  

## Want to Explore?

  

- 🔗 [View on npm](https://www.npmjs.com/package/http-status-toolkit)

- 💻 [Source on GitHub](https://github.com/dev-rashedin/http-status-toolkit)

- 🌐 [My Portfolio](https://www.rashedin.dev)

  

---

  

Built with ❤️ and TypeScript by [Rashedin Islam](https://www.rashedin.dev)

