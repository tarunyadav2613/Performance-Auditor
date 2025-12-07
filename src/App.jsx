import { useState, useCallback } from 'react';
import ScoreCards from './components/ScoreCards';
import MetricsGrid from './components/MetricsGrid';
import IssuesTable from './components/IssuesTable';
import { getMockResultForUrl, githubResult, googleResult } from "./data/mockResults";


function App() {
  const [url, setUrl] = useState('');
  const [currentResult, setCurrentResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      const result = getMockResultForUrl(url);
      setCurrentResult(result);
      setLoading(false);
    }, 1200);
  }, [url]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Performance Auditor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Paste any URL to get instant accessibility and performance audit results
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com or any website..."
              className="w-full p-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? 'Auditing...' : 'Run Audit'}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-xl text-red-800 text-center font-medium">
              {error}
            </div>
          )}
        </form>

        {/* Results */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-xl text-gray-600">Running accessibility & performance audit...</p>
          </div>
        )}

        {currentResult && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Results for</h2>
              <p className="text-3xl font-black text-gray-900">{currentResult.url}</p>
            </div>

            <ScoreCards scores={currentResult.scores} />
            <MetricsGrid metrics={currentResult.metrics} />
            <IssuesTable 
              issues={currentResult.issues}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        {!currentResult && !loading && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradienx  t-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to audit</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Paste a URL above (try github.com or google.com) to see real-time performance and accessibility scores
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
