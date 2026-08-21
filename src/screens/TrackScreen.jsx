import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import PhotoBackdrop from '../components/ui/PhotoBackdrop';
import { LOCATION, TRACKING } from '../data/reportFixtures';
import styles from './TrackScreen.module.css';

const NODE_CLASS = {
  done: 'nodeDone',
  past: '',
  pending: 'nodePending',
};

/** Screen 8 — where the report has got to, and when it escalates. */
export default function TrackScreen({ shot, issue, onClose }) {
  return (
    <Screen tone="light" anim="fade" scroll className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.reference}>{TRACKING.reference}</h1>
        <span className={styles.status}>{TRACKING.status}</span>
      </div>

      <div className={styles.card}>
        <div className={styles.hero}>
          <PhotoBackdrop
            src={shot}
            tone="light"
            placeholder="Blurred public photo"
            style={shot ? { filter: 'blur(1px)' } : undefined}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.issue}>{issue.label}</div>
          <div className={styles.landmark}>{LOCATION.landmark}</div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{TRACKING.neighbours}</div>
              <div className={styles.statLabel}>neighbours</div>
            </div>
            <div className={`${styles.stat} ${styles.statUrgent}`}>
              <div className={`${styles.statValue} ${styles.statValueUrgent}`}>
                {TRACKING.daysToEscalation}
              </div>
              <div className={styles.statLabel}>till escalation</div>
            </div>
          </div>
        </div>
      </div>

      <ol className={styles.timeline}>
        {TRACKING.timeline.map((event, index) => {
          const isLast = index === TRACKING.timeline.length - 1;
          return (
            <li key={event.id} className={styles.event}>
              <div className={styles.rail}>
                <div className={`${styles.node} ${styles[NODE_CLASS[event.state]] || ''}`} />
                {!isLast && <div className={styles.line} />}
              </div>
              <div className={`${styles.eventBody} ${isLast ? styles.eventBodyLast : ''}`}>
                <div
                  className={`${styles.eventTitle} ${
                    event.state === 'pending' ? styles.eventTitlePending : ''
                  }`}
                >
                  {event.title}
                </div>
                <div className={styles.eventMeta}>{event.meta}</div>
              </div>
            </li>
          );
        })}
      </ol>

      <Button variant="secondary" className={styles.closeAction} onClick={onClose}>
        Fixed now? Take a photo to close
      </Button>
    </Screen>
  );
}
