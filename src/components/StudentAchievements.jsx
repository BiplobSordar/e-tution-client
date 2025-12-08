import { motion } from "framer-motion";

const achievements = [
  { id: 1, name: "Sadia", achievement: "A+ in SSC", img: "https://i.pravatar.cc/100?img=8" },
  { id: 2, name: "Nusaib", achievement: "Top in Math Olympiad", img: "https://i.pravatar.cc/100?img=9" },
  { id: 3, name: "Arif", achievement: "Science Fair Winner", img: "https://i.pravatar.cc/100?img=10" },
  { id: 4, name: "Rahim", achievement: "Best in English Debate", img: "https://i.pravatar.cc/100?img=11" },
  { id: 5, name: "Nadia", achievement: "Top in Programming Contest", img: "https://i.pravatar.cc/100?img=12" },
  { id: 6, name: "Fahim", achievement: "Gold Medal in Olympiad", img: "https://i.pravatar.cc/100?img=13" },
];

const StudentAchievements = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        Student Achievements
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((s, idx) => (
          <motion.div
            key={s.id}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] shadow flex flex-col items-center text-center hover:shadow-lg transition-all"
          >
            <img
              src={s.img}
              alt={s.name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="font-semibold text-[var(--text-primary)]">{s.name}</h3>
            <p className="text-[var(--text-secondary)] mt-1">{s.achievement}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StudentAchievements;
