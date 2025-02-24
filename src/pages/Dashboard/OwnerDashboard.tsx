import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Settings,
  LogOut,
  Star,
  GitPullRequest,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { toast } from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";

interface OwnerDashboardProps {
  owner: {
    id: string;
    fullName: string;
  };
}

interface Appointment {
  id: string;
  item: string;
  date: string;
  time: string;
  calendlyLink: string;
}

interface RentedItem {
  id: string;
  image: string;
  name: string;
  renter: string;
  rentStartDate: string;
  rentEndDate: string;
  rentalPrice: string;
  deposit: string;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ owner }) => {
  const navigate = useNavigate();
  const [appointmentsCount, setAppointmentsCount] = useState(3);
  const [totalItems, setTotalItems] = useState(5);

  const dummyAppointments: Appointment[] = [
    {
      id: "1",
      item: "LG Refrigerator",
      date: "2023-10-15",
      time: "10:00 AM",
      calendlyLink: "https://calendly.com/owner/meeting-1",
    },
    {
      id: "2",
      item: "Samsung TV",
      date: "2023-10-16",
      time: "2:00 PM",
      calendlyLink: "https://calendly.com/owner/meeting-2",
    },
    {
      id: "3",
      item: "Microwave Oven",
      date: "2023-10-17",
      time: "11:00 AM",
      calendlyLink: "https://calendly.com/owner/meeting-3",
    },
  ];

  const dummyLentItems: RentedItem[] = [
    {
      id: "1",
      image:
        "https://plus.unsplash.com/premium_photo-1683134584513-db73da8ebc29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "LG Refrigerator",
      renter: "Alice Johnson",
      rentStartDate: "2023-10-01",
      rentEndDate: "2023-10-07",
      rentalPrice: "₦500/day",
      deposit: "₦2000",
    },
    {
      id: "2",
      image:
        "https://th.bing.com/th/id/R.6fa41f6ea123b69ecb4261be8bf680ee?rik=uUVtGOSS3CNnWQ&riu=http%3a%2f%2fimg.bbystatic.com%2fBestBuy_US%2fimages%2fproducts%2f5258%2f5258309_sd.jpg&ehk=ppYIAVslCidjU6ClaJiVid2iPHQSNs9JHhdUaubuPrg%3d&risl=&pid=ImgRaw&r=0",
      name: "Samsung TV",
      renter: "Bob Brown",
      rentStartDate: "2023-10-05",
      rentEndDate: "2023-10-12",
      rentalPrice: "₦700/day",
      deposit: "₦2500",
    },
  ];

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

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
          <Button
            variant="outline"
            //   onClick={() => navigate("/reviews")}
          >
            <Star className="w-4 h-4 mr-2" />
            Reviews
          </Button>
          <Button variant="outline" onClick={() => navigate("/item-requests")}>
            <GitPullRequest className="w-4 h-4 mr-2" />
            Item Requests
          </Button>
          <Button variant="outline">
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
          },
          {
            icon: <ShoppingCart className="w-6 h-6 text-teal-500" />,
            label: "Total Items",
            value: totalItems.toString(),
          },
        ].map((stat) => (
          <button
            key={stat.label}
            // onClick={stat.onClick}
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

      {/* Appointments */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {dummyAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No upcoming appointments
            </p>
          ) : (
            dummyAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{appointment.item}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                <a
                  href={appointment.calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-teal-600 hover:underline"
                >
                  View on Calendly
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Currently Lent Items */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Currently Lent Items</h2>
        <div className="space-y-4">
          {dummyLentItems.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No items currently lent
            </p>
          ) : (
            dummyLentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Rented by: {item.renter}
                    </p>
                    <p className="text-sm text-gray-600">
                      Rent Period: {item.rentStartDate} to {item.rentEndDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Rental Price: {item.rentalPrice}
                    </p>
                    <p className="text-sm text-gray-600">
                      Deposit: {item.deposit}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
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

export default OwnerDashboard;
