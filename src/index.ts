import { dom, config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
export { config };

export { FaIcon } from "./components/icon/icon";
export const faCss = dom.css();
export type { IconProps } from "./components/icon/icon";
