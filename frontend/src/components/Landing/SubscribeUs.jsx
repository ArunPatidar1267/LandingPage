import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "../../lib/api";
import toast from "react-hot-toast";

const SubscribeUs = () => {
  const [email, setEmail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: (data) => {
      toast.success(data.message);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to subscribe");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribeMutation.mutate(email);
  };

  return (
    <div className="bg-blue-600 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
        <p className="text-blue-100 mb-6">Stay updated with our latest projects and news</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-200"
            disabled={subscribeMutation.isLoading}
          >
            {subscribeMutation.isLoading ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeUs;
