import { component$, createElement } from "@builder.io/qwik";
import { icon, parse } from "@fortawesome/fontawesome-svg-core";

import type {
  IconLookup,
  IconProp,
  SizeProp,
  Transform,
  AbstractElement,
  FaSymbol,
  Attributes,
  IconParams,
} from "@fortawesome/fontawesome-svg-core";
import type { DOMAttributes, Signal, JSXNode } from "@builder.io/qwik";

/**
 * utility type to ensure i'm not missing anything.
 *
 * https://stackoverflow.com/a/57334147
 */
type RequireKeys<T> = { [K in keyof T]-?: [T[K]] } extends infer U
  ? U extends Record<keyof U, [any]>
    ? { [K in keyof U]: U[K][0] }
    : never
  : never;

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
  symbol?: FaSymbol;
  title?: string;
  titleId?: string;
  transform?: string | Transform;
  swapOpacity?: boolean;

  // TODO: once we use DOMAttributes<SVGElement>, replace these
  class?: DOMAttributes<SVGElement>["class"];
  // styles?: never // qwik doesn't support inline styles
  // TODO: inline these once we use DOMAttributes<SVGElement>
  attributes?: Attributes;
};

// TODO: `export type IconProps = IconSpecificProps & DOMAttributes<SVGElement>` once https://github.com/literalpie/storybook-framework-qwik/issues/16 is closed
export type IconProps = IconSpecificProps;

export const FaIcon = component$((props: IconProps) => {
  const iconLookup = toIconProp(props.icon);
  const transform = toTransform(props.transform);
  const mask = props.mask ? toIconProp(props.mask) : undefined;

  const faClasses = toFaClasses(props);
  const userClasses = toUserClasses(props.class);
  const classes = [...faClasses, ...userClasses];

  const params: RequireKeys<IconParams> = {
    title: props.title,
    titleId: props.titleId,
    classes,
    attributes: props.attributes,
    styles: undefined,
    transform,
    symbol: props.symbol,
    mask,
    maskId: props.maskId,
  };

  const processedIcon = icon(iconLookup, params);

  if (!processedIcon) {
    // error...
    console.error(`Could not find icon ${iconLookup}`);
    return null;
  }

  return <>{render(processedIcon.abstract)}</>;
});

function render(elements: AbstractElement[]): JSXNode<string>[] {
  return elements.map(({ tag, attributes, children }) => {
    const renderedChildren: JSXNode<string>[] = children?.length
      ? render(children)
      : [];
    return createElement(tag, attributes, renderedChildren);
  });
}

function toIconProp(icon: IconProp): IconLookup {
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

function toFaClasses(props: IconSpecificProps) {
  const classes = {
    "fa-beat": props.beat,
    "fa-fade": props.fade,
    "fa-beat-fade": props.beatFade,
    "fa-bounce": props.bounce,
    "fa-shake": props.shake,
    "fa-flash": props.flash,
    "fa-spin": props.spin,
    "fa-spin-reverse": props.spinReverse,
    "fa-spin-pulse": props.spinPulse,
    "fa-pulse": props.pulse,
    "fa-fw": props.fixedWidth,
    "fa-inverse": props.inverse,
    "fa-border": props.border,
    "fa-li": props.listItem,
    "fa-flip": props.flip === true,
    "fa-flip-horizontal": props.flip === "horizontal" || props.flip === "both",
    "fa-flip-vertical": props.flip === "vertical" || props.flip === "both",
    [`fa-${props.size}`]:
      typeof props.size !== "undefined" && props.size !== null,
    [`fa-rotate-${props.rotation}`]:
      typeof props.rotation !== "undefined" &&
      props.rotation !== null &&
      props.rotation !== 0,
    [`fa-pull-${props.pull}`]:
      typeof props.pull !== "undefined" && props.pull !== null,
    "fa-swap-opacity": props.swapOpacity,
  };

  // map over all the keys in the classes object
  // return an array of the keys where the value for the key is not null
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key);
}

// rip off `serializeClass`
function toUserClasses(classes?: IconProps["class"]): string[] {
  if (typeof classes === "undefined" || classes === null) {
    return [];
  }

  if (typeof classes === "string") {
    return classes.split(/\w+/).map((c) => c.trim());
  }

  if (isSignal(classes)) {
    return toUserClasses(classes.value);
  }

  if (Array.isArray(classes)) {
    return classes.flatMap((c) => toUserClasses(c));
  }

  return Object.keys(classes)
    .filter((key) => classes[key])
    .map((key) => key.trim());
}

function isSignal(x: unknown): x is Signal<any> {
  return (
    typeof x === "object" && x !== null && x.toString().startsWith("[Signal (")
  );
}

function toTransform(
  transformProp: IconProps["transform"]
): Transform | undefined {
  return typeof transformProp === "string"
    ? parse.transform(transformProp)
    : transformProp;
}
