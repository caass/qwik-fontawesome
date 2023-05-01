# qwik-fontawesome

Use [Font Awesome](https://fontawesome.com/) icons with [Qwik](https://qwik.builder.io/)!

## ⚠️ THIS IS NOT AN OFFICIAL FONT AWESOME PACKAGE ⚠️

This is a community maintained integration, and as such does not have official support from the Font Awesome or Qwik teams. That being said, please [file an issue](https://github.com/caass/qwik-fontawesome/issues/new/choose) if you think something's wrong or you'd like a new feature to be added or whatever.

## Get Started

1. Install [`fontawesome-svg-core`](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) and `qwik-fontawesome`

```sh
# or yarn, or pnpm, or whatever
npm i --save @fortawesome/fontawesome-svg-core qwik-fontawesome
```

2. Install your [icon packages](https://fontawesome.com/docs/apis/javascript/import-icons#package-names)

```sh
npm i --save @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
# or, with pro license
npm i --save @fortawesome/pro-solid-svg-icons @fortawesome/pro-regular-svg-icons # ...
```

3. Import the `FaStylesheet` component into your document head somehow. In a Qwik City app, for example:

```tsx
// root.tsx
import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { FaStylesheet } from "qwik-fontawesome";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <FaStylesheet />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
```

4. Use the `FaIcon` component with impunity! It looks a lot like how it does in React, since it's JSX. Here's a snippet from the component I use to manually test things.

```tsx
import {
  faBoltLightning,
  faPlus,
  faFontAwesome,
  faEquals,
  faFaceGrinHearts,
} from "@fortawesome/free-solid-svg-icons";
import { component$, useStyles$, $, useSignal } from "@builder.io/qwik";

import { FaIcon, FaStylesheet } from ".";

import "normalize.css/normalize.css";
import "purecss/build/pure.css";

export default component$(() => {
  useStyles$(`
  .reset-links a, a.reset-links {
    text-decoration: none;
    color: inherit;
  }

  .content {
    margin-left: 10%;
    margin-right: 10%;
    justify-content: center;
  }

  .title {
    font-size: 6rem;
    text-align: center;
  }
  
  .fa-color {
    color: #538dd7 !important;
  }

  .qwik-color {
    color: #ac7ef4 !important;
    background-color: white !important;
  }

  .emoji-color {
    color: #ffde34 !important;
  }
  `);

  const faIconShouldShake = useSignal(false);

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik + Font Awesome</title>
        <FaStylesheet />
      </head>
      <body>
        <div class="pure-g content">
          <h1 class="pure-u-1 reset-links title">
            <a href="https://fontawesome.com/" class="fa-color">
              <FaIcon
                icon={faFontAwesome}
                onMouseEnter$={$(() => {
                  faIconShouldShake.value = true;
                })}
                onMouseLeave$={$(() => {
                  faIconShouldShake.value = false;
                })}
                shake={faIconShouldShake.value}
                fixedWidth
              />
            </a>
            <FaIcon icon={faPlus} fixedWidth />
            <a href="https://qwik.builder.io/" class="qwik-color">
              <FaIcon icon={faBoltLightning} fixedWidth flip="horizontal" />
            </a>
            <FaIcon icon={faEquals} fixedWidth />
            <FaIcon icon={faFaceGrinHearts} fixedWidth class="emoji-color" />
          </h1>
        </div>
      </body>
    </>
  );
});
```

## FAQ

1. Why can't I use `onMouseEnter$` or other qwik props with typescript?
   - You can, Qwik just [doesn't properly export SVG prop types at the moment](https://github.com/caass/qwik-fontawesome/issues/1) so you won't get intellisense or autocompletion. Every prop you pass in to a `FaIcon` that isn't an explicitly font awesome prop will get forwarded to the underlying SVG.
2. Why can't I do \<thing that i can do in react-fontawesome\>?
   - No reason! I probably just didn't run into it in my testing. File an issue, or even better submit a PR!
