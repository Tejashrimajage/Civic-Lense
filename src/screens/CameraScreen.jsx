import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import PhotoBackdrop from '../components/ui/PhotoBackdrop';
import { useImageDrop } from '../hooks/useImageDrop';
import { LOCATION } from '../data/reportFixtures';
import styles from './CameraScreen.module.css';

/** Screen 1 — the viewfinder. One action: take the photo. */
export default function CameraScreen({ camera, shot, onShoot, onFileChange, onDropFile }) {
  const { dropProps, isOver } = useImageDrop(onDropFile);

  return (
    <Screen tone="dark" anim="fade">
      <div
        className={`${styles.viewfinder} ${isOver ? styles.dropping : ''}`}
        {...dropProps}
      >
        {camera.cameraOn ? (
          <video ref={camera.setVideoEl} className={styles.video} autoPlay muted playsInline />
        ) : (
          <PhotoBackdrop
            src={shot}
            tone="dark"
            placeholder="Drop a street photo, or tap Take photo to use your camera"
          />
        )}
      </div>

      <input
        ref={camera.fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFileChange}
        className={styles.hiddenInput}
      />

      <div className={styles.scrim} />

      <div className={styles.top}>
        <h1 className={styles.headline}>
          See a problem?
          <br />
          Take a photo.
        </h1>
        <div className={styles.wardPill}>
          <span />
          {LOCATION.wardLabel}
        </div>
      </div>

      <div className={styles.bottom}>
        {camera.cameraBlocked && (
          <button type="button" className={styles.cameraNote} onClick={camera.enableCamera}>
            {camera.cameraNote}
          </button>
        )}
        <p className={styles.reassurance}>No form. No login. Just the photo.</p>
        <Button variant="shutter" onClick={onShoot}>
          Take photo
        </Button>
        <Button variant="ghostLight" onClick={camera.openFilePicker}>
          Or choose from gallery
        </Button>
      </div>
    </Screen>
  );
}
