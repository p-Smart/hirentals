import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OwnerDashboard from "./OwnerDashboard";
import RenterDashboard from "./RenterDashboard";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"owner" | "renter" | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const auth = getAuth();
        if (!auth.currentUser) {
          navigate("/signin");
          return;
        }
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const user = userDoc.data();
          setUserData(user);
          setRole(user.role);
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
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

  if (!userData || !role) {
    return null;
  }

  return role === "owner" ? (
    <OwnerDashboard owner={userData} />
  ) : (
    <RenterDashboard renter={userData} />
  );
};

export default Dashboard;
