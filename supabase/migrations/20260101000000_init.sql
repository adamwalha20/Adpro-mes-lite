-- Tables

CREATE TABLE machines (
  id uuid primary key default gen_random_uuid(),
  name text,
  code text,
  status text, -- running, stopped, maintenance
  location text,
  created_at timestamptz default now()
);

CREATE TABLE products (
  id uuid primary key default gen_random_uuid(),
  name text,
  reference text,
  category text,
  created_at timestamptz default now()
);

CREATE TABLE operators (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  created_at timestamptz default now()
);

CREATE TABLE production_sessions (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid references machines(id),
  product_id uuid references products(id),
  operator_id uuid references operators(id),
  lot_number text,
  start_time timestamptz,
  end_time timestamptz,
  quantity_produced numeric,
  waste_quantity numeric,
  efficiency numeric,
  status text,
  created_at timestamptz default now()
);

CREATE TABLE downtime_reasons (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz default now()
);

CREATE TABLE machine_downtimes (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid references machines(id),
  reason_id uuid references downtime_reasons(id),
  start_time timestamptz,
  end_time timestamptz,
  notes text,
  created_at timestamptz default now()
);

CREATE TABLE quality_controls (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid references machines(id),
  product_id uuid references products(id),
  lot_number text,
  result text, -- conforme, non_conforme
  defect_description text,
  created_at timestamptz default now()
);

CREATE TABLE maintenance_records (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid references machines(id),
  maintenance_type text,
  technician text,
  notes text,
  status text, -- ouverte, terminée
  date date,
  created_at timestamptz default now()
);

-- Seed Default Downtime Reasons
INSERT INTO downtime_reasons (name) VALUES 
('Panne mécanique'),
('Manque matière'),
('Coupure électrique'),
('Maintenance'),
('Réglage machine'),
('Autre');
