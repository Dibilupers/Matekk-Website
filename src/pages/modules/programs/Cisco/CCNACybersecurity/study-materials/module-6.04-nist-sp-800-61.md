# 6.4 NIST SP 800-61 (Computer Security Incident Handling Guide)

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Explain what SP 800-61 is and how it is organized
- Detail each phase, with sub-activities, indicators, and attack vectors
- Understand the Revision 3 update and what the exam still expects

## 1. Overview
- **Title:** Computer Security Incident Handling Guide (NIST Special Publication 800-61).
- **Revision 2 (August 2012)** is the classic four-phase model used across industry and in most CyberOps study material.
- **Revision 3 (April 2025)** was released and **supersedes Rev. 2**. It realigns incident response with the **NIST Cybersecurity Framework (CSF) 2.0** (Govern, Identify, Protect, Detect, Respond, Recover) and folds IR into overall risk management. **For the 200-201 exam and your course material, learn the Rev. 2 four-phase lifecycle**, but be aware of the newer mapping.
- Purpose: help organizations establish incident response capabilities and handle incidents efficiently and effectively.

## 2. Revision 2 Structure
1. Organizing a computer security incident response capability (policy, plan, team, communication)
2. **Handling an incident** (the lifecycle)
3. Coordination and information sharing

## 3. The Four-Phase Lifecycle (Rev. 2)
```
Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity
      ^____________________________________________________________________________|
```

### 3.1 Preparation
**Preparing to handle incidents:** tools/resources (communication, hardware/software, analysis, mitigation), training, exercises.
**Preventing incidents:** risk assessments, host security (hardening, patching, least privilege), network security (perimeter, segmentation, default deny), malware prevention, user awareness and training.

### 3.2 Detection and Analysis
**Attack vectors (categories):**
- **External/removable media**: executed from USB or other media.
- **Attrition**: brute force, DoS, DDoS against systems, networks, services.
- **Web**: website or web-based application attack.
- **Email**: malicious attachment or link.
- **Impersonation**: spoofing, MITM, rogue wireless, SQL injection (replacing something benign with malicious).
- **Improper usage**: violation of acceptable use policy by an authorized user.
- **Loss or theft** of equipment.
- **Other.**

**Signs of an incident**
- **Precursors:** signs an incident *may* occur in the future. Examples: web server log entries showing a vulnerability scanner use, an announcement of a new exploit targeting your software, a threat from a group stating they will attack you.
- **Indicators:** signs an incident *has occurred or is occurring*. Examples: IDS alert of a buffer overflow, antivirus alert of an infected host, filenames with unusual characters, a sudden change in configuration, a host crashing repeatedly, multiple failed logins from an unfamiliar address, email sent with suspicious content, unusual deviation in network traffic flows.
- **Sources:** alerts (IDS/IPS, SIEM, AV, FIM, third-party monitoring), logs (OS, service, application, network devices, NetFlow), public information (new vulnerabilities and exploits), and **people** (users, other IT staff, other organizations).

**Analysis difficulties:** huge alert volume, false positives, many incidents look similar, a single incident may produce many indicators.

**Recommendations for analysis:** profile networks and systems, understand normal behavior, create a **log retention policy**, perform **event correlation**, keep all hosts synchronized (**NTP**), maintain and use a **knowledge base**, use internet search engines for research, run **packet sniffers** to collect additional data, filter data, seek assistance from others.

**Incident documentation:** current status, summary, indicators, related incidents, actions taken, chain of custody, impact assessment, contact info, evidence list, comments from handlers, next steps. Use an **incident tracking system** and treat it as sensitive.

**Incident prioritization:** functional impact, information impact, recoverability effort (see 6.3).

**Incident notification:** CIO, head of information security, local security officer, other IR teams, system owners, HR, public affairs, legal, US-CERT/ISAC, law enforcement.

### 3.3 Containment, Eradication, and Recovery
**Containment** strategy criteria:
- Potential damage to and theft of resources
- Need for **evidence preservation**
- Service availability (for example network connectivity, external services)
- Time and resources needed to implement the strategy
- Effectiveness (partial vs full containment)
- Duration of the solution (emergency workaround, temporary, permanent)

**Evidence gathering and handling:** collect evidence as soon as possible. Log for every item: identifying info (location, serial/model, hostname, MAC, IP), name/title/phone of each person who collected or handled it, time/date and location of each handoff. Store in a secure location. Make copies; hash.

**Identifying the attacking hosts:** validate IP address (but beware spoofing), research with search engines, incident databases, monitor possible attacker communication channels.

**Eradication and recovery:** remove malware, disable breached accounts, identify and mitigate exploited vulnerabilities; restore systems from clean backups or rebuild, replace compromised files, install patches, change passwords, tighten perimeter security, enhance logging.

### 3.4 Post-Incident Activity
- **Lessons learned** meetings (questions listed in 6.3).
- **Using collected incident data:** number of incidents handled, time per incident (time of discovery, initial impact assessment, report to management, recovery, total), objective assessment of each incident, subjective assessment by the team, measure of cost and damage, root cause analysis.
- **Evidence retention:** follow organizational policy, legal prosecution needs, and storage costs.
- **Report** follow-up with recommendations.

## 4. Coordination and Information Sharing
- Coordinate with external parties before incidents occur (**memoranda of understanding, agreements**).
- Share **indicators and mitigations**, protect sensitive data, comply with legal requirements.
- Information sharing techniques: ad hoc, partially automated (templates, shared portals), security considerations, **STIX/TAXII** for structured exchange.

## 5. Revision 3 Highlights (April 2025)
- Aligns to **CSF 2.0 functions**, in particular **Detect, Respond, Recover**, and treats IR as a continuous part of cybersecurity risk management rather than a separate stand-alone cycle.
- Emphasizes **governance** (Govern function), **preparation**, **improvement** (lessons feeding back all the time), and integrating IR with supply chain and risk practices.
- Practical takeaway: the old four phases map approximately to **Preparation (Govern/Identify/Protect)**, **Detection and Analysis (Detect)**, **Containment/Eradication/Recovery (Respond/Recover)**, and **Post-Incident (Improvement)**.

## 6. Memory Aids
- **P-D-C-P:** Preparation, Detection/analysis, Containment/eradication/recovery, Post-incident.
- **Precursor = Prelude (might happen). Indicator = It's happening/happened.**
- Attack vector mnemonic: **E**xternal media, **A**ttrition, **W**eb, **E**mail, **I**mpersonation, **I**mproper usage, **L**oss/theft, **O**ther.

## 7. Review Questions
1. What is the difference between a precursor and an indicator? *(Precursor = may occur later; indicator = occurring or occurred)*
2. Which phase includes containment, eradication, and recovery as one? *(Phase 3)*
3. List four containment strategy criteria. *(Damage, evidence preservation, availability, time/resources, effectiveness, duration)*
4. Why synchronize clocks with NTP? *(Accurate correlation of events)*
5. Which NIST framework does Rev. 3 align with? *(CSF 2.0)*
