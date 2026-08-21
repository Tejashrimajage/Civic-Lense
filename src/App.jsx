import { useCallback, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import IOSDevice from './components/device/IOSDevice';
import CameraScreen from './screens/CameraScreen';
import AnalyzingScreen from './screens/AnalyzingScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import PickerScreen from './screens/PickerScreen';
import DuplicateScreen from './screens/DuplicateScreen';
import IdentityScreen from './screens/IdentityScreen';
import SendingScreen from './screens/SendingScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import TrackScreen from './screens/TrackScreen';
import { useReportFlow } from './hooks/useReportFlow';
import { DARK_SCREENS, SCREENS } from './constants/screens';
import styles from './App.module.css';

export default function App() {
  const [demo, setDemo] = useState({ lowConfidence: false, showDuplicate: false });
  const flow = useReportFlow(demo);

  const handleDemoChange = useCallback((key, value) => {
    setDemo((prev) => ({ ...prev, [key]: value }));
  }, []);

  /** Sidebar jumps. "Checking" replays the analysis rather than freezing on it. */
  const handleNavigate = useCallback(
    (screen) => {
      if (screen === SCREENS.ANALYZING) flow.startAnalysis();
      else flow.goTo(screen);
    },
    [flow],
  );

  const renderScreen = () => {
    switch (flow.screen) {
      case SCREENS.CAMERA:
        return (
          <CameraScreen
            camera={flow.camera}
            shot={flow.shot}
            onShoot={flow.shoot}
            onFileChange={flow.handleFileChange}
            onDropFile={flow.handleDroppedFile}
          />
        );

      case SCREENS.ANALYZING:
        return <AnalyzingScreen shot={flow.shot} step={flow.step} />;

      case SCREENS.CONFIRM:
        return (
          <ConfirmScreen
            shot={flow.shot}
            issue={flow.issue}
            onConfirm={flow.confirmIssue}
            onReject={() => flow.goTo(SCREENS.PICKER)}
            onMovePin={() => {}}
          />
        );

      case SCREENS.PICKER:
        return <PickerScreen onPick={flow.pickIssue} />;

      case SCREENS.DUPLICATE:
        return (
          <DuplicateScreen
            onJoin={() => flow.goTo(SCREENS.IDENTITY)}
            onSendSeparately={() => flow.goTo(SCREENS.IDENTITY)}
          />
        );

      case SCREENS.IDENTITY:
        return (
          <IdentityScreen
            identity={flow.identity}
            onIdentityChange={flow.setIdentity}
            onSend={flow.send}
            onSkip={flow.send}
          />
        );

      case SCREENS.SENDING:
        return <SendingScreen />;

      case SCREENS.RECEIPT:
        return (
          <ReceiptScreen
            issue={flow.issue}
            onTrack={() => flow.goTo(SCREENS.TRACK)}
            onReportAnother={flow.restart}
          />
        );

      case SCREENS.TRACK:
        return <TrackScreen shot={flow.shot} issue={flow.issue} onClose={flow.restart} />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar
        current={flow.screen}
        onNavigate={handleNavigate}
        demo={demo}
        onDemoChange={handleDemoChange}
      />
      <IOSDevice dark={DARK_SCREENS.includes(flow.screen)}>{renderScreen()}</IOSDevice>
    </div>
  );
}
