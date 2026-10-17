# 6.3 Incident Handling Process (NIST SP 800-61) Applied to an Event

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Walk a real-world style event through each IR phase
- Prioritize and categorize an incident
- Choose containment strategies and document decisions

## 1. The Lifecycle at a Glance
1. **Preparation**
2. **Detection and Analysis**
3. **Containment, Eradication, and Recovery**
4. **Post-Incident Activity**

It is a **cycle**: lessons learned feed back into preparation, and analysis continues during containment.

## 2. Scenario: Phishing Leading to Ransomware
**Background:** At 09:12 a user in Finance (host FIN-WS-22) opens an email attachment `Invoice_4471.docm`. At 09:14 EDR alerts: `winword.exe` spawned `powershell.exe -enc ...`. At 09:20 the host contacts `198.51.100.7:443`. At 09:40 file shares begin showing renamed `.locked` files.

### Phase 1: Preparation (what had to be in place beforehand)
- IR plan, ransomware playbook, call tree, EDR with isolation ability, offline backups, email gateway, MFA, segmentation, trained users.
- Without these, every step below is slower and costlier.

### Phase 2: Detection and Analysis
**Detection** sources: EDR alert, email gateway log, user report, IDS, DNS logs, file-server anomalies.
1. **Validate the alert**: is it a true positive? Parent/child process chain is a known malicious pattern. TP.
2. **Establish scope**: Which hosts received the email (search mail logs by subject/sender/hash)? Which hosts contacted the C2 IP (firewall, proxy, NetFlow, DNS)? Which accounts were used?
3. **Gather indicators of compromise:** sender address, attachment SHA-256, C2 IP/domain, PowerShell command, mutex, dropped file paths, registry persistence.
4. **Correlate in SIEM** and build a timeline.
5. **Categorize** (attack vector): email/phishing; **ransomware** (malicious code).
6. **Prioritize** using three factors:
   - **Functional impact** (None, Low, Medium, High): file servers and finance operations affected → **High**.
   - **Information impact** (None, Privacy breach, Proprietary breach, Integrity loss): encryption affects availability; possible exfiltration → privacy/proprietary risk.
   - **Recoverability** (Regular, Supplemented, Extended, Not recoverable): backups intact → **Supplemented**.
7. **Document everything** from the first moment: who, what, when, evidence collected, commands run.
8. **Notify**: incident manager, CISO, legal, IT, business owners; decide on external reporting (regulators, insurer, law enforcement).

### Phase 3: Containment, Eradication, and Recovery

**Containment**: stop the spread and limit damage.
- **Strategy factors:** potential damage and theft, need for evidence preservation, service availability, time and resources, effectiveness, duration of solution (temporary vs permanent).
- Actions: isolate FIN-WS-22 via EDR (keep powered on to preserve memory), disable the user account, block C2 IP/domain and attachment hash, quarantine the email from all mailboxes, segment/disable affected SMB shares, disable compromised service accounts.
- **Short-term vs long-term containment:** short-term isolates quickly; long-term applies temporary fixes (rebuild clean systems in a clean VLAN) while permanent remediation is prepared.
- **Evidence handling:** memory capture, disk image with hash, logs, PCAP, with **chain of custody** forms. Capture volatile data first.
- **Caution:** attackers may notice containment and escalate; destroying evidence by rebooting is a trade-off to decide deliberately.

**Eradication**: remove the cause.
- Delete malware and persistence, close the entry vector (block macros from the internet, patch), reset credentials, reimage affected systems from known-good media, scan the environment with updated IoCs.

**Recovery**: return to normal safely.
- Restore from **clean backups** (verify they are not infected), rebuild, apply patches, validate integrity, **monitor closely** for recurrence (increased logging, EDR hunting), staged return to production, confirm with business owners.
- Set **success criteria** and a monitoring period.

### Phase 4: Post-Incident Activity
- **Lessons-learned meeting** within days of closing (all involved parties). Questions: What happened and when? How did staff and management perform? Were procedures followed and adequate? What information was needed sooner? Were any steps or actions taken that might have inhibited recovery? What would we do differently? What corrective actions can prevent recurrence? What additional tools or resources are needed? What indicators should we watch for?
- **Final incident report**, **metrics** (time to detect/contain/recover, cost, number of hosts affected), **IoC sharing** with ISACs/threat intel partners.
- **Evidence retention** per policy and legal requirements.
- Update the plan, playbook, detections, and training.

## 3. Handling Tips by Incident Type
| Type | Key early actions |
|---|---|
| Phishing | Purge emails, block sender/URL, reset credentials, check for MFA token theft |
| Malware | Isolate host, collect sample, hash, sandbox, block IoCs |
| DDoS | Engage ISP/scrubbing service, rate limit, geo/ACL filtering |
| Insider threat | Involve HR/legal early, preserve evidence quietly, restrict access |
| Data breach | Determine data types and volume, legal/regulatory clocks start |
| Web compromise | Take offline or WAF block, preserve logs, check for web shells |
| Lost/stolen device | Remote wipe/lock, verify encryption, revoke certificates/tokens |

## 4. Decision Points Analysts Must Be Ready For
- **When to escalate** (critical asset, privileged account, spreading, data exfiltration).
- **Whether to monitor the attacker** vs contain immediately (needs management and legal approval).
- **Whether to notify** law enforcement, customers, regulators.
- **Whether to pay** a ransom (organizational/legal decision, not the analyst's alone).

## 5. Review Questions
1. Name the four phases. *(Preparation; Detection and Analysis; Containment, Eradication and Recovery; Post-Incident Activity)*
2. Which three factors drive prioritization? *(Functional impact, information impact, recoverability)*
3. Why keep an infected host powered on during initial isolation? *(Preserve volatile memory evidence)*
4. What comes first when collecting evidence? *(Most volatile data)*
5. What is the purpose of the lessons-learned meeting? *(Improve people, process, and technology; update the plan)*
