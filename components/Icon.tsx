import { forwardRef, Ref } from 'react';

import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faEllipsisV, faSnooze } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

library.add(faChevronDown, faEllipsisV, faSnooze);

export type IconProps = {
  color?: string;
  className?: string;
  icon: IconName;
  ref?: Ref<SVGElement>;
  title?: string;
};

const useStyles = makeStyles(
  () => ({
    icon: {
      '&$overwrite': {
        height: '1em',
        width: '1em',
        verticalAlign: 'middle',
        fontSize: 'inherit',
      },
    },
    overwrite: {},
  }),
  { name: 'FriendList' },
);

export default forwardRef<SVGElement, IconProps>(function Icon(props, ref) {
  const { icon, className, ...rest } = props;
  const classes = useStyles();

  return (
    <FontAwesomeIcon
      className={clsx(classes.icon, classes.overwrite, className)}
      icon={['far', icon]}
      ref={ref}
      {...rest}
    />
  );
});
