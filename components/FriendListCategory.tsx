import { useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { AnimatePresence, motion } from 'framer-motion';

import * as animations from '../constants/animations';
import useAriaClick from '../hooks/useAriaClick';
import { FriendListProfileProps } from './FriendListProfile';
import FriendListProfileProvider from './FriendListProfileProvider';
import Icon from './Icon';

export type FriendListCategoryProps = {
  index: number;
  category: string;
  steamIds?: number[];
  size?: FriendListProfileProps['size'];
};

type StyleProps = Pick<FriendListCategoryProps, 'index'>;

const useStyles = makeStyles(
  (theme) => ({
    header: {
      alignItems: 'center',
      backgroundColor: `${theme.palette.gradient.primary}`,
      border: `1px solid ${theme.palette.common.white}${theme.toHex(3)}`,
      borderWidth: '1px 0px',
      color: theme.palette.common.white,
      display: 'flex',
      height: theme.spacing(6.5),
      padding: theme.spacing(0, 2),
      position: 'sticky',
      top: ({ index }: StyleProps) => theme.spacing(index * 6.5),
      zIndex: 1,
      cursor: 'pointer',
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    category: {
      padding: theme.spacing(1, 0),
      overflow: 'hidden',
    },
  }),
  { name: 'FriendListCategory' },
);
const MotionIcon = motion(Icon);

export default function FriendListCategory(props: FriendListCategoryProps) {
  const { category, steamIds = [], size, index } = props;
  const [isOpen, setOpen] = useState(true);
  const classes = useStyles({ index });
  const toggleOpen = () => setOpen((prev) => !prev);
  const ariaClickProps = useAriaClick(toggleOpen);

  return (
    <>
      <header {...ariaClickProps} className={classes.header} tabIndex={index} role="tab" aria-labelledby={category}>
        <MotionIcon
          name="ChevronDown"
          className={classes.icon}
          {...animations.collapseChevron}
          animate={isOpen ? 'open' : 'collapsed'}
          initial={isOpen ? 'open' : 'collapsed'}
        />
        <Typography variant="subtitle1" component="h2">
          {category}
        </Typography>
      </header>
      <AnimatePresence initial={false}>
        {isOpen && (
          // eslint-disable-next-line jsx-a11y/role-supports-aria-props
          <motion.section className={classes.category} role="tablist" aria-expanded={isOpen} {...animations.collapse}>
            <AnimatePresence initial={false}>
              {steamIds.map((steamId) => (
                <motion.div key={`${category}-${steamId}`} {...animations.collapse}>
                  <FriendListProfileProvider steamId={steamId} size={size} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
