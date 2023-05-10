import { component$ } from "@builder.io/qwik";
import { dom, config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const FaStylesheet = component$(() => (
  <style dangerouslySetInnerHTML={dom.css()} />
));
