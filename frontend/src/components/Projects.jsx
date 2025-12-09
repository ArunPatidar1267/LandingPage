import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../lib/api";
import { BASE_URL } from "../lib/axios";

const Projects = () => {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group"
            >
              {project.image && (
                <div className="w-48 h-48 mx-auto mb-4 rounded-half mt-4 overflow-hidden shadow-md">
                  <img
                    src={`${BASE_URL}/${project.image}`}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {project.name}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-4 min-h-[80px]">
                  {project.description || "No description available."}
                </p>

                <button
                  className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800 transition"
                  type="button"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
