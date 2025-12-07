const MetricsGrid = ({ metrics }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {Object.entries(metrics).map(([key, value]) => (
      <div key={key} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
        <div className="text-2xl font-bold text-gray-900">{value}s</div>
        <div className="text-xs text-gray-400 mt-1">
          {key === 'cls' ? 'Cumulative Layout Shift' : key.toUpperCase()}
        </div>
      </div>
    ))}
  </div>
);

export default MetricsGrid;
