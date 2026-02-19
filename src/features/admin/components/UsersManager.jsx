"use client";

import React, { useTransition } from "react";
import { updateUserRole } from "@/features/admin/actions/admin.actions";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiShield } from "react-icons/fi";

const UsersManager = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    startTransition(() => router.refresh());
  };

  const goToPage = (p) => {
    router.push(`/dashboard/users?page=${p}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-gray-400 text-xs bg-base-200/50">
                <th>User</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold">
                            {user.name?.[0]?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {user.name || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm text-gray-500">{user.email}</td>
                  <td>
                    <span className="badge badge-sm badge-ghost capitalize">
                      {user.providerId || "credentials"}
                    </span>
                  </td>
                  <td>
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      disabled={isPending}
                      className={`select select-sm select-bordered rounded-lg text-xs ${
                        user.role === "admin" ? "text-primary font-semibold" : ""
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-base-200">
            <p className="text-sm text-gray-400">
              Page {data.page} of {data.totalPages} ({data.total} users)
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => goToPage(data.page - 1)}
                disabled={data.page <= 1}
                className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={() => goToPage(data.page + 1)}
                disabled={data.page >= data.totalPages}
                className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManager;
