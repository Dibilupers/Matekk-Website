# Module 3.2 — Data Provided by These Technologies

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
Identify the type of data each of these provides: **tcpdump, NetFlow, next-generation firewall (NGFW), application visibility and control (AVC), web content filtering, and email content filtering.**

## 1. Overview

| Technology | What it gives you | Detail level |
|---|---|---|
| **tcpdump** | Raw packets (full packet capture) | Highest |
| **NetFlow** | Flow records: who talked to whom, how much, how long | Medium (no payload) |
| **NGFW** | Connection, intrusion, file/malware, and URL events with user and app context | Medium–High |
| **AVC** | Which applications are used and how much bandwidth they take | Application-level summary |
| **Web content filtering** | URL category, reputation, allow/block decisions | Web transaction level |
| **Email content filtering** | Spam/phishing/malware verdicts, sender reputation, attachments | Email transaction level |

## 2. tcpdump
Command-line packet capture tool (uses libpcap, same capture format as Wireshark).

```bash
# capture HTTPS traffic for one host and save to a file
tcpdump -i eth0 -nn host 10.1.1.25 and port 443 -w capture.pcap

# read it back
tcpdump -nn -r capture.pcap
```
- **Data:** full headers and payload (if not encrypted): addresses, ports, flags, sequence numbers, application content.
- **Use:** deep investigation, protocol analysis, evidence.
- **Cost:** large storage, needs a SPAN/TAP position, encrypted payloads stay unreadable.

## 3. NetFlow
Summarizes **flows** (traffic sharing the same key fields) exported by routers, switches, and firewalls.

- **Typical fields:** source/destination IP, source/destination port, protocol, ToS, input interface, packet and byte counts, start/end time, TCP flags.
- **No payload.** Smaller and cheaper than packet capture.
- **Use:** traffic baselines, top talkers, detecting exfiltration, scans, beaconing, DDoS (Modules 2.9, 2.10).
- Versions and variants: NetFlow v5/v9, IPFIX (IETF standard), sFlow (sampled).

## 4. Next-generation firewall (NGFW)
Firewall plus application awareness, user identity, IPS, URL filtering, and malware protection.

- **Connection events:** allowed/blocked, with application, user, and zone.
- **Intrusion events:** IPS signature matches (for example Snort SID, priority).
- **File/malware events:** file type, SHA-256, disposition (clean/malicious/unknown).
- **URL/security intelligence events:** category and reputation.
- **Use:** policy enforcement and correlation by user and application, not only IP and port.

## 5. Application visibility and control (AVC)
Identifies applications regardless of port (for example BitTorrent over TCP/443).

- **Data:** application names, categories, usage and bandwidth per app, per user or group.
- **Control:** allow, block, or rate-limit by application.
- **Use:** shadow IT discovery, policy enforcement, finding unexpected applications.

## 6. Web content filtering
Proxies or gateways that evaluate web requests (for example Cisco Secure Web Appliance, Umbrella DNS-layer security).

- **Data:** requested URL or domain, category (gambling, malware, etc.), reputation score, user, action taken, file downloads and verdicts.
- **Use:** blocking malicious or policy-violating sites, tracing which user visited a malicious URL.

## 7. Email content filtering
Gateways that inspect email (for example Cisco Secure Email).

- **Data:** sender, recipient, subject, headers, SPF/DKIM/DMARC results, spam score, attachment type and hash, embedded URLs and their reputation, verdicts (clean, spam, phishing, malware), quarantine events.
- **Use:** stopping phishing, malware attachments, and data leaving by email. Message trace helps scope an incident ("who else got this email?").

## 8. Choosing the right data
| Question | Best source |
|---|---|
| Exactly what was in the packet? | tcpdump / full packet capture |
| Which hosts talked, for how long, how much? | NetFlow |
| Which user ran which app and was it blocked? | NGFW / AVC |
| Which malicious site did the user visit? | Web content filter / proxy |
| Who received the phishing email? | Email content filter |

## Automation lab — top talkers from flow records
```python
import csv
import io
from collections import Counter

flows = """src,dst,dport,proto,bytes
10.1.1.25,203.0.113.50,443,TCP,1200
10.1.1.25,203.0.113.50,443,TCP,1180
10.1.1.40,198.51.100.7,443,TCP,540000
10.1.1.52,10.1.2.10,445,TCP,9800
10.1.1.40,198.51.100.7,443,TCP,610000
"""

by_src = Counter()
for row in csv.DictReader(io.StringIO(flows)):
    by_src[row["src"]] += int(row["bytes"])

for host, total in by_src.most_common(3):
    print(f"{host:12} {total:>10,} bytes")
```
**Think:** this flow data cannot tell you *what* 10.1.1.40 sent. Which technology above could?

## Exam tips
- **NetFlow = metadata about conversations**, no payload. **tcpdump = everything**.
- AVC identifies the **application**, even on non-standard ports.
- NGFW adds **user and application context** to firewall logs.

## Quick check
1. Which technology records payload content?
2. Which gives per-application bandwidth usage?
3. Which technology helps find everyone who received a phishing email?

<details><summary>Answers</summary>

1. tcpdump (full packet capture).
2. AVC.
3. Email content filter (message trace).
</details>
