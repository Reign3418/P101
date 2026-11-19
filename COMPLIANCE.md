# 🛡️ P101 // Python Educational Platform — Student & Child Online Privacy Compliance (`COMPLIANCE.md`)

> **Platform:** `P101` (`E:\PythonClass` — Interactive Python Pedagogy & Lab Workbench)
> **Corporate Entity:** **Valheon Solutions LLC** (`https://valheonsolutions.com`)
> **Regulatory Standard:** **COPPA** (`16 CFR Part 312`), **FERPA** (`20 U.S.C. § 1232g`), **KOSA** (`High-Privacy-By-Default`), & **NC G.S. § 115C-401.2** (`Student Online Privacy Protection`)

---

## 1. Zero-Student-PII Client-Side Sandbox Architecture
- **100% In-Browser Execution:** Student Python code, interactive labs, and "Why Workbench" exercises execute locally inside the learner's isolated browser sandbox (`WebAssembly / Pyodide` & local state).
- **Zero Collection of Student Personal Information (`PI`):** `P101` never collects, stores, or transmits student real names, home addresses, geolocation coordinates, photographs, voice recordings, or behavioral advertising profiles.

## 2. COPPA (`16 CFR Part 312`) & Verifiable Parental Consent (`VPC`)
- **Direct-to-Consumer Youth Learners (`Under 13`):** Where a parent or guardian enrolls a learner under 13 years of age in a hosted `P101` module, account activation is gated behind **Verifiable Parental Consent (`VPC`)** using an FTC-approved adult payment-method verification hold processed directly by **Stripe, Inc.** (`$0.00` raw card storage on Valheon servers).
- **School / Classroom Deployments (`FERPA School Official Exception`):** Where `P101` is deployed by a teacher or school district, the educational institution authorizes instructional use under **FERPA (`20 U.S.C. § 1232g`)** and **NC G.S. § 115C-401.2**, with zero student data retention on external servers.

## 3. High-Privacy-By-Default (`KOSA` Alignment)
- **Zero Third-Party Behavioral Ad-Tech:** `P101` embeds **zero** advertising networks, tracking pixels (`Meta Pixel`, `TikTok Pixel`, `DoubleClick`), or data brokers.
- **Zero Unmoderated Student Messaging:** `P101` contains no public student-to-student chat rooms, open DMs, or public profile directories that could expose a minor to unsolicited contact.
- **Immediate Parental Right-to-Review & `<24h` Erasure SLA:** Parents, guardians, and educators may inspect or demand immediate cryptographic deletion of any learner record at any time via `security@valheonsolutions.com` or `support@valheonsolutions.com` (guaranteed `<24h` purge SLA).
