# 6.1 Management Concepts

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Describe the governance documents that drive security operations
- Explain asset, configuration, mobile device, patch, vulnerability, risk, and account management
- Connect each management process to what a SOC analyst sees day to day

## 1. Security Governance: Policy, Standard, Procedure, Guideline
| Document | Purpose | Mandatory? | Example |
|---|---|---|---|
| **Policy** | High-level statement of management intent | Yes | "All laptops must use full-disk encryption." |
| **Standard** | Specific, measurable requirements supporting a policy | Yes | "Use AES-256 with TPM-backed keys." |
| **Procedure** | Step-by-step instructions to carry out a task | Yes | "How to enable BitLocker via Intune." |
| **Guideline** | Recommended best practice, flexible | No | "Consider a passphrase of 14+ characters." |
| **Baseline** | Minimum security configuration level | Yes | CIS hardened Windows 11 image |

Policies are approved by senior management and reviewed regularly. The hierarchy flows from policy → standards → baselines → procedures, with guidelines as optional advice.

## 2. Asset Management
**Goal:** know what you own so you can protect it. You cannot defend what you cannot see.
- **Asset inventory:** hardware (servers, endpoints, network gear, IoT), software, data, cloud resources, people/roles, facilities.
- **Attributes tracked:** owner, location, IP/MAC, OS/version, criticality, data classification, support contract, lifecycle dates.
- **Classification:** assign value and sensitivity so protection matches importance (for example Public, Internal, Confidential, Restricted).
- **Lifecycle:** acquire → deploy → operate/maintain → retire. Secure **disposal** includes media sanitization (clear, purge, destroy) per NIST SP 800-88.
- **Discovery:** active scanning (Nmap), passive discovery (NetFlow, DHCP logs), agents, CMDB integrations.
- **SOC relevance:** during triage, asset criticality and owner determine priority and who to call. Unknown devices (**shadow IT / rogue devices**) are security findings.

## 3. Configuration Management
**Goal:** keep systems in a known, secure, documented state and control change.
- **Baseline configuration:** approved standard build (CIS Benchmarks, DISA STIGs, vendor hardening guides).
- **Configuration items (CIs)** stored in a **CMDB** (configuration management database).
- **Change management:** request → risk/impact review → approval (CAB) → test → implement → verify → document, with a **rollback plan**.
- **Configuration drift:** unauthorized or undocumented deviation from baseline; detected via compliance scanning and file integrity monitoring.
- **Hardening basics:** remove unneeded services/accounts, change defaults, least functionality, secure protocols, logging enabled.
- **Automation/IaC:** Ansible, Puppet, Chef, Terraform enforce consistent configurations.
- **SOC relevance:** an unexpected config change can be an IoC (new firewall rule, disabled AV, new admin account).

## 4. Mobile Device Management (MDM / EMM / UEM)
- Centrally manages smartphones, tablets, and laptops.
- **Capabilities:** enrollment, policy enforcement (PIN, encryption, OS version), app allow/block lists, certificate and VPN/Wi-Fi profiles, **remote lock and remote wipe**, selective (corporate-only) wipe, jailbreak/root detection, geofencing, compliance reporting.
- **Deployment models:** **BYOD** (bring your own device), **COPE** (corporate-owned, personally enabled), **COBO** (corporate-owned, business only), **CYOD** (choose your own device).
- **Containerization / work profiles** separate corporate and personal data.
- **Risks addressed:** lost/stolen devices, malicious apps, unpatched OS, data leakage, unsecured Wi-Fi.
- **Examples:** Microsoft Intune, Jamf, Workspace ONE, Cisco Meraki SM.

## 5. Patch Management
1. **Inventory** systems and software.
2. **Monitor** vendor advisories and CVE/NVD feeds.
3. **Assess and prioritize** using CVSS, exploit availability (known exploited vulnerabilities lists), asset criticality, and exposure.
4. **Test** in a lab or pilot group.
5. **Deploy** in maintenance windows (WSUS, SCCM/Intune, apt/yum, Ansible).
6. **Verify** success and handle failures.
7. **Document** and report compliance.
- **Emergency/out-of-band patching** for actively exploited flaws; **compensating controls** (virtual patching via IPS/WAF, isolation) when patching is delayed.
- **Risks of poor patching:** most breaches exploit known, unpatched vulnerabilities.

## 6. Vulnerability Management
Continuous cycle: **Discover → Prioritize → Remediate → Verify → Report.**
- **Scanning:** authenticated (credentialed, more accurate) vs unauthenticated; network, host, web app, container scans (Nessus, Qualys, OpenVAS, Rapid7).
- **CVSS:** score 0.0-10.0. Ratings: None 0.0, Low 0.1-3.9, Medium 4.0-6.9, High 7.0-8.9, Critical 9.0-10.0. Metric groups: Base, Temporal, Environmental.
- **Prioritization factors:** CVSS, exploit in the wild, asset value, exposure to internet, compensating controls.
- **Outcomes:** remediate (patch/fix), mitigate, accept (documented), transfer (insurance).
- **False positives** must be validated; **false negatives** are possible when scans lack credentials.
- Distinguish **vulnerability scan** (finds weaknesses) from **penetration test** (attempts exploitation).

## 7. Risk Management
- **Risk = Threat x Vulnerability x Impact** (conceptually, likelihood x impact).
- **Process:** identify assets/threats → assess → treat → monitor.
- **Risk treatment options:**
  - **Mitigate/reduce** (apply controls)
  - **Transfer/share** (insurance, outsourcing)
  - **Accept** (documented, within appetite)
  - **Avoid** (stop the activity)
- **Residual risk:** what remains after controls.
- **Qualitative** (High/Medium/Low matrices) vs **quantitative:**
  - **SLE** = Asset Value x Exposure Factor
  - **ARO** = expected occurrences per year
  - **ALE** = SLE x ARO
  - Example: asset $200,000, EF 25% → SLE $50,000; ARO 0.5 → **ALE $25,000**. A control costing less than the risk reduction is justified.
- **Risk register** tracks risks, owners, treatments, and status.
- **Frameworks:** NIST RMF/SP 800-37, ISO 27005, FAIR.

## 8. Account Management
- **Lifecycle:** provisioning (onboarding) → modification (role changes) → periodic **access review/recertification** → disable/deprovision (offboarding).
- **Principles:** **least privilege**, **need-to-know**, **separation of duties**, **job rotation**.
- **Access models:** DAC, **MAC**, **RBAC**, ABAC, rule-based.
- **Authentication:** MFA, strong password policy (length over complexity, check against breached lists), lockout thresholds, SSO, federation.
- **Privileged access management (PAM):** vaulting, just-in-time access, session recording.
- **Account types:** user, privileged/admin, service, shared (avoid), guest, emergency (break-glass).
- **SOC relevance:** watch for new privileged accounts (event 4720, 4732), dormant account use, service accounts logging in interactively, impossible travel.

## 9. Putting It Together (Scenario)
A critical vulnerability is announced for a VPN appliance. **Asset management** identifies where it runs and who owns it; **vulnerability management** scores and prioritizes it; **patch/change management** tests and schedules an emergency change; **configuration management** confirms the baseline afterward; **risk management** documents any delay as accepted risk with compensating controls; **account management** forces credential resets if compromise is suspected.

## 10. Review Questions
1. Which document is mandatory, specific, and measurable? *(Standard)*
2. What does ALE equal? *(SLE x ARO)*
3. What is configuration drift? *(Deviation from the approved baseline)*
4. Which MDM action removes only company data? *(Selective wipe)*
5. List the four risk treatment options. *(Mitigate, transfer, accept, avoid)*
6. Why prefer authenticated vulnerability scans? *(More accurate, fewer false negatives)*
7. What principle limits users to only what they need? *(Least privilege)*
