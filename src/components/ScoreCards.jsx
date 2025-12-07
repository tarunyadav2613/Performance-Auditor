const getScoreColor = (score) => {
  if (score >= 90) return "bg-green-500 text-white";
  if (score >= 50) return "bg-yellow-500 text-black";
  return "bg-red-500 text-white";
};

const ScoreCards = ({ scores }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {Object.entries(scores).map(([key, value]) => (
      <div key={key} className={`p-6 rounded-xl shadow-lg ${getScoreColor(value)} text-center`}>
        <h3 className="text-xl font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
        <div className="text-3xl font-black mt-2">{value}</div>
        <div className="text-sm opacity-90 mt-1">/ 100</div>
      </div>
    ))}
  </div>
);

export default ScoreCards;
