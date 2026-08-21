import styles from './Button.module.css';

/**
 * The app's only button. `variant` picks the role:
 * primary | shutter | secondary | ghost | ghostLight | skip
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = [styles.base, styles[variant], className].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {variant === 'shutter' && <span className={styles.shutterRing} />}
      {children}
    </button>
  );
}
