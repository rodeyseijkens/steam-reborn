import { AnchorHTMLAttributes, ElementType, FocusEvent, forwardRef, Ref, useState } from 'react';

import { makeStyles, Typography, TypographyProps, useForkRef, useIsFocusVisible } from '@material-ui/core';
import clsx from 'clsx';
import { capitalize } from 'lodash';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

type NextComposedProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & NextLinkProps;

// eslint-disable-next-line prefer-arrow-callback
export const NextComposed = forwardRef(function NextComposed(props: NextComposedProps, ref: Ref<HTMLAnchorElement>) {
  const { href, replace, scroll, passHref, shallow, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow} passHref={passHref}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/anchor-has-content */}
      <a ref={ref} {...other} />
    </NextLink>
  );
});

interface LinkPropsBase extends TypographyProps<ElementType<any>> {
  activeClassName?: string;
  innerRef?: Ref<unknown>;
  naked?: boolean;
  underline?: 'none' | 'hover' | 'always';
  isButton?: boolean;
}

export type LinkProps = LinkPropsBase & Omit<NextComposedProps, 'as'>;

type ClassUnderlineType = `underline${Capitalize<'none' | 'hover' | 'always'>}`;

const useStyles = makeStyles(
  {
    /* Styles applied to the root element. */
    root: {
      '&:hover': {
        opacity: 0.85,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          opacity: 1,
        },
      },
    },
    /* Styles applied to the root element if `underline="none"`. */
    underlineNone: {
      textDecoration: 'none',
    },
    /* Styles applied to the root element if `underline="hover"`. */
    underlineHover: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    /* Styles applied to the root element if `underline="always"`. */
    underlineAlways: {
      textDecoration: 'underline',
    },
    /**
     * Same reset as ButtonBase.root
     * Styles applied to the root element if `component="button"`.
     */
    button: {
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent', // Reset default value
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      border: 0,
      margin: 0, // Remove the margin in Safari
      borderRadius: 0,
      padding: 0, // Remove the padding in Firefox
      cursor: 'pointer',
      userSelect: 'none',
      verticalAlign: 'middle',
      '-moz-appearance': 'none', // Reset
      '-webkit-appearance': 'none', // Reset
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
      },
      '&$focusVisible': {
        outline: 'auto',
      },
    },
    /* Pseudo-class applied to the root element if the link is keyboard focused. */
    focusVisible: {},
  },
  { name: 'Link' },
);

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = (props: LinkProps) => {
  const {
    activeClassName = 'active',
    className: classNameProps,
    naked,
    color = 'primary',
    onBlur,
    onFocus,
    underline: underlineProp = 'hover',
    innerRef = null,
    component,
    ...other
  } = props;

  const classes = useStyles();
  const router = useRouter();
  const pathname = typeof other.href === 'string' ? other.href : other.href?.pathname;

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = useState(false);
  const handlerRef = useForkRef(innerRef, focusVisibleRef);

  const handleBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    if (focusVisible) {
      onBlurVisible();
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  if (naked) {
    return (
      <NextComposed
        className={clsx(classNameProps, {
          [activeClassName]: router?.pathname === pathname && activeClassName,
        })}
        ref={handlerRef as Ref<HTMLAnchorElement>}
        {...other}
      />
    );
  }

  const underline = `underline${capitalize(underlineProp)}` as ClassUnderlineType; // TODO: Look into better Lodash typing

  return (
    <Typography
      className={clsx(classNameProps, classes.root, {
        [activeClassName]: router?.pathname === pathname && activeClassName,
        [classes.button]: component === 'button',
        [classes.focusVisible]: focusVisible,
        [classes[underline]]: underlineProp,
      })}
      color={color}
      component={NextComposed}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={handlerRef as Ref<HTMLAnchorElement>}
      {...other}
    />
  );
};

export default Link;
