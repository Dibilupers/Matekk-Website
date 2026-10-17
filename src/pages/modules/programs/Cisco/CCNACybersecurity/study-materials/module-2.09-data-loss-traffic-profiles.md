# Module 2.9 — Potential Data Loss from Traffic Profiles

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~50 min

## Learning objectives
- Explain what a traffic profile (baseline) is.
- Recognize traffic patterns that indicate data exfiltration.
- Name tools and controls that detect or prevent data loss.

## 1. Traffic profiles
A **traffic profile** (baseline) describes what normal looks like for a network, host, or user: volumes, protocols, ports, destinations, and times. Deviations from the baseline are leads for investigation.

Profile dimensions:
- **Volume:** bytes/packets per host per hour or day.
- **Direction:** inbound vs outbound ratio.
- **Protocols/ports:** which services each host normally uses.
- **Destinations:** usual internal/external peers.
- **Timing:** business hours vs off-hours, regular intervals.

Data sources: **NetFlow/IPFIX**, firewall logs, proxy logs, DNS logs, full packet capture.

## 2. Exfiltration indicators

| Indicator | What it looks like | Possible cause |
|---|---|---|
| **Large outbound transfer** | A workstation sends GBs to an external IP | Bulk data theft |
| **Off-hours activity** | Transfers at 03:00 | Automated or attacker activity |
| **Unusual destinations** | First-time contact with a rare country/host, personal cloud storage | Staging or drop site |
| **Unusual protocol/port use** | Big FTP, SSH, or HTTPS uploads from a host that never does them | Alternate channel |
| **DNS tunneling** | Very long/random subdomains, huge DNS volume, many TXT queries | Data hidden in DNS |
| **ICMP/other covert channels** | Oversized or frequent ICMP payloads | Data in ping packets |
| **Beaconing** | Regular, evenly spaced small connections | C2 check-ins |
| **Compression/encryption before send** | Archive staging then upload | Prepared exfil |
| **Insider patterns** | Mass downloads, USB use, email to personal accounts | Malicious or careless insider |

## 3. Detecting it
- Compare current flows against the **baseline** and alert on thresholds or statistical deviation (see Module 2.11).
- Watch **top talkers** (hosts with the highest byte counts) and **outbound/inbound ratios**.
- Track **new external destinations** per host.
- Combine sources: flow data to spot the transfer, proxy/DNS logs for context, endpoint logs for the process responsible.

## 4. Preventing it
- **DLP** (network, endpoint, and email DLP): content inspection, labels, blocking.
- **Egress filtering:** default-deny outbound, allow only what is needed.
- **Proxy/DNS security:** block newly seen or malicious domains, inspect DNS for tunneling.
- **Least privilege and segmentation** (Modules 2.3, 2.5) limit what can be reached.
- **Encryption and rights management** make stolen data less useful.
- **USB/removable media control and CASB** for cloud storage.

## 5. Caveats
- Encrypted traffic hides content (Module 2.8). Rely on metadata.
- Legitimate spikes happen (backups, software updates), so profiles need context and tuning.
- A bad baseline (built while already compromised) bakes in the attacker's behavior.

## Automation lab — flag unusual outbound volume
```python
import statistics

# bytes sent outbound per host over the last 7 days (hourly average)
history = {"pc-01": [120, 110, 130, 125, 118, 122, 119],
           "pc-02": [90, 95, 88, 92, 91, 94, 89]}
today = {"pc-01": 124, "pc-02": 5200}

for host, vals in history.items():
    mean = statistics.mean(vals)
    sd = statistics.pstdev(vals) or 1
    z = (today[host] - mean) / sd
    if z > 3:
        print(f"ALERT {host}: z={z:.1f}, investigate outbound traffic")
```
Which host is flagged? What other data would you pull to decide whether it is exfiltration or a backup job?

## Exam tips
- A **baseline** is required to call something abnormal.
- DNS tunneling and beaconing are classic exfil/C2 patterns.
- Flow data shows *that* data left. Content inspection (DLP) shows *what* left.

## Quick check
1. What is the most direct control to limit what can leave the network?
2. A host sends tiny packets to the same IP every 60 seconds. Pattern name?
3. Why is a baseline built during an active breach risky?

<details><summary>Answers</summary>

1. Egress filtering (plus DLP).
2. Beaconing (likely command-and-control).
3. It records attacker behavior as "normal", hiding the anomaly.
</details>
