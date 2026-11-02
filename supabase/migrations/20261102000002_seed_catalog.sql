-- DocketRail Requirements Catalog Seed
-- Baseline: MiniPay official guidelines (S07, S08, S09, S10)

INSERT INTO public.requirements_catalog (
  requirement_id, title, description, source_id, source_url, authority, applicability_rule, expected_evidence_methods
) VALUES
  (
    'REQ-HTTPS-ONLY',
    'Application is served exclusively over public HTTPS',
    'Target app must use HTTPS with valid certificates without mixed content or insecure endpoints.',
    'S07',
    'https://docs.celo.org/developer/minipay',
    'primary_documentation',
    'All MiniPay submissions',
    '["browser_observed"]'::JSONB
  ),
  (
    'REQ-VIEWPORT-RESPONSIVE',
    'Mobile viewport 360x640 rendered without horizontal overflow',
    'Container must render properly on 360x640 mobile viewports without clipped text, scroll overlap or horizontal overflow.',
    'S10',
    'https://docs.celo.org/developer/minipay/build/ui',
    'official_reference',
    'All MiniPay submissions',
    '["browser_observed"]'::JSONB
  ),
  (
    'REQ-SUPPORT-LEGAL-LINKS',
    'Reachable support and privacy/terms documentation links',
    'Clear accessible links to support contact, privacy policy, and terms of service that return HTTP 200.',
    'S07',
    'https://docs.celo.org/developer/minipay',
    'primary_documentation',
    'All MiniPay submissions',
    '["browser_observed", "source_reference", "owner_supplied"]'::JSONB
  ),
  (
    'REQ-ORIGIN-INVENTORY',
    'Complete inventory of runtime network origins and external connections',
    'All external domains, APIs, and WebSockets called by the application must be declared and documented.',
    'S07',
    'https://docs.celo.org/developer/minipay',
    'primary_documentation',
    'All MiniPay submissions',
    '["browser_observed", "source_reference", "owner_supplied"]'::JSONB
  ),
  (
    'REQ-NO-CONSOLE-CRITICAL-ERRORS',
    'No critical runtime unhandled exceptions or 4xx/5xx core asset failures',
    'Primary navigation paths and asset loading must not encounter 404/500 errors or unhandled application crashes.',
    'S07',
    'https://docs.celo.org/developer/minipay',
    'primary_documentation',
    'All MiniPay submissions',
    '["browser_observed"]'::JSONB
  ),
  (
    'REQ-CHAIN-ID-CELO',
    'Target contracts and transactions target Celo Mainnet (Chain ID 42220)',
    'On-chain interactions must operate on Celo Mainnet with verified chain ID checks.',
    'S08',
    'https://github.com/celo-org/celopedia-skills/blob/main/skills/celopedia-skill/references/minipay-requirements.md',
    'official_reference',
    'Applications with on-chain interactions',
    '["rpc_observed", "source_reference", "owner_supplied"]'::JSONB
  ),
  (
    'REQ-WALLET-PHYSICAL-TESTED',
    'MiniPay physical device wallet flow test evidence',
    'Physical device test logs or screenshots demonstrating wallet connection and transaction approvals.',
    'S09',
    'https://docs.celo.org/developer/minipay/build/testing',
    'official_reference',
    'Applications requiring wallet connection',
    '["owner_supplied"]'::JSONB
  ),
  (
    'REQ-METADATA-CONSISTENCY',
    'App name, icon, and description match manifest and listing declarations',
    'Application metadata provided to MiniPay matches the deployed page titles, branding, and manifest.',
    'S07',
    'https://docs.celo.org/developer/minipay',
    'primary_documentation',
    'All MiniPay submissions',
    '["browser_observed", "source_reference", "owner_supplied"]'::JSONB
  )
ON CONFLICT (requirement_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  source_id = EXCLUDED.source_id,
  source_url = EXCLUDED.source_url,
  authority = EXCLUDED.authority,
  applicability_rule = EXCLUDED.applicability_rule,
  expected_evidence_methods = EXCLUDED.expected_evidence_methods;
