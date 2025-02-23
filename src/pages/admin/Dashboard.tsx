import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users2, Store, Star, DollarSign, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";

interface Stats {
  totalOwners: number;
  totalRenters: number;
  totalBookings: number;
  totalRevenue: number;
  activeListings: number;
}

interface RecentMember {
  id: string;
  email: string;
  role: "owner" | "renter";
  created_at: string;
  details?: {
    fullName?: string;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    totalOwners: 50,
    totalRenters: 200,
    totalBookings: 150,
    totalRevenue: 2000000,
    activeListings: 120,
  });

  const recentMembersData = [
    {
      id: "1",
      email: "owner1@example.com",
      role: "owner",
      created_at: "2023-10-01T12:00:00Z",
      details: { fullName: "John Doe" },
    },
    {
      id: "2",
      email: "renter1@example.com",
      role: "renter",
      created_at: "2023-10-02T14:30:00Z",
      details: { fullName: "Jane Smith" },
    },
    {
      id: "3",
      email: "owner2@example.com",
      role: "owner",
      created_at: "2023-10-03T09:45:00Z",
      details: { fullName: "Alice Johnson" },
    },
    {
      id: "4",
      email: "renter2@example.com",
      role: "renter",
      created_at: "2023-10-04T11:00:00Z",
      details: { fullName: "Bob Brown" },
    },
    {
      id: "5",
      email: "owner3@example.com",
      role: "owner",
      created_at: "2023-10-05T08:15:00Z",
      details: { fullName: "Charlie Davis" },
    },
    {
      id: "6",
      email: "renter3@example.com",
      role: "renter",
      created_at: "2023-10-06T10:45:00Z",
      details: { fullName: "Diana Evans" },
    },
    {
      id: "7",
      email: "owner4@example.com",
      role: "owner",
      created_at: "2023-10-07T09:30:00Z",
      details: { fullName: "Eve Foster" },
    },
    {
      id: "8",
      email: "renter4@example.com",
      role: "renter",
      created_at: "2023-10-08T12:45:00Z",
      details: { fullName: "Frank Green" },
    },
    {
      id: "9",
      email: "owner5@example.com",
      role: "owner",
      created_at: "2023-10-09T14:00:00Z",
      details: { fullName: "Grace Harris" },
    },
    {
      id: "10",
      email: "renter5@example.com",
      role: "renter",
      created_at: "2023-10-10T16:30:00Z",
      details: { fullName: "Hank Irving" },
    },
  ];

  const [recentMembers, setRecentMembers] = useState<RecentMember[]>(
    recentMembersData as any
  );

  const { currentPage, goToPage, totalPages, startIndex, endIndex } =
    usePagination({
      totalItems: recentMembersData.length,
    });

  useEffect(() => {
    setLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const getMemberName = (member: RecentMember) => {
    if (member.details?.fullName) {
      return member.details.fullName;
    }
    return member.email;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Rental Marketplace Statistics</h1>
        <p className="text-gray-600">
          Overview of platform activity and growth
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {[
          {
            label: "Total Owners",
            value: stats.totalOwners,
            icon: <Store className="w-8 h-8 text-primary" />,
            onClick: () => navigate("/admin/owners"),
          },
          {
            label: "Total Renters",
            value: stats.totalRenters,
            icon: <Users2 className="w-8 h-8 text-primary" />,
          },
          {
            label: "Total Bookings",
            value: stats.totalBookings,
            icon: <Star className="w-8 h-8 text-primary" />,
          },
          {
            label: "Active Listings",
            value: stats.activeListings,
            icon: <Store className="w-8 h-8 text-primary" />,
          },
          {
            label: "Total Revenue",
            value: `₦${stats.totalRevenue.toLocaleString()}`,
            icon: <DollarSign className="w-8 h-8 text-primary" />,
          },
        ].map((stat, index) => (
          <button
            key={index}
            onClick={stat.onClick}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left w-full"
          >
            <div className="flex items-center space-x-4">
              {stat.icon}
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Members</h2>
        <div className="space-y-4">
          {recentMembers.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No recent members to display
            </p>
          ) : (
            recentMembers.slice(startIndex, endIndex).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      member.role === "owner" ? "bg-blue-100" : "bg-teal-100"
                    }`}
                  >
                    {member.role === "owner" ? (
                      <Store className={`w-5 h-5 text-blue-600`} />
                    ) : (
                      <Users2 className={`w-5 h-5 text-teal-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{getMemberName(member)}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      member.role === "owner"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-teal-100 text-teal-800"
                    }`}
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline-block mr-1" />
                    {formatDate(member.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            onPageChange={goToPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
