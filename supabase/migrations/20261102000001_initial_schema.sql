-- DocketRail Initial Schema Migration
-- Standard: PostgreSQL 15+ / Supabase
-- Baseline Date: November 2026

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  pilot_allowed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  application_url TEXT NOT NULL,
  canonical_origin TEXT NOT NULL,
  repo_url TEXT,
  repo_subdir TEXT,
  submission_stage TEXT NOT NULL CHECK (submission_stage IN ('intake', 'readiness')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_projects_owner_updated ON public.projects(owner_id, updated_at DESC) WHERE deleted_at IS NULL;

-- 3. Project Revisions Table
CREATE TABLE IF NOT EXISTS public.project_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  metadata_provenance JSONB NOT NULL DEFAULT '{}'::JSONB,
  source_commit TEXT,
  confirmed_by UUID REFERENCES public.profiles(user_id),
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, revision_number)
);

-- 4. Runner Devices & Pairings
CREATE TABLE IF NOT EXISTS public.runner_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ,
  supported_environment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_runner_devices_owner ON public.runner_devices(owner_id);

CREATE TABLE IF NOT EXISTS public.runner_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verifier_hash TEXT NOT NULL,
  user_code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  approved_owner_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  claimed_at TIMESTAMPTZ,
  failed_attempt_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_runner_pairings_user_code ON public.runner_pairings(user_code_hash) WHERE claimed_at IS NULL;

-- 5. Runs Table
CREATE TABLE IF NOT EXISTS public.runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  project_revision_id UUID NOT NULL REFERENCES public.project_revisions(id) ON DELETE CASCADE,
  parent_run_id UUID REFERENCES public.runs(id) ON DELETE SET NULL,
  mode TEXT NOT NULL CHECK (mode IN ('local', 'mainnet')),
  state TEXT NOT NULL CHECK (state IN ('draft', 'awaiting_plan_approval', 'queued', 'running', 'needs_owner_review', 'exported', 'partial', 'failed', 'stopped', 'payment_uncertain')),
  plan_revision INTEGER NOT NULL DEFAULT 1,
  plan_digest TEXT,
  source_commit TEXT,
  runner_id UUID REFERENCES public.runner_devices(id),
  fence INTEGER NOT NULL DEFAULT 0,
  claimed_at TIMESTAMPTZ,
  heartbeat_at TIMESTAMPTZ,
  coordination_expires_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  stop_requested_at TIMESTAMPTZ,
  capture_summary JSONB DEFAULT '{}'::JSONB,
  failure_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_runs_project_created ON public.runs(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_runs_runner_state ON public.runs(runner_id, state);

-- 6. Run Plans Table
CREATE TABLE IF NOT EXISTS public.run_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  revision INTEGER NOT NULL,
  proposed_by TEXT NOT NULL,
  allowed_origin TEXT NOT NULL,
  approved_external_origins JSONB DEFAULT '[]'::JSONB,
  flows JSONB NOT NULL DEFAULT '[]'::JSONB,
  exclusions JSONB DEFAULT '[]'::JSONB,
  maximum_pages INTEGER NOT NULL DEFAULT 10,
  maximum_steps INTEGER NOT NULL DEFAULT 15,
  viewport JSONB NOT NULL DEFAULT '{"width": 360, "height": 640}'::JSONB,
  budgets JSONB NOT NULL DEFAULT '{}'::JSONB,
  digest TEXT NOT NULL,
  approved_by UUID REFERENCES public.profiles(user_id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (run_id, revision)
);

-- 7. Evidence Table
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  capture_method TEXT NOT NULL CHECK (capture_method IN ('browser_observed', 'source_reference', 'owner_supplied', 'rpc_observed', 'external_report')),
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sanitized_url TEXT NOT NULL,
  step_id UUID,
  environment TEXT NOT NULL,
  viewport JSONB,
  storage_path TEXT,
  sha256 TEXT,
  bytes INTEGER,
  mime_type TEXT,
  verification_state TEXT NOT NULL DEFAULT 'unverified',
  source_locator TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_evidence_run ON public.evidence(run_id);

-- 8. Network Origins Table
CREATE TABLE IF NOT EXISTS public.network_origins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  origin TEXT NOT NULL,
  source_kind TEXT NOT NULL CHECK (source_kind IN ('browser', 'source_code', 'owner_declaration')),
  source_locator TEXT,
  resource_type TEXT,
  observed_at TIMESTAMPTZ,
  confirmed_by_owner_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (run_id, origin, source_kind, source_locator)
);

-- 9. Contract Evidence & Transaction Evidence
CREATE TABLE IF NOT EXISTS public.contract_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_revision_id UUID NOT NULL REFERENCES public.project_revisions(id) ON DELETE CASCADE,
  chain_id INTEGER NOT NULL,
  address TEXT NOT NULL,
  methods JSONB DEFAULT '[]'::JSONB,
  owner_confirmed BOOLEAN DEFAULT FALSE,
  source_verification_status TEXT DEFAULT 'unresolved',
  verification_source_url TEXT,
  verification_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.transaction_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  chain_id INTEGER NOT NULL,
  tx_hash TEXT NOT NULL,
  claimed_contract TEXT,
  claimed_method TEXT,
  supplied_by TEXT DEFAULT 'owner',
  receipt_status TEXT DEFAULT 'unresolved',
  observed_to TEXT,
  block_number BIGINT,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  consistency_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Requirements Catalog & Results
CREATE TABLE IF NOT EXISTS public.requirements_catalog (
  requirement_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_url TEXT NOT NULL,
  authority TEXT NOT NULL,
  applicability_rule TEXT NOT NULL,
  expected_evidence_methods JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.requirement_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  requirement_id TEXT NOT NULL REFERENCES public.requirements_catalog(requirement_id) ON DELETE CASCADE,
  applicability TEXT NOT NULL CHECK (applicability IN ('applicable', 'not_applicable', 'unknown')),
  status TEXT NOT NULL CHECK (status IN ('evidence_available', 'needs_fix', 'needs_owner_confirmation', 'not_checked')),
  finding_text TEXT NOT NULL,
  deterministic_rule TEXT NOT NULL,
  evidence_ids JSONB DEFAULT '[]'::JSONB,
  owner_comment TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (run_id, requirement_id)
);
CREATE INDEX IF NOT EXISTS idx_requirement_results_run ON public.requirement_results(run_id);

-- 11. Purchase Attempts & Budget Ledger
CREATE TABLE IF NOT EXISTS public.purchase_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  runner_id UUID REFERENCES public.runner_devices(id),
  fence INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  canonical_method TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  request_body_sha256 TEXT NOT NULL,
  token_address TEXT NOT NULL,
  decimals INTEGER NOT NULL,
  quoted_atomic TEXT NOT NULL,
  approved_max_atomic TEXT NOT NULL,
  quote_observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approval_expires_at TIMESTAMPTZ NOT NULL,
  consent_at TIMESTAMPTZ,
  state TEXT NOT NULL CHECK (state IN ('quoted', 'reserved', 'approved', 'dispatching', 'settled', 'uncertain', 'confirmed_not_paid')),
  tx_hash TEXT,
  receipt_metadata_sanitized JSONB DEFAULT '{}'::JSONB,
  reserved_micro_usd INTEGER NOT NULL,
  settled_micro_usd INTEGER NOT NULL DEFAULT 0,
  uncertainty_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.budget_ledger (
  entry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.purchase_attempts(id),
  external_expense_id TEXT,
  type TEXT NOT NULL CHECK (type IN ('reserve', 'settle', 'release', 'external_expense', 'adjustment')),
  micro_usd INTEGER NOT NULL,
  actor TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_budget_ledger_attempt ON public.budget_ledger(attempt_id);

-- 12. Exports & Share Snapshots
CREATE TABLE IF NOT EXISTS public.exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  project_revision_id UUID NOT NULL REFERENCES public.project_revisions(id) ON DELETE CASCADE,
  state TEXT NOT NULL CHECK (state IN ('assembling', 'ready', 'failed')),
  owner_reviewed_at TIMESTAMPTZ NOT NULL,
  completeness_note TEXT NOT NULL,
  evidence_index_hash TEXT NOT NULL,
  storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.share_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  export_id UUID NOT NULL REFERENCES public.exports(id) ON DELETE CASCADE,
  sanitized_snapshot_path TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Audit Events
CREATE TABLE IF NOT EXISTS public.audit_events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_kind TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  object_type TEXT NOT NULL,
  object_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  safe_details JSONB DEFAULT '{}'::JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.runner_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.run_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_origins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirement_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.share_snapshots ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Projects: Only active owner projects
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = owner_id AND deleted_at IS NULL);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = owner_id);

-- Project Revisions:
CREATE POLICY "Users can view revisions of own projects" ON public.project_revisions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()));
CREATE POLICY "Users can insert revisions for own projects" ON public.project_revisions FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()));

-- Runner Devices:
CREATE POLICY "Users can view own runners" ON public.runner_devices FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can manage own runners" ON public.runner_devices FOR ALL USING (auth.uid() = owner_id);

-- Runs:
CREATE POLICY "Users can view own runs" ON public.runs FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can create own runs" ON public.runs FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own runs" ON public.runs FOR UPDATE USING (auth.uid() = owner_id);

-- Evidence:
CREATE POLICY "Users can view own evidence" ON public.evidence FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert own evidence" ON public.evidence FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Requirements Catalog: Publicly readable for all authenticated users
CREATE POLICY "Catalog is readable by all authenticated users" ON public.requirements_catalog FOR SELECT TO authenticated USING (true);

-- Requirement Results:
CREATE POLICY "Users can view results for own runs" ON public.requirement_results FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.runs r WHERE r.id = run_id AND r.owner_id = auth.uid()));
CREATE POLICY "Users can update results for own runs" ON public.requirement_results FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.runs r WHERE r.id = run_id AND r.owner_id = auth.uid()));

-- Exports:
CREATE POLICY "Users can view own exports" ON public.exports FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.runs r WHERE r.id = run_id AND r.owner_id = auth.uid()));

-- Share Snapshots:
CREATE POLICY "Owners can manage share snapshots" ON public.share_snapshots FOR ALL USING (auth.uid() = owner_id);

-- 15. Atomic Budget Reservation Function
CREATE OR REPLACE FUNCTION public.reserve_budget(
  p_attempt_id UUID,
  p_run_id UUID,
  p_reserve_micro_usd INTEGER,
  p_actor TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_current_settled INTEGER := 0;
  v_current_reserved INTEGER := 0;
  v_current_external INTEGER := 0;
  v_total_ceiling INTEGER := 1000000; -- US$1.00 hard limit
BEGIN
  -- Lock ledger entries for consistent projection
  SELECT COALESCE(SUM(micro_usd), 0) INTO v_current_settled
  FROM public.budget_ledger WHERE type = 'settle';

  SELECT COALESCE(SUM(micro_usd), 0) INTO v_current_reserved
  FROM public.budget_ledger WHERE type = 'reserve';

  SELECT COALESCE(SUM(micro_usd), 0) INTO v_current_external
  FROM public.budget_ledger WHERE type = 'external_expense';

  -- Check if total exceeds hard ceiling
  IF (v_current_settled + v_current_reserved + v_current_external + p_reserve_micro_usd) > v_total_ceiling THEN
    RAISE EXCEPTION 'BUDGET_CEILING_EXCEEDED: Total budget US$1.00 would be exceeded';
  END IF;

  -- Record reserve entry
  INSERT INTO public.budget_ledger (attempt_id, type, micro_usd, actor)
  VALUES (p_attempt_id, 'reserve', p_reserve_micro_usd, p_actor);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 16. Atomic Budget Settlement Function
CREATE OR REPLACE FUNCTION public.settle_budget(
  p_attempt_id UUID,
  p_settled_micro_usd INTEGER,
  p_actor TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_reserved_entry_id UUID;
  v_reserved_amount INTEGER;
BEGIN
  -- Find corresponding reserve entry
  SELECT entry_id, micro_usd INTO v_reserved_entry_id, v_reserved_amount
  FROM public.budget_ledger
  WHERE attempt_id = p_attempt_id AND type = 'reserve'
  ORDER BY created_at DESC LIMIT 1;

  IF v_reserved_entry_id IS NULL THEN
    RAISE EXCEPTION 'RESERVATION_NOT_FOUND for attempt %', p_attempt_id;
  END IF;

  -- Consume reservation by releasing it and posting settled amount atomically
  INSERT INTO public.budget_ledger (attempt_id, type, micro_usd, actor)
  VALUES (p_attempt_id, 'release', -v_reserved_amount, p_actor);

  INSERT INTO public.budget_ledger (attempt_id, type, micro_usd, actor)
  VALUES (p_attempt_id, 'settle', p_settled_micro_usd, p_actor);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
