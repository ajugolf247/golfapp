import { useState, useEffect } from 'react';
import './index.css';

import EntryScreen from './screens/EntryScreen';
import ProfileScreen from './screens/ProfileScreen';
import BagScreen from './screens/BagScreen';
import SwingScanScreen from './screens/SwingScanScreen';
import ScorecardScreen from './screens/ScorecardScreen';
import FittingInputsScreen from './screens/FittingInputsScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ResultsScreen from './screens/ResultsScreen';
import WhyScreen from './screens/WhyScreen';
import EquipmentScreen from './screens/EquipmentScreen';
import TrainVsChangeScreen from './screens/TrainVsChangeScreen';
import NextStepScreen from './screens/NextStepScreen';
import SavedReportsScreen from './screens/SavedReportsScreen';

const SCREENS = [
  'entry',
  'profile',
  'bag',
  'swingscan',
  'scorecard',
  'fitting-inputs',
  'analysis',
  'results',
  'why',
  'equipment',
  'train-vs-change',
  'next-step',
  'saved-reports',
];

function TransitionWrapper({ children, screenKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [screenKey]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}

function MobileShell({ children, screenKey }) {
  return (
    <div
      style={{
        width: '390px',
        height: '844px',
        backgroundColor: '#0a0a0a',
        borderRadius: '44px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 0 1px #1e1e1e, 0 40px 120px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.04)',
        flexShrink: 0,
      }}
    >
      {/* Side buttons */}
      <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '3px', height: '36px', backgroundColor: '#1a1a1a', borderRadius: '3px 0 0 3px' }} />
      <div style={{ position: 'absolute', left: '-3px', top: '170px', width: '3px', height: '64px', backgroundColor: '#1a1a1a', borderRadius: '3px 0 0 3px' }} />
      <div style={{ position: 'absolute', left: '-3px', top: '248px', width: '3px', height: '64px', backgroundColor: '#1a1a1a', borderRadius: '3px 0 0 3px' }} />
      <div style={{ position: 'absolute', right: '-3px', top: '170px', width: '3px', height: '100px', backgroundColor: '#1a1a1a', borderRadius: '0 3px 3px 0' }} />
      {/* Notch */}
      <div style={{
        position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
        width: '120px', height: '34px', backgroundColor: '#000',
        borderRadius: '20px', zIndex: 100,
      }} />
      <div style={{ height: '100%', overflow: 'hidden', borderRadius: '44px' }}>
        <TransitionWrapper screenKey={screenKey}>
          {children}
        </TransitionWrapper>
      </div>
    </div>
  );
}

export default function App() {
  const [screenIdx, setScreenIdx] = useState(0);
  const current = SCREENS[screenIdx];

  const goNext = () => setScreenIdx(i => Math.min(i + 1, SCREENS.length - 1));
  const goBack = () => setScreenIdx(i => Math.max(i - 1, 0));
  const goTo = (name) => setScreenIdx(SCREENS.indexOf(name));
  const restart = () => setScreenIdx(0);

  const renderScreen = () => {
    switch (current) {
      case 'entry':         return <EntryScreen onNext={goNext} />;
      case 'profile':       return <ProfileScreen onNext={goNext} onBack={goBack} />;
      case 'bag':           return <BagScreen onNext={goNext} onBack={goBack} />;
      case 'swingscan':     return <SwingScanScreen onNext={goNext} onBack={goBack} />;
      case 'scorecard':     return <ScorecardScreen onNext={goNext} onBack={goBack} />;
      case 'fitting-inputs':return <FittingInputsScreen onNext={goNext} onBack={goBack} />;
      case 'analysis':      return <AnalysisScreen onNext={goNext} />;
      case 'results':       return <ResultsScreen onNext={() => goTo('why')} onBack={goBack} />;
      case 'why':           return <WhyScreen onNext={() => goTo('equipment')} onBack={goBack} />;
      case 'equipment':     return <EquipmentScreen onNext={() => goTo('train-vs-change')} onBack={goBack} />;
      case 'train-vs-change': return <TrainVsChangeScreen onNext={() => goTo('next-step')} onBack={goBack} />;
      case 'next-step':     return <NextStepScreen onNext={() => goTo('saved-reports')} onBack={goBack} />;
      case 'saved-reports': return <SavedReportsScreen onRestart={restart} onBack={goBack} />;
      default:              return <EntryScreen onNext={goNext} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '20px' }}>
      {/* Desktop nav bar above phone */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #e8341c, #f07428)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '10px', letterSpacing: '-0.5px' }}>PG</span>
          </div>
          <span style={{ color: '#555', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>AI Club Fitting Tool</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {SCREENS.map((s, i) => (
            <button
              key={s}
              onClick={() => setScreenIdx(i)}
              style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                background: screenIdx === i ? 'linear-gradient(135deg, #e8341c, #f07428)' : '#1a1a1a',
                color: screenIdx === i ? 'white' : '#555',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {i + 1}. {s.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Phone */}
      <MobileShell screenKey={current}>
        {renderScreen()}
      </MobileShell>

      <div style={{ color: '#333', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Screen {screenIdx + 1} of {SCREENS.length} · {current}
      </div>
    </div>
  );
}
