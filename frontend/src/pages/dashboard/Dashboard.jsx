import React from "react";

const DashboardHome = () => {
  const matric = localStorage.getItem("userMatric");
  return (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Matric Number
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">{matric}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Program
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            B.Sc. Computer Science
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Portal Status
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            Verified & Active
          </p>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold text-orange-700">
            University Announcements
          </h2>
        </div>

        <div className="divide-y">
          <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <p className="text-gray-700">
              <span className="font-semibold">Exam Notice:</span> Mid-semester
              examinations begin on Monday. Ensure your tuition fees are
              cleared.
            </p>
          </div>

          <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <p className="text-gray-700">
              <span className="font-semibold">Library Update:</span> The digital
              library now has 24/7 access for all verified students.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
