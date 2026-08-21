import IOSStatusBar from './IOSStatusBar';
import styles from './IOSDevice.module.css';

/**
 * iOS 26 device frame: bezel, dynamic island, status bar and home indicator.
 * Screen content is rendered into a full-bleed relative container.
 */
export default function IOSDevice({ children, dark = false }) {
  return (
    <div className={`${styles.device} ${dark ? styles.dark : ''}`}>
      <div className={styles.island} />

      <div className={styles.statusBar}>
        <IOSStatusBar dark={dark} />
      </div>

      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
      </div>

      <div className={styles.homeIndicator}>
        <span />
      </div>
    </div>
  );
}
