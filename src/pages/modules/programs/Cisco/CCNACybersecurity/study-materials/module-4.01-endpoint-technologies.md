# 4.1 Endpoint Technologies for Security Monitoring

**Domain 4.0 Host-Based Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Describe the endpoint technologies used for host-based security monitoring
- Compare their strengths, limits, and where they sit in a layered defense

## 1. Why Endpoints Matter
Endpoints (laptops, servers, phones, IoT) are where users, data, and malware meet. Network tools can't see inside encrypted traffic or local activity, so **host-based** tools fill the gap. Defense in depth means no single tool is trusted alone.

## 2. Core Technologies

### Host-Based Intrusion Detection / Prevention (HIDS / HIPS)
| | HIDS | HIPS |
|---|---|---|
| Action | Detects and alerts | Detects **and blocks** |
| Monitors | Logs, file integrity, system calls, registry changes | Same, plus active enforcement |
| Risk | Passive, so damage may already be done | False positives can break legitimate apps |

- Detection methods: **signature-based**, **anomaly-based**, **policy-based**, **heuristic**.
- Example tools: Cisco Secure Endpoint, OSSEC, Tripwire (file integrity).

### Antimalware / Antivirus
- Signature scanning, heuristics, behavior monitoring, and cloud reputation.
- Weakness: zero-days and polymorphic malware evade signatures.

### Host-Based Firewall
- Filters traffic by **application, port, protocol, and direction** on the device itself (Windows Defender Firewall, iptables/nftables, ufw).
- Controls east-west traffic that a perimeter firewall never sees.

### Application-Level Allow Listing / Block Listing
- **Allow list (whitelist):** only approved apps run. Strongest, but high admin overhead.
- **Block list (blacklist):** known-bad apps are denied. Easier, but only stops what you already know about.
- Examples: AppLocker, Windows Defender Application Control.

### Systems-Based Sandboxing
- Runs apps in an isolated environment so a compromise cannot reach the rest of the host.
- Examples: browser sandboxes (Chrome), Adobe Reader Protected Mode, Java sandbox, Windows Sandbox.

## 3. Related Concepts
- **EDR/XDR:** continuous endpoint telemetry, threat hunting, and response.
- **Telemetry** is forwarded to a SIEM for correlation.
- **Limitations:** agent overhead, endpoints can be tampered with if attacker gains admin, visibility only where agents are installed.

## 4. Quick Memory Aid
**HIDS = alarm, HIPS = alarm + guard.** Allow list = guest list at the door. Sandbox = quarantine room.

## 5. Review Questions
1. Which tool can both detect and block malicious host activity? *(HIPS)*
2. Which approach permits only approved software? *(Allow listing)*
3. Why can a host-based firewall catch threats a perimeter firewall misses? *(Internal/east-west traffic and per-application control)*
4. What does a sandbox protect against? *(Compromise of one app spreading to the OS)*
