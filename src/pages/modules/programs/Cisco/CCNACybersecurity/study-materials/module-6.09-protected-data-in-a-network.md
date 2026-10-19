# 6.9 Protected Data in a Network

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Define the main categories of protected data: PII, PSI, PHI, and intellectual property
- Identify regulations that govern each
- Explain how data is protected in each state and how analysts detect exposure

## 1. Why Protect Data?
Data is usually the **target** of attacks. Exposure causes **legal penalties, financial loss, reputational harm, and harm to individuals**. Security programs classify data and apply controls proportional to sensitivity.

## 2. Categories of Protected Data

### 2.1 PII (Personally Identifiable Information)
- **Definition:** information that can be used to **identify, contact, or locate** a single person, alone or combined with other data.
- **Examples:** full name, Social Security number, date/place of birth, mother's maiden name, driver's license and passport numbers, home address, personal email/phone, biometric records (fingerprints, face), IP address and device IDs in some jurisdictions.
- **Linked data** (medical, educational, financial, employment) becomes PII when tied to an individual.
- **Regulations:** **GDPR** (EU), **CCPA/CPRA** (California), **Privacy Act**, breach notification laws in all U.S. states, **Data Privacy Act** (Philippines, RA 10173), and others.

### 2.2 PSI (Personal Security Information)
- **Definition:** data used to **authenticate or secure** an individual's identity or access, and which could enable account takeover or fraud if exposed.
- **Examples:** passwords, PINs, security question answers, authentication tokens, private keys, one-time-password seeds, **payment card numbers (PAN), CVV**, bank account numbers, biometric templates for authentication.
- **Regulation/standard:** **PCI DSS** for payment card data (cardholder data and sensitive authentication data; CVV must **never be stored** after authorization).
- Sometimes called **sensitive personal information** or **Personal Security Information** in CyberOps materials.

### 2.3 PHI (Protected Health Information)
- **Definition:** individually identifiable **health information** (past, present, or future physical or mental health, health care provided, or payment for care) held or transmitted by a covered entity or business associate.
- **Examples:** medical records, diagnoses, prescriptions, lab results, insurance information, billing records, appointment details linked to a person.
- **Regulation:** **HIPAA** (Privacy Rule, **Security Rule**, **Breach Notification Rule**) and **HITECH**. The 18 HIPAA identifiers (names, geographic data smaller than a state, dates, phone/fax, email, SSN, medical record numbers, account numbers, device identifiers, URLs, IPs, biometrics, photos, and others) define identifiable data. **De-identification** (safe harbor or expert determination) removes PHI status.
- **Philippines context:** health data is **sensitive personal information** under RA 10173.

### 2.4 Intellectual Property (IP)
- **Definition:** creations of the mind with economic value.
- **Examples:** **trade secrets** (formulas, algorithms, source code, manufacturing processes), **patents, copyrights, trademarks**, designs, research data, business plans, customer lists, merger information.
- **Protection:** NDAs, access controls, DRM, watermarking, DLP, legal action. Trade secrets must be kept **secret** to maintain protection.
- **Threats:** insiders, espionage (nation-state), phishing for source code, supply chain compromise, cloud misconfiguration.

## 3. Other Regulated Data and Frameworks
| Regulation/Standard | Protects | Notes |
|---|---|---|
| **GDPR** | EU residents' personal data | Consent, rights, **72-hour breach notification**, large fines |
| **HIPAA/HITECH** | PHI | Applies to covered entities and business associates |
| **PCI DSS** | Cardholder data | Industry standard enforced via card brands/banks |
| **SOX** | Financial reporting integrity | Public companies |
| **GLBA** | Financial customer information | Financial institutions |
| **FERPA** | Student education records | U.S. schools |
| **FISMA/NIST 800-53** | Federal information systems | U.S. government |
| **CUI / CMMC** | Controlled Unclassified Information | DoD contractors |
| **Data Privacy Act of 2012 (RA 10173)** | Personal information in the Philippines | National Privacy Commission, breach reporting within 72 hours |

## 4. Data Classification
Typical commercial tiers: **Public → Internal/Private → Confidential → Restricted/Highly Confidential.** Government: Unclassified, **CUI**, Confidential, Secret, Top Secret.
- **Owner** decides classification; **custodian** implements protection; **users** follow handling rules.
- **Labeling and handling rules** govern storage, transmission, sharing, and destruction.

## 5. Data States and Protections
| State | Description | Example controls |
|---|---|---|
| **Data at rest** | Stored on disks, databases, backups, devices | Full-disk encryption, database encryption (TDE), access controls, tokenization, secure backups |
| **Data in motion/transit** | Moving across networks | **TLS**, **IPsec/VPN**, SSH, SFTP, S/MIME, secure email gateways |
| **Data in use** | Being processed in memory/applications | Memory protection, secure enclaves, least privilege, screen privacy, application controls |

## 6. Controls to Protect Data
- **Administrative:** policies, classification, training, background checks, vendor risk management, breach plans.
- **Technical:** encryption, **DLP**, **IAM/MFA/RBAC**, network segmentation, **tokenization and masking**, **database activity monitoring**, **CASB** for cloud, **DRM**, endpoint control (USB blocking), secure disposal.
- **Physical:** locked facilities, badge access, media protection.
- **Data minimization and retention limits:** do not collect or keep what you do not need.

## 7. Data Loss Prevention (DLP)
- Detects and blocks sensitive data leaving via **network (egress)**, **endpoint (USB, print, clipboard)**, and **cloud/email**.
- Methods: **pattern matching/regex** (SSN, card numbers with **Luhn** check), **keyword dictionaries**, **document fingerprinting**, **exact data matching**, **classification labels**, **machine learning**.
- Actions: monitor, alert, block, quarantine, encrypt, require justification.
- **SOC relevance:** DLP alerts can reveal insider threat or exfiltration; tune to cut false positives.

## 8. Detecting Exposure and Exfiltration in Network Data
- Cleartext PII/credentials in **PCAP** (HTTP, FTP, Telnet, SMTP).
- Large uploads to personal cloud storage or unfamiliar IPs (NetFlow).
- **DNS tunneling** and **encoded** data in HTTP/ICMP.
- Access to sensitive file shares from unusual users or at odd hours.
- Database queries with unusual volume (`SELECT *`).
- Use **regex** to find patterns, for example SSN `\b\d{3}-\d{2}-\d{4}\b`.

## 9. Breach Response Considerations
- Determine **what data types**, **how many individuals**, and **jurisdictions**; that determines **notification duties** and deadlines (GDPR 72 hours; HIPAA up to 60 days; U.S. state laws vary; PH Data Privacy Act 72 hours).
- Involve **legal, privacy officer/DPO, communications**.
- Preserve evidence, contain, offer remediation (credit monitoring) where appropriate.
- Report to regulators, card brands, customers, as required.

## 10. Review Questions
1. Which regulation protects health information in the U.S.? *(HIPAA)*
2. Which standard governs payment card data? *(PCI DSS)*
3. Give three examples of PII. *(Name, SSN, date of birth, address, biometrics, etc.)*
4. What are the three data states? *(At rest, in motion/transit, in use)*
5. Which control prevents sensitive data from leaving the network? *(DLP)*
6. What is the GDPR breach notification window? *(72 hours)*
7. How do you protect trade secrets? *(Access control, NDAs, DLP, encryption, keep secret)*
