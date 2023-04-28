import { parse } from "@fortawesome/fontawesome-svg-core";

import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type {
  IconProp,
  SizeProp,
  Transform,
  FaSymbol,
  IconLookup,
  IconParams,
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

// TODO: unlink local once https://github.com/BuilderIO/qwik/pull/3938 is merged and released
export type IconProps = IconSpecificProps & QwikIntrinsicElements["svg"];

export const extractIconSpecificProps = (
  props: IconProps
): { iconProps: IconSpecificProps; svgProps: QwikIntrinsicElements["svg"] } => {
  const {
    beat,
    border,
    beatFade,
    bounce,
    fade,
    flash,
    mask,
    maskId,
    fixedWidth,
    inverse,
    flip,
    icon,
    listItem,
    pull,
    pulse,
    rotation,
    shake,
    size,
    spin,
    spinPulse,
    spinReverse,
    symbol,
    title,
    titleId,
    transform,
    swapOpacity,

    ...svgProps
  } = props;

  const iconProps = {
    beat,
    border,
    beatFade,
    bounce,
    fade,
    flash,
    mask,
    maskId,
    fixedWidth,
    inverse,
    flip,
    icon,
    listItem,
    pull,
    pulse,
    rotation,
    shake,
    size,
    spin,
    spinPulse,
    spinReverse,
    symbol,
    title,
    titleId,
    transform,
    swapOpacity,
  };

  return {
    iconProps,
    svgProps,
  };
};

/**
 * Convert props into parameters for
 * @param props Props you can pass in to a qwik component
 * @returns Parameters for rendering an icon out with `fontawesome-svg-core`
 */
export const toIconParams = (props: IconSpecificProps) => ({
  iconLookup: toIconLookup(props.icon),
  params: {
    title: props.title,
    titleId: props.titleId,
    classes: toFaClasses(props),
    // TODO: attributes: toAttributes(props),
    transform: toTransform(props.transform),
    symbol: props.symbol,
    mask: props.mask && toIconLookup(props.mask),
    maskId: props.maskId,
  } satisfies IconParams,
});

function toIconLookup(icon: IconProp): IconLookup {
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

function toTransform(
  transformProp: IconSpecificProps["transform"]
): Transform | undefined {
  return typeof transformProp === "string"
    ? parse.transform(transformProp)
    : transformProp;
}
