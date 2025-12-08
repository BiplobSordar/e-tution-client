import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuZap,
  LuLock,
  LuMessageCircle,
} from "react-icons/lu";

const items = [
  { title: "Verified Tutors", desc: "Every profile is manually checked.", icon: <LuShieldCheck size={28} /> },
  { title: "Smart Matching", desc: "Find the right tutor easily.", icon: <LuZap size={28} /> },
  { title: "Secure Platform", desc: "Your data stays protected.", icon: <LuLock size={28} /> },
  { title: "Easy Communication", desc: "Chat & connect instantly.", icon: <LuMessageCircle size={28} /> },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        Why Choose Us
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--border)] shadow flex flex-col items-center text-center hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg text-[var(--text-primary)]">{item.title}</h3>
            <p className="text-[var(--text-secondary)] mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
