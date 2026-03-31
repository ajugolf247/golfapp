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

const SCREEN_LABELS = [
  'Entry', 'Profile', 'Bag', 'SwingScan', 'Scorecard',
  'Inputs', 'Analysis', 'Results', 'Why', 'Equipment',
  'Train vs Change', 'Next Steps', 'Reports',
];

function TransitionWrapper({ children, screenKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [screenKey]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.28s ease, transform 0.28s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const current = SCREENS[screenIdx];
  const goNext = () => setScreenIdx(i => Math.min(i + 1, SCREENS.length - 1));
  const goBack = () => setScreenIdx(i => Math.max(i - 1, 0));
  const goTo = (name) => setScreenIdx(SCREENS.indexOf(name));
  const restart = () => setScreenIdx(0);

  const renderScreen = () => {
    switch (current) {
      case 'entry':           return <EntryScreen onNext={goNext} />;
      case 'profile':         return <ProfileScreen onNext={goNext} onBack={goBack} />;
      case 'bag':             return <BagScreen onNext={goNext} onBack={goBack} />;
      case 'swingscan':       return <SwingScanScreen onNext={goNext} onBack={goBack} />;
      case 'scorecard':       return <ScorecardScreen onNext={goNext} onBack={goBack} />;
      case 'fitting-inputs':  return <FittingInputsScreen onNext={goNext} onBack={goBack} />;
      case 'analysis':        return <AnalysisScreen onNext={goNext} />;
      case 'results':         return <ResultsScreen onNext={() => goTo('why')} onBack={goBack} />;
      case 'why':             return <WhyScreen onNext={() => goTo('equipment')} onBack={goBack} />;
      case 'equipment':       return <EquipmentScreen onNext={() => goTo('train-vs-change')} onBack={goBack} />;
      case 'train-vs-change': return <TrainVsChangeScreen onNext={() => goTo('next-step')} onBack={goBack} />;
      case 'next-step':       return <NextStepScreen onNext={() => goTo('saved-reports')} onBack={goBack} />;
      case 'saved-reports':   return <SavedReportsScreen onRestart={restart} onBack={goBack} />;
      default:                return <EntryScreen onNext={goNext} />;
    }
  };

  // ── MOBILE: full screen, no shell ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ width: '100%', height: '100dvh', backgroundColor: '#0a0a0a', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <TransitionWrapper screenKey={current}>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {renderScreen()}
          </div>
        </TransitionWrapper>
      </div>
    );
  }

  // ── DESKTOP: phone simulator shell ────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      gap: '16px',
    }}>
      {/* Top nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '4px' }}>
          <div style={{ width: '26px', height: '26px', background: 'linear-gradient(135deg,#e8341c,#f07428)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '9px' }}>PG</span>
          </div>
          <span style={{ color: '#444', fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>AI Club Fitting</span>
        </div>
        {SCREENS.map((s, i) => (
          <button key={s} onClick={() => setScreenIdx(i)} style={{
            padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '600',
            cursor: 'pointer', border: 'none',
            background: screenIdx === i ? 'linear-gradient(135deg,#e8341c,#f07428)' : '#1a1a1a',
            color: screenIdx === i ? 'white' : '#555',
            transition: 'all 0.15s',
          }}>
            {i + 1}. {SCREEN_LABELS[i]}
          </button>
        ))}
      </div>

      {/* Phone shell */}
      <div style={{
        width: '390px', height: '844px', backgroundColor: '#0a0a0a', borderRadius: '44px',
        overflow: 'hidden', position: 'relative', flexShrink: 0,
        boxShadow: '0 0 0 1px #1e1e1e, 0 40px 120px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Side buttons */}
        {[{s:'left',t:120,h:36},{s:'left',t:170,h:64},{s:'left',t:248,h:64},{s:'right',t:170,h:100}].map((b,i) => (
          <div key={i} style={{ position:'absolute', [b.s]:'-3px', top:`${b.t}px`, width:'3px', height:`${b.h}px`, backgroundColor:'#1a1a1a', borderRadius: b.s==='left' ? '3px 0 0 3px' : '0 3px 3px 0' }} />
        ))}
        {/* Notch */}
        <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', width:'120px', height:'34px', backgroundColor:'#000', borderRadius:'20px', zIndex:100 }} />
        <div style={{ height:'100%', overflow:'hidden', borderRadius:'44px' }}>
          <TransitionWrapper screenKey={current}>
            {renderScreen()}
          </TransitionWrapper>
        </div>
      </div>

      <div style={{ color: '#2a2a2a', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {screenIdx + 1} / {SCREENS.length} · {current}
      </div>
    </div>
  );
}
