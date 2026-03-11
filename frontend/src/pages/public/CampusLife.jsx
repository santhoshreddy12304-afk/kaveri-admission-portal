import React from 'react';

const CampusLife = () => {
    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h1 className="text-5xl font-extrabold text-ku-blue mb-8">Life at Kaveri</h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-12">
                    At Kaveri University, learning is not confined to classrooms. Our vibrant campus life ensures that students develop into well-rounded individuals ready to take on global challenges.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-ku-gold hover:shadow-2xl transition">
                      <img src="/src/assets/images/classroom.jpg" alt="Interactive Classrooms" className="h-64 w-full object-cover" />
                      <div className="p-8">
                         <h3 className="text-2xl font-bold mb-3 text-ku-blue">Digital Classrooms</h3>
                         <p className="text-gray-600">Engage in technology-led learning within our smart classrooms, designed for maximum student-teacher interaction.</p>
                      </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-ku-gold hover:shadow-2xl transition">
                      <img src="/src/assets/images/academic-block.jpg" alt="Academic Infrastructure" className="h-64 w-full object-cover" />
                      <div className="p-8">
                         <h3 className="text-2xl font-bold mb-3 text-ku-blue">Modern Infrastructure</h3>
                         <p className="text-gray-600">Our campus architecture blends aesthetics with functionality, providing a majestic environment for higher education.</p>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    );
}

export default CampusLife;
