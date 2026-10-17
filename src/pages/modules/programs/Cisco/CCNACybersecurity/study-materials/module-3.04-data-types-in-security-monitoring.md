# Module 3.4 — Data Types in Security Monitoring

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~50 min

## Learning objectives
Describe the uses of: **full packet capture, session data, transaction data, statistical data, metadata, and alert data.**

## 1. The six data types

| Data type | What it is | Example | Best used for |
|---|---|---|---|
| **Full packet capture (PCAP)** | Every packet, headers and payload | tcpdump/Wireshark file | Deep forensics, proving exactly what happened, malware and protocol analysis |
| **Session data** | Summary of a conversation between two endpoints | NetFlow, Zeek `conn.log` (5-tuple, bytes, duration) | Scoping an incident, finding who talked to whom and for how long |
| **Transaction data** | Application-layer request/response records | HTTP requests, DNS queries/answers, Zeek `http.log`, `dns.log` | Seeing what was asked and answered (URLs, domains, user agents) |
| **Statistical data** | Aggregates and trends | Top talkers, bytes per hour, baselines | Baselining, anomaly detection, capacity and exfiltration trends |
| **Metadata** | Data *about* the data | Timestamps, IPs, ports, TLS certificate details, file hashes, MIME types, email headers | Lightweight context, searching when content is encrypted |
| **Alert data** | Events raised by a detection tool | Snort/Suricata alert, SIEM alert, AV detection | Starting point for triage |

## 2. Trade-offs
| | Detail | Storage cost | Typical retention |
|---|---|---|---|
| Full packet capture | Highest | Very high | Short (days) |
| Transaction data | High | Medium | Medium |
| Session data | Medium | Low | Long (months) |
| Statistical data | Low | Very low | Very long |
| Metadata | Varies | Low | Long |
| Alert data | Pre-judged | Very low | Long |

> Collect lightweight data broadly and long-term. Collect heavy data (PCAP) selectively and briefly.

## 3. How they work together
1. **Alert data** says something looks wrong.
2. **Session data** shows which hosts and how much traffic.
3. **Transaction data** shows the exact URLs/domains/queries.
4. **Full packet capture** proves the content (if not encrypted).
5. **Statistical data** shows whether this is outside the normal baseline.
6. **Metadata** gives context when payloads are encrypted (certificate, SNI, hash).

## 4. Example records

**Session data (Zeek conn.log style, simplified):**
```
ts=1760000000 src=10.1.1.25 sport=49822 dst=203.0.113.50 dport=443 proto=tcp duration=62.4 orig_bytes=1200 resp_bytes=5400
```

**Transaction data (HTTP):**
```
10.1.1.25 GET /update.php?id=7731 Host: evil.example User-Agent: curl/8.0 -> 200
```

**Alert data (Snort style):**
```
[**] [1:1000001:1] Possible SSH brute force [**] [Priority: 2] {TCP} 203.0.113.9:51514 -> 10.1.1.5:22
```

**Metadata:** certificate subject, issuer, SHA-256 of a downloaded file, MIME type, TLS version.

## 5. Common mistakes
- Treating an alert as proof. It is a lead until verified with other data.
- Relying only on PCAP and running out of storage.
- Ignoring metadata when traffic is encrypted.

## Automation lab — from packets to sessions to statistics
```python
from collections import defaultdict, Counter

# (time, src, sport, dst, dport, proto, size) = full-packet-level view
packets = [
    (1.0, "10.1.1.25", 49822, "203.0.113.50", 443, "TCP", 600),
    (1.1, "10.1.1.25", 49822, "203.0.113.50", 443, "TCP", 600),
    (2.0, "10.1.1.40", 51200, "198.51.100.7", 443, "TCP", 1400),
    (2.2, "10.1.1.40", 51200, "198.51.100.7", 443, "TCP", 1400),
    (2.4, "10.1.1.40", 51200, "198.51.100.7", 443, "TCP", 1400),
]

# session data: aggregate packets by 5-tuple
sessions = {}
for t, sip, sp, dip, dp, proto, size in packets:
    key = (sip, sp, dip, dp, proto)
    s = sessions.setdefault(key, {"packets": 0, "bytes": 0, "start": t, "end": t})
    s["packets"] += 1
    s["bytes"] += size
    s["end"] = t

for key, s in sessions.items():
    print(key, s)

# statistical data: bytes per source
stats = Counter()
for (sip, *_), s in sessions.items():
    stats[sip] += s["bytes"]
print("Top talkers:", stats.most_common())
```
**Think:** which of the two views (packets or sessions) would you keep for six months?

## Exam tips
- **Session data** = who talked to whom (5-tuple, bytes, duration). **Transaction data** = what was asked and answered.
- **Statistical data** = baselines and trends. **Metadata** = data about data.
- **Alert data** is a lead, not a conclusion.

## Quick check
1. Which data type is cheapest to keep long-term yet answers "who talked to whom"?
2. Which data type proves the exact payload content?
3. A DNS query log is which data type?

<details><summary>Answers</summary>

1. Session data (for example NetFlow).
2. Full packet capture.
3. Transaction data.
</details>
