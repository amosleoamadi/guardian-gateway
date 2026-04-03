import React from "react";

const TuitionFees = () => {
  // Sample Fee Data - Static for layout
  const feeBreakdown = [
    { item: "Tuition Fee", amount: 450000, status: "Paid" },
    { item: "ICT & Portal Access", amount: 25000, status: "Paid" },
    { item: "Library & Laboratory", amount: 15000, status: "Pending" },
    { item: "Student Union Dues", amount: 5000, status: "Pending" },
  ];

  const totalAmount = feeBreakdown.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = feeBreakdown
    .filter((item) => item.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalAmount - totalPaid;

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Financial Statement
        </h1>
        <div className="bg-white rounded-lg shadow px-6 py-3 border-l-4 border-red-600">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Outstanding Balance
          </h3>
          <p className="text-3xl font-bold text-red-700">
            ₦{balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-400">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Total Billed
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              ₦{totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Total Paid
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ₦{totalPaid.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Fee Breakdown Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-orange-600">
              Fee Breakdown - 2025/2026
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-amber-50 border-b-2 border-orange-600">
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Amount (₦)
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeBreakdown.map((fee, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-800">{fee.item}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {fee.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          fee.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-6 flex gap-4 border-t border-gray-200">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-56">
              Pay Outstanding Balance
            </button>
            <button className="bg-lime-500 hover:bg-lime-600 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors w-56">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TuitionFees;
