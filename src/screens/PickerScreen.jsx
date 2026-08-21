import Screen from '../components/ui/Screen';
import { PICKER_ORDER, getIssue } from '../data/issueTypes';
import styles from './PickerScreen.module.css';

/** Screen 4 — pick the issue yourself. Tap one, nothing else to fill in. */
export default function PickerScreen({ onPick }) {
  return (
    <Screen tone="light" anim="fadeFast" scroll className={styles.screen}>
      <h1 className={styles.title}>What do you see?</h1>
      <p className={styles.subtitle}>Tap one. Nothing else to fill in.</p>

      <div className={styles.list}>
        {PICKER_ORDER.map(({ id, emphasis }) => {
          const issue = getIssue(id);
          return (
            <button
              key={id}
              type="button"
              className={`${styles.option} ${styles[emphasis]}`}
              onClick={() => onPick(id)}
            >
              <span className={styles.optionLabel}>{issue.pickerLabel}</span>
              {emphasis === 'likely' && <span className={styles.badge}>Likely</span>}
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
