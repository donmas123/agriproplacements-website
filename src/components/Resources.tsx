import { useEffect, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

interface Resource {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  reading_time: number;
  image_url: string;
}

const fallbackResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding H-2A Visa Costs in 2026',
    excerpt: 'A detailed breakdown of H-2A program costs, from filing fees to transportation, so you can budget effectively for seasonal labor.',
    category: 'Compliance',
    reading_time: 8,
    image_url: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    title: 'Preparing Your Farm for Its First H-2A Season',
    excerpt: 'A step-by-step guide covering housing requirements, timelines, and what to expect when bringing H-2A workers to your farm for the first time.',
    category: 'Getting Started',
    reading_time: 12,
    image_url: 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    title: 'DOL Audit Checklist: Housing Compliance',
    excerpt: 'Ensure your worker housing meets all Department of Labor standards with this comprehensive compliance checklist.',
    category: 'Compliance',
    reading_time: 6,
    image_url: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    title: '5 Strategies to Improve Worker Retention',
    excerpt: 'Learn proven methods to keep your agricultural workforce engaged, productive, and returning season after season.',
    category: 'Best Practices',
    reading_time: 7,
    image_url: 'https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const categoryColors: Record<string, string> = {
  Compliance: 'bg-primary-100 text-primary-700',
  'Getting Started': 'bg-secondary-100 text-secondary-700',
  'Best Practices': 'bg-earth-100 text-earth-700',
};

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>(fallbackResources);
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const { t } = useLang();

  useEffect(() => {
    supabase
      .from('resources')
      .select('id, title, excerpt, category, reading_time, image_url')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(4)
      .then(({ data }) => {
        if (data && data.length > 0) setResources(data);
      });
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t(translations.resources.eyebrow)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900">
            {t(translations.resources.title)}
          </h2>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {resources.map((resource) => (
            <article key={resource.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={resource.image_url}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[resource.category] || 'bg-gray-100 text-gray-700'}`}>
                    {resource.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-earth-500">
                    <Clock className="w-3 h-3" />
                    {resource.reading_time} {t(translations.resources.minRead)}
                  </span>
                </div>
                <h3 className="font-display text-earth-900 mb-2 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-earth-600 line-clamp-3 mb-4">
                  {resource.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                  {t(translations.resources.readMore)}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
