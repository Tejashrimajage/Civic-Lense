import styles from './Screen.module.css';

/**
 * Full-bleed screen layer inside the device frame.
 *
 * @param tone   'light' | 'dark' | 'overlay'
 * @param anim   'fade' | 'fadeFast' | 'none'
 * @param scroll whether the screen body scrolls
 * @param stack  lay children out as a flex column (see Screen.module.css)
 */
export default function Screen({
  children,
  tone = 'light',
  anim = 'fade',
  scroll = false,
  stack = false,
  className = '',
  ...rest
}) {
  const classes = [
    styles.screen,
    styles[tone],
    anim !== 'none' ? styles[anim] : '',
    scroll ? styles.scroll : '',
    stack ? styles.stack : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}
