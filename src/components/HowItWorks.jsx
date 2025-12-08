import { motion } from "framer-motion";
import {
  LuUserPlus,
  LuBookOpen,
  LuGraduationCap,
} from "react-icons/lu";

const steps = [
  { id: 1, title: "Create an Account", desc: "Join as student, tutor or guardian", icon: <LuUserPlus size={28} /> },
  { id: 2, title: "Post Tuition / Apply", desc: "Find the perfect match", icon: <LuBookOpen size={28} /> },
  { id: 3, title: "Start Learning", desc: "Connect and begin your journey", icon: <LuGraduationCap size={28} /> },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        How The Platform Works
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: s.id * 0.2 }}
            className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow flex flex-col items-center text-center hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              {s.icon}
            </div>

            <h3 className="font-semibold text-xl mb-2 text-[var(--text-primary)]">
              {s.title}
            </h3>

            <p className="text-[var(--text-secondary)]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
