import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Star,
  Pencil,
  X,
  Loader2,
  InboxIcon,
  Home,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast";

interface Review {
  id: string;
  rating: number;
  content: string;
  created_at: string;
  item: {
    id: string;
    name: string;
    category: string;
  };
}

interface Inquiry {
  item: {
    id: string;
    name: string;
    category: string;
  };
  lastMessage: string;
  lastMessageDate: string;
  status: "pending" | "responded" | "booked";
}

interface OwnerDashboardProps {
  owner: {
    id: string;
    fullName: string;
    subscription_plan?: string;
    subscription_end_date?: string;
  };
}

interface RenterDashboardProps {
  renter: {
    id: string;
    fullName: string;
    address: string;
  };
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ owner }) => {
  const navigate = useNavigate();
  const [appointmentsCount, setAppointmentsCount] = useState(5);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [profileViews, setProfileViews] = useState(20);
  const [pendingLeads, setPendingLeads] = useState(4);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    // Check for successful subscription
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (sessionId) {
      toast.success("Subscription activated successfully!");
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {owner.fullName}!
          </h1>
          <p className="text-gray-600">Manage your rental items</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/reviews")}>
            <Star className="w-4 h-4 mr-2" />
            Reviews
          </Button>
          <Button variant="outline" onClick={() => navigate("/leads")}>
            <InboxIcon className="w-4 h-4 mr-2" />
            Leads
          </Button>
          <Button variant="outline" onClick={() => navigate("/owner/settings")}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: <Calendar className="w-6 h-6 text-teal-500" />,
            label: "Upcoming Appointments",
            value: appointmentsCount.toString(),
            onClick: () => navigate("/calendar"),
          },
          {
            icon: <MessageSquare className="w-6 h-6 text-teal-500" />,
            label: "Unread Messages",
            value: unreadMessages.toString(),
            onClick: () => navigate("/messages"),
          },
          {
            icon: <InboxIcon className="w-6 h-6 text-teal-500" />,
            label: "Pending Leads",
            value: pendingLeads.toString(),
            onClick: () => navigate("/leads"),
          },
          {
            icon: <Home className="w-6 h-6 text-teal-500" />,
            label: "Profile Views",
            value: profileViews.toString(),
            onClick: () => navigate(`/owners/${owner.id}`),
          },
        ].map((stat) => (
          <button
            key={stat.label}
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

      {/* Subscription Status */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Current Plan: {owner.subscription_plan || "No active plan"}
            </p>
            {owner.subscription_end_date && (
              <p className="text-sm text-gray-600">
                Renews on:{" "}
                {new Date(owner.subscription_end_date).toLocaleDateString()}
              </p>
            )}
          </div>
          <Button onClick={() => navigate("/subscription")}>
            {owner.subscription_plan ? "Manage Plan" : "Choose a Plan"}
          </Button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              type: "booking",
              title: "New booking request from Sarah",
              time: "2 hours ago",
            },
            {
              type: "message",
              title: "New message from Emma",
              time: "5 hours ago",
            },
            {
              type: "review",
              title: "New 5-star review received",
              time: "1 day ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const RenterDashboard: React.FC<RenterDashboardProps> = ({ renter }) => {
  const navigate = useNavigate();
  const [savedItemsCount, setSavedItemsCount] = useState(10);
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      item: {
        id: "1",
        name: "Sofa Set",
        category: "Furniture",
      },
      lastMessage: "Is this still available?",
      lastMessageDate: "2023-10-01T12:00:00Z",
      status: "pending",
    },
    {
      item: {
        id: "2",
        name: "Microwave Oven",
        category: "Home Appliances",
      },
      lastMessage: "Can I pick it up tomorrow?",
      lastMessageDate: "2023-10-02T14:30:00Z",
      status: "responded",
    },
    {
      item: {
        id: "3",
        name: "Laptop",
        category: "Electronics",
      },
      lastMessage: "Is there any discount?",
      lastMessageDate: "2023-10-03T09:45:00Z",
      status: "booked",
    },
  ]);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      rating: 5,
      content: "Great experience renting this item!",
      created_at: "2023-10-01T12:00:00Z",
      item: {
        id: "1",
        name: "Sofa Set",
        category: "Furniture",
      },
    },
    {
      id: "2",
      rating: 4,
      content: "The item was in good condition.",
      created_at: "2023-10-02T14:30:00Z",
      item: {
        id: "2",
        name: "Microwave Oven",
        category: "Home Appliances",
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [savingReview, setSavingReview] = useState(false);
  const [editReviewData, setEditReviewData] = useState({
    rating: 5,
    content: "",
  });

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review.id);
    setEditReviewData({
      rating: review.rating,
      content: review.content,
    });
  };

  const handleUpdateReview = () => {
    if (!editingReview) return;
    setSavingReview(true);

    // Simulate API call
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === editingReview
            ? {
                ...review,
                rating: editReviewData.rating,
                content: editReviewData.content,
              }
            : review
        )
      );

      toast.success("Review updated successfully");
      setEditingReview(null);
      setSavingReview(false);
    }, 1000);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    toast.success("Review deleted successfully");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {renter.fullName}!
          </h1>
          <p className="text-gray-600">Manage your rentals</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/settings")}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Calendar className="w-6 h-6 text-teal-500" />,
            label: "Days Until Next Rental",
            value: "5",
            onClick: () => navigate("/calendar"),
          },
          {
            icon: <MessageSquare className="w-6 h-6 text-teal-500" />,
            label: "Item Inquiries",
            value: inquiries.length,
            onClick: () => navigate("/messages"),
          },
          {
            icon: <Home className="w-6 h-6 text-teal-500" />,
            label: "Saved Items",
            value: savedItemsCount,
            onClick: () => navigate("/saved-items"),
          },
        ].map((stat) => (
          <button
            key={stat.label}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rental Details */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Rental Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-medium">{renter.address}</p>
            </div>
            <div>
              <p className="text-gray-600">Next Rental Date</p>
              <p className="font-medium">2023-10-15</p>
            </div>
          </div>
        </section>

        {/* Your Reviews */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                You haven't written any reviews yet
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b last:border-0 pb-4 last:pb-0"
                >
                  {editingReview === review.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() =>
                                setEditReviewData((prev) => ({
                                  ...prev,
                                  rating,
                                }))
                              }
                              className="text-yellow-400"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  rating <= editReviewData.rating
                                    ? "fill-current"
                                    : "stroke-current fill-none"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Review
                        </label>
                        <textarea
                          value={editReviewData.content}
                          onChange={(e) =>
                            setEditReviewData((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingReview(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleUpdateReview}
                          disabled={savingReview}
                        >
                          {savingReview ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{review.item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {review.item.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditReview(review)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center my-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-current"
                                  : "stroke-current fill-none"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-gray-600">{review.content}</p>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Item Inquiries */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Item Inquiries</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-600">Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <p className="text-gray-600">No item inquiries yet</p>
          ) : (
            inquiries.map((inquiry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/messages")}
              >
                <div>
                  <h3 className="font-medium">{inquiry.item.name}</h3>
                  <p className="text-sm text-gray-600">{inquiry.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(inquiry.lastMessageDate).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    inquiry.status === "booked"
                      ? "bg-green-100 text-green-800"
                      : inquiry.status === "responded"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {inquiry.status.charAt(0).toUpperCase() +
                    inquiry.status.slice(1)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<"owner" | "renter" | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Simulate API call to get user data
        setTimeout(() => {
          const user = {
            id: "1",
            fullName: "John Doe",
            userType: "owner",
          };

          if (user.userType === "owner") {
            setUserType("owner");
            setUserData({
              id: user.id,
              fullName: user.fullName,
              subscription_plan: "Premium",
              subscription_end_date: "2023-12-31",
            });
          } else {
            setUserType("renter");
            setUserData({
              id: user.id,
              fullName: user.fullName,
              address: "123 Main St, Anytown, USA",
            });
          }

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load user data");
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (!userData || !userType) {
    return null;
  }

  return <RenterDashboard renter={userData} />;

  return userType === "owner" ? (
    <OwnerDashboard owner={userData} />
  ) : (
    <RenterDashboard renter={userData} />
  );
};

export default Dashboard;
