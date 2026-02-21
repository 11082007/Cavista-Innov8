import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Adeleke",
      email: "john.a@example.com",
      role: "patient",
      conditions: ["Hypertension", "Diabetes"],
      status: "active",
      lastActive: "2024-01-15 10:30 AM",
      phone: "+234 802 345 6789",
      lga: "Ikeja",
    },
    {
      id: 2,
      name: "Dr. Sarah Okonkwo",
      email: "sarah.o@luth.gov.ng",
      role: "doctor",
      hospital: "LUTH",
      specialization: "Cardiology",
      status: "active",
      lastActive: "2024-01-15 09:15 AM",
      phone: "+234 803 456 7890",
    },
    {
      id: 3,
      name: "LUTH Admin",
      email: "admin@luth.gov.ng",
      role: "hospital_admin",
      hospital: "LUTH",
      status: "active",
      lastActive: "2024-01-15 08:45 AM",
      phone: "+234 804 567 8901",
    },
    {
      id: 4,
      name: "Grace Hospital",
      email: "info@gracehospital.com",
      role: "hospital",
      status: "pending",
      joinedDate: "2024-01-14",
      phone: "+234 805 678 9012",
    },
    {
      id: 5,
      name: "Michael Eze",
      email: "michael.e@example.com",
      role: "patient",
      conditions: ["Sickle Cell"],
      status: "inactive",
      lastActive: "2024-01-10",
      phone: "+234 806 789 0123",
      lga: "Surulere",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "patient", label: "Patients" },
    { value: "doctor", label: "Doctors" },
    { value: "hospital", label: "Hospitals" },
    { value: "hospital_admin", label: "Hospital Admins" },
    { value: "admin", label: "System Admins" },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
  ];

  const handleUpdateUser = (userId, updates) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updates } : user)),
    );
    showNotification("User updated successfully", "success");
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      showNotification("User deleted", "info");
    }
  };

  const handleSuspendUser = (userId) => {
    handleUpdateUser(userId, { status: "suspended" });
  };

  const handleActivateUser = (userId) => {
    handleUpdateUser(userId, { status: "active" });
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

  const filteredUsers = users.filter((user) => {
    if (filterRole !== "all" && user.role !== filterRole) return false;
    if (filterStatus !== "all" && user.status !== filterStatus) return false;
    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case "patient":
        return "bg-blue-100 text-blue-700";
      case "doctor":
        return "bg-green-100 text-green-700";
      case "hospital":
        return "bg-purple-100 text-purple-700";
      case "hospital_admin":
        return "bg-orange-100 text-orange-700";
      case "admin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">
            Manage all users across the platform
          </p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          + Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
          <p className="text-sm text-blue-600">Patients</p>
          <p className="text-2xl font-bold text-blue-700">
            {users.filter((u) => u.role === "patient").length}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
          <p className="text-sm text-green-600">Doctors</p>
          <p className="text-2xl font-bold text-green-700">
            {users.filter((u) => u.role === "doctor").length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-100">
          <p className="text-sm text-purple-600">Hospitals</p>
          <p className="text-2xl font-bold text-purple-700">
            {
              users.filter(
                (u) => u.role === "hospital" || u.role === "hospital_admin",
              ).length
            }
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-100">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">
            {users.filter((u) => u.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        >
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}
                    >
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{user.phone}</div>
                    {user.lga && (
                      <div className="text-xs text-gray-500">{user.lga}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.conditions && (
                      <div className="flex flex-wrap gap-1">
                        {user.conditions.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    {user.specialization && (
                      <span className="text-sm">{user.specialization}</span>
                    )}
                    {user.hospital && (
                      <span className="text-sm">{user.hospital}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastActive || user.joinedDate || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        View
                      </button>
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                        >
                          Suspend
                        </button>
                      ) : user.status === "suspended" ? (
                        <button
                          onClick={() => handleActivateUser(user.id)}
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          Activate
                        </button>
                      ) : null}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p>{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p>{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(selectedUser.role)}`}
                      >
                        {selectedUser.role.replace("_", " ")}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedUser.status)}`}
                      >
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role-specific info */}
                {selectedUser.role === "patient" && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Patient Information</h4>
                    <div className="space-y-3">
                      <p>
                        <span className="text-sm text-gray-600">LGA:</span>{" "}
                        {selectedUser.lga}
                      </p>
                      <p>
                        <span className="text-sm text-gray-600">
                          Conditions:
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.conditions.map((c) => (
                          <span
                            key={c}
                            className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.role === "doctor" && (
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Doctor Information</h4>
                    <div className="space-y-3">
                      <p>
                        <span className="text-sm text-gray-600">Hospital:</span>{" "}
                        {selectedUser.hospital}
                      </p>
                      <p>
                        <span className="text-sm text-gray-600">
                          Specialization:
                        </span>{" "}
                        {selectedUser.specialization}
                      </p>
                    </div>
                  </div>
                )}

                {/* Activity Log */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      • Last login: {selectedUser.lastActive}
                    </div>
                    <div className="text-sm text-gray-600">
                      • Account created: 2024-01-01
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                    Edit User
                  </button>
                  <button className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete User
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

export default UserManagement;
