# 6.7 Elements Used for Network Profiling

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Define network profiling and baselining
- Describe the four classic profile elements: total throughput, session duration, ports used, and critical asset address space
- Use profiles to detect anomalies

## 1. What Is Network Profiling?
Network profiling is documenting **normal** network behavior (a **baseline**) so deviations stand out. Without a baseline, you cannot tell "unusual" from "usual." Profiles are built from NetFlow, SNMP, packet capture, firewall logs, and monitoring tools over a representative period (including peaks such as month-end).

## 2. Why Profile?
- Detect **anomalies** (exfiltration, DDoS, scanning, rogue devices, C2 beaconing).
- Support **capacity planning** and troubleshooting.
- Provide context during **incident analysis** (is this traffic normal?).
- Reduce **false positives** by tuning thresholds to reality.
- Provide **evidence of deviation** after a change.

## 3. The Four Profile Elements

### 3.1 Total Throughput
- **Definition:** the amount of data passing from a given source to a given destination in a given period (bits/sec, bytes per hour/day).
- **How measured:** NetFlow, SNMP interface counters, probes, bandwidth monitors.
- **Baseline questions:** Peak and average? Time-of-day and day-of-week patterns? Which top talkers?
- **Anomalies:** sudden large **outbound** spikes (**exfiltration**), **inbound flood** (DDoS), unusually flat traffic at all hours (automated), traffic where none should exist.
- **Example:** workstation averages 50 MB/day to the internet; today 8 GB to one IP at 03:00 → investigate.

### 3.2 Session Duration
- **Definition:** time between establishment and teardown of a data flow.
- **How measured:** flow start/end times, firewall/session logs.
- **Baseline:** typical web sessions are short; SSH/VPN sessions may be long; database connections persistent.
- **Anomalies:**
  - **Very long sessions** from unusual hosts (C2, remote shells, tunnels).
  - **Many extremely short sessions** (scans, SYN floods, probing).
  - **Regular, periodic sessions** (**beaconing**).
  - Sessions outside business hours.
- **Example:** a workstation holds a 14-hour TCP session to an unknown host on 443 → possible C2 channel.

### 3.3 Ports Used
- **Definition:** the TCP/UDP ports that applications and devices **listen on and use**.
- **How measured:** port scans (Nmap), `netstat`, flow data, firewall logs, service inventories.
- **Baseline:** approved services per segment (web 80/443, DNS 53, SSH 22, SMB 445).
- **Anomalies:**
  - **New open/listening ports** on servers (backdoors, malware listeners such as 4444).
  - **Protocol/port mismatch** (non-HTTP on 80).
  - Use of **unauthorized services** (telnet, FTP, IRC, P2P, remote admin tools).
  - Connections to **high, random ports** outbound.
- **Reference:** well-known 0-1023, registered 1024-49151, dynamic/ephemeral 49152-65535.

### 3.4 Critical Asset Address Space
- **Definition:** the **IP addresses or subnets of critical assets** (servers, databases, domain controllers, payment systems, OT/ICS) and the **services they run**, which require added monitoring and protection.
- **How built:** asset inventory/CMDB, classification, network diagrams, segmentation.
- **Use:** define **who should talk to critical assets** (allowed sources, protocols), apply tighter alerting, and set escalation priority.
- **Anomalies:** unexpected hosts connecting to critical subnets, outbound connections from critical servers to the internet, scans against critical address space, admin protocols from non-admin segments.
- **Example:** a guest Wi-Fi subnet attempts RDP to the finance database VLAN → high-priority alert.

## 4. Summary Table
| Element | What it measures | Typical tool | Red flag example |
|---|---|---|---|
| Total throughput | Data volume over time | NetFlow, SNMP | 8 GB upload at 3 a.m. |
| Session duration | How long flows last | Flow/session logs | Persistent session to unknown IP |
| Ports used | Active/allowed services | Nmap, netstat, flow | New listener on 4444 |
| Critical asset address space | Where high-value systems live and who accesses them | CMDB, flow, firewall | Unauthorized subnet accessing DB |

## 5. Additional Profiling Attributes
- **Protocol mix** (HTTP, DNS, SMB ratios), **top talkers/listeners**, **geolocation** of external peers, **packet size distribution**, **time-of-day patterns**, **number of connections per host**, **DNS query volume/types**, **user-to-device mapping**.

## 6. Building and Using a Baseline
1. **Define scope** (segments, assets).
2. **Collect** data over a **meaningful period** (weeks) covering cycles.
3. **Analyze and document** normal ranges (averages, peaks, thresholds).
4. **Alert on deviation** (static thresholds, standard deviation, machine learning).
5. **Review and update** after changes (new apps, mergers, seasonal shifts); stale baselines produce false alerts.
6. **Protect the baseline data** (attackers can poison slow-changing baselines through "low and slow" activity).

## 7. Limits
- Baselines assume the collection period was **clean** (a compromised baseline hides attackers).
- Encrypted traffic limits visibility (metadata only).
- Normal behavior changes; false positives during legitimate events (software roll-outs, backups).

## 8. Review Questions
1. Name the four profile elements. *(Total throughput, session duration, ports used, critical asset address space)*
2. What might an unusually long session indicate? *(C2 channel, tunnel, or remote shell)*
3. Why monitor "ports used"? *(Detect unauthorized services and backdoors)*
4. What tool measures bytes between hosts without payload? *(NetFlow)*
5. Why must baselines be refreshed? *(Normal behavior changes over time)*
