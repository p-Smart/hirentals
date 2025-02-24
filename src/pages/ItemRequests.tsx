import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

interface ItemRequest {
  id: string;
  itemName: string;
  preferredDuration: string;
  rentalPriceRange: string;
  requestDate: string;
  renterName: string;
}

const dummyItemRequests: ItemRequest[] = [
  {
    id: "1",
    itemName: "LG Refrigerator",
    preferredDuration: "3-7 days",
    rentalPriceRange: "₦500-₦1000",
    requestDate: "2023-10-01",
    renterName: "Alice Johnson",
  },
  {
    id: "2",
    itemName: "Samsung TV",
    preferredDuration: "1-5 days",
    rentalPriceRange: "₦700-₦1200",
    requestDate: "2023-10-02",
    renterName: "Bob Brown",
  },
  {
    id: "3",
    itemName: "Microwave Oven",
    preferredDuration: "2-6 days",
    rentalPriceRange: "₦300-₈00",
    requestDate: "2023-10-03",
    renterName: "Charlie Davis",
  },
  {
    id: "4",
    itemName: "Sony PlayStation 5",
    preferredDuration: "1-3 days",
    rentalPriceRange: "₦1000-₦1500",
    requestDate: "2023-10-04",
    renterName: "David Evans",
  },
  {
    id: "5",
    itemName: "Dell Laptop",
    preferredDuration: "5-10 days",
    rentalPriceRange: "₦1500-₦2000",
    requestDate: "2023-10-05",
    renterName: "Eve Foster",
  },
  {
    id: "6",
    itemName: "Canon DSLR Camera",
    preferredDuration: "3-7 days",
    rentalPriceRange: "₦800-₦1200",
    requestDate: "2023-10-06",
    renterName: "Frank Green",
  },
  {
    id: "7",
    itemName: "IKEA Sofa Set",
    preferredDuration: "7-14 days",
    rentalPriceRange: "₦2000-₦3000",
    requestDate: "2023-10-07",
    renterName: "Grace Harris",
  },
  {
    id: "8",
    itemName: "Apple iPad",
    preferredDuration: "2-5 days",
    rentalPriceRange: "₦600-₦1000",
    requestDate: "2023-10-08",
    renterName: "Henry Irving",
  },
  {
    id: "9",
    itemName: "Bose Sound System",
    preferredDuration: "1-4 days",
    rentalPriceRange: "₦500-₦900",
    requestDate: "2023-10-09",
    renterName: "Ivy Johnson",
  },
  {
    id: "10",
    itemName: "Whirlpool Washing Machine",
    preferredDuration: "5-10 days",
    rentalPriceRange: "₦1000-₦1500",
    requestDate: "2023-10-10",
    renterName: "Jack King",
  },
  // ... more dummy data ...
];

const ItemRequests = () => {
  const navigate = useNavigate();
  const [itemRequests, setItemRequests] =
    useState<ItemRequest[]>(dummyItemRequests);

  const { currentPage, goToPage, totalPages, startIndex, endIndex } =
    usePagination({
      totalItems: itemRequests.length,
      itemsPerPage: 10,
    });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Item Requests</h1>
      </div>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Requested Items</h2>
        <div className="space-y-4">
          {itemRequests.slice(startIndex, endIndex).map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium">{request.itemName}</p>
                <p className="text-sm text-gray-600">
                  Preferred Duration: {request.preferredDuration}
                </p>
                <p className="text-sm text-gray-600">
                  Rental Price Range: {request.rentalPriceRange}
                </p>
                <p className="text-sm text-gray-600">
                  Request Date: {request.requestDate}
                </p>
                <p className="text-sm text-gray-600">
                  Renter: {request.renterName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            onPageChange={goToPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
};

export default ItemRequests;
