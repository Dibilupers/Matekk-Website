# 5.3 Deep Packet Inspection, Packet Filtering, and Stateful Firewall Operation

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Compare packet filtering, stateful inspection, and deep packet inspection
- Read a state table and an ACL
- Explain strengths, weaknesses, and use cases

## 1. Evolution of Firewall Inspection
Packet filter → Stateful firewall → Application/Proxy firewall → NGFW with DPI. Each step adds context and cost (CPU, memory, latency).

## 2. Packet Filtering (Stateless)
- Operates at **Layers 3 and 4**.
- Examines each packet **independently** against ACL rules: source IP, destination IP, protocol, source/destination port, sometimes TCP flags (for example ACK).
- Rules evaluated **top-down, first match wins**; implicit **deny any** at the end.
- **Pros:** very fast, simple, cheap, low resource use.
- **Cons:** no memory of connections, so return traffic must be explicitly permitted; vulnerable to spoofing and fragmentation tricks; cannot see application data.

Example (Cisco ACL):
```
access-list 101 permit tcp any host 10.1.1.80 eq 80
access-list 101 permit tcp any host 10.1.1.80 eq 443
access-list 101 deny   ip any any log
```

## 3. Stateful Firewall
- Tracks the **state of connections** in a **state table** (connection table).
- Entry typically holds: source IP/port, destination IP/port, protocol, TCP state, timers, sequence numbers, interface.
- **Return traffic** is automatically allowed if it matches an existing entry initiated from a trusted side.
- Checks TCP handshake (SYN, SYN-ACK, ACK) and sequence-number validity; drops unsolicited packets that do not match any session.
- **UDP/ICMP "state":** pseudo-state using timers and matching request/reply.

Example state table:
| Proto | Src IP:Port | Dst IP:Port | State | Idle |
|---|---|---|---|---|
| TCP | 10.1.1.50:49822 | 93.184.216.34:443 | ESTABLISHED | 00:00:12 |
| UDP | 10.1.1.50:53211 | 8.8.8.8:53 | ACTIVE | 00:00:02 |

Operation flow:
1. Inside host sends SYN to outside server → firewall checks policy, creates entry.
2. Outside server returns SYN-ACK → matches entry, permitted.
3. Session proceeds; entry refreshed.
4. FIN/RST or timeout → entry removed.
5. Unsolicited inbound packet with no entry → dropped.

- **Pros:** better security than stateless, simpler rules, defeats many spoofed/unsolicited packets.
- **Cons:** state table can be exhausted (SYN flood DoS); still blind to payload.

## 4. Deep Packet Inspection (DPI)
- Looks beyond headers into the **payload and application layer (Layers 5 to 7)**.
- Capabilities: signature matching, protocol conformance checking, application identification, URL/content filtering, malware detection, data loss prevention, SSL/TLS decryption (inspect then re-encrypt).
- Used in **IPS, NGFW, DLP, web gateways, and email gateways**.
- **Pros:** detects exploits, malware, tunneling, and policy violations that header checks miss; identifies apps on non-standard ports.
- **Cons:** CPU intensive, adds latency, privacy and legal concerns when decrypting, **cannot inspect encrypted traffic without decryption**, evasion via fragmentation, obfuscation, or encoding.

## 5. Comparison Table
| Feature | Packet filter | Stateful | DPI / NGFW |
|---|---|---|---|
| OSI layers | 3-4 | 3-4 (with state) | 3-7 |
| Tracks connections | No | Yes | Yes |
| Sees payload | No | No | Yes |
| Return traffic | Needs explicit rule | Automatic | Automatic |
| Performance | Fastest | Fast | Slowest |
| Detects malware/exploits | No | No | Yes |

## 6. Evasion and Weaknesses to Know
- **Fragmentation / overlapping fragments** to hide signatures from simple inspectors.
- **Encryption (TLS)** hides payload unless decrypted.
- **Tunneling** (DNS, ICMP, HTTP) hides data inside allowed protocols.
- **IP spoofing** against stateless filters.
- **State exhaustion** through SYN floods.

## 7. Review Questions
1. Which firewall type remembers connections? *(Stateful)*
2. What layer does DPI examine that others do not? *(Application layer / payload)*
3. What happens to unsolicited inbound TCP packets with no table entry? *(Dropped)*
4. Why can DPI fail on HTTPS? *(Encrypted payload unless TLS decryption is configured)*
5. Which firewall type is fastest but least context-aware? *(Packet filter)*
