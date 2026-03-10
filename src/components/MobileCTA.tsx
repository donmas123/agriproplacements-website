import { useEffect, useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    const contact = document.getElementById('contact');
    let heroVisible = true;
    let contactVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'home') heroVisible = entry.isIntersecting;
          if (entry.target.id === 'contact') contactVisible = entry.isIntersecting;
        });
        setVisible(!heroVisible && !contactVisible);
      },
      { threshold: 0.1 }
    );

    if (hero) observer.observe(hero);
    if (contact) observer.observe(contact);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex gap-3">
        <a
          href="tel:+18703019200"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-earth-800 text-white text-sm font-semibold"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
