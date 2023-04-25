import { Fragment, JSXNode, component$ } from "@builder.io/qwik";
import {
  icon as processIcon,
  parse,
  AbstractElement,
} from "@fortawesome/fontawesome-svg-core";

import type { DOMAttributes } from "@builder.io/qwik";
import type {
  IconLookup,
  IconProp,
  SizeProp,
  Transform,
} from "@fortawesome/fontawesome-svg-core";

/**
 * Resolve mapped types and show the derived keys and their types when hovering in
 * VS Code, instead of just showing the names those mapped types are defined with.
 *
 * [source](https://github.com/maninak/ts-xor/blob/master/src/types/Prettify.type.ts)
 */
// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};

type IconSpecificProps = {
  beat?: boolean;
  border?: boolean;
  beatFade?: boolean;
  bounce?: boolean;
  fade?: boolean;
  flash?: boolean;
  mask?: IconProp;
  maskId?: string;
  fixedWidth?: boolean;
  inverse?: boolean;
  flip?: boolean | "horizontal" | "vertical" | "both";
  icon: IconProp;
  listItem?: boolean;
  pull?: "left" | "right";
  pulse?: boolean;
  rotation?: 0 | 90 | 180 | 270;
  shake?: boolean;
  size?: SizeProp;
  spin?: boolean;
  spinPulse?: boolean;
  spinReverse?: boolean;
  symbol?: boolean | string;
  title?: string;
  titleId?: string;
  transform?: string | Transform;
  swapOpacity?: boolean;
};

// TODO: `export type IconProps = IconSpecificProps & DOMAttributes<SVGElement>` once https://github.com/literalpie/storybook-framework-qwik/issues/16 is closed
export type IconProps = IconSpecificProps;

function normalizeIconProp(icon: IconProp): IconLookup {
  if (Array.isArray(icon)) {
    const [prefix, iconName] = icon;
    return {
      prefix,
      iconName,
    };
  }

  if (typeof icon === "string") {
    return {
      prefix: "fas",
      iconName: icon,
    };
  }

  return icon;
}

function toClasses(
  props: Pick<
    IconProps,
    | "beat"
    | "fade"
    | "beatFade"
    | "bounce"
    | "shake"
    | "flash"
    | "spin"
    | "spinPulse"
    | "spinReverse"
    | "pulse"
    | "fixedWidth"
    | "inverse"
    | "border"
    | "listItem"
    | "flip"
    | "size"
    | "rotation"
    | "pull"
    | "swapOpacity"
  >
) {
  const {
    beat,
    fade,
    beatFade,
    bounce,
    shake,
    flash,
    spin,
    spinPulse,
    spinReverse,
    pulse,
    fixedWidth,
    inverse,
    border,
    listItem,
    flip,
    size,
    rotation,
    pull,
    swapOpacity,
  } = props;
  // map of CSS class names to properties
  const classes = {
    "fa-beat": beat,
    "fa-fade": fade,
    "fa-beat-fade": beatFade,
    "fa-bounce": bounce,
    "fa-shake": shake,
    "fa-flash": flash,
    "fa-spin": spin,
    "fa-spin-reverse": spinReverse,
    "fa-spin-pulse": spinPulse,
    "fa-pulse": pulse,
    "fa-fw": fixedWidth,
    "fa-inverse": inverse,
    "fa-border": border,
    "fa-li": listItem,
    "fa-flip": flip === true,
    "fa-flip-horizontal": flip === "horizontal" || flip === "both",
    "fa-flip-vertical": flip === "vertical" || flip === "both",
    [`fa-${size}`]: typeof size !== "undefined" && size !== null,
    [`fa-rotate-${rotation}`]:
      typeof rotation !== "undefined" && rotation !== null && rotation !== 0,
    [`fa-pull-${pull}`]: typeof pull !== "undefined" && pull !== null,
    "fa-swap-opacity": swapOpacity,
  };

  // map over all the keys in the classes object
  // return an array of the keys where the value for the key is not null
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key);
}

function toTransform(
  transformProp: IconProps["transform"]
): Transform | undefined {
  return typeof transformProp === "string"
    ? parse.transform(transformProp)
    : transformProp;
}

export const FaIcon = component$((props: IconProps) => {
  const iconLookup = normalizeIconProp(props.icon);
  // todo: also user classes
  const classes = toClasses(props);
  const transform = toTransform(props.transform);
  const mask = props.mask ? normalizeIconProp(props.mask) : undefined;

  const processedIcon = processIcon(iconLookup, {
    ...props,
    classes,
    transform,
    mask,
  });

  if (!processedIcon) {
    // error...
    console.error(`Could not find icon ${iconLookup}`);
    return null;
  }

  return render(processedIcon.abstract, props);
});

function render(elements: AbstractElement[], props: DOMAttributes<SVGElement>) {
  const rendered: JSXNode<string>[] = elements.map(
    ({ tag, attributes, children }) => {
      const flags = attributes?.flags ?? 0;
      const key = attributes.key ?? null;

      return {
        type: tag,
        props,
        immutableProps: attributes,
        children: children ? render(children, {}) : null,
        flags,
        key,
      } satisfies JSXNode<string>;
    }
  );

  return Fragment({ children: rendered }, null, 0);
}
