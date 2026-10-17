# 5.1 Source Technologies (Mapping Events to Their Source)

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Identify which technology generated a given log or event
- Explain what each source can and cannot tell an analyst
- Choose the right source when investigating a specific question

## 1. Why Source Matters
Every alert or log line comes from a device with a particular **vantage point**. A firewall sees connection attempts, an IPS sees payload content, a proxy sees URLs and users, and an endpoint tool sees processes and files. Knowing the source tells you how much to trust the event, what it **cannot** see, and where to pivot next. Correlation across several sources (usually in a **SIEM**) produces the full picture.

## 2. Major Source Technologies

### 2.1 Firewalls (packet filter, stateful, NGFW)
- **Logs:** permit/deny, source and destination IP, ports, protocol, interface, rule matched, bytes, NAT translation, session start/end.
- **Good for:** spotting port scans, blocked inbound attempts, unusual outbound connections, policy violations.
- **Limits:** traditional firewalls do not see payload; encrypted traffic hides content; a "permit" does not mean the traffic was benign.
- **NGFW additions:** application identification, user identity, URL filtering, integrated IPS, malware detection.
- Example log: `Oct 17 02:14:05 fw01 %ASA-4-106023: Deny tcp src outside:203.0.113.5/51122 dst inside:10.1.1.20/3389 by access-group "OUTSIDE_IN"`
  - Meaning: an external host tried RDP (TCP 3389) to an internal server and was denied.

### 2.2 IDS / IPS (Network)
- **IDS:** passive copy of traffic (SPAN or tap), alerts only. **IPS:** inline, can drop or reset.
- **Detection methods:**
  - **Signature-based:** matches known patterns (fast, accurate for known threats, blind to new ones).
  - **Anomaly/behavior-based:** compares to a baseline (finds unknown threats, more false positives).
  - **Policy-based:** violates a configured policy (for example, telnet used).
  - **Reputation-based:** known-bad IPs, domains, files.
- **Alert fields:** signature ID, message, priority/severity, source/destination, ports, protocol, action taken, packet payload snippet.
- Example (Snort/Suricata style): `[1:2100498:7] GPL ATTACK_RESPONSE id check returned root [Classification: Potentially Bad Traffic] [Priority: 2] {TCP} 192.0.2.10:80 -> 10.1.1.50:49822`
  - Meaning: a web server's response contained `uid=0(root)`, a sign that a command executed on the server.

### 2.3 Network Application Control and Visibility (AVC / NBAR style)
- Classifies traffic by **application** (Facebook, BitTorrent, Dropbox) regardless of port.
- Used to enforce policy (block P2P), detect shadow IT, and find tunneling over allowed ports.

### 2.4 Proxy Logs (web security appliance)
- **Logs:** timestamp, client IP, username, URL, HTTP method, status code, bytes, category, user agent, action (allowed/blocked), malware verdict.
- **Good for:** identifying which user visited a malicious URL, downloads of executables, data uploaded to file-sharing sites, C2 over HTTP/S.
- Example: `1697508011.123 456 10.1.1.50 TCP_MISS/200 54320 GET http://bad.example.com/payload.exe - DIRECT/198.51.100.7 application/octet-stream`
  - Meaning: host 10.1.1.50 downloaded an executable from an uncommon site; investigate.

### 2.5 Antivirus / Antimalware / EDR
- **Logs:** file path, detection name, hash, action (quarantine, delete, allow), user, process, parent process.
- **Good for:** confirming whether a file was malicious and whether it was removed, plus process-level behavior on the host.
- **Limits:** only sees hosts with an agent installed; signature gaps for new malware.

### 2.6 Transaction Data (NetFlow / IPFIX / sFlow)
- Records **metadata** about conversations: source/destination IP and port, protocol, bytes, packets, timestamps, TCP flags, ToS, input interface.
- No payload. Excellent for baselining, detecting exfiltration, beaconing, scans, DDoS, and answering "who talked to whom, when, how much."

### 2.7 Other Common Sources
- **DNS logs:** queries and answers; reveal C2 domains, DGA, tunneling.
- **DHCP logs:** map IP address to MAC and hostname at a point in time (critical for attribution).
- **VPN / AAA (RADIUS, TACACS+) logs:** who authenticated, from where, when.
- **Web server and application logs:** attack attempts such as SQLi and path traversal.
- **Email security logs:** phishing, attachments, sender reputation.
- **Full packet capture (PCAP):** the most complete evidence, but storage-heavy.

## 3. Comparison Table
| Source | Sees payload? | Sees user? | Typical question it answers |
|---|---|---|---|
| Stateful firewall | No | No (NGFW: yes) | Was the connection allowed or denied? |
| IDS/IPS | Yes | No | Did the traffic match a known attack? |
| Proxy | Partly (URL/headers) | Yes | What did this user browse or download? |
| NetFlow | No | No | How much data moved and between whom? |
| AV/EDR | N/A (host) | Yes | Was a malicious file or process present? |
| DNS log | Names only | No | What domain did the host resolve? |
| DHCP log | No | No | Which device had this IP? |
| PCAP | Yes | No | Exactly what was sent? |

## 4. Mapping Exercise
1. A log line shows `GET /admin/config.php?id=1' OR '1'='1` with status 200 → **web server log or IPS alert** (SQL injection attempt).
2. A record shows 10.1.1.50 sent 4.2 GB to 198.51.100.7 over TCP 443 at 3 a.m. → **NetFlow** (possible exfiltration).
3. `Deny udp ... dst port 53` from an internal host to an unauthorized external resolver → **firewall** (possible DNS tunneling or policy violation).
4. `User jdoe downloaded invoice.exe, verdict: malicious, action: blocked` → **web proxy or secure web gateway**.

## 5. Key Exam Tips
- Know which tools are **inline vs passive**.
- Remember NetFlow = **metadata only**.
- A firewall deny is not a compromise; a firewall permit followed by an IPS alert is more interesting.
- Always confirm the **time zone** and **NTP sync** before correlating.

## 6. Review Questions
1. Which source would best tell you which user downloaded a file from a malicious URL? *(Web proxy)*
2. Which source gives conversation metadata without payload? *(NetFlow/IPFIX)*
3. What is the difference between IDS and IPS placement? *(IDS passive/out-of-band; IPS inline)*
4. Which log maps an IP address to a device at a given time? *(DHCP)*
5. Why might a firewall permit entry still be malicious? *(Firewall only checks header fields/policy, not content)*
