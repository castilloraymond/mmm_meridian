import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { uploadFile, loadSampleData } from './api';
import ModelDashboard from './pages/ModelDashboard';

function Landing() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingScenario, setLoadingScenario] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (selectedFile) => {
    setFile(selectedFile);
    setIsLoading(true);
    try {
      const result = await uploadFile(selectedFile);
      navigate('/dashboard', { state: { result } });
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleData = async (scenario) => {
    setLoadingScenario(scenario);
    try {
      const result = await loadSampleData(scenario);
      navigate('/dashboard', { state: { result } });
    } catch (error) {
      console.error("Failed to load sample data", error);
      alert("Failed to load sample data. Please try again.");
    } finally {
      setLoadingScenario(null);
    }
  };

  const scenarios = [
    { id: 'high', label: 'SCENARIO 1', title: 'High Quality', color: 'bg-emerald-500', hoverColor: 'hover:bg-emerald-600' },
    { id: 'mid', label: 'SCENARIO 2', title: 'Mid Quality', color: 'bg-amber-500', hoverColor: 'hover:bg-amber-600' },
    { id: 'low', label: 'SCENARIO 3', title: 'Low Quality', color: 'bg-rose-500', hoverColor: 'hover:bg-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-semibold text-slate-800">Meridian MMM</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-slate-600">Updated for 2025 Standards</span>
            </div>

            <h1 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Is your data <span className="text-indigo-600">MMM</span><br />
              <span className="text-indigo-600">Ready?</span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 max-w-md">
              Don't build models on shaky foundations. Check your marketing data against industry standards (Google Meridian, Meta Robyn) in seconds.
            </p>

            {/* Sample Data Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Test with Sample Data
              </h3>
              <div className="flex gap-3">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleSampleData(scenario.id)}
                    disabled={loadingScenario !== null}
                    className={`${scenario.color} ${scenario.hoverColor} text-white px-5 py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                  >
                    {loadingScenario === scenario.id ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1" />
                    ) : (
                      <>
                        <div className="text-xs font-medium opacity-80 mb-1">{scenario.label}</div>
                        <div className="text-lg font-bold">{scenario.title}</div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upload Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isLoading && document.getElementById('file-upload').click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isLoading}
              />

              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                  <p className="text-lg font-medium text-slate-800">Processing {file?.name}...</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Upload size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Upload your CSV
                  </h3>
                  <p className="text-slate-500 text-center mb-6">
                    Drag and drop your marketing dataset here<br />
                    to get an instant readiness score.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full">Date</span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full">Sales</span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full">Spend</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<ModelDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
