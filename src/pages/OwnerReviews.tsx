import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";

interface Review {
  id: string;
  rating: number;
  content: string;
  created_at: string;
  reviewer: {
    name: string;
  };
  response?: string | null;
  response_date?: string | null;
}

const dummyReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    content: "Great experience renting this item!",
    created_at: "2023-10-01T12:00:00Z",
    reviewer: {
      name: "Alice Johnson",
    },
  },
  {
    id: "2",
    rating: 4,
    content: "The item was in good condition.",
    created_at: "2023-10-02T14:30:00Z",
    reviewer: {
      name: "Bob Brown",
    },
  },
  {
    id: "3",
    rating: 3,
    content: "Average experience.",
    created_at: "2023-10-03T09:45:00Z",
    reviewer: {
      name: "Charlie Davis",
    },
  },
  {
    id: "4",
    rating: 5,
    content: "Excellent service and item quality!",
    created_at: "2023-10-04T11:00:00Z",
    reviewer: {
      name: "Diana Evans",
    },
  },
  {
    id: "5",
    rating: 2,
    content: "Not satisfied with the item condition.",
    created_at: "2023-10-05T08:15:00Z",
    reviewer: {
      name: "Eve Foster",
    },
  },
  {
    id: "6",
    rating: 4,
    content: "Good experience overall.",
    created_at: "2023-10-06T10:45:00Z",
    reviewer: {
      name: "Frank Green",
    },
  },
  {
    id: "7",
    rating: 5,
    content: "Highly recommend this service!",
    created_at: "2023-10-07T09:30:00Z",
    reviewer: {
      name: "Grace Harris",
    },
  },
  {
    id: "8",
    rating: 3,
    content: "It was okay, nothing special.",
    created_at: "2023-10-08T12:45:00Z",
    reviewer: {
      name: "Hank Irving",
    },
  },
  {
    id: "9",
    rating: 4,
    content: "Very good service and item.",
    created_at: "2023-10-09T14:00:00Z",
    reviewer: {
      name: "Ivy Jackson",
    },
  },
  {
    id: "10",
    rating: 5,
    content: "Fantastic experience!",
    created_at: "2023-10-10T16:30:00Z",
    reviewer: {
      name: "Jack King",
    },
  },
];

const OwnerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [responding, setResponding] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  const handleSubmitResponse = (reviewId: string) => {
    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              response: response.trim(),
              response_date: new Date().toISOString(),
            }
          : review
      )
    );

    setResponding(null);
    setResponse("");
    alert("Response posted successfully");
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-gray-600">
          Manage and respond to your customer reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: "Average Rating",
            value: getAverageRating(),
            icon: <Star className="w-6 h-6 text-yellow-400" />,
          },
          {
            label: "Total Reviews",
            value: reviews.length,
            icon: <MessageSquare className="w-6 h-6 text-primary" />,
          },
          {
            label: "Response Rate",
            value: `${
              Math.round(
                (reviews.filter((r) => r.response).length / reviews.length) *
                  100
              ) || 0
            }%`,
            icon: <Calendar className="w-6 h-6 text-green-500" />,
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              {stat.icon}
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No reviews yet</h2>
            <p className="text-gray-600">
              When customers review your items, they'll appear here.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "fill-current"
                                : "stroke-current fill-none"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-medium mt-1">{review.reviewer.name}</p>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-600">{review.content}</p>

                {/* Owner Response */}
                {review.response ? (
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="font-medium mb-2">Your Response</p>
                    <p className="text-gray-600">{review.response}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Responded on{" "}
                      {new Date(review.response_date!).toLocaleDateString()}
                    </p>
                  </div>
                ) : responding === review.id ? (
                  <div className="mt-4">
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Write your response..."
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={4}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setResponding(null);
                          setResponse("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleSubmitResponse(review.id)}>
                        Post Response
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setResponding(review.id)}
                  >
                    Respond to Review
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerReviews;
