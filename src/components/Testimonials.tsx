import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Harikos fundamentally transformed our operational pipeline. Their AI integration reduced our manual data processing time by over 70%, allowing our team to focus on strategic initiatives rather than repetitive tasks.",
      author: "Sarah Chen",
      role: "Chief Operations Officer",
      company: "Nexus Logistics"
    },
    {
      quote: "The precision and reliability of the custom AI models built by the Harikos team exceeded our expectations. The implementation was seamless, and the security of our sensitive data was handled perfectly.",
      author: "David Thorne",
      role: "VP of Engineering",
      company: "Acme FinTech"
    },
    {
      quote: "Working with Harikos feels like partnering with a team from the future. They didn't just automate our workflows; they completely reimagined how our customer success team interacts with our clients.",
      author: "Elena Rodriguez",
      role: "Head of Customer Experience",
      company: "Stratos Health"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05]">
      
      {/* Header */}
      <div className="max-w-2xl mb-16 md:mb-24">
        <span className="font-mono text-xs text-brand-gray-400 uppercase tracking-widest block mb-4">
          [ Partner Success ]
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white mb-6">
          Trusted by industry leaders.
        </h2>
        <p className="font-sans text-brand-gray-400 font-light leading-relaxed text-sm sm:text-base">
          Our solutions drive tangible business outcomes. Hear directly from the engineering and operations leaders who have deployed our AI systems.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-8 rounded-2xl border border-brand-white/[0.05] bg-brand-black/40 backdrop-blur-xl relative overflow-hidden group hover:border-brand-white/[0.12] hover:bg-brand-white/[0.01] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Subtle top light effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div>
              <Quote className="w-8 h-8 text-brand-white/[0.15] mb-6" />
              <p className="font-sans text-sm sm:text-base text-brand-gray-300 font-light leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-6 border-t border-brand-white/[0.05]">
              <div className="w-10 h-10 rounded-full bg-brand-white/[0.05] border border-brand-white/[0.1] flex items-center justify-center">
                <span className="font-display font-bold text-sm text-brand-white">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-brand-white">{testimonial.author}</h4>
                <p className="font-mono text-[10px] text-brand-gray-500 tracking-wider">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
