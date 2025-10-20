CREATE TABLE public.compendium_uploads (
    sheetName text PRIMARY KEY,
    data jsonb,
    timestamp timestamptz DEFAULT now()
);

-- Optional: Add RLS policies if you need to control access to this table
-- For example, to allow all authenticated users to insert/update:
-- ALTER TABLE public.compendium_uploads ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow authenticated users to manage compendium uploads" ON public.compendium_uploads
--   FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
