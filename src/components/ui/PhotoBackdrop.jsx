import styles from './PhotoBackdrop.module.css';

/**
 * Shows the captured photo, or a placeholder inviting one.
 *
 * @param tone 'dark' | 'light' — which surface the placeholder sits on
 */
export default function PhotoBackdrop({ src, placeholder = '', tone = 'dark', style }) {
  return (
    <div className={styles.wrap} style={style}>
      {src ? (
        <div
          className={styles.photo}
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label="The photo you took"
        />
      ) : (
        <div className={`${styles.placeholder} ${styles[tone]}`}>{placeholder}</div>
      )}
    </div>
  );
}
