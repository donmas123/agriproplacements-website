/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `full_name` (text, not null) - Name of the person submitting the form
      - `email` (text, not null) - Contact email address
      - `phone` (text) - Optional phone number
      - `company` (text) - Optional company name
      - `service_interest` (text) - Which service they are interested in
      - `message` (text, not null) - The message content
      - `created_at` (timestamptz) - When the submission was created
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert submissions (public contact form)
    - Add policy for authenticated users to read submissions (admin access)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company text DEFAULT '',
  service_interest text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);
