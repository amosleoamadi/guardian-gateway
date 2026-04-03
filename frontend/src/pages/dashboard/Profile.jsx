import React from "react";

const Profile = () => {
  // Static student data for layout
  const student = {
    name: "John Doe",
    matricNo: "ESTAM/2026/001",
    email: "john.doe@estam.edu",
    department: "Computer Science",
    level: "400 Level",
    status: "Verified Student",
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
        <button className="bg-lime-500 hover:bg-lime-600 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors">
          Back to Home
        </button>
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow max-w-4xl mx-auto">
          <div className="text-center py-12 px-6">
            {/* Profile Image Placeholder */}
            <div className="w-36 h-36 rounded-full bg-amber-50 mx-auto mb-5 flex items-center justify-center border-4 border-orange-600">
              <span className="text-5xl font-bold text-orange-600">
                {student.name.charAt(0)}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-orange-700 mb-2">
              {student.name}
            </h2>
            <p className="text-gray-500 mb-8">Student ID: {student.matricNo}</p>

            {/* Profile Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              <div className="bg-gray-50 rounded-lg p-4 text-left border-l-4 border-orange-600">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Email Address
                </h3>
                <p className="text-gray-800 font-medium">{student.email}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left border-l-4 border-orange-600">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Department
                </h3>
                <p className="text-gray-800 font-medium">
                  {student.department}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left border-l-4 border-orange-600">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Level
                </h3>
                <p className="text-gray-800 font-medium">{student.level}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left border-l-4 border-orange-600">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Portal Status
                </h3>
                <p className="text-green-600 font-medium">{student.status}</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors max-w-xs mx-auto">
              Request Profile Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
