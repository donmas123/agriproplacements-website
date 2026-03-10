/*
  # Create testimonials and FAQs tables

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier
      - `quote` (text, not null) - The testimonial quote
      - `author_name` (text, not null) - Name of the person giving testimonial
      - `author_role` (text) - Role/title of the person
      - `farm_name` (text) - Name of the farm or company
      - `region` (text) - Geographic region
      - `display_order` (integer) - Order to display testimonials
      - `is_active` (boolean) - Whether to show this testimonial
      - `created_at` (timestamptz) - Creation timestamp
    - `faqs`
      - `id` (uuid, primary key) - Unique identifier
      - `question` (text, not null) - The FAQ question
      - `answer` (text, not null) - The FAQ answer
      - `display_order` (integer) - Order to display FAQs
      - `is_active` (boolean) - Whether to show this FAQ
      - `created_at` (timestamptz) - Creation timestamp
  2. Security
    - Enable RLS on both tables
    - Allow anonymous users to read active testimonials and FAQs
    - Allow authenticated users full read access
  3. Seed Data
    - Insert default testimonials and FAQs
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author_name text NOT NULL,
  author_role text DEFAULT '',
  farm_name text DEFAULT '',
  region text DEFAULT '',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active FAQs"
  ON faqs
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all FAQs"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

INSERT INTO testimonials (quote, author_name, author_role, farm_name, region, display_order) VALUES
  ('Agri Pro Placements transformed our seasonal hiring. Their H-2A expertise saved us weeks of paperwork and we had workers on-site right on schedule. The compliance support alone is worth every penny.', 'Robert Mitchell', 'Operations Manager', 'Mitchell Family Farms', 'Southeast Arkansas', 1),
  ('We switched to Agri Pro after struggling with another agency for two seasons. The difference is night and day. Their bilingual team keeps communication smooth and our workers are happier and more productive.', 'Maria Gonzalez', 'Farm Owner', 'Gonzalez Orchards', 'Central California', 2),
  ('As a mid-size operation, we needed a staffing partner who understood our specific crop needs. Agri Pro matched us with experienced workers who hit the ground running. Outstanding service from start to finish.', 'James Whitfield', 'General Manager', 'Whitfield Produce Co.', 'Eastern North Carolina', 3),
  ('The compliance management alone justifies working with Agri Pro. They handled our DOL audit preparation flawlessly, and we passed with zero findings. Their attention to detail is remarkable.', 'David Chen', 'VP of Operations', 'Pacific Coast Agriculture', 'Oregon', 4),
  ('Finding reliable seasonal labor used to be our biggest headache. Agri Pro has consistently delivered vetted, skilled workers for three seasons now. They are an extension of our team.', 'Sarah Thompson', 'Owner', 'Thompson Berry Farm', 'Washington State', 5);

INSERT INTO faqs (question, answer, display_order) VALUES
  ('What is the H-2A visa program?', 'The H-2A visa program allows U.S. employers who anticipate a shortage of domestic workers to bring foreign nationals to the U.S. to perform temporary or seasonal agricultural labor. The program is administered by the Department of Labor (DOL) and U.S. Citizenship and Immigration Services (USCIS).', 1),
  ('How far in advance should we start the H-2A application process?', 'We recommend beginning the process at least 75-90 days before your anticipated need date. This accounts for DOL processing of the Temporary Labor Certification, USCIS petition adjudication, and consular visa appointment scheduling. Starting early gives us room to handle any unexpected delays.', 2),
  ('What are the employer obligations under the H-2A program?', 'Employers must provide free housing that meets federal and state standards, pay for inbound and outbound transportation, guarantee work for at least 75% of the contract period (the "three-fourths guarantee"), pay the Adverse Effect Wage Rate (AEWR) or prevailing wage (whichever is higher), and provide workers compensation insurance.', 3),
  ('How much does it cost to use Agri Pro Placements?', 'Our fee structure is transparent and competitive. Costs vary based on the number of workers, contract duration, and services required. We provide detailed quotes during our initial consultation so there are no surprises. Contact us for a free, no-obligation estimate tailored to your operation.', 4),
  ('Can you help if we have never used the H-2A program before?', 'We work with first-time H-2A employers regularly. Our team guides you through every step from initial consultation through worker arrival. We handle all documentation, compliance requirements, and government coordination so you can focus on preparing for your season.', 5),
  ('What types of agricultural work does the H-2A program cover?', 'The H-2A program covers a wide range of agricultural activities including planting, cultivating, harvesting, livestock care, and food processing performed on a farm. The work must be temporary or seasonal in nature. We can help you determine if your specific operation qualifies.', 6),
  ('Do you provide support after workers arrive?', 'Yes, our service extends throughout the entire work season. We provide ongoing compliance monitoring, bilingual communication support, issue resolution, and are available to address any concerns from both employers and workers. We believe successful placements require continuous support.', 7);
