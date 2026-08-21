import Screen from '../components/ui/Screen';
import { LOCATION } from '../data/reportFixtures';
import styles from './SendingScreen.module.css';

/** Transient state between the identity sheet and the receipt. */
export default function SendingScreen() {
  return (
    <Screen tone="light" anim="fadeFast" stack className={styles.screen} aria-live="polite">
      <div className={styles.pulse}>
        <div className={styles.ring} />
        <div className={styles.core} />
      </div>
      <p className={styles.label}>Sending to {LOCATION.ward}…</p>
    </Screen>
  );
}
