import { SCREEN_NAV } from '../../constants/screens';
import styles from './Sidebar.module.css';

/**
 * Walkthrough rail beside the device. Lets you jump to any screen and flip the
 * two demo switches that change how the flow branches. Hidden on phones.
 */
export default function Sidebar({ current, onNavigate, demo, onDemoChange }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.mark}>
          <span />
        </div>
        <div className={styles.name}>CivicLens</div>
      </div>

      <p className={styles.tagline}>
        Take one photo. We work out what it is, who is responsible, and send it for you.
      </p>

      <div className={styles.groupLabel}>SCREENS</div>
      <nav className={styles.nav}>
        {SCREEN_NAV.map(({ screen, label }) => {
          const active = current === screen;
          return (
            <button
              key={screen}
              type="button"
              className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => onNavigate(screen)}
            >
              {label}
              {active && <span className={styles.dot} />}
            </button>
          );
        })}
      </nav>

      <div className={styles.toggles}>
        <div className={styles.groupLabel}>DEMO STATE</div>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={demo.lowConfidence}
            onChange={(e) => onDemoChange('lowConfidence', e.target.checked)}
          />
          <span>
            Low confidence
            <span className={styles.toggleHint}>
              Checking hands off to the manual picker instead of a guess.
            </span>
          </span>
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={demo.showDuplicate}
            onChange={(e) => onDemoChange('showDuplicate', e.target.checked)}
          />
          <span>
            Duplicate nearby
            <span className={styles.toggleHint}>
              Offer to join a neighbour&apos;s open report before sending.
            </span>
          </span>
        </label>
      </div>

      <p className={styles.footnote}>
        Big text, big buttons, one action per screen. Drag a real photo onto the camera view
        to rehearse with it.
      </p>
    </aside>
  );
}
