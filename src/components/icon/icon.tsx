import { Fragment, JSXNode, component$ } from "@builder.io/qwik";
import {
  icon,
  parse,
  AbstractElement,
  FaSymbol,
} from "@fortawesome/fontawesome-svg-core";

import type {
  IconLookup,
  IconProp,
  SizeProp,
  Transform,
} from "@fortawesome/fontawesome-svg-core";

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
};

// TODO: `export type IconProps = IconSpecificProps & DOMAttributes<SVGElement>` once https://github.com/literalpie/storybook-framework-qwik/issues/16 is closed
export type IconProps = IconSpecificProps;

const render = (elements: AbstractElement[]) =>
  Fragment(
    {
      children: elements.map(
        ({ tag, attributes, children }): JSXNode<string> => {
          const flags = attributes?.flags ?? 0;
          const key = attributes.key ?? null;

          return {
            type: tag,
            props: attributes,
            immutableProps: null,
            children: children ? render(children) : null,
            flags,
            key,
          };
        }
      ),
    },
    null,
    0
  );

export const FaIcon = component$((props: IconProps) => {
  const iconLookup = toIconProp(props.icon);
  const classes = toClasses(props);
  const transform = toTransform(props.transform);
  const mask = props.mask ? toIconProp(props.mask) : undefined;

  const processedIcon = icon(iconLookup, {
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

  return render(processedIcon.abstract);
});

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

function toClasses(props: IconSpecificProps) {
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

function toTransform(
  transformProp: IconProps["transform"]
): Transform | undefined {
  return typeof transformProp === "string"
    ? parse.transform(transformProp)
    : transformProp;
}
