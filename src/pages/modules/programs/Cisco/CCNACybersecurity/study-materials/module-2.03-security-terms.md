# Module 2.3 — Security Terms

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
Describe: threat intelligence, threat hunting, malware analysis, threat actor, run book automation (RBA), reverse engineering, sliding window anomaly detection, principle of least privilege, zero trust, and network access control (NAC).

## Glossary with context

| Term | Definition | Example |
|---|---|---|
| **Threat intelligence (TI)** | Evidence-based knowledge about threats (indicators, actors, TTPs) that supports decisions | Feeds of malicious IPs/domains/hashes; Cisco Talos; MITRE ATT&CK mappings |
| **Threat hunting** | *Proactive*, hypothesis-driven search for threats that evaded automated detection | "If an attacker used PowerShell for persistence, we should see encoded commands" → search endpoints |
| **Malware analysis** | Studying malware to learn what it does, how it spreads, and how to detect/remove it | **Static** (inspect without running) and **dynamic** (run in a sandbox and observe) |
| **Threat actor** | Person or group behind an attack | Nation-state, cybercriminal, hacktivist, insider |
| **Run book automation (RBA)** | Codifying a procedure so a tool executes it automatically | Auto-collect logs and quarantine a host when ransomware indicators fire (the idea behind SOAR) |
| **Reverse engineering** | Taking a program apart (disassembly/decompiling) to learn how it works without source code | Using a disassembler to find the C2 address in a malware sample |
| **Sliding window anomaly detection** | Evaluating activity over a moving time window and flagging values that deviate from normal | Alert if failed logins in the *last 5 minutes* exceed a threshold |
| **Principle of least privilege** | Give users/processes only the access needed for their job, no more | Helpdesk can reset passwords but cannot edit firewall rules |
| **Zero trust** | "Never trust, always verify": no implicit trust based on network location; verify identity, device health, and context for every request | Per-request authentication and micro-segmentation even inside the LAN |
| **Network access control (NAC)** | Policy enforcement that decides if a device may join the network and with what access | Cisco ISE with 802.1X puts non-compliant laptops in a quarantine VLAN |

## Threat actor types
- **Nation-state/APT:** well-funded, patient, targeted.
- **Cybercriminal:** profit-driven (ransomware, fraud).
- **Hacktivist:** ideology-driven.
- **Insider:** malicious or negligent employee.
- **Script kiddie:** low skill, uses existing tools.

## How these fit together
TI feeds hunting and detection → hunts find new indicators → malware analysis and reverse engineering explain them → results become TI and RBA playbooks. Least privilege, zero trust, and NAC reduce what an attacker can do once they are in.

## Automation lab — sliding window detector
```python
from collections import deque
import time

WINDOW = 300          # seconds
THRESHOLD = 10
events = deque()

def failed_login(now=None):
    now = now or time.time()
    events.append(now)
    while events and events[0] < now - WINDOW:   # slide the window
        events.popleft()
    if len(events) > THRESHOLD:
        print("ALERT: possible brute force")
```
Change `WINDOW` and `THRESHOLD`. What happens to false positives when the window is too wide? Too narrow?

## Exam tips
- Hunting is **proactive**. Alerting is **reactive**.
- **Static** analysis = no execution. **Dynamic** = executed in a sandbox.
- Zero trust is about *verification*, not about removing the firewall.

## Quick check
1. Which term describes automating a documented response procedure?
2. An analyst hypothesizes persistence via scheduled tasks and searches for it with no alert. What is this?
3. NAC puts an unpatched laptop in a remediation VLAN. Which principle supports that decision?

<details><summary>Answers</summary>

1. Run book automation (RBA).
2. Threat hunting.
3. Zero trust and NAC posture checking (verify device health before granting access).
</details>
