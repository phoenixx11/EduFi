// src/components/Testimonials.tsx
'use client';
import React from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul',
    location: 'Uttar Pradesh',
    quote: 'CommunityWallet has transformed the way our community accesses essential services.',
    image: '/images/rahul.jpg',
  },
  {
    name: 'Meera',
    location: 'Rajasthan',
    quote: 'The blockchain education provided was easy to understand and very helpful.',
    image: '/images/meera.jpg',
  },
  // Add more testimonials as needed
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-1 bg-white p-6 rounded-md shadow-sm">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={64}
                height={64}
                className="rounded-full mx-auto mb-4"
              />
              <p className="text-center italic mb-4">"{testimonial.quote}"</p>
              <p className="text-center font-semibold">{testimonial.name}, {testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

 