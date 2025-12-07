const IssuesTable = ({ issues, selectedCategory, onCategoryChange }) => {
  const filteredIssues = selectedCategory === 'all' 
    ? issues 
    : issues.filter(issue => issue.category.toLowerCase() === selectedCategory.toLowerCase());

  const getSeverityColor = (severity) => {
    if (severity === 'high') return 'bg-red-100 text-red-800 border-red-200';
    if (severity === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Issues Found</h2>
        <div className="flex flex-wrap gap-2">
          {['all', 'Accessibility', 'Performance', 'SEO'].map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.toLowerCase()
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {filteredIssues.map(issue => (
          <div key={issue.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${getSeverityColor(issue.severity).split(' ')[1]}`}>
                  {/* Dot color matches severity badge */}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{issue.description}</h4>
                  <p className="text-sm text-gray-500 mt-1">{issue.category}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(issue.severity)}`}>
                {issue.severity}
              </span>
            </div>
          </div>
        ))}
        {filteredIssues.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No issues found in this category. Great job! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesTable;
