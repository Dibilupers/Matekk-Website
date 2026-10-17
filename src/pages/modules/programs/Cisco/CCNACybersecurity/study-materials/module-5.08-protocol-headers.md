# 5.8 Protocol Headers (Interpreting Fields for Intrusion Analysis)

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Identify the fields in Ethernet, IP, TCP, UDP, ICMP headers
- Interpret application protocol fields (DNS, HTTP, SMTP, etc.)
- Spot header anomalies that indicate attacks

## 1. Ethernet II (Layer 2)
| Field | Size | Notes |
|---|---|---|
| Destination MAC | 6 bytes | Broadcast = FF:FF:FF:FF:FF:FF |
| Source MAC | 6 bytes | Spoofing in ARP poisoning/MAC flooding |
| EtherType | 2 bytes | 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP, 0x8100 VLAN (802.1Q) |
| Payload | 46-1500 bytes | |
| FCS | 4 bytes | CRC error check |
- **Attacks:** MAC flooding, ARP spoofing, VLAN hopping (double tagging).

## 2. ARP
- Fields: hardware/protocol type, opcode (1 request, 2 reply), sender MAC/IP, target MAC/IP.
- **Gratuitous ARP** and unsolicited replies indicate **ARP poisoning** (man-in-the-middle).

## 3. IPv4 Header (min 20 bytes)
| Field | Meaning | Intrusion relevance |
|---|---|---|
| Version (4 bits) | 4 | |
| IHL | Header length (x4 bytes) | Options if > 5 |
| DSCP/ToS | QoS marking | Covert channels |
| Total Length | Packet size | |
| Identification | Fragment grouping | Fragmentation attacks |
| Flags | Reserved, **DF**, **MF** | Fragment evasion |
| Fragment Offset | Position | Overlapping fragments |
| **TTL** | Hop limit | Low TTL = traceroute; OS fingerprinting |
| **Protocol** | 1 ICMP, 6 TCP, 17 UDP, 47 GRE, 50 ESP | Tunneling |
| Header Checksum | Integrity | |
| **Source IP** | Sender | **Spoofing** |
| **Destination IP** | Receiver | |
- **Attacks:** IP spoofing, **Teardrop** (overlapping fragments), **Ping of Death** (oversized reassembly), **Land attack** (src = dst), smurf (broadcast).

## 4. IPv6 Header (40 bytes, fixed)
Version, Traffic Class, Flow Label, Payload Length, **Next Header**, **Hop Limit**, Source (128-bit), Destination (128-bit). No checksum, no fragmentation by routers. Extension headers can hide payloads. Uses **ICMPv6/NDP** instead of ARP (neighbor spoofing, rogue router advertisements).

## 5. TCP Header (min 20 bytes)
| Field | Intrusion relevance |
|---|---|
| **Source/Dest Port** | Service identification |
| **Sequence / Acknowledgment numbers** | Session hijacking, injection |
| Data Offset | Header length |
| **Flags: URG, ACK, PSH, RST, SYN, FIN** (plus CWR, ECE, NS) | Scans and floods |
| Window Size | Flow control; fingerprinting; tiny window = slow-rate attacks |
| Checksum | Integrity |
| Urgent Pointer | Rarely used |
| Options | MSS, window scale, SACK, timestamps (OS fingerprinting) |

**Three-way handshake:** SYN → SYN/ACK → ACK. **Teardown:** FIN/ACK pairs or RST.

| Flag combination | Meaning |
|---|---|
| SYN only | Connection request / SYN scan / SYN flood |
| SYN+ACK | Port open (response) |
| RST+ACK | Port closed / abort |
| FIN only | FIN scan |
| FIN+PSH+URG | Xmas scan |
| No flags | NULL scan |
| SYN+FIN | Illegal combination, evasion/crafted |

## 6. UDP Header (8 bytes)
Source Port, Destination Port, Length, Checksum. **Connectionless**, no handshake, so easy to spoof (reflection/amplification DDoS via DNS, NTP, SSDP, memcached). Closed port → ICMP "port unreachable".

## 7. ICMP
| Type | Meaning |
|---|---|
| 0 | Echo reply |
| 3 | Destination unreachable (code 3 = port unreachable) |
| 5 | Redirect (MITM risk) |
| 8 | Echo request (ping) |
| 11 | Time exceeded (traceroute) |
- **Abuse:** ping sweeps, ICMP tunneling (large/unusual payloads), covert C2, smurf, redirect attacks.

## 8. Application Protocol Fields

### DNS (UDP/TCP 53)
Transaction ID, flags (QR, opcode, AA, TC, RD, RA, RCODE), question (name, type A/AAAA/MX/TXT/NS/CNAME), answers, TTL.
- **Abuse:** DNS tunneling (long, high-entropy subdomains, many TXT queries), **DGA**, cache poisoning (guessable transaction IDs), fast-flux (very short TTL), zone transfer (AXFR) attempts.

### HTTP (80) / HTTPS (443)
- **Request:** method (GET/POST/PUT), URI, version, **Host**, **User-Agent**, Referer, Cookie, Content-Type/Length, Authorization.
- **Response:** status code (**2xx** success, **3xx** redirect, **4xx** client error, **5xx** server error), Server, Set-Cookie, Content-Type.
- **Abuse:** SQLi/XSS in URI or body, odd user agents (`sqlmap`, `curl`, `python-requests`), many 404s (forced browsing), 401/403 bursts (brute force), POST to unusual paths (webshell).
- **HTTPS/TLS:** visible metadata includes **SNI**, certificate subject/issuer, TLS version, cipher suites (JA3/JA3S fingerprints).

### SMTP (25/587), POP3 (110), IMAP (143)
- SMTP fields: `HELO/EHLO`, `MAIL FROM`, `RCPT TO`, `DATA`, headers (From, Reply-To, Received, Return-Path).
- **Abuse:** spoofed sender, mismatched Reply-To, phishing links, open relay, malicious attachments.

### Others worth recognizing
FTP (21/20, cleartext creds), Telnet (23, cleartext), SSH (22), SMB (445), RDP (3389), DHCP (67/68), SNMP (161/162), NTP (123), LDAP (389).

## 9. Header Anomalies Checklist
- Source IP is private/bogon on the internet edge (spoofing)
- Impossible flag combos (SYN+FIN, no flags)
- Fragmentation with overlaps or tiny fragments
- TTL inconsistent for one source
- Checksum errors in crafted packets
- Port/protocol mismatch (non-HTTP data on port 80)

## 10. Review Questions
1. Which IPv4 field changes with each router hop? *(TTL)*
2. Which TCP flags make an Xmas scan? *(FIN, PSH, URG)*
3. What does ICMP type 8 mean? *(Echo request)*
4. Why is UDP easy to spoof? *(Connectionless, no handshake)*
5. Which TLS-visible field shows the requested hostname? *(SNI)*
6. What EtherType indicates IPv6? *(0x86DD)*
