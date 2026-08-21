import { useCallback, useEffect, useRef, useState } from 'react';
import { SCREENS, TIMING } from '../constants/screens';
import { DEFAULT_ISSUE_ID, getIssue } from '../data/issueTypes';
import { IDENTITY_DEFAULTS } from '../data/reportFixtures';
import { useCamera } from './useCamera';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The report state machine: camera → analysing → confirm/picker →
 * duplicate/identity → sending → receipt → follow up.
 *
 * `lowConfidence` and `showDuplicate` are demo switches carried over from the
 * prototype: they decide whether analysis hands off to the manual picker, and
 * whether a duplicate cluster is surfaced before the identity sheet.
 */
export function useReportFlow({ lowConfidence = false, showDuplicate = false } = {}) {
  const [screen, setScreen] = useState(SCREENS.CAMERA);
  const [step, setStep] = useState(0);
  const [issueId, setIssueId] = useState(DEFAULT_ISSUE_ID);
  const [shot, setShot] = useState(null);
  const [identity, setIdentity] = useState(IDENTITY_DEFAULTS);

  const camera = useCamera();
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  /** Jump straight to a screen, cancelling any scheduled transition. */
  const goTo = useCallback(
    (next) => {
      clearTimers();
      setScreen(next);
    },
    [clearTimers],
  );

  /** Run the staged analysis, then hand off to confirm or the manual picker. */
  const startAnalysis = useCallback(() => {
    clearTimers();
    setStep(0);
    setScreen(SCREENS.ANALYZING);
    timers.current = [
      setTimeout(() => setStep(1), TIMING.ANALYSIS_STEP_1),
      setTimeout(() => setStep(2), TIMING.ANALYSIS_STEP_2),
      setTimeout(() => setStep(3), TIMING.ANALYSIS_STEP_3),
      setTimeout(
        () => setScreen(lowConfidence ? SCREENS.PICKER : SCREENS.CONFIRM),
        TIMING.ANALYSIS_DONE,
      ),
    ];
  }, [clearTimers, lowConfidence]);

  /** Accept a photo (from the camera or the gallery) and analyse it. */
  const acceptPhoto = useCallback(
    (dataUrl) => {
      if (dataUrl) setShot(dataUrl);
      startAnalysis();
    },
    [startAnalysis],
  );

  /** Primary shutter. Falls back to the gallery when there is no camera. */
  const shoot = useCallback(async () => {
    if (camera.cameraOn) {
      const frame = camera.capture();
      if (frame) {
        acceptPhoto(frame);
        return;
      }
    } else {
      const started = await camera.enableCamera();
      if (started) {
        await sleep(TIMING.CAMERA_WARMUP);
        const frame = camera.capture();
        if (frame) {
          acceptPhoto(frame);
          return;
        }
      }
    }
    // No usable frame — let the reporter pick an existing photo instead.
    if (!camera.openFilePicker()) acceptPhoto(null);
  }, [camera, acceptPhoto]);

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      // Reset so re-picking the same file still fires a change event.
      event.target.value = '';
      if (!file) return;
      const dataUrl = await camera.readFile(file);
      if (dataUrl) acceptPhoto(dataUrl);
    },
    [camera, acceptPhoto],
  );

  /** Drag-and-drop onto the viewfinder, for rehearsing with a real photo. */
  const handleDroppedFile = useCallback(
    async (file) => {
      if (!file?.type?.startsWith('image/')) return;
      const dataUrl = await camera.readFile(file);
      if (dataUrl) setShot(dataUrl);
    },
    [camera],
  );

  const pickIssue = useCallback(
    (id) => {
      clearTimers();
      setIssueId(id);
      setScreen(SCREENS.CONFIRM);
    },
    [clearTimers],
  );

  /** Confirming routes through the duplicate screen when one was detected. */
  const confirmIssue = useCallback(() => {
    goTo(showDuplicate ? SCREENS.DUPLICATE : SCREENS.IDENTITY);
  }, [goTo, showDuplicate]);

  const send = useCallback(() => {
    clearTimers();
    setScreen(SCREENS.SENDING);
    timers.current = [setTimeout(() => setScreen(SCREENS.RECEIPT), TIMING.SENDING)];
  }, [clearTimers]);

  /** Start over for another report, keeping the reporter's details. */
  const restart = useCallback(() => {
    clearTimers();
    setShot(null);
    setStep(0);
    setIssueId(DEFAULT_ISSUE_ID);
    setScreen(SCREENS.CAMERA);
  }, [clearTimers]);

  return {
    screen,
    step,
    shot,
    issue: getIssue(issueId),
    identity,
    setIdentity,
    camera,
    goTo,
    startAnalysis,
    shoot,
    handleFileChange,
    handleDroppedFile,
    pickIssue,
    confirmIssue,
    send,
    restart,
  };
}
