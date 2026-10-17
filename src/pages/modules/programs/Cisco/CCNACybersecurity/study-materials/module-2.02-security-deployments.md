# Module 2.2 — Security Deployments

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
- Compare network, endpoint, and application security systems.
- Differentiate agent-based and agentless protection.
- Contrast legacy antivirus with modern endpoint protection.
- Explain the roles of SIEM, SOAR, and log management.

## 1. Where security controls live

| Layer | Examples | Sees | Misses |
|---|---|---|---|
| **Network** | Firewall/NGFW, IPS/IDS, web and email gateways, NAC, DNS security | Traffic crossing the sensor | Encrypted payloads, off-network devices, local host activity |
| **Endpoint (host)** | Antivirus/anti-malware, EDR/XDR, HIDS/HIPS, host firewall, disk encryption | Processes, files, registry, local connections | Devices without the agent, unmanaged IoT |
| **Application** | WAF, secure coding, SAST/DAST, input validation, API gateway | App-layer logic and requests | Attacks that never touch the app |

No single layer is enough. See Module 2.5 (defense-in-depth).

## 2. Network security
- **Firewall / NGFW:** filters by 5-tuple (Module 2.10), plus app awareness, user identity, and threat intel.
- **IDS vs IPS:** IDS is passive (copy of traffic via SPAN/TAP) and alerts. IPS is inline and can block.
- **Proxy / web security:** filters URLs, inspects downloads, enforces policy.
- **Email security:** stops phishing, spam, and malicious attachments.

## 3. Endpoint security
- **Legacy antivirus:** signature-based, scans files against known-bad hashes/patterns. Weak against new or fileless malware.
- **Next-gen AV / EDR:** adds behavior analysis, machine learning, process telemetry, rollback, and remote isolation.
- **Host firewall and HIDS/HIPS:** control and watch local traffic and system changes.

## 4. Agent-based vs agentless

| | Agent-based | Agentless |
|---|---|---|
| How | Software installed on the host | Uses network, API, or hypervisor access |
| Pros | Deep visibility, works offline, real-time response | No install, quick to roll out, good for cloud/IoT |
| Cons | Needs deployment, updates, compatibility, resources | Shallower visibility, depends on credentials/connectivity |

## 5. SIEM, SOAR, and log management
- **Log management:** collects, stores, and retains logs (syslog, Windows events). Focus: storage and search.
- **SIEM:** centralizes logs, **correlates** events, raises alerts, supports investigations and compliance. Examples: Splunk, Cisco Secure Network Analytics, Microsoft Sentinel.
- **SOAR:** **automates response** with playbooks (enrich IOC, open ticket, isolate host, block IP). It reduces analyst workload and response time.

> SIEM answers *"what is happening?"* SOAR answers *"what do we do about it, automatically?"*

## Automation lab — a mini SOAR playbook
```python
def handle_alert(alert):
    """Very small playbook: enrich, decide, act."""
    if alert["severity"] < 7:
        return "logged"
    if alert["src_ip"] in KNOWN_GOOD:
        return "ignored: known good"
    ticket = open_ticket(alert)             # your ITSM API
    block_ip(alert["src_ip"])               # firewall API call
    isolate_host(alert["host"])             # EDR API call
    return f"contained, ticket {ticket}"
```
**Think:** which steps should be automatic, and which should need a human approval? (Isolation of a production server usually needs approval.)

## Exam tips
- Passive tap/SPAN = **IDS**. Inline = **IPS**.
- "Correlates logs from many sources" = **SIEM**. "Runs playbooks" = **SOAR**.
- Agentless wins for quick coverage, agent-based wins for depth.

## Quick check
1. Which deployment can still protect a laptop that is off the corporate network?
2. A tool blocks an IP address automatically after an alert. SIEM or SOAR?
3. Why does legacy AV miss fileless malware?

<details><summary>Answers</summary>

1. Endpoint agent (EDR/AV on the host).
2. SOAR.
3. No file signature exists to match. Behavior-based detection is needed.
</details>
