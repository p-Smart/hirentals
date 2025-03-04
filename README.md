# HiRentals

HiRentals is a web application that connects renters with owners offering a variety of household items for rent. The platform allows users to search for items, view item details, and book items for rent. Owners can list their items, manage bookings, and communicate with renters.

## Features

- **Search Items**: Easily search and filter household items based on category, price range, location, availability, and rating.
- **Item Details**: View detailed information about each item, including images, rental terms, and reviews.
- **Booking**: Book items directly through the platform.
- **Owner Dashboard**: Owners can manage their listed items, view bookings, and communicate with renters.
- **Renter Dashboard**: Renters can manage their bookings, view saved items, and communicate with owners.
- **Notifications**: Receive notifications for bookings, messages, and reviews.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Firebase**: Backend services for authentication, database, and storage.
- **Paystack**: Payment gateway for processessing payments.
- **Calendly**: For scheduling meetings between admins and users.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Library for routing in React applications.
- **React Hot Toast**: Library for displaying toast notifications.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/hi-rentals.git
   cd hi-rentals
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:

   ```env
   VITE_PAYSTACK_PK=KEY
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Project Structure

```
hi-rentals/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pagination.tsx
│   │   └── ui/
│   │       └── button.tsx
│   ├── dummy/
│   │   └── items.ts
│   ├── firebase/
│   │   └── firebase.ts
│   ├── hooks/
│   │   └── usePagination.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── ItemDetail.tsx
│   │   ├── ItemSearch.tsx
│   │   └── VendorProfile.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── README.md
├── .env
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or inquiries, please contact us at [princeayokunle2002@gmail.com](mailto:princeayokunle2002@gmail.com).
