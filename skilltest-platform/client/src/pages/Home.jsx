import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from "../stores/authStore";
import { toast } from 'react-hot-toast';
import { 
  Play, 
  Users, 
  CheckCircle, 
  Zap, 
  Shield, 
  Calendar,
  Mail,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const { user, login: quickLogin } = useAuthStore();
  const [email, setEmail] = useState('');
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  const handleWaitlist = async (e) => {
    e.preventDefault();
    if (!email) return;
    setWaitlistLoading(true);
    // Mock waitlist - replace with real API later
    setTimeout(() => {
      toast.success('✅ Joined waitlist! Welcome to the 1000+ students proving real skills.');
      setEmail('');
      setWaitlistLoading(false);
    }, 1000);
  };

  const demoVideoId = 'dQw4w9WgXcQ'; // Replace with real demo video ID

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-slate-700 to-black bg-clip-text text-transparent mb-6 drop-shadow-2xl">
              85% faster hiring.
            </h1>
            <div className="text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-600 to-slate-800 mb-8 leading-tight max-w-4xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Test {'>'} CV.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Real skills proven.</span>
            </div>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed opacity-90">
              AI-powered code grading. Sandbox execution. Skill badges that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 min-w-[200px] justify-center"
                >
                  Go to Dashboard
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 min-w-[200px] justify-center"
                  >
                    Get Started Free
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-12 py-6 border-2 border-slate-200 dark:border-slate-700 text-xl font-bold rounded-3xl hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm min-w-[200px] justify-center"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Waitlist Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-3 bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-emerald-800 dark:text-emerald-200 font-semibold text-lg backdrop-blur-sm">
              <Users className="w-5 h-5 mr-2" />
              Join 1000+ students on the waitlist
            </div>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleWaitlist} className="glass p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:outline-none bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-lg placeholder-slate-500"
                  required
                />
                <button
                  type="submit"
                  disabled={waitlistLoading}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {waitlistLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Demo Video */}
      <section className="py-32 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8"
          >
            See SkillTest in Action
          </motion.h2>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden glass"
          >
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${demoVideoId}?autoplay=0`}
              title="SkillTest Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[500px] md:h-[600px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-20"
          >
            Everything you need to hire with confidence
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'AI Code Grading', desc: 'Perfect execution + logic scoring. 99% accuracy.' },
              { icon: Shield, title: 'Secure Sandbox', desc: 'Isolated execution. No security risks.' },
              { icon: CheckCircle, title: 'Skill Match', desc: 'AI-powered candidate-job matching.' },
              { icon: Users, title: '1000+ Students', desc: 'Verified skill badges. Ready to hire.' },
              { icon: Calendar, title: 'Real-time Results', desc: 'Live grading. Instant decisions.' },
              { icon: Play, title: 'Video Proctoring', desc: 'Optional. Full transparency.' }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 lg:p-10 rounded-3xl hover:shadow-2xl transition-all group cursor-pointer"
              >
                <feature.icon className="w-16 h-16 text-primary-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 drop-shadow-2xl"
          >
            Ready to hire 85% faster?
          </motion.h2>
          <p className="text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join leading companies already using SkillTest.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to={user ? '/dashboard' : '/login'}
              className="group inline-flex items-center px-12 py-6 bg-white text-emerald-700 text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 min-w-[220px] justify-center backdrop-blur-sm"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center px-12 py-6 border-2 border-white/30 text-xl font-bold rounded-3xl hover:border-white/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm min-w-[220px] justify-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

