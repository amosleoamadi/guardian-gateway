import React from "react";

const MyCourses = () => {
  // Sample data - Static for layout
  const availableCourses = [
    { id: "CSC401", name: "Software Engineering", units: 3 },
    { id: "CSC403", name: "Cybersecurity Fundamentals", units: 3 },
    { id: "CSC405", name: "Artificial Intelligence", units: 4 },
    { id: "CSC407", name: "Data Mining & Warehouse", units: 3 },
    { id: "GST411", name: "Entrepreneurship Studies", units: 2 },
    { id: "MTH401", name: "Numerical Analysis", units: 3 },
  ];

  const maxCredits = 24;
  const totalCredits = 0;

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Course Registration
        </h1>
        <div className="bg-white rounded-lg shadow px-6 py-3 border-l-4 border-orange-600">
          <p className="text-sm font-semibold text-gray-500">Total Credits:</p>
          <p className="text-2xl font-bold text-orange-700">
            {totalCredits} / {maxCredits}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Available Courses - 2025/2026 Session
            </h3>
          </div>

          {/* Courses List */}
          <div className="divide-y divide-gray-200">
            {availableCourses.map((course, index) => (
              <div
                key={index}
                className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <strong className="text-lg text-gray-800">
                    {course.id}: {course.name}
                  </strong>
                  <p className="text-sm text-gray-500 mt-1">
                    Units: {course.units}
                  </p>
                </div>
                <button className="bg-lime-500 hover:bg-lime-600 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors">
                  Select
                </button>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <div className="px-6 py-6 border-t border-gray-200">
            <button className="w-full bg-linear-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md">
              Confirm Registration
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
