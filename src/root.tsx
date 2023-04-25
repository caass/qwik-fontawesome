import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FaIcon, FaStylesheet } from ".";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik-Fontawesome</title>
        <FaStylesheet />
      </head>
      <body>
        <div>
          <p>
            <span>
              <FaIcon icon={faHand} pull="left" size="sm" />
            </span>
            Hello! This is an example app using{" "}
            <a href="https://fontawesome.com/">Font Awesome</a> Icons with{" "}
            <a href="https://qwik.builder.io/">Qwik!</a>
          </p>
        </div>
      </body>
    </>
  );
};
