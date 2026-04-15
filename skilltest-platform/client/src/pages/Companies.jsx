import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star, Award, ArrowRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Companies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock company data
  const companies = [
    { name: 'TechCorp', logo: '🏢', size: '5000+' },
    { name: 'InnovateAI', logo: '🚀', size: '1000+' },
    { name: 'CodeGenius', logo: '💻', size: '2000+' },
    { name: 'FutureWorks', logo: '🌟', size: '3000+' },
    { name: 'NexGen Labs', logo: '⚡', size: '1500+' },
    { name: 'DigitalForge', logo: '🔥', size: '2500+' },
    { name: 'QuantumSoft', logo: '🧠', size: '4000+' },
    { name: 'Vertex Inc', logo: '📈', size: '800+' },
    { name: 'PixelCraft', logo: '🎨', size: '1200+' },
    { name: 'Synapse Tech', logo: '🔗', size: '3500+' }
  ];

  // Mock testimonials
  const testimonials = [
    {
      quote: "SkillTest cut our hiring time by 85%. Real skills, real hires.",
      author: "Sarah Chen, CTO @ TechCorp",
      company: "TechCorp",
      role: "CTO"
    },
    {
      quote: "Best skill assessment platform. AI grading is spot-on.",
      author: "Mike Rodriguez, VP Engineering @ InnovateAI",
      company: "InnovateAI",
      role: "VP Engineering"
    },
    {
      quote: "Hired 50+ senior devs in 2 months. Incredible ROI.",
      author: "Priya Sharma, Head of Talent @ CodeGenius",
      company: "CodeGenius",
      role: "Head of Talent"
    },
    {
      quote: "Sandbox execution + perfect grading = confidence in every hire.",
      author: "David Kim, Engineering Lead @ FutureWorks",
      company: "FutureWorks",
      role: "Engineering Lead"
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-slate-700 to-black bg-clip-text text-transparent mb-6">
            Trusted by Leading Companies
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join 500+ companies hiring faster with proven skills.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 text-center mb-24"
        >
          <div>
            <div className="text-5xl md:text-6xl font-black text-emerald-600 mb-4">500+</div>
            <div className="text-xl font-bold text-slate-700 dark:text-slate-300">Companies</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-blue-600 mb-4">50K+</div>
            <div className="text-xl font-bold text-slate-700 dark:text-slate-300">Tests Run</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-purple-600 mb-4">5K+</div>
            <div className="text-xl font-bold text-slate-700 dark:text-slate-300">Hires Made</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-orange-600 mb-4">98%</div>
            <div className="text-xl font-bold text-slate-700 dark:text-slate-300">Hiring Success</div>
          </div>
        </motion.div>

        {/* Companies Logos */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white text-center mb-16">
            Companies Using SkillTest
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-8 lg:gap-12 items-center justify-items-center">
            {companies.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="group p-8 lg:p-12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-primary-300 transition-all duration-300 cursor-pointer h-32 lg:h-40 flex items-center justify-center"
              >
                <div className="text-4xl lg:text-5xl group-hover:scale-110 transition-transform">{company.logo}</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {company.size} employees
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white text-center mb-16">
            What Companies Are Saying
          </h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden rounded-3xl glass shadow-2xl p-2">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.author}
                  initial={false}
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="flex w-full h-[280px] md:h-[320px]"
                >
                  <div className="w-full glass p-12 rounded-2xl flex items-center justify-center text-center relative backdrop-blur-xl">
                    <div>
                      <Quote className="w-20 h-20 text-slate-300 absolute -top-8 left-1/2 -translate-x-1/2 opacity-50" />
                      <p className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200 italic leading-relaxed mb-8 max-w-2xl mx-auto">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl">
                          {testimonial.author[0]}
                        </div>
                        <div>
                          <div className="font-bold text-xl text-slate-900 dark:text-white">{testimonial.author}</div>
                          <div className="text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                          <div className="text-slate-700 dark:text-slate-300 font-semibold">{testimonial.company}</div>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === i 
                      ? 'bg-emerald-600 scale-125 shadow-lg' 
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
            Ready to hire your next star developer?
          </h2>
          <Link
            to="/login"
            className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
          >
            Start Hiring Now
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-xl text-slate-600 dark:text-slate-300 mt-6">
            No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Companies;

