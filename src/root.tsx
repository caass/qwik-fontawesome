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
