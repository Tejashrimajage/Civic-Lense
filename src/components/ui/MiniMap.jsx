import styles from './MiniMap.module.css';

/** Decorative map thumbnail showing where the report is pinned. */
export default function MiniMap() {
  return (
    <div className={styles.map} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.road} />
      <div className={styles.pin} />
    </div>
  );
}
