import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../lib/api";
import { BASE_URL } from "../lib/axios";

const Clients = () => {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Happy Clients</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients?.map((client) => (
            <div
              key={client.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              {client.image && (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                  <img
                    src={`${BASE_URL}/${client.image}`}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h3 className="font-semibold text-gray-900 text-lg text-center">{client.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{client.designation}</p>

              <p className="text-sm text-gray-600 line-clamp-4 text-justify">
                {client.description ? client.description : "No description"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
