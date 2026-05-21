import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Landing } from './components/Landing';
import { CompaniesLanding } from './components/CompaniesLanding';
import { PsychologistsLanding } from './components/PsychologistsLanding';
import { Wizard } from './components/Wizard';
import { Recommendations } from './components/Recommendations';
import { Psychologist } from './types';
import { AnimatePresence } from 'motion/react';
import { AdminLayout } from './admin/AdminLayout';
import { Dashboard } from './admin/Dashboard';
import { Agenda } from './admin/Agenda';
import { PatientsList } from './admin/PatientsList';
import { ClinicalRecords } from './admin/ClinicalRecords';
import { Settings } from './admin/Settings';

type AppState = 'landing' | 'wizard' | 'results';
type LandingTab = 'patients' | 'companies' | 'psychologists';

const PatientFlow: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [landingTab, setLandingTab] = useState<LandingTab>('patients');
  const [matches, setMatches] = useState<Psychologist[]>([]);
  const [primaryIssueId, setPrimaryIssueId] = useState<string>('');

  const handleWizardComplete = (foundMatches: Psychologist[], issueId: string) => {
    setMatches(foundMatches);
    setPrimaryIssueId(issueId);
    setAppState('results');
  };

  const handleLandingChange = (tab: LandingTab) => {
    setLandingTab(tab);
    setAppState('landing'); // reset state if they were in wizards
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden bg-[#FDFBF7]">
      <Header activeTab={landingTab} onChangeTab={handleLandingChange} />
      <main className="flex-1 flex flex-col relative w-full">
        <AnimatePresence mode="wait">
          {appState === 'landing' && (
            <>
              {landingTab === 'patients' && (
                <Landing key="landing" onStart={() => setAppState('wizard')} />
              )}
              {landingTab === 'companies' && (
                <CompaniesLanding key="companies" onBackToPatients={() => setLandingTab('patients')} />
              )}
              {landingTab === 'psychologists' && (
                <PsychologistsLanding key="psychologists" onBackToPatients={() => setLandingTab('patients')} />
              )}
            </>
          )}
          
          {appState === 'wizard' && (
            <Wizard 
              key="wizard" 
              onComplete={handleWizardComplete} 
              onCancel={() => setAppState('landing')} 
            />
          )}

          {appState === 'results' && (
            <Recommendations 
              key="results"
              matches={matches}
              primaryIssueId={primaryIssueId}
              onRestart={() => setAppState('landing')}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientFlow />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="records/:patientId?" element={<ClinicalRecords />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

