# 6.6 Concepts from NIST SP 800-86 (Guide to Integrating Forensic Techniques into Incident Response)

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Explain the four-phase forensic process
- Apply order of volatility and evidence handling principles
- Identify data sources and key forensic considerations

## 1. Overview
- **NIST SP 800-86 (2006):** practical guidance for using forensic techniques during incident response, troubleshooting, log monitoring, data recovery, and data acquisition.
- **Digital forensics:** the application of science to identification, collection, examination, and analysis of data while preserving integrity of the information and maintaining a strict chain of custody.
- Reasons organizations use forensics: investigating crime and policy violations, reconstructing incidents, troubleshooting, log monitoring, data recovery, data acquisition, due diligence/regulatory compliance.

## 2. The Forensic Process (Four Phases)
```
Collection -> Examination -> Analysis -> Reporting
```

### 2.1 Collection
Identify, label, record, and acquire data from the possible sources **while preserving integrity**.
- **Identify** sources: computers, storage media, network devices, mobile devices, cloud, logs.
- **Develop a plan:** prioritize by **likely value**, **volatility**, and **effort required**.
- **Acquire the data**, in the **order of volatility**.
- **Verify integrity:** create hashes (MD5, SHA-1, **SHA-256 preferred**) of the original and the copy.
- **Live vs post-mortem:** live acquisition captures volatile data but alters the system slightly; powering off loses volatile data but preserves the disk state. Decide intentionally and document.
- **Imaging types:** **bit-stream (forensic) image** copies every sector including unallocated space and slack space, versus a **logical copy** that copies only files.
- Use **write blockers** (hardware preferred) and **forensic tools** (FTK Imager, dd/dcfldd, EnCase, Autopsy).

### 2.2 Examination
Forensically process the collected data using **manual and automated methods**, assessing and extracting data of particular interest, while **preserving integrity**.
- **Filtering:** remove known-good files via hash sets (**NSRL**, National Software Reference Library) and keep unknown/known-bad.
- **File carving:** recover files from unallocated space using signatures (headers/footers).
- **Bypass protections:** password cracking, decryption, steganography detection.
- **Search:** keywords, regular expressions, metadata (EXIF, document properties).
- Tackle **compressed, encrypted, and obfuscated** files.

### 2.3 Analysis
Analyze the examination results to derive **useful information** that addresses the questions that prompted the collection ("who, what, when, where, how").
- Correlate across sources (**timeline analysis**), identify **people, places, items, and events** and how they relate.
- Reconstruct the event sequence and **test hypotheses**.
- Distinguish **facts** from **assumptions** and document limitations.

### 2.4 Reporting
Report the results of the analysis.
- Describe **actions used**, explain **how tools and procedures were selected**, determine **what other actions are needed** (additional sources, new tools), and provide **recommendations for improvement** to policies, guidelines, procedures, and tools.
- **Factors:** alternative explanations, audience (technical vs legal vs management), actionable information.
- Clear, accurate, reproducible, with reference to evidence integrity.

## 3. Order of Volatility
Collect **most volatile first** (RFC 3227 guidance, consistent with NIST):
1. CPU registers and cache
2. Routing tables, ARP cache, process table, kernel statistics, **RAM/memory**
3. Temporary file systems
4. **Disk** (non-volatile storage)
5. Remote logging and monitoring data relevant to the system
6. Physical configuration and network topology
7. Archival media and backups

Examples of volatile data: running processes, network connections, logged-on users, open files, clipboard, memory contents (including encryption keys, decrypted data, injected code).

## 4. Data Sources (Chapters 4 to 7)

### 4.1 Data Files and File Systems
- **Allocated** and **unallocated** space, **deleted files** (data persists until overwritten), **slack space** (file slack, RAM slack), **hidden files**, **alternate data streams (NTFS)**, **timestamps (MACB)**, **file signatures** vs extensions, **swap/page files**, **hibernation file**, **registry**, **recycle bin**, **prefetch**, **link files**, **jump lists**.
- Different file systems (FAT, NTFS, ext3/4, APFS) store metadata differently.

### 4.2 Operating System Data
- **Volatile:** network configuration, connections, running processes, open files, login sessions, OS time.
- **Non-volatile:** configuration files, logs, application files, data files, swap files, dump files, hibernation, temp files.
- Commands to gather volatile data on a live system: `netstat -ano`, `ipconfig /all`, `tasklist`, `arp -a`, `net session`, `ps aux`, `lsof`, `who`.
- **Trustworthiness:** attacker-modified binaries (rootkits) may lie; use trusted tools from external media.

### 4.3 Network Traffic Data
- Sources: firewalls, IDS/IPS, packet sniffers, proxies, routers, flow data, remote access servers, DHCP/DNS servers.
- **Legal issues:** wiretapping/privacy statutes; ensure authorization and policy/banners.
- **Challenge:** encrypted traffic, volume, sampling.

### 4.4 Application Data
- **Email, web browsers, office documents, chat, file sharing, security applications, databases**; many store logs, histories, caches, and configuration.
- Examples: browser history/cache/cookies, mail archives (PST/OST/mbox), AV logs, database transaction logs.

## 5. Evidence Handling Principles
- **Chain of custody:** who, what, when, where, why for each handoff; signed forms; tamper-evident bags; secure storage.
- **Integrity:** hash at acquisition; verify before and after each analysis; work from **copies**, never the original.
- **Admissibility (U.S. concepts):** relevance, authenticity, reliability, and best evidence considerations; documented procedures; qualified examiners.
- **Documentation:** photos, serial numbers, system time offsets, tool versions, commands run, notes with timestamps.
- **Authorization:** legal approval, policy, consent, search warrants where required; involve **legal counsel** early.
- **Privacy:** minimize exposure of unrelated personal data.

## 6. Anti-Forensics and Challenges
- Data wiping, **timestomping**, log clearing, encryption, steganography, packers/obfuscation, fileless malware (memory only), secure delete tools, use of live-boot OS, cloud/ephemeral instances that disappear.
- Mitigations: collect volatile data early, centralize logs (SIEM), enable auditing, and use EDR with telemetry.

## 7. Forensics and Incident Response Together
- Forensics supports **detection and analysis** (scope, root cause) and **containment/eradication decisions** (which systems, how deep).
- Balance **speed of recovery** vs **evidence preservation**; pre-agree policy.
- **Roles:** first responders must avoid altering evidence; trained examiners perform in-depth work.

## 8. Recommendations Summary from the Guide
1. Create and maintain **forensic policies**, procedures, and guidelines.
2. Perform forensics using a **consistent process**.
3. Be able to **collect data from multiple sources** (files, OS, network, applications).
4. Train staff, use qualified tools, and **keep tools and skills current**.
5. Involve **legal** and be aware of laws and organizational policy.
6. **Preserve integrity** and chain of custody at every step.

## 9. Review Questions
1. List the four phases. *(Collection, Examination, Analysis, Reporting)*
2. Which is more volatile: RAM or disk? *(RAM)*
3. Why make hashes of the original and the image? *(Prove the copy is identical and integrity is intact)*
4. What does a bit-stream image include that a logical copy does not? *(Slack and unallocated space, deleted data)*
5. What is NSRL used for? *(Filtering out known-good files via hash sets)*
6. What is timestomping? *(Altering file timestamps to hide activity)*
