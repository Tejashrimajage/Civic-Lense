import { useCallback } from 'react';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { LOCATION, RECEIPT } from '../data/reportFixtures';
import styles from './ReceiptScreen.module.css';

/** Screen 7 — proof it went, who has it, and what happens if nobody replies. */
export default function ReceiptScreen({ issue, onTrack, onReportAnother }) {
  const handleShare = useCallback(async () => {
    const text = `I reported "${issue.label}" at ${LOCATION.landmark} — reference ${RECEIPT.reference}.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'CivicLens report', text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // The reporter dismissed the share sheet — nothing to do.
    }
  }, [issue.label]);

  return (
    <Screen tone="light" anim="fade" scroll className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.tick} aria-hidden="true">
          ✓
        </div>
        <h1 className={styles.title}>Sent. It&apos;s on record.</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div>
            <div className={styles.label}>Your reference</div>
            <div className={styles.reference}>{RECEIPT.reference}</div>
          </div>
          <div className={styles.timestamp}>
            {RECEIPT.date}
            <br />
            {RECEIPT.time}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Sent to</div>
          <div className={styles.officer}>
            {issue.officer}, {LOCATION.ward}
          </div>
          <div className={styles.department}>{issue.department}</div>
        </div>

        <div className={styles.rowLast}>
          <div className={styles.label}>If nobody replies</div>
          <p className={styles.escalation}>
            On <strong>{RECEIPT.escalationDate}</strong> this goes up automatically to the
            Zonal Officer. You don&apos;t have to chase it.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" className={styles.actionHalf} onClick={handleShare}>
          Share
        </Button>
        <Button variant="primary" className={styles.actionHalf} onClick={onTrack}>
          Follow up
        </Button>
      </div>

      <Button variant="ghost" onClick={onReportAnother}>
        Report something else
      </Button>
    </Screen>
  );
}
