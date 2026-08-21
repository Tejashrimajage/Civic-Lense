import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { DUPLICATE_CLUSTER } from '../data/reportFixtures';
import styles from './DuplicateScreen.module.css';

/** Screen 5 — neighbours already reported this. Joining them carries more weight. */
export default function DuplicateScreen({ onJoin, onSendSeparately }) {
  const {
    neighbours,
    distanceMetres,
    daysOpen,
    title,
    escalationSegments,
    segmentsElapsed,
  } = DUPLICATE_CLUSTER;

  return (
    <Screen tone="light" anim="fadeFast" stack className={styles.screen}>
      <h1 className={styles.title}>{neighbours} neighbours already reported this</h1>
      <p className={styles.body}>
        It is the same problem, {distanceMetres} metres from you, open for {daysOpen} days.
        Joining them is stronger than sending a new complaint.
      </p>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <span className={styles.cardTitle}>{title}</span>
          <span className={styles.cardMeta}>{daysOpen} days open</span>
        </div>
        <div className={styles.segments}>
          {Array.from({ length: escalationSegments }, (_, index) => (
            <div
              key={index}
              className={`${styles.segment} ${
                index < segmentsElapsed ? styles.segmentFilled : ''
              }`}
            />
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={onJoin}>
          Join their report
        </Button>
        <Button variant="secondary" onClick={onSendSeparately}>
          Send mine separately
        </Button>
      </div>
    </Screen>
  );
}
