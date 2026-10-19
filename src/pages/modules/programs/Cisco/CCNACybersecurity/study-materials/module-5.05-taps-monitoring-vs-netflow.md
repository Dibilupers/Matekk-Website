# 5.5 Data Obtained from Taps or Traffic Monitoring and NetFlow in Network Analysis

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Compare full packet capture with flow records
- Interpret NetFlow fields
- Choose the right data source for a given investigation

## 1. Two Kinds of Network Data
- **Full packet capture (PCAP):** every bit of every packet, from TAP or SPAN.
- **Flow data (NetFlow, IPFIX, sFlow):** summarized **metadata** of each conversation.

## 2. Full Packet Capture
- **Contains:** headers **and payload**: files, credentials in cleartext, commands, DNS queries, HTTP content.
- **Strengths:** most detailed evidence; can reconstruct sessions and extract files; supports deep forensics and proof.
- **Weaknesses:** **huge storage** (a 1 Gbps link at 50% utilization generates ~5.4 TB/day), privacy and legal exposure, encrypted payload remains unreadable, slow to search.
- **Typical use:** detailed incident investigation, malware analysis, protocol debugging, signature validation.

## 3. NetFlow
- Defined as a **unidirectional** sequence of packets sharing a common set of attributes. A flow is identified by the **7-tuple** in classic NetFlow v5:
  1. Source IP address
  2. Destination IP address
  3. Source port
  4. Destination port
  5. Layer 3 protocol type
  6. Type of Service (ToS) byte
  7. Input logical interface (ifIndex)
- **Additional data:** packet count, byte count, start/end timestamps, TCP flags, next hop, AS numbers, subnet masks.
- **Versions:** v5 (fixed, IPv4), **v9** (template-based, flexible, supports IPv6), **IPFIX** (IETF standard based on v9), **sFlow** (sampled).
- **Components:** **Exporter** (router/switch) → **Collector** (stores) → **Analyzer** (reports/alerts).
- **Flow expiry:** inactive timeout, active timeout, TCP FIN/RST.
- **Strengths:** small storage footprint, long retention (months), fast searches, good for **baselining and anomaly detection**, scalable.
- **Weaknesses:** **no payload**, may be sampled (lost detail), cannot show what was transferred, only that it happened.

Sample flow record:
```
Start               Proto SrcIP:Port        DstIP:Port           Flags  Pkts  Bytes
02:14:01.220        TCP   10.1.1.50:49822   198.51.100.7:443     .AP.SF  8210  4.2 G
```

## 4. Comparison
| Characteristic | Full packet capture | NetFlow |
|---|---|---|
| Content | Headers + payload | Metadata only |
| Storage | Very high | Low |
| Retention | Days to weeks | Months to years |
| Privacy risk | High | Low |
| Evidence strength | Strongest | Supporting |
| Best for | Deep forensics, file extraction | Trends, exfiltration, scans, DDoS |
| Works with encryption | Sees headers only | Fully works (metadata unaffected) |

## 5. What Each Reveals in Common Scenarios
| Scenario | NetFlow shows | PCAP shows |
|---|---|---|
| Data exfiltration | Large outbound volume to unusual IP at odd hours | The actual files/data sent |
| Port scan | One source touching many ports/hosts with tiny flows | Probe packets, flags used |
| Beaconing C2 | Regular small flows at fixed intervals | Beacon content/protocol |
| DDoS | Massive flows from many sources | Attack packet details |
| Malware download | Flow to suspicious host and byte count | The malware binary itself |

## 6. Practical Workflow
1. Use **NetFlow** to scope: find suspicious hosts, times, and volumes.
2. Pivot to **PCAP** (if retained) for the time window and IP pair.
3. Extract artifacts, form IoCs, and block.

## 7. Review Questions
1. Which data lacks payload but scales for long retention? *(NetFlow)*
2. Name three fields of the NetFlow 7-tuple. *(Source IP, destination IP, source/destination port, protocol, ToS, input interface)*
3. Why can NetFlow still analyze encrypted traffic? *(It uses header/metadata, not content)*
4. Which is better to prove exactly what file was stolen? *(Full PCAP)*
5. What are the three NetFlow architecture components? *(Exporter, collector, analyzer)*
