import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import styles from './IdentityScreen.module.css';

/** Screen 6 — who is reporting, so the officer can reply. Skippable. */
export default function IdentityScreen({ identity, onIdentityChange, onSend, onSkip }) {
  const update = (field) => (event) =>
    onIdentityChange({ ...identity, [field]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend();
  };

  return (
    <Screen tone="overlay" anim="none" stack className={styles.screen}>
      <form className={styles.sheet} onSubmit={handleSubmit}>
        <div className={styles.grabber} />
        <h1 className={styles.title}>Your name, so they can reply</h1>
        <p className={styles.body}>
          Officers act faster on named complaints. Your email is only used as the reply
          address.
        </p>

        <div className={styles.fields}>
          <input
            className={styles.field}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            aria-label="Your name"
            value={identity.name}
            onChange={update('name')}
          />
          <input
            className={styles.field}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-label="Your email"
            value={identity.email}
            onChange={update('email')}
          />
        </div>

        <Button variant="primary" type="submit">
          Send complaint
        </Button>
        <Button variant="skip" className={styles.skip} onClick={onSkip}>
          Skip — send without my name
        </Button>
      </form>
    </Screen>
  );
}
