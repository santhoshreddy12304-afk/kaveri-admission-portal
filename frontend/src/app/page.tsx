import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
            Admissions Open <span className="text-blue-500">2026</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
            Shape your future at the most prestigious institution. Join 10,000+ students on their journey to excellence.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/admission"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center transition-all transform hover:scale-105"
            >
              Apply Now <ArrowRight className="ml-2" />
            </Link>
            <Link
              href="/courses"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">College Overview</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded with a vision to provide world-class education, our college has been at the forefront of academic excellence for over three decades. We offer a diverse range of programs designed to equip students with the skills and knowledge needed to thrive in the modern world.
          </p>
        </div>
      </section>

      {/* Placement Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-lg transition">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-extrabold text-blue-900 mb-2">50 LPA</h3>
              <p className="text-blue-700 font-medium">Highest Package</p>
            </div>
            <div className="p-8 rounded-2xl bg-green-50 border border-green-100 hover:shadow-lg transition">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-4xl font-extrabold text-green-900 mb-2">95%</h3>
              <p className="text-green-700 font-medium">Placement Percentage</p>
            </div>
            <div className="p-8 rounded-2xl bg-purple-50 border border-purple-100 hover:shadow-lg transition">
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-extrabold text-purple-900 mb-2">500+</h3>
              <p className="text-purple-700 font-medium">Recruiting Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Highlights */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Campus Highlights</h2>
              <ul className="space-y-4">
                {[
                  "State-of-the-art Research Labs",
                  "24/7 Digital Library Access",
                  "Modern Residential Facilities",
                  "Global Exchange Programs",
                  "Industry Integrated Curriculum",
                  "Robust Sports Infrastructure"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <CheckCircle className="text-blue-500 mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Campus Life" className="rounded-lg shadow-2xl" />
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Auditorium" className="rounded-lg shadow-2xl mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", role: "B.Tech CSE, 2024", text: "The exposure I got here was unmatched. The faculty and the placement cell are extremely supportive." },
              { name: "Priya Singh", role: "B.Tech AIML, 2025", text: "State of the art labs and a very vibrant campus life. Truly the best decision of my career." },
              { name: "Amit Patel", role: "B.Tech ECE, 2023", text: "I landed my dream job at Google thanks to the training and placement cell of this college." }
            ].map((t, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-10 text-blue-100">
            Apply online today and take the first step towards a successful career.
          </p>
          <Link
            href="/admission"
            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-full text-xl font-bold shadow-xl transition"
          >
            Start Your Application
          </Link>
        </div>
      </section>
    </div>
  );
}
