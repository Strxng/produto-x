import React from "react";

import { Icomoon } from "../Icomoon";

export type IconTypes = "search" | "rotation" | "shelf";

interface IIconProps {
  name: IconTypes;
  size: number;
}

export const Icon = (
  props: IIconProps & React.ComponentProps<typeof Icomoon>
) => {
  return <Icomoon {...props} name={props.name} size={props.size} />;
};
