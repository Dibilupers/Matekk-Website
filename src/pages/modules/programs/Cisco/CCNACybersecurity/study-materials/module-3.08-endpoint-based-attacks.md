# Module 3.8 — Endpoint-Based Attacks: Buffer Overflows, Command and Control, Malware, Ransomware

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~75 min

## Learning objectives
- Describe buffer overflows and their mitigations.
- Explain command and control (C2).
- Differentiate malware types and describe the ransomware lifecycle.

## 1. Buffer overflow
A program writes more data into a fixed-size memory buffer than it can hold, overwriting adjacent memory. This can crash the program or let an attacker redirect execution.

| Type | Where |
|---|---|
| **Stack-based** | Overwrites data on the call stack (saved return address) |
| **Heap-based** | Overwrites dynamically allocated memory |

**Cause:** unsafe functions and missing bounds checks (mostly in C/C++).

**Mitigations:**
- **ASLR** (randomizes memory addresses), **DEP/NX** (data memory is not executable), **stack canaries** (detect stack overwrites).
- Safe coding: bounds checking, memory-safe languages.
- Patch management and compiler hardening.
- **Detection:** application crashes, EDR memory-protection alerts, IPS signatures for known exploits.

## 2. Command and control (C2)
After compromise, malware contacts an attacker-controlled server for instructions and to send stolen data.

| Aspect | Details |
|---|---|
| **Channels** | HTTP/HTTPS, DNS, email, cloud services and social media, custom TCP |
| **Beaconing** | Regular check-ins at fixed or jittered intervals |
| **Resilience** | Domain generation algorithms (DGAs), fast flux, redundant servers |
| **Hiding** | Encryption, blending with normal protocols, TOR, legitimate cloud services (Module 3.9) |

**Detection:**
- Regular, evenly spaced connections (beaconing), see Module 2.10.
- Connections to newly registered, low-reputation, or algorithmically generated domains.
- Many failed DNS lookups (DGA).
- Threat-intelligence matches on IPs, domains, and JA3 hashes.
- Unusual process making outbound connections (EDR).

**Response:** block at DNS/proxy/firewall, isolate the host, hunt for other hosts contacting the same destination.

## 3. Malware types

| Type | Key trait |
|---|---|
| **Virus** | Attaches to files, needs user action to spread |
| **Worm** | Self-replicates across networks without user action |
| **Trojan** | Disguised as legitimate software |
| **Rootkit** | Hides its presence at deep OS or firmware level |
| **Spyware / keylogger** | Secretly collects activity and keystrokes |
| **RAT (remote access trojan)** | Gives the attacker remote control |
| **Botnet agent (bot)** | Turns the host into part of a remotely controlled network |
| **Adware** | Unwanted ads, may track users |
| **Logic bomb** | Triggers on a condition or date |
| **Fileless malware** | Runs in memory using legitimate tools (PowerShell, WMI), few files on disk |
| **Ransomware** | Encrypts data and demands payment |
| **Cryptominer** | Uses victim resources to mine cryptocurrency |

## 4. Ransomware lifecycle
1. **Initial access:** phishing, exposed RDP/VPN, unpatched vulnerabilities, stolen credentials.
2. **Execution and persistence:** payload runs, creates scheduled tasks or services.
3. **Discovery and privilege escalation:** finds valuable data and admin accounts.
4. **Lateral movement:** spreads to servers and shares (Module 2.10).
5. **Defense evasion:** disables security tools, deletes backups and shadow copies.
6. **Exfiltration (double extortion):** steals data before encrypting.
7. **Encryption and ransom note:** files encrypted, demand displayed.

**Prevention and resilience:**
- **Offline, immutable, tested backups** (3-2-1 rule).
- Patching, MFA, closing exposed remote access.
- Network segmentation and least privilege.
- EDR with behavioral detection, application allowlisting.
- Email filtering and user training.
- Incident response plan, practiced.

**Detection indicators:** many files renamed or rewritten quickly, new file extensions, high-entropy file contents, shadow copy deletion commands, mass SMB writes, ransom note files appearing in many folders.

## 5. Mapping to the Cyber Kill Chain
Reconnaissance → Weaponization → Delivery → Exploitation (buffer overflow) → Installation (malware) → **Command and Control** → Actions on Objectives (ransomware, exfiltration).
Breaking the chain at any step stops the attack.

## Automation lab — spot encrypted files with entropy
```python
import math
import os
from collections import Counter

def entropy(data: bytes) -> float:
    """Shannon entropy in bits per byte (0 to 8)."""
    if not data:
        return 0.0
    counts = Counter(data)
    n = len(data)
    return -sum((c / n) * math.log2(c / n) for c in counts.values())

plain = b"quarterly report numbers and notes " * 100
encrypted_like = os.urandom(len(plain))

print("plain text :", round(entropy(plain), 2))
print("encrypted  :", round(entropy(encrypted_like), 2))
# Encrypted or compressed data is close to 8. Normal text is much lower.
```
**Caution:** compressed files (zip, jpg) also have high entropy, so entropy alone is a hint, not proof. Combine it with file-change rate.

## Exam tips
- Buffer overflow mitigations: **ASLR, DEP/NX, stack canaries**.
- **Beaconing** = C2 sign. **DGA** = algorithmically generated domains.
- Worm = spreads **without user action**. Virus = needs a **host file/user action**.
- Best ransomware recovery control: **offline, tested backups**.

## Quick check
1. Which mitigation randomizes memory layout?
2. What traffic pattern suggests C2?
3. Why is "double extortion" worse than encryption alone?

<details><summary>Answers</summary>

1. ASLR.
2. Regular, evenly spaced outbound connections (beaconing) to the same destination.
3. Data is stolen too, so restoring backups does not remove the threat of publication.
</details>
