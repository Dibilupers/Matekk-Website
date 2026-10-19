# Module 3.3 — Impact of These Technologies on Data Visibility

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
Describe how each of these affects what a security analyst can see: **access control lists (ACL), NAT/PAT, tunneling, TOR, encryption, P2P, encapsulation, and load balancing.**

## 1. Overview

| Technology | Effect on visibility | Compensation |
|---|---|---|
| **ACL** | Dropped traffic never reaches sensors behind it; only logged entries produce records | Log denies (`log` keyword), monitor at the edge and inside |
| **NAT/PAT** | Hides real internal IPs and ports behind a shared address | Correlate NAT translation logs with flow/firewall logs |
| **Tunneling** | Hides inner traffic inside outer protocol | Inspect at tunnel endpoints, baseline protocols |
| **TOR** | Hides true source and destination through layered encryption and relays | Block or alert on known relay/exit node lists, watch for TOR-like patterns |
| **Encryption** | Hides payload content | Metadata, TLS inspection where permitted, endpoint visibility |
| **P2P** | Uses dynamic ports and many peers, bypasses central controls | Application identification (AVC), policy blocking, flow analysis |
| **Encapsulation** | Inner headers hidden from tools reading only outer headers | Tools that decode the encapsulation (GRE, IPsec, VXLAN) |
| **Load balancing** | Client sees a virtual IP, servers see the balancer's IP | Log the original client (X-Forwarded-For), monitor behind the balancer |

## 2. ACLs
- Filter by IP, port, and protocol. They are stateless packet filters (standard/extended ACLs on routers) or stateful on firewalls.
- **Visibility effect:** blocked packets are dropped, so a sensor *downstream* never sees them. A deny without logging leaves no record.
- Example (Cisco IOS style):
```
access-list 110 deny tcp any any eq 23 log
access-list 110 permit ip any any
```
The `log` keyword creates evidence of Telnet attempts.

## 3. NAT and PAT
- **NAT** translates one address to another. **PAT** (overload) maps many internal hosts to one public IP using unique source ports.
- **Visibility effect:** external logs show only the public IP and translated port. You cannot tell which internal host caused the activity without the translation table.
- **Fix:** collect NAT logs with timestamps and match on (public IP, translated port, time).

## 4. Tunneling
- Wraps one protocol inside another (GRE, IPsec, SSH, VPN, DNS or HTTP tunnels).
- **Visibility effect:** inspection tools see the outer protocol only. Attackers abuse this to hide data (Module 3.9).

## 5. TOR (The Onion Router)
- Traffic passes through at least three relays (entry, middle, exit), each layer encrypted, so no single relay knows both source and destination.
- **Visibility effect:** the true client and destination are hidden. You see a connection to a TOR relay, not the real endpoint.
- **Security view:** legitimate privacy tool, but also used for hiding malware C2 and exfiltration. Many enterprises block it or alert on it.

## 6. Encryption
- TLS, SSH, IPsec, and disk encryption protect confidentiality (Module 2.1).
- **Visibility effect:** IDS/IPS and DLP cannot read encrypted payloads. See Module 2.8 and Module 3.9.
- **What remains visible:** IPs, ports, volumes, timing, and handshake details (SNI, certificate, cipher suite, JA3).

## 7. P2P (peer-to-peer)
- Many hosts exchange data directly (file sharing, some messaging and streaming, botnets).
- **Visibility effect:** no central server to monitor, dynamic ports, many external peers. Risks include data leakage, malware, and bandwidth abuse.

## 8. Encapsulation
- Adds new headers around original packets (GRE, IPsec, VXLAN, 802.1Q).
- **Visibility effect:** a sensor that reads only the outer IP header misses the inner flow. Analyst tools must decapsulate to see the real conversation.

## 9. Load balancing
- Distributes client requests across servers behind a virtual IP.
- **Visibility effect:**
  - Clients appear to talk to one VIP, not the real server.
  - Servers see the load balancer's address as the client unless the original IP is passed on (for example the `X-Forwarded-For` header).
  - One logical session may touch several servers, so logs are split.
- **Fix:** consistent logging on both sides, preserve client IP, centralize logs.

## 10. Summary rule
Anything that **hides, rewrites, wraps, or distributes** traffic reduces visibility. Plan sensor placement and log sources so you can still reconstruct who did what.

## Automation lab — resolve the real host behind PAT
```python
nat_table = {
    ("198.51.100.10", 40001): "10.1.1.25",
    ("198.51.100.10", 40002): "10.1.1.40",
}

external_alert = {
    "src": "198.51.100.10",
    "sport": 40002,
    "dst": "203.0.113.50",
    "dport": 443,
}

internal = nat_table.get((external_alert["src"], external_alert["sport"]))
print("Internal host behind the alert:", internal or "unknown, check NAT log time window")
```
**Think:** why does the timestamp matter when matching NAT logs?

## Exam tips
- NAT/PAT: use **NAT logs** to find the true internal host.
- Encryption/TOR/tunneling hide **content or identity**. Rely on metadata and endpoint data.
- Load balancers: preserve the **client IP** in headers/logs.

## Quick check
1. Why can a downstream sensor miss traffic blocked by an ACL?
2. Which data lets you identify the host behind a PAT address?
3. Why does TOR reduce visibility?

<details><summary>Answers</summary>

1. The ACL dropped the packets before they reached the sensor.
2. The NAT/PAT translation log, matched by address, port, and time.
3. Layered relays hide the real source and destination.
</details>
