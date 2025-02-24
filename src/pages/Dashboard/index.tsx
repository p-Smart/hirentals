import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import OwnerDashboard from "./OwnerDashboard";
import RenterDashboard from "./RenterDashboard";

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

  return userType === "owner" ? (
    <OwnerDashboard owner={userData} />
  ) : (
    <RenterDashboard renter={userData} />
  );
};

export default Dashboard;
