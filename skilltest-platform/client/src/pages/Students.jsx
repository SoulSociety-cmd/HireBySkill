import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Code, Award, Star, GraduationCap, ArrowRight } from 'lucide-react';

const Students = () => {
  // Mock skill badges
  const skillBadges = [
    { skill: 'React', level: 'Expert', score: 98, icon: '⚛️' },
    { skill: 'JavaScript', level: 'Expert', score: 96, icon: '📜' },
    { skill: 'Node.js', level: 'Advanced', score: 94, icon: '🐳' },
    { skill: 'Python', level: 'Expert', score: 99, icon: '🐍' },
    { skill: 'TypeScript', level: 'Advanced', score: 92, icon: '🔤' },
    { skill: 'Next.js', level: 'Expert', score: 97, icon: '⚡' },
    { skill: 'Docker', level: 'Intermediate', score: 88, icon: '🐳' },
    { skill: 'MongoDB', level: 'Advanced', score: 93, icon: '🐘' },
    { skill: 'GraphQL', level: 'Expert', score: 95, icon: '📊' },
    { skill: 'AWS', level: 'Intermediate', score: 89, icon: '☁️' },
    { skill: 'Tailwind CSS', level: 'Expert', score: 98, icon: '🎨' },
    { skill: 'Prisma', level: 'Advanced', score: 91, icon: '🔗' }
  ];

  // Mock student stories
  const studentStories = [
    {
      name: 'Alex Johnson',
      role: 'Fullstack Developer @ TechCorp',
      badgeCount: 8,
      story: "Landed 5 interviews in 1 week after SkillTest badges. Hired at 2x salary!"
    },
    {
      name: 'Maria Gonzalez',
      role: 'Frontend Engineer @ InnovateAI',
      badgeCount: 6,
      story: "React Expert badge got me noticed by recruiters. Dream job achieved!"
    },
    {
      name: 'Raj Patel',
      role: 'Backend Engineer @ CodeGenius',
      badgeCount: 7,
      story: "Python + Node.js badges = senior offers. SkillTest changed my career."
    }
  ];

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-800 via-pink-700 to-orange-600 bg-clip-text text-transparent mb-6">
            Skill Badges That Open Doors
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Prove your skills with verified badges. Companies trust real results, not resumes.
          </p>
        </motion.div>

        {/* Badge Showcase */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
            {skillBadges.map((badge, i) => (
              <motion.div
                key={badge.skill}
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ delay: i * 0.05, type: 'spring' }}
                className="group relative p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 cursor-pointer overflow-hidden h-44 flex flex-col items-center justify-center"
              >
                {/* Badge background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-orange-400/30 group-hover:from-purple-500/50 group-hover:to-orange-500/50 transition-all duration-500" />
                
                {/* Icon */}
                <div className="text-4xl mb-4 z-10 relative">{badge.icon}</div>
                
                {/* Skill name */}
                <h3 className="font-bold text-lg text-slate-800 dark:text-white z-10 relative mb-2 text-center">{badge.skill}</h3>
                
                {/* Level badge */}
                <div className="flex items-center space-x-2 z-10 relative">
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    ${badge.level === 'Expert' ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' : 
                      badge.level === 'Advanced' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 
                      'bg-gradient-to-r from-orange-500 to-red-500 text-white'}
                  `}>
                    {badge.level}
                  </div>
                  <div className="text-2xl font-black text-emerald-600">{badge.score}%</div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/login"
              className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
            >
              Earn Your Badges
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* Student Success Stories */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white text-center mb-20">
            Student Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {studentStories.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 lg:p-12 rounded-3xl hover:shadow-3xl transition-all group relative overflow-hidden"
              >
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl mr-6 flex-shrink-0">
                    {story.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-1">{story.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">{story.role}</p>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-6 h-6 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <Award className="w-12 h-12 text-emerald-500 mr-4 flex-shrink-0" />
                  <div className="font-bold text-2xl text-emerald-600">{story.badgeCount} badges earned</div>
                </div>
                
                <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 italic">
                  "{story.story}"
                </p>
                
                <div className="flex items-center justify-between">
                  <Link 
                    to="/login"
                    className="font-bold text-primary-600 hover:text-primary-700 group-hover:translate-x-2 transition-transform"
                  >
                    Start Testing →
                  </Link>
                  <div className="flex space-x-1">
                    <div className="w-2 h-10 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
                    <div className="w-2 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                    <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Badge Legend */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            How Badges Are Earned
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 glass rounded-2xl">
              <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h4 className="text-2xl font-bold mb-4">90%+ Score</h4>
              <p className="text-slate-600 dark:text-slate-400">Expert level mastery</p>
            </div>
            <div className="p-8 glass rounded-2xl">
              <Code className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h4 className="text-2xl font-bold mb-4">75-89% Score</h4>
              <p className="text-slate-600 dark:text-slate-400">Advanced proficiency</p>
            </div>
            <div className="p-8 glass rounded-2xl">
              <GraduationCap className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h4 className="text-2xl font-bold mb-4">Earned & Verified</h4>
              <p className="text-slate-600 dark:text-slate-400">Lifetime badge</p>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-800 via-pink-700 to-orange-600 bg-clip-text text-transparent mb-8">
            Your badges = Your future
          </h2>
          <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12">
            Showcase real skills. Land dream jobs.
          </p>
          <Link
            to="/login"
            className="group inline-flex items-center px-16 py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white text-2xl font-bold rounded-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-500"
          >
            Start Earning Badges Now
            <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-4 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Students;

