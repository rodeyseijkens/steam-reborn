import { forwardRef, Ref } from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as FeatherIcons from 'react-feather';

export type IconProps = {
  color?: string;
  className?: string;
  name: keyof typeof FeatherIcons;
  ref?: Ref<SVGElement>;
};

const useStyles = makeStyles(
  () => ({
    icon: {
      height: '1em',
      width: '1em',
      verticalAlign: 'middle',
    },
  }),
  { name: 'FriendList' },
);

export default forwardRef<SVGElement, IconProps>(function Icon(props, ref) {
  const { name, color = 'currentColor', className, ...rest } = props;
  const classes = useStyles();
  const Component = FeatherIcons[name];

  return <Component color={color} className={clsx(classes.icon, className)} ref={ref} {...rest} />;
});
