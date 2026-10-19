# Module 2.5 — Defense-in-Depth Strategy

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~40 min

## Learning objectives
- Describe the principles of defense in depth.
- Map layered controls to the assets they protect.
- Explain why single points of failure are avoided.

## 1. The idea
Use **multiple, overlapping layers** of controls so that if one layer fails or is bypassed, others still protect the asset. Think of a castle: moat, wall, gate, guards, locked inner room.

## 2. Core principles
- **Layering:** several different controls, not several copies of the same one.
- **Diversity:** different vendors/technologies/techniques so one flaw does not break every layer.
- **Least privilege:** limit what each user/system can reach (Module 2.3).
- **Segmentation:** contain breaches (VLANs, ACLs, micro-segmentation).
- **Fail-safe defaults:** deny unless explicitly permitted.
- **Detect and respond, not only prevent:** assume breach, monitor, and be ready to act.

## 3. People, technology, operations
Cisco-style framing of what a complete defense needs:
- **People:** training, awareness, clear roles, background checks.
- **Technology:** the technical controls below.
- **Operations:** policies, procedures, patch management, incident response, audits.

## 4. Layers and example controls

| Layer | Purpose | Example controls |
|---|---|---|
| **Physical** | Stop physical access | Locks, badges, cameras, cages |
| **Perimeter** | Filter traffic at the edge | NGFW, IPS, DMZ, email/web gateways |
| **Network** | Limit lateral movement | VLANs, ACLs, 802.1X/NAC, port security, internal firewalls |
| **Host / endpoint** | Protect devices | EDR/AV, host firewall, hardening, patching, disk encryption |
| **Application** | Protect software | WAF, secure SDLC, input validation, app allowlisting |
| **Data** | Protect the information itself | Encryption, DLP, backups, classification |
| **Identity** | Verify who is acting | MFA, SSO, least privilege, privileged access management |
| **Monitoring and response** | See and react | SIEM, SOAR, IR plan, threat hunting |

## 5. Worked example — phishing attack on an employee
1. **Email gateway** blocks the known-bad sender (layer 1). *Missed.*
2. **User training**: the employee hesitates but clicks (layer 2). *Failed.*
3. **Web proxy / DNS security** blocks the malicious domain (layer 3). *Missed.*
4. **EDR** detects suspicious process behavior and isolates the laptop (layer 4). *Stopped.*
5. **Segmentation + least privilege** would have limited the damage anyway (layer 5).

No single control had to be perfect.

## Common mistakes
- Piling up many tools of the *same* type (no real diversity).
- Strong perimeter, flat internal network.
- Prevention only, with no monitoring or response.

## Exam tips
- Defense in depth = **layers + diversity**. Not "one very strong firewall".
- "Compromise of one control does not compromise the asset" is the textbook goal.
- Segmentation is the layer that limits **lateral movement**.

## Quick check
1. Two firewalls from the same vendor with the same rules in series: good depth?
2. Which layer limits an attacker's lateral movement after a host is infected?
3. Which part of "people, technology, operations" covers patch policies?

<details><summary>Answers</summary>

1. Weak depth: no diversity, same flaw bypasses both.
2. Network segmentation (plus least privilege).
3. Operations.
</details>
