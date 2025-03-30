
import React from 'react';

const testimonials = [
  {
    quote: "Greenroom completely transformed how I organize hackathons. The on-chain identity system makes vetting participants so much easier.",
    name: "Sarah Johnson",
    role: "Tech Event Organizer",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
  },
  {
    quote: "As a developer, having my skills and past event attendance verified on-chain has opened doors to exclusive events and opportunities.",
    name: "Michael Chen",
    role: "Blockchain Developer",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  },
  {
    quote: "The networking capabilities of Greenroom are game-changing. I've found teammates for hackathons who perfectly complement my skill set.",
    name: "Elena Rodriguez",
    role: "Web3 Designer",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600">
            Discover how Greenroom is changing the way people experience events in the web3 space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
