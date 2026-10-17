# 6.10 Classify Intrusion Events into Categories (Cyber Kill Chain, Diamond Model, MITRE ATT&CK)

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Map observed activity to the seven Cyber Kill Chain phases
- Describe the Diamond Model of Intrusion Analysis
- Use MITRE ATT&CK to classify techniques
- Choose appropriate frameworks for the analysis task

## 1. Why Classify Intrusion Events?
Categorization gives a **common language**, helps **spot gaps in defense**, supports **attribution and trend analysis**, drives **prioritization**, and tells you **what the attacker will likely do next**.

## 2. Lockheed Martin Cyber Kill Chain
Describes the stages of an intrusion; **breaking any link** stops the attack.

| # | Phase | Attacker goal | Examples | Defender view |
|---|---|---|---|---|
| 1 | **Reconnaissance** | Research targets | OSINT, LinkedIn, port scans, DNS enumeration, WHOIS | Web logs, scan detections, honeypots |
| 2 | **Weaponization** | Couple exploit with payload | Malicious macro doc, trojanized PDF, exploit kit build | Usually invisible; use threat intel and malware analysis |
| 3 | **Delivery** | Transmit weapon to victim | Phishing email, drive-by, USB drop, watering hole | Email gateway, proxy, IDS |
| 4 | **Exploitation** | Trigger vulnerability/user action | Macro executes, browser exploit, SQLi | Endpoint/IPS alerts, patching |
| 5 | **Installation** | Establish persistence | Backdoor, RAT, web shell, Run key, scheduled task | EDR, FIM, autoruns |
| 6 | **Command and Control (C2)** | Remote control channel | HTTP/S beacons, DNS tunneling, IRC | DNS/proxy/NetFlow analysis, egress filtering |
| 7 | **Actions on Objectives** | Achieve goal | Data exfiltration, ransomware, lateral movement, destruction | DLP, segmentation, backups, IR |

### Courses of Action Matrix
| Phase | Detect | Deny | Disrupt | Degrade | Deceive | Destroy |
|---|---|---|---|---|---|---|
| Recon | Web analytics, NIDS | Info sharing policy, firewall ACLs | | | | |
| Weaponization | Threat intel, NIDS | NIPS | | | | |
| Delivery | Vigilant users, proxy logs | Proxy filter, inline AV, queuing | Inline AV | Queuing | | |
| Exploitation | HIDS | Patching, DEP | Data Execution Prevention | | | |
| Installation | HIDS | Chroot jail, AV | | | | |
| C2 | NIDS | Firewall ACLs, NIPS | NIPS | Tarpit | DNS redirect | |
| Actions | Audit logs | Egress filtering, DLP | | QoS | Honeypot | |
(Concept: for each phase choose actions to **detect, deny, disrupt, degrade, deceive, destroy**.)

### Strengths and Limits
- Strength: easy to understand; **intelligence-driven defense**; emphasizes early disruption.
- Limits: linear, **perimeter/malware-centric**; poorly fits **insider threats**, **supply chain**, **credential-based or web-app attacks**, and **post-compromise lateral movement** (hence ATT&CK).

## 3. Diamond Model of Intrusion Analysis
Every intrusion **event** has four **core features** forming a diamond:
```
           Adversary
            /     \
   Infrastructure --- Capability
            \     /
             Victim
```
| Feature | Meaning | Example |
|---|---|---|
| **Adversary** | The actor/operator or customer | APT group, criminal gang |
| **Capability** | Tools, techniques, malware, exploits | RAT, phishing kit, zero-day |
| **Infrastructure** | Physical/logical systems used to deliver or control | C2 domains, IPs, compromised servers, email accounts |
| **Victim** | Target person/organization/asset | Finance dept, web server, user account |

**Edges** show relationships (adversary uses capability over infrastructure against victim).

### Meta-Features
- **Timestamp** (start/stop), **Phase** (kill chain), **Result** (success, failure, unknown; confidentiality, integrity, availability compromised), **Direction** (victim-to-infrastructure, adversary-to-victim, bidirectional), **Methodology** (phishing, DDoS, SQLi), **Resources** (software, knowledge, funds, access).

### Axes
- **Socio-political axis:** adversary ↔ victim (motive, relationship, intent).
- **Technology axis:** capability ↔ infrastructure (how the technology is used).

### Analytic Constructs
- **Activity threads:** chains of events across phases for one adversary-victim relationship.
- **Activity groups:** clusters of threads/events sharing features, which supports **attribution and campaign tracking**.
- **Pivoting:** from one known feature to discover others (a domain leads to an IP, which leads to other victims).

### Example Event
- Adversary: unknown group; Capability: `Invoice.docm` macro downloader; Infrastructure: `bad.example.com` / 198.51.100.7; Victim: Finance user jdoe; Phase: Delivery then Exploitation; Result: success; Methodology: spear phishing.

## 4. MITRE ATT&CK
- Knowledge base of **adversary tactics, techniques, and procedures (TTPs)** from real-world observations. Matrices: **Enterprise** (Windows, macOS, Linux, cloud, network, containers), **Mobile**, **ICS**.
- **Tactics** = the "why" (columns). **Techniques/sub-techniques** = the "how" (T-numbers). **Procedures** = specific implementations by groups/malware.
- **Enterprise tactics (14):** Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.
- **Examples:** T1566 Phishing; T1059.001 PowerShell; T1547.001 Registry Run Keys; T1003 OS Credential Dumping; T1021.001 RDP; T1071 Application Layer Protocol; T1041 Exfiltration over C2 Channel; T1486 Data Encrypted for Impact.
- **Uses:** classify alerts, build detections, gap analysis, threat hunting, red/purple teaming, intel reporting. **ATT&CK Navigator** visualizes coverage.

## 5. Comparison
| Aspect | Cyber Kill Chain | Diamond Model | MITRE ATT&CK |
|---|---|---|---|
| Structure | 7 sequential phases | 4-vertex event model | Matrix of tactics/techniques |
| Focus | Stage of attack | Relationships and pivoting | Detailed behaviors (TTPs) |
| Best for | Defense placement, early disruption | Attribution, intelligence analysis | Detection engineering, hunting, coverage |
| Weakness | Linear, limited post-compromise detail | Needs good data to populate | Can be overwhelming without prioritization |

## 6. Mapping Exercise
Event timeline:
1. Attacker scans web server → **Recon** (ATT&CK TA0043 Reconnaissance)
2. Builds malicious doc → **Weaponization** (Resource Development)
3. Emails doc → **Delivery** (T1566.001 Spearphishing Attachment)
4. Macro runs → **Exploitation** (T1204 User Execution, T1059 scripting)
5. Creates Run key → **Installation** (T1547.001)
6. Beacons to domain → **C2** (T1071.001 Web protocols)
7. Dumps credentials, encrypts data → **Actions on Objectives** (T1003, T1486)

## 7. Other Classification Schemes (Awareness)
- **NIST SP 800-61 attack vectors** (6.5), **VERIS** (Vocabulary for Event Recording and Incident Sharing: actor, action, asset, attribute), **Unified Kill Chain**, **CAPEC** (attack patterns), **CVE/CWE** (vulnerabilities/weaknesses).

## 8. Review Questions
1. Name the seven Kill Chain phases in order. *(Reconnaissance, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives)*
2. What are the four core features of the Diamond Model? *(Adversary, capability, infrastructure, victim)*
3. At which Kill Chain phase does a malicious email arrive? *(Delivery)*
4. In ATT&CK, what is a tactic? *(The adversary's goal, the "why")*
5. Which model best supports pivoting to find related events? *(Diamond Model)*
6. A web shell being planted is which Kill Chain phase? *(Installation)*
