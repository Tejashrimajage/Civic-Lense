import Screen from '../components/ui/Screen';
import PhotoBackdrop from '../components/ui/PhotoBackdrop';
import { ANALYSIS_STEPS } from '../constants/screens';
import styles from './AnalyzingScreen.module.css';

/** Screen 2 — what the app is doing with the photo, in plain words. */
export default function AnalyzingScreen({ shot, step }) {
  return (
    <Screen tone="dark" anim="fadeFast">
      <div className={styles.backdrop}>
        <PhotoBackdrop src={shot} tone="dark" />
      </div>

      <div className={styles.sweepMask}>
        <div className={styles.sweep} />
      </div>

      <div className={styles.panel}>
        <h1 className={styles.title}>One moment…</h1>
        <ul className={styles.steps}>
          {ANALYSIS_STEPS.map((label, index) => {
            const complete = step >= index + 1;
            return (
              <li
                key={label}
                className={styles.step}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {complete ? (
                  <span className={styles.done} aria-hidden="true">
                    ✓
                  </span>
                ) : (
                  <span className={styles.waiting} aria-hidden="true" />
                )}
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </Screen>
  );
}
