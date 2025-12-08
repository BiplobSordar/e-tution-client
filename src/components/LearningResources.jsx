import { motion } from "framer-motion";

const resources = [
  { id: 1, title: "Top Tips for Exam Preparation", author: "Admin", desc: "Learn effective strategies to excel in exams." },
  { id: 2, title: "How to Choose the Right Tutor", author: "Admin", desc: "A complete guide for students and guardians." },
  { id: 3, title: "Time Management for Students", author: "Admin", desc: "Plan your study schedule efficiently." },
];

const LearningResources = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        Learning Resources
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resources.map((r, idx) => (
          <motion.div
            key={r.id}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col"
          >
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">{r.title}</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">{r.desc}</p>
            <span className="text-[var(--text-primary)] font-medium text-sm">By {r.author}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LearningResources;
