# Module 2.10 — 5-Tuple Approach to Isolate a Compromised Host in a Grouped Set of Logs

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
- Name the five elements of the 5-tuple.
- Use the 5-tuple to group, filter, and pivot through logs.
- Walk through isolating a likely compromised host.

## 1. What is the 5-tuple?
Five values that identify a network flow:

| # | Field | Example |
|---|---|---|
| 1 | **Source IP** | 10.1.1.25 |
| 2 | **Source port** | 49822 |
| 3 | **Destination IP** | 203.0.113.50 |
| 4 | **Destination port** | 443 |
| 5 | **Protocol** | TCP |

Firewalls, IDS/IPS, and NetFlow use these to define "a conversation". NetFlow v5 adds more (ToS, input interface), but the 5-tuple is the core.

## 2. Why it helps an investigation
- **Group** thousands of log lines into flows.
- **Pivot:** from one suspicious flow to every flow involving that source or destination.
- **Scope:** which hosts talked to the bad destination? What else did the suspect host contact?
- **Evidence:** a timeline of connections for the incident report.

## 3. Sample logs

| Time | Src IP | Src port | Dst IP | Dst port | Proto | Bytes |
|---|---|---|---|---|---|---|
| 10:01:02 | 10.1.1.25 | 49822 | 203.0.113.50 | 443 | TCP | 1,200 |
| 10:02:02 | 10.1.1.25 | 49830 | 203.0.113.50 | 443 | TCP | 1,180 |
| 10:03:02 | 10.1.1.25 | 49841 | 203.0.113.50 | 443 | TCP | 1,210 |
| 10:05:10 | 10.1.1.40 | 51200 | 198.51.100.7 | 443 | TCP | 54,000 |
| 10:06:15 | 10.1.1.25 | 50100 | 10.1.2.10 | 445 | TCP | 9,800 |
| 10:06:20 | 10.1.1.25 | 50101 | 10.1.2.11 | 445 | TCP | 9,700 |

**Observations:** 10.1.1.25 beacons to 203.0.113.50 about every minute (C2 pattern), then connects to several internal hosts on SMB 445 (possible lateral movement).

## 4. Step-by-step method
1. **Identify the trigger:** an IDS alert, threat-intel match, or anomaly. Note its 5-tuple.
2. **Pivot on source IP:** list every flow from that host in the time window.
3. **Pivot on destination:** who else contacted the suspicious IP/port?
4. **Look for patterns:** beaconing intervals, port scans (one source, many dst ports/IPs), unusual protocols.
5. **Build the timeline** and decide scope (which hosts?).
6. **Confirm on the host:** EDR/process data tells you *which process* made the connection.
7. **Contain:** quarantine VLAN via NAC (for example Cisco ISE), ACL/firewall block, EDR isolation.
8. **Record and recover:** document findings, eradicate, restore, and update detections.

## 5. Pitfalls
- **NAT:** logs outside the NAT show the public IP. Correlate with NAT translation logs to find the real internal host.
- **DHCP:** an IP may belong to different devices at different times. Map IP → MAC → device using DHCP logs.
- **Time sync:** unsynchronized clocks break your timeline.
- **Source port is ephemeral:** it changes per connection, so group by the other four fields (and use source port to identify individual sessions).

## Automation lab — group flows and spot beaconing
```python
from collections import defaultdict

logs = [
    ("10:01:02", "10.1.1.25", 49822, "203.0.113.50", 443, "TCP"),
    ("10:02:02", "10.1.1.25", 49830, "203.0.113.50", 443, "TCP"),
    ("10:03:02", "10.1.1.25", 49841, "203.0.113.50", 443, "TCP"),
    ("10:06:15", "10.1.1.25", 50100, "10.1.2.10", 445, "TCP"),
    ("10:06:20", "10.1.1.25", 50101, "10.1.2.11", 445, "TCP"),
    ("10:05:10", "10.1.1.40", 51200, "198.51.100.7", 443, "TCP"),
]

# group by (src, dst, dst port, proto): ignore ephemeral source port
flows = defaultdict(list)
for t, sip, sp, dip, dp, proto in logs:
    flows[(sip, dip, dp, proto)].append(t)

for key, times in flows.items():
    if len(times) >= 3:
        print("Possible beaconing:", key, times)

# lateral movement: one source reaching many internal hosts on SMB
smb_targets = defaultdict(set)
for t, sip, sp, dip, dp, proto in logs:
    if dp == 445:
        smb_targets[sip].add(dip)
for src, targets in smb_targets.items():
    if len(targets) >= 2:
        print("Possible lateral movement from", src, "->", sorted(targets))
```

## Exam tips
- 5-tuple = **src IP, src port, dst IP, dst port, protocol**.
- Used to **correlate** events and isolate which host is the source.
- One source hitting many destination ports = **port scan**. Regular intervals = **beaconing**.

## Quick check
1. List the five elements.
2. Why group by destination IP and port instead of source port?
3. The suspect IP sits behind NAT. What extra log do you need?

<details><summary>Answers</summary>

1. Source IP, source port, destination IP, destination port, protocol.
2. Source ports are ephemeral and change on every connection.
3. NAT translation logs (and DHCP logs if addresses are dynamic).
</details>
