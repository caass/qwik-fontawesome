import { component$ } from "@builder.io/qwik";
import { dom } from "@fortawesome/fontawesome-svg-core";

export const FaStylesheet = component$(() => (
  <style dangerouslySetInnerHTML={dom.css()} />
));
