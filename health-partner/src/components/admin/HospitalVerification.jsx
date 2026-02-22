import { useState } from "react";

const HospitalVerification = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      hospitalName: "New Hope Medical Centre",
      address: "23 Allen Avenue, Ikeja",
      lga: "Ikeja",
      phone: "+234 802 345 6789",
      email: "info@newhope.com",
      licenseNumber: "HPC/2024/1234",
      documents: [
        { name: "Business License", url: "#", status: "pending" },
        { name: "Medical License", url: "#", status: "pending" },
        { name: "Tax Clearance", url: "#", status: "verified" },
      ],
      submittedDate: "2024-01-15",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      hospitalName: "Grace Healthcare",
      address: "45 Toyin Street, Ikeja",
      lga: "Ikeja",
      phone: "+234 803 456 7890",
      email: "contact@gracehealthcare.com",
      licenseNumber: "HPC/2024/1235",
      documents: [
        { name: "Business License", url: "#", status: "verified" },
        { name: "Medical License", url: "#", status: "verified" },
        { name: "Tax Clearance", url: "#", status: "pending" },
      ],
      submittedDate: "2024-01-14",
      status: "in-review",
      priority: "medium",
    },
    {
      id: 3,
      hospitalName: "City Medical Center",
      address: "78 Broad Street, Lagos Island",
      lga: "Lagos Island",
      phone: "+234 804 567 8901",
      email: "admin@citymedical.com",
      licenseNumber: "HPC/2024/1236",
      documents: [
        { name: "Business License", url: "#", status: "verified" },
        { name: "Medical License", url: "#", status: "verified" },
        { name: "Tax Clearance", url: "#", status: "verified" },
      ],
      submittedDate: "2024-01-13",
      status: "approved",
      priority: "low",
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleVerify = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "approved" } : app)),
    );
    showNotification("Hospital verified successfully", "success");
  };

  const handleReject = (id, reason) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: "rejected", rejectionReason: reason }
          : app,
      ),
    );
    showNotification("Application rejected", "error");
  };

  const handleRequestInfo = (id) => {
    showNotification("Additional information requested", "info");
  };

  const showNotification = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `fixed bottom-4 right-4 ${
      type === "success"
        ? "bg-green-500"
        : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
    } text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const filteredApplications = applications.filter((app) => {
    if (filter !== "all" && app.status !== filter) return false;
    if (
      searchTerm &&
      !app.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Hospital Verification
          </h2>
          <p className="text-gray-600 mt-1">
            Review and verify hospital applications
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900">
            {applications.length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 shadow-sm border border-yellow-100">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">
            {applications.filter((a) => a.status === "pending").length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <p className="text-sm text-blue-600">In Review</p>
          <p className="text-2xl font-bold text-blue-700">
            {applications.filter((a) => a.status === "in-review").length}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100">
          <p className="text-sm text-green-600">Verified</p>
          <p className="text-2xl font-bold text-green-700">
            {applications.filter((a) => a.status === "approved").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4">
        <div className="flex space-x-2">
          {["all", "pending", "in-review", "approved", "rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ),
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  License
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {app.hospitalName}
                    </div>
                    <div className="text-sm text-gray-500">{app.address}</div>
                    <div className="text-xs text-gray-400">{app.lga}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{app.phone}</div>
                    <div className="text-xs text-gray-500">{app.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono">
                      {app.licenseNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {app.documents.map((doc) => (
                        <span
                          key={doc.name}
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            doc.status === "verified"
                              ? "bg-green-100 text-green-700"
                              : doc.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {doc.name.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(app.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "in-review"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Review
                      </button>
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleVerify(app.id)}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() =>
                              handleReject(app.id, "Incomplete documentation")
                            }
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">Review Application</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Hospital Details */}
                <div>
                  <h4 className="font-semibold mb-3">Hospital Information</h4>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium">
                        {selectedApplication.hospitalName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">License Number</p>
                      <p className="font-medium">
                        {selectedApplication.licenseNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p>{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p>{selectedApplication.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Address</p>
                      <p>{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-semibold mb-3">Submitted Documents</h4>
                  <div className="space-y-3">
                    {selectedApplication.documents.map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">📄</span>
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              doc.status === "verified"
                                ? "bg-green-100 text-green-700"
                                : doc.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {doc.status}
                          </span>
                          <button className="text-teal-600 hover:text-teal-700 text-sm">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      handleVerify(selectedApplication.id);
                      setSelectedApplication(null);
                    }}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    ✓ Approve & Verify
                  </button>
                  <button
                    onClick={() => {
                      handleRequestInfo(selectedApplication.id);
                    }}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    📝 Request Info
                  </button>
                  <button
                    onClick={() => {
                      handleReject(
                        selectedApplication.id,
                        "Insufficient documentation",
                      );
                      setSelectedApplication(null);
                    }}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalVerification;
