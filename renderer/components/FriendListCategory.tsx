import { useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { AnimatePresence, motion } from 'framer-motion';

import * as animations from '../constants/animations';
import useAriaClick from '../hooks/useAriaClick';
import FriendListProfileProvider from './FriendListProfileProvider';
import Icon from './Icon';

export type FriendListCategoryProps = {
  index: number;
  category: string;
  steamIds?: number[];
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
      zIndex: 2,
      cursor: 'pointer',
      '& > h2': {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        flexGrow: 1,
        overflow: 'hidden',
      },
    },
    icon: {
      marginRight: theme.spacing(1.5),
      flexShrink: 0,
    },
    category: {
      padding: theme.spacing(1, 0),
      overflow: 'hidden',
    },
  }),
  { name: 'FriendListCategory' },
);

export default function FriendListCategory(props: FriendListCategoryProps) {
  const { category, steamIds = [], index } = props;
  const [isOpen, setOpen] = useState(true);
  const classes = useStyles({ index });
  const toggleOpen = () => setOpen((prev) => !prev);
  const ariaClickProps = useAriaClick(toggleOpen);

  return (
    <>
      <header {...ariaClickProps} className={classes.header} tabIndex={index} role="tab" aria-labelledby={category}>
        <motion.div
          className={classes.icon}
          {...animations.collapseChevron}
          animate={isOpen ? 'open' : 'collapsed'}
          initial={isOpen ? 'open' : 'collapsed'}
        >
          <Icon icon="chevron-down" />
        </motion.div>
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
                  <FriendListProfileProvider steamId={steamId} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
