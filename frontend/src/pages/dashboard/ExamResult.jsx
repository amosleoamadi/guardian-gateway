import React from "react";

const ExamResults = () => {
  // Sample Result Data - Static for layout
  const results = [
    {
      id: "CSC401",
      name: "Software Engineering",
      score: 75,
      grade: "A",
      units: 3,
    },
    { id: "CSC403", name: "Cybersecurity", score: 68, grade: "B", units: 3 },
    {
      id: "CSC405",
      name: "Artificial Intelligence",
      score: 82,
      grade: "A",
      units: 4,
    },
    { id: "CSC407", name: "Data Mining", score: 55, grade: "C", units: 3 },
    { id: "GST411", name: "Entrepreneurship", score: 70, grade: "A", units: 2 },
  ];

  // Static GPA calculation for display
  const getPoint = (grade) => {
    if (grade === "A") return 5;
    if (grade === "B") return 4;
    if (grade === "C") return 3;
    if (grade === "D") return 2;
    return 0;
  };

  const totalPoints = results.reduce(
    (acc, res) => acc + getPoint(res.grade) * res.units,
    0,
  );
  const totalUnits = results.reduce((acc, res) => acc + res.units, 0);
  const gpa = (totalPoints / totalUnits).toFixed(2);

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Semester Results</h1>
        <div className="bg-white rounded-lg shadow px-6 py-3 border-l-4 border-lime-500">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Current GPA
          </h3>
          <p className="text-3xl font-bold text-orange-700">{gpa}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-orange-600">
              2025/2026 First Semester
            </h3>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-amber-50 border-b-2 border-orange-600">
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Course Code
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Course Title
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Units
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Score
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {res.id}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{res.name}</td>
                    <td className="px-6 py-4 text-gray-700">{res.units}</td>
                    <td className="px-6 py-4 text-gray-700">{res.score}</td>
                    <td
                      className={`px-6 py-4 font-bold ${
                        res.grade === "A" ? "text-green-600" : "text-orange-700"
                      }`}
                    >
                      {res.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-6 flex gap-4 border-t border-gray-200">
            <button className="bg-lime-500 hover:bg-lime-600 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors w-48">
              Print Result Slip
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-48">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamResults;
