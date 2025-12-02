// components/sections/WorksSection.tsx
import Link from 'next/link';
// Import Image from 'next/image' if you are using high-quality images

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    type: string;
}

const projects: Project[] = [
    { title: "E-Commerce Platform Redesign", description: "Scalable Next.js frontend with Stripe integration.", image: "/images/project1.jpg", link: "#", type: "Fullstack" },
    { title: "AI-Driven Chatbot Service", description: "Node.js API, leveraging LLMs for customer support.", image: "/images/project2.jpg", link: "#", type: "Backend/AI" },
    { title: "Custom Dashboard Solution", description: "Real-time data visualization using Recharts and Tailwind.", image: "/images/project3.jpg", link: "#", type: "Frontend" },
];

const ProjectCard: React.FC<Project> = ({ title, description, image, link, type }) => (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group">
        <div className="relative w-full h-80 overflow-hidden">
            {/* Using a standard div with background image for the placeholder */}
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${image})` }}>
                {/* Visual Placeholder */}
            </div>
            
            <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 bg-black/60 text-white rounded-full backdrop-blur-sm">{type}</span>
        </div>
        <div className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">{description}</p>
        </div>
    </Link>
);

export default function WorksSection() {
  return (
    // 2. WORKS SECTION: Project Showcase
    <section id="works" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold tracking-tight mb-4 text-center text-gray-900 dark:text-white">
          Works.
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-16 text-center max-w-2xl mx-auto">
          A selection of my best projects, focusing on modern stacks and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="https://github.com/yourusername" // Update this link
            target="_blank"
            className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors duration-200 font-medium border-b border-blue-600 dark:border-blue-400 hover:border-blue-500"
          >
            See all repositories on GitHub &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}