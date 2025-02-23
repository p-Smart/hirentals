import React from "react";
import { useNavigate } from "react-router-dom";
import { Users2, Store } from "lucide-react";
import { Button } from "../components/ui/button";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join HiRentals</h1>
        <p className="text-xl text-gray-600">
          Choose your account type to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Renter Option */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Users2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">I'm a Renter</h2>
            <p className="text-gray-600 mb-8">
              Find and rent household items from trusted owners. Browse items,
              read reviews, and make bookings.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/renter/register")}
            >
              Create Renter Account
            </Button>
          </div>
        </div>

        {/* Owner Option */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Store className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">I'm an Owner</h2>
            <p className="text-gray-600 mb-8">
              List your household items for rent. Manage your listings,
              communicate with renters, and earn extra income.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/owner/register")}
            >
              Create Owner Account
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserTypeSelection;
