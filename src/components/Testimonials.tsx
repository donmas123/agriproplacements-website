import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  star_rating: number;
  review_source: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Donovan has been great to work with. He explained the process and has been very good to keep us updated. I definitely recommend.',
    author_name: 'Patti Jones',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
  {
    id: '2',
    quote: 'Donovan goes above and beyond to help the farmers get the necessary labor. He starts the process early so that you aren\'t stressing at the last minute. He fully understands the process from both sides. It helps having someone locally to go to with any questions. He is very professional and I would highly recommend him to anyone in need.',
    author_name: 'Misty Currier',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
  {
    id: '3',
    quote: 'Donovan made the process extremely easy. He helped me sort through the applications and pick the best matches for what I was needing. He completely took care of everything for me. Would highly recommend!',
    author_name: 'Greg Fields',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
  {
    id: '4',
    quote: 'From the word go, I received excellent service, I was kept up to date with where the process was at all time and was promptly helped with any questions. Thank you to Donovan and his team.',
    author_name: 'Deon Struckel',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
  {
    id: '5',
    quote: 'Donovan did an excellent job with the hiring process for our company, and I would highly recommend his services!',
    author_name: 'Josh Green',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
  {
    id: '6',
    quote: 'Donovan went above and beyond helping get through the process of getting an H2A worker here.',
    author_name: 'Tyler Parker',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
  {
    id: '7',
    quote: 'Awesome and easy company to work with!!',
    author_name: 'John Kelley',
    author_role: 'Google Review',
    star_rating: 5,
    review_source: 'google',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'bg-primary-100 text-primary-700',
    'bg-teal-100 text-teal-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-sky-100 text-sky-700',
    'bg-emerald-100 text-emerald-700',
    'bg-orange-100 text-orange-700',
  ];

  const colorIndex =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${colors[colorIndex]}`}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const { t: tr } = useLang();
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const pendingRef = useRef<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('id, quote, author_name, author_role, star_rating, review_source')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setTestimonials(data as Testimonial[]);
      });
  }, []);

  const transitionTo = useCallback((index: number) => {
    setFading(true);
    pendingRef.current = index;
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
      pendingRef.current = null;
    }, 300);
  }, []);

  const next = useCallback(() => {
    transitionTo((current + 1) % testimonials.length);
  }, [current, testimonials.length, transitionTo]);

  const prev = useCallback(() => {
    transitionTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, testimonials.length, transitionTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];
  const avgRating =
    testimonials.reduce((sum, r) => sum + (r.star_rating || 5), 0) /
    testimonials.length;

  return (
    <section className="py-24 lg:py-32 bg-earth-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {tr(translations.testimonials.eyebrow)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900 mb-6">
            {tr(translations.testimonials.title)}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <GoogleIcon />
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm font-medium text-earth-700">
                {avgRating.toFixed(1)} out of 5
              </span>
            </div>
            <span className="text-sm text-earth-500">
              ({testimonials.length} reviews)
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 lg:p-16">
            <div
              className={`transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="flex justify-center mb-6">
                <StarRating rating={t.star_rating || 5} />
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-earth-800 leading-relaxed font-light mb-8 min-h-[100px] text-center">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <AuthorAvatar name={t.author_name} />
                <div className="text-left">
                  <p className="font-display text-base text-earth-900">
                    {t.author_name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <GoogleIcon />
                    <p className="text-xs text-earth-500">{t.author_role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-earth-600 hover:text-primary-700 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => transitionTo(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current
                      ? 'w-8 bg-primary-600'
                      : 'w-2 bg-earth-200 hover:bg-earth-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2.5 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-earth-600 hover:text-primary-700 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
