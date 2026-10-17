# 5.7 Key Elements in an Intrusion from a Given PCAP File

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Identify the key elements an analyst extracts from a capture
- Reconstruct an attack timeline
- Produce a concise findings summary with IoCs

## 1. Key Elements to Identify
| Element | Question it answers | Where to find it |
|---|---|---|
| **Source IP** | Who started it? | IP header, Conversations |
| **Destination IP** | Who was targeted? | IP header |
| **Source port** | Client-side process/socket | TCP/UDP header |
| **Destination port** | Which service was targeted | TCP/UDP header |
| **Protocol** | How they communicated | Protocol Hierarchy |
| **Timestamps** | When and for how long | Frame time |
| **Payload / content** | What was sent | Follow stream |
| **Artifacts** | Files, hashes, URLs, domains | Export Objects |
| **Flags / behavior** | Scan? flood? handshake? | TCP flags |

## 2. Workflow in Wireshark
1. **Statistics → Capture File Properties:** duration, packet count, hashes.
2. **Statistics → Protocol Hierarchy:** which protocols dominate; unusual protocols stand out.
3. **Statistics → Conversations / Endpoints:** top talkers by bytes and packets; sort by bytes to find exfiltration.
4. **Statistics → I/O Graph:** spikes in time.
5. **Expert Information:** retransmissions, resets, malformed packets, warnings.
6. Apply filters, follow streams, export objects.
7. Build the **timeline** and map to attack stages.

## 3. Reading Attack Patterns in a PCAP

### 3.1 Reconnaissance: Port Scan
- Many SYN packets from one source to many destination ports/hosts.
- Closed ports reply **RST/ACK**; open ports reply **SYN/ACK**.
- Filter: `tcp.flags.syn == 1 && tcp.flags.ack == 0`
- Variants: SYN (half-open), FIN, Xmas (FIN+PSH+URG), NULL (no flags), UDP scan (ICMP port unreachable replies).

### 3.2 Exploitation
- Suspicious HTTP requests: SQLi (`' OR 1=1`, `UNION SELECT`), directory traversal (`../`), command injection (`;cat /etc/passwd`), shellcode/NOP sleds (`\x90\x90`).
- Unexpected large inbound request to a service followed by a new outbound connection (reverse shell).

### 3.3 Command and Control (C2)
- Periodic small connections (beaconing), long-lived sessions, DNS queries to random-looking domains (DGA), unusual user agents, traffic on uncommon ports.

### 3.4 Lateral Movement
- Internal-to-internal SMB (445), RDP (3389), WinRM (5985/5986), SSH (22), RPC (135), unusual admin protocols.

### 3.5 Exfiltration
- Large outbound transfers to uncommon external IPs, FTP/HTTP POST uploads, DNS or ICMP tunneling (oversized or repeated queries/echo payloads).

### 3.6 Denial of Service
- Floods of SYN, UDP, ICMP, or HTTP from one or many sources; many half-open connections.

## 4. Useful Filters
```
ip.addr == 203.0.113.5
tcp.port == 4444
dns.qry.name contains "xyz"
http contains "passwd"
tcp.flags.syn==1 && tcp.flags.ack==0
icmp.type == 8
frame.time >= "2026-10-17 02:00:00"
```

## 5. Sample Findings Report
```
Capture: incident_1017.pcap  (SHA-256 recorded)
Duration: 00:14:32   Packets: 48,210

Timeline (UTC):
02:14:01  203.0.113.5 begins SYN scan of 10.1.1.0/24 (ports 1-1024)
02:15:30  203.0.113.5 -> 10.1.1.20:80  SQLi attempts against /login.php
02:17:12  10.1.1.20 -> 203.0.113.5:4444  outbound connection (reverse shell)
02:20:45  10.1.1.20 -> 198.51.100.7:443  4.2 GB upload (exfiltration)

Key elements:
  Attacker IP : 203.0.113.5
  Victim IP   : 10.1.1.20 (web server)
  Services    : HTTP/80, outbound TCP/4444, HTTPS/443
  IoCs        : IPs above, URI /login.php, file hash <sha256>, UA "sqlmap/1.7"
Recommendation: isolate host, block IoCs, reset credentials, patch app.
```

## 6. Good Analyst Habits
- Always note **time zone** and capture point (what the sensor could actually see).
- Distinguish **client vs server** (who initiated the SYN).
- Keep IPs **defanged** in reports (`203[.]0[.]113[.]5`).
- Hash the capture file before analyzing; work on a copy.

## 7. Review Questions
1. Which Wireshark view ranks top talkers by bytes? *(Statistics → Conversations/Endpoints)*
2. What reply does a closed TCP port give to a SYN? *(RST/ACK)*
3. What pattern suggests C2 beaconing? *(Regular interval small connections)*
4. Which flags make up an Xmas scan? *(FIN, PSH, URG)*
5. Which element tells you which service was targeted? *(Destination port)*
