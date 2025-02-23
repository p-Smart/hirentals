import React from "react";
import { useNavigate } from "react-router-dom";
import { Users2, Store } from "lucide-react";
import { Button } from "../components/ui/button";

const SignInSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sign In to HiRentals</h1>
        <p className="text-xl text-gray-600">
          Choose your account type to sign in
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Renter Sign In */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Users2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Renter Account</h2>
            <p className="text-gray-600 mb-8">
              Sign in to continue renting household items
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/renter/signin")}
            >
              Sign In as Renter
            </Button>
          </div>
        </div>

        {/* Owner Sign In */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Store className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Owner Account</h2>
            <p className="text-gray-600 mb-8">
              Sign in to manage your items and connect with renters
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/owner/signin")}
            >
              Sign In as Owner
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/get-started")}
            className="text-primary hover:underline font-medium"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSelection;
