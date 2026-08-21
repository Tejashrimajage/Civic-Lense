import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import PhotoBackdrop from '../components/ui/PhotoBackdrop';
import MiniMap from '../components/ui/MiniMap';
import { LOCATION } from '../data/reportFixtures';
import styles from './ConfirmScreen.module.css';

/** Screen 3 — what we think it is, where, and who it goes to. Confirm or correct. */
export default function ConfirmScreen({ shot, issue, onConfirm, onReject, onMovePin }) {
  return (
    <Screen tone="light" anim="none" stack>
      <div className={styles.hero}>
        <PhotoBackdrop src={shot} tone="dark" placeholder="Drop the photo you took" />
        <div className={`${styles.redaction} ${styles.redactFace}`} />
        <div className={`${styles.redaction} ${styles.redactPlate}`} />
        <div className={styles.privacyPill}>Face and plate hidden for you</div>
      </div>

      <div className={styles.sheet}>
        <p className={styles.eyebrow}>We think this is</p>
        <h1 className={styles.issue}>{issue.label}</h1>
        <p className={styles.issueDesc}>{issue.desc}</p>

        <div className={styles.locationCard}>
          <div className={styles.locationBody}>
            <MiniMap />
            <div className={styles.locationText}>
              <div className={styles.ward}>
                {LOCATION.ward}, {LOCATION.area}
              </div>
              <div className={styles.landmark}>{LOCATION.landmark}</div>
            </div>
          </div>
          <button type="button" className={styles.movePin} onClick={onMovePin}>
            Wrong spot? Move the pin
          </button>
        </div>

        <div className={styles.officerCard}>
          <div className={styles.officerLabel}>This will be sent to</div>
          <div className={styles.officerName}>{issue.officer}</div>
          <div className={styles.officerDesig}>{issue.desig}</div>
        </div>

        <Button variant="primary" onClick={onConfirm}>
          Yes, send it
        </Button>
        <Button variant="secondary" className={styles.altAction} onClick={onReject}>
          No, it&apos;s something else
        </Button>
      </div>
    </Screen>
  );
}
