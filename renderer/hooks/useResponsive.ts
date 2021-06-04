import { useMediaQuery, useTheme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { findLast } from 'lodash';

type MediaQueryMatches = Record<Breakpoint, boolean>;

const useMediaQueryMatches = () => {
  const theme = useTheme();
  const matches = theme.breakpoints.keys.reduce(
    (acc, bp) => ({
      ...acc,
      /*
        Disable the react hook rule, this is a temporary hook anyway
        Technically to fix this you have a set list and run the hook eacht time,
        this is just a bit nicer code
      */
      // eslint-disable-next-line react-hooks/rules-of-hooks
      [bp]: useMediaQuery(theme.breakpoints.up(bp)),
    }),
    {} as MediaQueryMatches,
  );

  return matches;
};

type ResponsiveValues<ValueT> = Partial<Record<Breakpoint, ValueT>>;

const useResponsive = () => {
  const theme = useTheme();
  const matches = useMediaQueryMatches();

  return <P, DefaultT = undefined>(responsiveValues: ResponsiveValues<P>, defaultValue?: DefaultT) => {
    const match = findLast(theme.breakpoints.keys, (bp) => matches[bp] && responsiveValues[bp] != null);

    return match ? responsiveValues[match] : defaultValue;
  };
};

export { useMediaQueryMatches, useResponsive };

export type { MediaQueryMatches, ResponsiveValues };
