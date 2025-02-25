import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Filter,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import items from "../dummy/items";
import { db } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import Modal from "../components/Modal";
import { getCollection } from "../firebase/utils";
import toast from "react-hot-toast";

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
}

const dummyItems: Item[] = items;

const ItemSearch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>(dummyItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    priceRange: "All Prices",
    location: "All Locations",
    availability: "All",
    rating: "All Ratings",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    itemName: "",
    preferredDuration: "",
    rentalPriceRange: "",
    renterName: "",
  });

  const { currentPage, goToPage, totalPages, startIndex, endIndex } =
    usePagination({
      totalItems: items.length,
      itemsPerPage: 10,
    });

  const filterItems = () => {
    return items.filter((item) => {
      const searchMatch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      if (!searchMatch) return false;

      if (
        filters.category !== "All Categories" &&
        item.category !== filters.category
      ) {
        return false;
      }

      if (filters.priceRange !== "All Prices") {
        const price = parseInt(item.rentalPrice.replace(/[^0-9]/g, ""));
        if (filters.priceRange === "₦0-₦500" && price > 500) return false;
        if (
          filters.priceRange === "₦501-₦1000" &&
          (price < 501 || price > 1000)
        )
          return false;
        if (filters.priceRange === "₦1001+" && price < 1001) return false;
      }

      if (
        filters.location !== "All Locations" &&
        item.location !== filters.location
      ) {
        return false;
      }

      if (
        filters.availability !== "All" &&
        item.availabilityStatus !== filters.availability
      ) {
        return false;
      }

      if (filters.rating !== "All Ratings") {
        const minimumRating = parseFloat(filters.rating.replace("+", ""));
        if (item.rating < minimumRating) {
          return false;
        }
      }

      return true;
    });
  };

  const handleRequestFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRequestFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [rqFormSubmitting, setRqFormSubmitting] = useState(false);
  const handleRequestFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setRqFormSubmitting(true);
      await addDoc(getCollection(db, "item_requests"), requestFormData);
      setShowRequestModal(false);
      setRequestFormData({
        itemName: "",
        preferredDuration: "",
        rentalPriceRange: "",
        renterName: "",
      });
      toast.success("Item request submitted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRqFormSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Household Items
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button
              type="button"
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </form>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>All Categories</option>
                {["Electronics", "Furniture", "Home Appliances"].map(
                  (category) => (
                    <option key={category}>{category}</option>
                  )
                )}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>All Prices</option>
                <option>₦0-₦500</option>
                <option>₦501-₦1000</option>
                <option>₦1001+</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>All Locations</option>
                {["Lagos", "Abuja", "Port Harcourt"].map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    availability: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>All</option>
                <option>Available</option>
                <option>Currently Rented</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>All Ratings</option>
                <option>4.5+</option>
                <option>4.0+</option>
                <option>3.5+</option>
                <option>3.0+</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  category: "All Categories",
                  priceRange: "All Prices",
                  location: "All Locations",
                  availability: "All",
                  rating: "All Ratings",
                });
                setSearchTerm("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Request Item Section */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-600">
          Could not find what you want? Request Item
        </p>
        <Button
          size="lg"
          className="flex items-center gap-2"
          onClick={() => setShowRequestModal(true)}
        >
          <Plus className="w-5 h-5" />
          Request Item
        </Button>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {filterItems().length} item{filterItems().length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">Loading items...</p>
          </div>
        ) : filterItems().length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">
              No items found matching your criteria
            </p>
          </div>
        ) : (
          filterItems()
            .slice(startIndex, endIndex)
            .map((item) => (
              <Link to={`/items/${item.id}`}>
                <button
                  key={item.id}
                  //   onClick={() => navigate(`/items/${item.id}`)}
                  className="text-left w-full transition-transform hover:scale-[1.02]"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                      <div className="flex items-center text-sm mb-2">
                        <div className="flex text-yellow-400 mr-1">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                        <span>{item.rating}</span>
                        <span className="text-gray-600 mx-1">•</span>
                        <span className="text-gray-600">
                          {item.reviews} reviews
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{item.rentalPrice}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">
                          Owner: {item.ownerName}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">
                          Rental Duration: {item.rentalDuration}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        {item.availabilityStatus === "Available" ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span>{item.availabilityStatus}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </Link>
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

      {/* Request Item Modal */}
      {showRequestModal && (
        <Modal onClose={() => setShowRequestModal(false)}>
          <h2 className="text-2xl font-semibold mb-4">Request Item</h2>
          <form onSubmit={handleRequestFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                value={requestFormData.itemName}
                onChange={handleRequestFormChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Duration
              </label>
              <input
                type="text"
                name="preferredDuration"
                value={requestFormData.preferredDuration}
                onChange={handleRequestFormChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Price Range
              </label>
              <input
                type="text"
                name="rentalPriceRange"
                value={requestFormData.rentalPriceRange}
                onChange={handleRequestFormChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Renter Name
              </label>
              <input
                type="text"
                name="renterName"
                value={requestFormData.renterName}
                onChange={handleRequestFormChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={rqFormSubmitting}
            >
              {rqFormSubmitting ? "Submitting Request..." : "Submit Request"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ItemSearch;
