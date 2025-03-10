import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Plus,
  Banknote,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import { PaystackButton } from "react-paystack";

interface Review {
  id: string;
  rating: number;
  content: string;
  created_at: string;
  reviewer: {
    name: string;
  };
}

interface Item {
  id: string;
  image: string;
  name: string;
  category: string;
  rentalPrice: string;
  location: string;
  ownerName: string;
  availabilityStatus: "Available" | "Currently Rented" | string;
  rating: number;
  reviews: number;
  rentalDuration: string;
  description: string;
  rentalTerms: string;
  images: string[];
}

const dummyItem: Item = {
  id: "1",
  image:
    "https://images.nappy.co/photo/El_CGRP4urkk0v4iEtjti.jpg?h=750&w=1260&cs=srgb&fm=jpg",
  name: "LG Refrigerator",
  category: "Electronics",
  rentalPrice: "₦500/day",
  location: "Lagos, Nigeria",
  ownerName: "John Doe",
  availabilityStatus: "Available",
  rating: 4.8,
  reviews: 25,
  rentalDuration: "1-7 days",
  description:
    "A high-quality LG refrigerator in excellent condition. This refrigerator is perfect for keeping your food and drinks cool and fresh. It features a spacious interior with adjustable shelves, a freezer compartment, and energy-efficient operation. Ideal for both short-term and long-term rentals.",
  rentalTerms:
    "Please handle the refrigerator with care. Do not overload the shelves or place hot items directly inside. Ensure the refrigerator is kept clean and returned in the same condition as it was rented. Any damages or malfunctions should be reported immediately. The renter is responsible for any repairs or replacements needed due to misuse.",
  images: [
    "https://images.nappy.co/photo/El_CGRP4urkk0v4iEtjti.jpg?h=750&w=1260&cs=srgb&fm=jpg",
    "https://th.bing.com/th/id/R.6fa41f6ea123b69ecb4261be8bf680ee?rik=uUVtGOSS3CNnWQ&riu=http%3a%2f%2fimg.bbystatic.com%2fBestBuy_US%2fimages%2fproducts%2f5258%2f5258309_sd.jpg&ehk=ppYIAVslCidjU6ClaJiVid2iPHQSNs9JHhdUaubuPrg%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.c8166673ce8573fa53a19553545f3a3c?rik=eW4AiFLg76njzQ&riu=http%3a%2f%2fcontent.blueport.com%2fProductImages%2f0%2f437615.jpg%3ffit%3dinside%7c65%3a65%26composite-to%3dcenter%2ccenter%7c65%3a65%26background-color%3dwhite&ehk=7wP28wIbeznydFTg6a9k4ccpCZA29nHXukMbsFJvdqE%3d&risl=&pid=ImgRaw&r=0",
  ],
};

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
];

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState<Item | null>(null);
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    content: "",
    reviewer: {
      name: "",
    },
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    loadItemData();
  }, [id]);

  const loadItemData = async () => {
    try {
      // Simulate loading data
      setTimeout(() => {
        setItemData(dummyItem);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error loading item:", error);
      toast.error("Failed to load item details");
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    const newReviewData = {
      ...newReview,
      id: (reviews.length + 1).toString(),
      created_at: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReviewData]);
    setShowReviewModal(false);
    setNewReview({
      rating: 0,
      content: "",
      reviewer: {
        name: "",
      },
    });
    toast.success("Review added successfully!");
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    toast.success("Payment successful! Your booking is confirmed.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">Loading item details...</p>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">Item not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="relative h-80 rounded-xl overflow-hidden">
        <img
          src={itemData.image}
          alt={itemData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{itemData.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">
                    {itemData.rating.toFixed(1)} ({itemData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5" />
                  <span className="ml-1">{itemData.location}</span>
                </div>
                <div className="flex items-center">
                  <Banknote className="w-5 h-5" />
                  <span className="ml-1">{itemData.rentalPrice}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={() => setShowPaymentModal(true)}
            >
              Book Item Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">About This Item</h2>
            <p className="text-gray-600">{itemData.description}</p>
          </section>

          {/* Rental Terms */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Rental Terms</h2>
            <p className="text-gray-600">{itemData.rentalTerms}</p>
          </section>

          {/* Gallery */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {itemData.images.length > 0 ? (
                itemData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="rounded-lg w-full h-32 object-cover"
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600 py-8">
                  No gallery images available
                </p>
              )}
            </div>
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Reviews</h2>
              <Button onClick={() => setShowReviewModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </div>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-600 py-8">
                  No reviews yet. Be the first to review this item!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4">
                    <div className="flex items-center mb-2">
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
                      <span className="ml-2 text-gray-600">
                        • {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                    <p className="text-sm font-medium mt-1">
                      - {review.reviewer.name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Item Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Category</span>
                <span>{itemData.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Rental Price</span>
                <span>{itemData.rentalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span>{itemData.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Owner</span>
                <span>{itemData.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Rental Duration</span>
                <span>{itemData.rentalDuration}</span>
              </div>
              <div className="flex justify-between">
                <span>Availability</span>
                <span>
                  {itemData.availabilityStatus === "Available" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  {itemData.availabilityStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Button
              className="w-full"
              onClick={() => setShowPaymentModal(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Item Now
            </Button>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {showReviewModal && (
        <Modal onClose={() => setShowReviewModal(false)}>
          <h2 className="text-2xl font-semibold mb-4">Add Review</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddReview();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="reviewerName"
                value={newReview.reviewer.name}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    reviewer: { ...prev.reviewer, name: e.target.value },
                  }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    rating: parseInt(e.target.value),
                  }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                name="content"
                value={newReview.content}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </Modal>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <Modal onClose={() => setShowPaymentModal(false)}>
          <h2 className="text-2xl font-semibold mb-4">Make Payment</h2>
          <PaystackButton
            email="hirental@example.com"
            amount={2000 * 100} // Amount in kobo
            publicKey={import.meta.env.VITE_PAYSTACK_PK}
            text="Pay Now"
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowPaymentModal(false)}
            className="w-full bg-primary text-white py-2 rounded-md mt-4"
          />
        </Modal>
      )}
    </div>
  );
};

export default ItemDetail;
