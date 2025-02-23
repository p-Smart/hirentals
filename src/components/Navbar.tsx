import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MessageSquare, UserCircle, Bell, Home } from "lucide-react";
import { Button } from "./ui/button";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type:
    | "booking"
    | "message"
    | "review"
    | "owner_response"
    | "booking_confirmation";
  entityId?: string; // ID of the related entity (booking, message, etc.)
}

const Navbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<"owner" | "renter" | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        setUserRole(null);
        return;
      }

      // Check if user is an owner
      const ownerDoc = await getDoc(doc(db, "owners", user.uid));
      if (ownerDoc.exists()) {
        setUserRole("owner");
        loadOwnerNotifications(user.uid);
        return;
      }

      // Check if user is a renter
      const renterDoc = await getDoc(doc(db, "renters", user.uid));
      if (renterDoc.exists()) {
        setUserRole("renter");
        loadRenterNotifications(user.uid);
        return;
      }

      setUserRole(null);
    };

    checkUserRole();

    const unsubscribe = auth.onAuthStateChanged(() => {
      checkUserRole();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loadOwnerNotifications = async (userId: string) => {
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("role", "==", "owner")
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
      setNotifications(notificationsData);
      setUnreadCount(notificationsData.filter((n) => !n.read).length);
    });

    return () => {
      unsubscribe();
    };
  };

  const loadRenterNotifications = async (userId: string) => {
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("role", "==", "renter")
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
      setNotifications(notificationsData);
      setUnreadCount(notificationsData.filter((n) => !n.read).length);
    });

    return () => {
      unsubscribe();
    };
  };

  const handleMessagesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userRole) {
      navigate("/signin");
      return;
    }
    navigate("/messages");
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    // Navigate based on notification type
    switch (notification.type) {
      case "booking":
      case "booking_confirmation":
        navigate(`/dashboard`, {
          state: {
            scrollToBookings: true,
            highlightBooking: notification.entityId,
          },
        });
        break;
      case "message":
      case "owner_response":
        navigate(`/messages`, {
          state: {
            openConversation: notification.entityId,
          },
        });
        break;
      case "review":
        navigate(`/dashboard`, {
          state: {
            scrollToReviews: true,
            highlightReview: notification.entityId,
          },
        });
        break;
      default:
        navigate("/dashboard");
    }

    setShowNotifications(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-teal-500" />
            <span className="text-xl font-semibold">HiRentals</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/vendors"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <Search className="w-4 h-4" />
              <span>Find Items</span>
            </Link>
            {userRole && (
              <>
                <a
                  href="#"
                  onClick={handleMessagesClick}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </a>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!userRole ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/get-started")}>
                  Get Started
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-1 rounded-full hover:bg-gray-100"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-600">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <button
                              key={notification.id}
                              onClick={() =>
                                handleNotificationClick(notification)
                              }
                              className={`w-full px-4 py-3 hover:bg-gray-50 text-left ${
                                !notification.read ? "bg-primary/5" : ""
                              }`}
                            >
                              <p
                                className={`text-sm ${
                                  !notification.read ? "font-medium" : ""
                                }`}
                              >
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                  {userRole === "owner"
                    ? "Owner Dashboard"
                    : "Renter Dashboard"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
