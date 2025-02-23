import { Link } from "react-router-dom";
import { Search, Calendar, MessageSquare, Star } from "lucide-react";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Discover Household Items for Rent
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with trusted owners offering a variety of household items for
          rent
        </p>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <Link to="/vendors">
            <Button size="lg">Start Renting</Button>
          </Link>
          <Link to="/owner/register">
            <Button size="lg" variant="outline">
              List Your Items
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            image:
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Home Appliances",
          },
          {
            image:
              "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Furniture & Furnishings",
          },
          {
            image:
              "https://img.freepik.com/free-vector/home-theater-realistic-interior-template_1284-14928.jpg?t=st=1740291094~exp=1740294694~hmac=fa5e02dd3de0c3752b8ea95c727a0b222715c7d35cb15cf5c63d8f82ebc54803&w=1060",
            title: "Electronics & Gadgets",
          },
        ].map((category) => (
          <div
            key={category.title}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={`${category.image}`}
              alt={category.title}
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            icon: <Search className="w-8 h-8 text-teal-500" />,
            title: "Easy Search",
            description:
              "Find and compare household items based on your needs and budget",
          },
          {
            icon: <Calendar className="w-8 h-8 text-teal-500" />,
            title: "Smart Booking",
            description: "Schedule rentals and manage bookings effortlessly",
          },
          {
            icon: <MessageSquare className="w-8 h-8 text-teal-500" />,
            title: "Direct Communication",
            description:
              "Chat with owners and discuss your requirements seamlessly",
          },
        ].map((feature) => (
          <div key={feature.title} className="text-center space-y-4">
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "Found the perfect furniture for our temporary stay. The platform made everything so easy!",
              author: "Mobolaji O.",
              rating: 5,
            },
            {
              quote:
                "The comparison feature helped us find the best deals within our budget.",
              author: "Daniel Ajayi",
              rating: 5,
            },
          ].map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p className="font-medium">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
