# Interactive Demo Notes

## Repositories reviewed

The demo experience was informed by the structures and workflows found in:

- `msjsapsheetreport` — production reporting, yield, OEE, waste, order performance, and SAP-connected analytics
- `msjsapclone` — queue-based cloning, source configuration, progress monitoring, checkpoints, retries, history, and SAP data browsing
- `msjhris` — employee records, leave, permissions, attendance, overtime, approval hierarchy, and HR monitoring
- `msjwagateway` — WhatsApp instances, API clients, queue status, message sending, and gateway logs
- `msjpurchasereport` — purchase summaries, PO monitoring, GR status, material analytics, historical prices, and account-switch transactions

## Why the demo is static

GitHub Pages cannot execute Laravel, PHP, queues, databases, SAP integrations, or Node.js gateway services. A static interactive prototype is therefore the safest and most reliable portfolio format. It allows recruiters to explore the product flows without requiring server credentials or exposing company systems.

## Production deployment is intentionally excluded

The package does not contain:

- `.env` files
- database dumps
- SAP endpoints or credentials
- WhatsApp session data
- API keys
- payment credentials
- real employee, customer, vendor, production, or financial data
- original company repositories

## Recommended future enhancement

A separate sandbox backend can later be added on a VPS or cloud service using mock APIs and seeded data. The portfolio links can remain unchanged and point to that sandbox when it is ready.
