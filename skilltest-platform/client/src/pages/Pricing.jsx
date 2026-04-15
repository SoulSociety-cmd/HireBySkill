import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Users, CheckCircle, Zap, Shield, Calendar, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [users, setUsers] = useState(10);
  const [tests, setTests] = useState(50);

  const plans = {
    starter: { name: 'Freemium', price: 0, users: '1', tests: '5/month', popular: false },
    pro: { name: 'Pro', price: 29, users: 'Unlimited', tests: '200/month', popular: true },
    enterprise: { name: 'Enterprise', price: 99, users: 'Unlimited', tests: 'Unlimited', popular: false }
  };

  const calculateTotal = () => {
    if (selectedPlan === 'starter') return 0;
    // Simple calculator logic - could be more complex
    return plans[selectedPlan].price * Math.ceil(users / 10);
  };

  const features = {
    starter: [
      'AI Code Grading (Basic)',
      '5 Tests/Month',
      'Email Support',
      'Basic Analytics'
    ],
    pro: [
      'AI Code Grading (Advanced)',
      '200 Tests/Month',
      'Priority Support',
      'Advanced Analytics',
      'Skill Matching',
      'Custom Tests'
    ],
    enterprise: [
      'Everything in Pro',
      'Unlimited Tests',
      'Dedicated Manager',
      'White-label',
      'API Access',
      'Custom Integrations'
    ]
  };

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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that works for your team. No hidden fees.
          </p>
        </motion.div>

        {/* Pricing Calculator */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass max-w-2xl mx-auto p-12 lg:p-16 rounded-3xl shadow-2xl mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Pricing Calculator</h2>
            <p className="text-slate-600 dark:text-slate-400">Get your custom quote</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Plan Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Plan</label>
              <select 
                value={selectedPlan} 
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-lg"
              >
                <option value="starter">Freemium ($0)</option>
                <option value="pro">Pro ($29/mo)</option>
                <option value="enterprise">Enterprise ($99/mo)</option>
              </select>
            </div>
            
            {selectedPlan !== 'starter' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Team Size</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={users}
                    onChange={(e) => setUsers(e.target.value)}
                    className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="text-center mt-2 text-lg font-bold">{users} users</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    ${calculateTotal()}/mo
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">{Math.ceil(users/10)} licenses</div>
                </div>
              </>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {Object.entries(plans).map(([planKey, plan]) => (
            <motion.div 
              key={planKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: parseInt(planKey) * 0.1 }}
              className={`
                glass p-8 lg:p-10 rounded-3xl hover:shadow-3xl transition-all group relative
                ${plan.popular ? 'ring-4 ring-emerald-200 dark:ring-emerald-800/50 shadow-3xl scale-[1.02]' : ''}
                ${selectedPlan === planKey ? 'ring-4 ring-primary-500 shadow-3xl scale-[1.02]' : ''}
              `}
              onClick={() => setSelectedPlan(planKey)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-2xl font-bold text-sm shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-4">{plan.name}</h3>
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  ${plan.price}<span className="text-3xl">/mo</span>
                </div>
                {planKey === 'starter' ? (
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Forever free</p>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Billed monthly</p>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {features[planKey].map((feature, i) => (
                  <li key={i} className="flex items-center space-x-4 text-left group-hover:translate-x-2 transition-transform">
                    <CheckCircle className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                    <span className="text-lg text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className={`
                  block w-full text-center py-6 px-8 font-bold rounded-2xl transition-all duration-300
                  ${planKey === 'starter' 
                    ? 'border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 text-primary-600 bg-white/50 dark:bg-slate-800/50' 
                    : 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1'
                  }
                  ${plan.popular ? '!bg-gradient-to-r !from-emerald-600 !to-blue-600 !text-white !shadow-2xl' : ''}
                `}
              >
                {planKey === 'starter' ? 'Get Started Free' : 'Choose Plan'}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Contact us for custom enterprise pricing or demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/login"
              className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/companies"
              className="inline-flex items-center px-12 py-6 border-2 border-slate-200 dark:border-slate-700 text-xl font-bold rounded-3xl hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              See Companies →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;

