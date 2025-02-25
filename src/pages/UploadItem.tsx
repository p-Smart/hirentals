import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { getCollection } from "../firebase/utils";
import toast from "react-hot-toast";

interface ItemData {
  name: string;
  category: string;
  rentalPrice: string;
  location: string;
  ownerName: string;
  rentalDuration: string;
  description: string;
  rentalTerms: string;
  mainImage: File | null;
  otherImages: File[];
}

const UploadItem = () => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState<ItemData>({
    name: "",
    category: "",
    rentalPrice: "",
    location: "",
    ownerName: "",
    rentalDuration: "",
    description: "",
    rentalTerms: "",
    mainImage: null,
    otherImages: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageDrop = (acceptedFiles: File[]) => {
    setItemData((prev) => ({ ...prev, mainImage: acceptedFiles[0] }));
  };

  const handleOtherImagesDrop = (acceptedFiles: File[]) => {
    setItemData((prev) => ({
      ...prev,
      otherImages: [...prev.otherImages, ...acceptedFiles],
    }));
  };

  const removeOtherImage = (index: number) => {
    setItemData((prev) => ({
      ...prev,
      otherImages: prev.otherImages.filter((_, i) => i !== index),
    }));
  };

  const {
    getRootProps: getMainImageRootProps,
    getInputProps: getMainImageInputProps,
  } = useDropzone({
    onDrop: handleMainImageDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const {
    getRootProps: getOtherImagesRootProps,
    getInputProps: getOtherImagesInputProps,
  } = useDropzone({
    onDrop: handleOtherImagesDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Upload main image
      let mainImageUrl = "";
      if (itemData.mainImage) {
        const mainImageRef = ref(storage, `images/${itemData.mainImage.name}`);
        await uploadBytes(mainImageRef, itemData.mainImage);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }

      // Upload other images
      const otherImageUrls = await Promise.all(
        itemData.otherImages.map(async (file) => {
          const imageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(imageRef, file);
          return await getDownloadURL(imageRef);
        })
      );

      // Add item to Firestore
      await addDoc(getCollection(db, "items"), {
        ...itemData,
        mainImage: mainImageUrl,
        otherImages: otherImageUrls,
        publishStatus: "pending",
      });

      toast.success(
        "Item uploaded successfully!. You will be scheduled for a verification call soon."
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </Button>

      <h1 className="text-3xl font-bold text-gray-900">Upload Item</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={itemData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={itemData.category}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Home Appliances">Home Appliances</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Price (₦/day)
            </label>
            <input
              type="number"
              name="rentalPrice"
              value={itemData.rentalPrice}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={itemData.location}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={itemData.ownerName}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Duration
            </label>
            <input
              type="text"
              name="rentalDuration"
              value={itemData.rentalDuration}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={itemData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rental Terms
          </label>
          <textarea
            name="rentalTerms"
            value={itemData.rentalTerms}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Image
          </label>
          <div
            {...getMainImageRootProps()}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
          >
            <input {...getMainImageInputProps()} />
            {itemData.mainImage ? (
              <img
                src={URL.createObjectURL(itemData.mainImage)}
                alt="Main"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <p className="text-gray-600">
                Drag & drop main image here, or click to select
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Images
          </label>
          <div
            {...getOtherImagesRootProps()}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
          >
            <input {...getOtherImagesInputProps()} />
            <p className="text-gray-600">
              Drag & drop other images here, or click to select
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {itemData.otherImages.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Other ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeOtherImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" disabled={loading}>
          {loading ? "Uploading..." : "Submit Item"}
        </Button>
      </form>
    </div>
  );
};

export default UploadItem;
