import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_EDGE = 1280;
const JPEG_QUALITY = 0.85;

/** Draw the current video frame to a canvas and return it as a data URL. */
function frameToDataUrl(video) {
  if (!video || !video.videoWidth) return null;
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, MAX_EDGE / Math.max(video.videoWidth, video.videoHeight));
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

/**
 * Live rear camera with graceful degradation: if getUserMedia is unavailable
 * or denied, callers fall back to the hidden file input instead.
 *
 * Note: browsers only grant camera access on https or localhost.
 */
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState(null); // 'blocked' | 'none' | null

  /** Bind the live stream to the <video> element, whenever both exist. */
  const attachStream = useCallback(() => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream || video.srcObject === stream) return;
    video.srcObject = stream;
    const played = video.play();
    if (played && played.catch) played.catch(() => {});
  }, []);

  /** Callback ref, so the stream re-attaches every time the view remounts. */
  const setVideoEl = useCallback(
    (el) => {
      videoRef.current = el;
      attachStream();
    },
    [attachStream],
  );

  const start = useCallback(async () => {
    if (streamRef.current) return true;
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraOn(false);
      setCameraError('none');
      return false;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: MAX_EDGE } },
        audio: false,
      });
      setCameraOn(true);
      setCameraError(null);
      attachStream();
      return true;
    } catch (err) {
      setCameraOn(false);
      setCameraError(err?.name === 'NotAllowedError' ? 'blocked' : 'none');
      return false;
    }
  }, [attachStream]);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  }, []);

  // Ask on mount; release the hardware on unmount.
  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const capture = useCallback(() => frameToDataUrl(videoRef.current), []);

  const openFilePicker = useCallback(() => {
    if (!fileInputRef.current) return false;
    fileInputRef.current.click();
    return true;
  }, []);

  /** Read a picked file into a data URL. */
  const readFile = useCallback((file) => {
    if (!file) return Promise.resolve(null);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }, []);

  const cameraNote =
    cameraError === 'blocked'
      ? 'Camera blocked here — allow it in the browser, or open the app over https/localhost'
      : 'No camera available — using a photo from your device instead';

  return {
    setVideoEl,
    fileInputRef,
    cameraOn,
    cameraError,
    cameraBlocked: !cameraOn && Boolean(cameraError),
    cameraNote,
    enableCamera: start,
    stopCamera: stop,
    capture,
    openFilePicker,
    readFile,
  };
}
