import Link from 'next/link';

const blogPosts = [
  {
    id: 'bringing-hope-through-food-shelter-and-support',
    title: 'Bringing Hope Through Food, Shelter, and Support',
    category: 'Community',
    date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80',
  },
  {
    id: 'building-bonds-through-community-agriculture',
    title: 'Building Bonds Through Community Agriculture',
    category: 'Agriculture',
    date: 'Jan 05, 2025',
    image: 'https://images.unsplash.com/photo-1593113589914-075568e0ea00?auto=format&fit=crop&q=80',
  },
  {
    id: 'restoring-hope-in-times-of-urgency-in-human',
    title: 'Restoring Hope In Times Of Urgency In Human',
    category: 'Disaster Relief',
    date: 'Feb 15, 2025',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
  },
  {
    id: 'water-for-life-restoring-health-and-dignity',
    title: 'Water for Life Restoring Health and Dignity',
    category: 'Sanitation',
    date: 'Mar 02, 2025',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
  },
  {
    id: 'education-for-every-child-hope-beyond-hunger',
    title: 'Education For Every Child: Hope Beyond Hunger',
    category: 'Education',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-16">
           <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
             Our Journal
           </span>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
             Blog & News
           </h1>
           <p className="text-xl text-black/60 max-w-2xl mx-auto">
             Stories of resilience, impact reports, and updates directly from the field.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col gap-4">
              <div className="w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden relative shadow-sm">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${post.image})` }} 
                />
                <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-col flex-1 mt-2">
                 <span className="text-black/50 text-sm font-medium mb-3">{post.date}</span>
                 <h2 className="text-2xl font-bold tracking-tight group-hover:text-[#00b749] transition-colors line-clamp-2 pr-4">
                   {post.title}
                 </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
