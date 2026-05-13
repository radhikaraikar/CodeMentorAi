import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBolt, FaArrowRight, FaCode, FaPlay } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import FeatureCard from '../components/cards/FeatureCard';
import { features } from '../data/features';

const supportedLanguages = [
  { name: 'Python', icon: '🐍', color: 'from-blue-500/20 to-yellow-500/20 border-blue-500/30' },
  { name: 'JavaScript', icon: '🟨', color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30' },
  { name: 'Java', icon: '☕', color: 'from-red-500/20 to-orange-500/20 border-red-500/30' },
  { name: 'C++', icon: '🔷', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  { name: 'C', icon: '🔵', color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30' },
  { name: 'HTML', icon: '🌐', color: 'from-orange-500/20 to-red-500/20 border-orange-500/30' },
  { name: 'CSS', icon: '🎨', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
  { name: 'SQL', icon: '🗄️', color: 'from-green-500/20 to-teal-500/20 border-green-500/30' },
];

const steps = [
  { step: '01', title: 'Paste Your Code', desc: 'Type or paste your code into the Monaco editor, or upload a file directly.', icon: '📋' },
  { step: '02', title: 'Select Language', desc: 'Choose the programming language from our supported languages dropdown.', icon: '🌐' },
  { step: '03', title: 'Choose Action', desc: 'Pick from Explain, Debug, Optimize, or Generate Viva Questions.', icon: '⚡' },
  { step: '04', title: 'Get AI Explanation', desc: 'Receive detailed, structured AI-powered analysis within seconds.', icon: '🤖' },
];

const benefits = [
  { title: 'For Beginners', desc: 'Understand complex code with simple, plain-English explanations tailored for new learners.', icon: '🌱' },
  { title: 'Engineering Students', desc: 'Ace your assignments and lab exams with detailed code walkthroughs and concept explanations.', icon: '🎓' },
  { title: 'Viva Preparation', desc: 'Generate exam-ready questions and answers from your own code to prepare for oral exams.', icon: '📚' },
  { title: 'Debugging Help', desc: 'Find and fix bugs faster with AI-powered error detection and corrected code suggestions.', icon: '🔍' },
  { title: 'Placement Prep', desc: 'Understand time/space complexity and best practices to crack technical interviews.', icon: '💼' },
  { title: 'Code Optimization', desc: 'Learn how to write cleaner, faster, and more efficient code with AI suggestions.', icon: '🚀' },
];

const fakeCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) 
       + fibonacci(n-2);
}
console.log(fibonacci(10));`;

const fakeExplanation = `**Simple Summary**
This function calculates the nth 
Fibonacci number using recursion.

**Time Complexity:** O(2^n)
**Space Complexity:** O(n)

**Key Concepts:** Recursion, 
Base Case, Call Stack`;

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600 blob opacity-10" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 blob blob-delay-2 opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600 blob blob-delay-4 opacity-5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                  <FaBolt className="w-3.5 h-3.5" />
                  AI-Powered Code Explainer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Understand Any Code{' '}
                <span className="gradient-text">Instantly</span>{' '}
                with AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Paste your code and get simple line-by-line explanations, debugging help,
                optimization tips, and viva questions within seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/explain"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-neon hover:shadow-neon-purple"
                >
                  <FaPlay className="w-4 h-4" />
                  Start Explaining
                </Link>
                <Link
                  to="/viva"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold hover:border-indigo-500 hover:text-white transition-all duration-200"
                >
                  <FaCode className="w-4 h-4" />
                  Generate Viva Questions
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 mt-10"
              >
                {[
                  { label: 'Languages', value: '12+' },
                  { label: 'Features', value: '8+' },
                  { label: 'Free to Use', value: '100%' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-slate-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Code Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="animate-float hidden lg:block"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

                <div className="relative glass rounded-3xl border border-indigo-500/20 overflow-hidden shadow-glass">
                  {/* Editor header */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 border-b border-slate-700/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-slate-500 text-xs ml-2 font-mono">fibonacci.js</span>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">JavaScript</span>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-slate-700/50">
                    {/* Code */}
                    <div className="p-5 bg-[#0d1117]">
                      <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                        <span className="text-purple-400">function </span>
                        <span className="text-blue-400">fibonacci</span>
                        <span className="text-slate-300">(n) {'{'}</span>
                        {'\n'}
                        <span className="text-slate-300">  </span>
                        <span className="text-purple-400">if </span>
                        <span className="text-slate-300">(n {'<='} 1) </span>
                        <span className="text-purple-400">return </span>
                        <span className="text-slate-300">n;</span>
                        {'\n'}
                        <span className="text-slate-300">  </span>
                        <span className="text-purple-400">return </span>
                        <span className="text-blue-400">fibonacci</span>
                        <span className="text-slate-300">(n-1)</span>
                        {'\n'}
                        <span className="text-slate-300">       + </span>
                        <span className="text-blue-400">fibonacci</span>
                        <span className="text-slate-300">(n-2);</span>
                        {'\n'}
                        <span className="text-slate-300">{'}'}</span>
                        {'\n'}
                        <span className="text-yellow-400">console</span>
                        <span className="text-slate-300">.</span>
                        <span className="text-blue-400">log</span>
                        <span className="text-slate-300">(</span>
                        <span className="text-blue-400">fibonacci</span>
                        <span className="text-slate-300">(10));</span>
                      </pre>
                    </div>

                    {/* AI Output */}
                    <div className="p-5 bg-slate-900/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span className="text-xs">🤖</span>
                        </div>
                        <span className="text-indigo-400 text-xs font-medium">AI Analysis</span>
                        <div className="ml-auto flex gap-1">
                          {[0,1,2].map(i => (
                            <motion.div key={i} animate={{ opacity: [0.3,1,0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i*0.3 }}
                              className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                        <p><span className="text-indigo-400 font-medium">Summary:</span> Calculates nth Fibonacci number using recursion.</p>
                        <p><span className="text-cyan-400 font-medium">Time:</span> O(2^n) exponential</p>
                        <p><span className="text-green-400 font-medium">Space:</span> O(n) stack depth</p>
                        <p><span className="text-yellow-400 font-medium">Concepts:</span> Recursion, Base Case</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="✨ Features"
            title="Everything You Need to Understand Code"
            subtitle="Powerful AI tools designed specifically for students and developers learning to code."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {features.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="🔄 How It Works"
            title="Get Code Explanations in 4 Simple Steps"
            subtitle="From pasting code to getting AI-powered insights — it takes less than 30 seconds."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-500/50 to-transparent z-10" />
                )}
                <div className="glass rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <div className="text-indigo-400 text-xs font-bold mb-2 font-mono">STEP {step.step}</div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="🌐 Languages"
            title="Supports All Major Programming Languages"
            subtitle="From web development to systems programming — we've got you covered."
          />
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {supportedLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br ${lang.color} border backdrop-blur-sm cursor-default`}
              >
                <span className="text-2xl">{lang.icon}</span>
                <span className="text-white font-semibold">{lang.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="🎓 For Students"
            title="Built for Students, by Developers"
            subtitle="Whether you're a beginner or preparing for placements, CodeMentor AI has you covered."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass rounded-3xl p-12 border border-indigo-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="relative">
              <div className="text-5xl mb-6">⚡</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Understand Your Code?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of students using CodeMentor AI to learn faster, debug smarter, and ace their exams.
              </p>
              <Link
                to="/explain"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-neon hover:shadow-neon-purple"
              >
                Start for Free
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
