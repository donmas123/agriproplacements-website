import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const fallbackFaqs: FAQItem[] = [
  { id: '1', question: 'What is the H-2A visa program?', answer: 'The H-2A visa program allows U.S. employers who anticipate a shortage of domestic workers to bring foreign nationals to the U.S. to perform temporary or seasonal agricultural labor.' },
  { id: '2', question: 'How far in advance should we start the H-2A application process?', answer: 'We recommend beginning the process at least 75-90 days before your anticipated need date.' },
  { id: '3', question: 'What are the employer obligations under the H-2A program?', answer: 'Employers must provide free housing, pay for transportation, guarantee work for at least 75% of the contract period, and pay the Adverse Effect Wage Rate or prevailing wage.' },
  { id: '4', question: 'How much does it cost to use Agri Pro Placements?', answer: 'Our fee structure is transparent and competitive. We provide detailed quotes during our initial consultation.' },
];

function AccordionItem({ item, isOpen, onToggle, index, visible }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`border border-gray-100 rounded-xl overflow-hidden transition-all duration-500 ${
        isOpen ? 'shadow-md shadow-primary-50 border-primary-200' : 'hover:border-gray-200'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : '0ms' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-medium transition-colors duration-200 ${isOpen ? 'text-primary-700' : 'text-earth-900'}`}>
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-primary-600' : 'text-earth-400'
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <p className="text-earth-600 leading-relaxed text-sm">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFaqs);
  const [openId, setOpenId] = useState<string | null>(null);
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.3 });
  const { ref: listRef, isInView: listVisible } = useInView({ threshold: 0.1 });

  useEffect(() => {
    supabase
      .from('faqs')
      .select('id, question, answer')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setFaqs(data);
      });
  }, []);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t(translations.faq.eyebrow)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900 mb-4">
            {t(translations.faq.title)}
          </h2>
          <p className="text-lg text-earth-600 leading-relaxed">
            {t(translations.faq.description)}
          </p>
        </div>

        <div ref={listRef} className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              index={idx}
              visible={listVisible}
            />
          ))}
        </div>

        <div
          className={`mt-10 text-center transition-all duration-700 delay-300 ${
            listVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-earth-600 text-sm">
            {t(translations.faq.footerText)}{' '}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {t(translations.faq.footerCta)}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
