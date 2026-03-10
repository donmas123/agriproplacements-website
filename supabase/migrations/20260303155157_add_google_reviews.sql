/*
  # Add Google reviews to testimonials

  1. Schema Changes
    - Add `star_rating` column (integer, 1-5) to `testimonials` table
    - Add `review_source` column (text) to track where reviews came from

  2. Data Changes
    - Remove old placeholder testimonials
    - Insert 7 real Google reviews from verified customers

  3. Important Notes
    - All reviews are 5-star ratings from Google
    - Duplicate review from Josh Green is included only once
    - Reviews are ordered by display_order
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'star_rating'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN star_rating integer DEFAULT 5;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'review_source'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN review_source text DEFAULT 'google';
  END IF;
END $$;

DELETE FROM testimonials;

INSERT INTO testimonials (quote, author_name, author_role, star_rating, review_source, display_order, is_active) VALUES
  (
    'Donovan has been great to work with. He explained the process and has been very good to keep us updated. I definitely recommend.',
    'Patti Jones',
    'Google Review',
    5,
    'google',
    1,
    true
  ),
  (
    'Donovan goes above and beyond to help the farmers get the necessary labor. He starts the process early so that you aren''t stressing at the last minute. He fully understands the process from both sides. It helps having someone locally to go to with any questions. He is very professional and I would highly recommend him to anyone in need.',
    'Misty Currier',
    'Google Review',
    5,
    'google',
    2,
    true
  ),
  (
    'Donovan made the process extremely easy. He helped me sort through the applications and pick the best matches for what I was needing. He completely took care of everything for me. Would highly recommend!',
    'Greg Fields',
    'Google Review',
    5,
    'google',
    3,
    true
  ),
  (
    'From the word go, I received excellent service, I was kept up to date with where the process was at all time and was promptly helped with any questions. Thank you to Donovan and his team.',
    'Deon Struckel',
    'Google Review',
    5,
    'google',
    4,
    true
  ),
  (
    'Donovan did an excellent job with the hiring process for our company, and I would highly recommend his services!',
    'Josh Green',
    'Google Review',
    5,
    'google',
    5,
    true
  ),
  (
    'Donovan went above and beyond helping get through the process of getting an H2A worker here.',
    'Tyler Parker',
    'Google Review',
    5,
    'google',
    6,
    true
  ),
  (
    'Awesome and easy company to work with!!',
    'John Kelley',
    'Google Review',
    5,
    'google',
    7,
    true
  );