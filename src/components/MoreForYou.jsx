import { motion } from "framer-motion";
import {
  LuUserPlus,
  LuBookOpen,
  LuLifeBuoy,
} from "react-icons/lu";

const features = [
  { title: "Become a Tutor", desc: "Start earning instantly.", icon: <LuUserPlus size={28} /> },
  { title: "Find Tuition", desc: "Get matched with students.", icon: <LuBookOpen size={28} /> },
  { title: "Support Center", desc: "We’re here to help.", icon: <LuLifeBuoy size={28} /> },
];

const MoreForYou = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        More For You
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] shadow flex flex-col items-center text-center hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              {f.icon}
            </div>

            <h3 className="font-semibold text-lg text-[var(--text-primary)]">{f.title}</h3>
            <p className="text-[var(--text-secondary)] mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MoreForYou;
