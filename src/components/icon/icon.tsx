import { component$ } from "@builder.io/qwik";
import { icon } from "@fortawesome/fontawesome-svg-core";

import { extractIconSpecificProps, toIconParams } from "./props";

import type { IconProps } from "./props";
import type { AbstractElement } from "@fortawesome/fontawesome-svg-core";

export type { IconProps } from "./props";

export const FaIcon = component$((props: IconProps) => {
  const { iconProps, svgProps } = extractIconSpecificProps(props);
  const { iconLookup, params } = toIconParams(iconProps);
  const processedIcon = icon(iconLookup, params);

  if (!processedIcon) {
    // error...
    console.error(`Could not find icon ${iconLookup}`);
    return null;
  }

  // we're guaranteed to always have exactly one SVG element at the root. I think.
  const {
    attributes: { class: faClass, ...faSvgProps },
    children,
  } = processedIcon.abstract[0];
  const { class: userClass, ...userSvgProps } = svgProps;

  return (
    <svg class={[userClass, faClass]} {...faSvgProps} {...userSvgProps}>
      {children?.map((element, i) => (
        <FaIconFragment key={`${element.tag}-${i}`} element={element} />
      ))}
    </svg>
  );
});

const FaIconFragment = component$(
  ({
    element: { tag, attributes, children },
  }: {
    element: AbstractElement;
  }) => {
    const Fragment = tag;
    return (
      <Fragment {...attributes}>
        {children?.map((child, i) => (
          <FaIconFragment key={`${child.tag}-${i}`} element={child} />
        ))}
      </Fragment>
    );
  }
);
