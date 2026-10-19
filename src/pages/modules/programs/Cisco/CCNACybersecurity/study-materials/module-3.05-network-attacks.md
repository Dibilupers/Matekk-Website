# Module 3.5 — Network Attacks: Protocol-Based, DoS, DDoS, and Man-in-the-Middle

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~75 min

## Learning objectives
- Describe common protocol-based network attacks.
- Differentiate DoS and DDoS and their main types.
- Explain man-in-the-middle (MITM) attacks and defenses.

## 1. Protocol-based attacks
They abuse how a protocol is designed to work, often because early protocols assumed trust.

| Attack | Protocol / layer | How it works | Defense |
|---|---|---|---|
| **ARP spoofing / poisoning** | ARP (L2) | Attacker sends fake ARP replies to link their MAC to another host's IP | Dynamic ARP Inspection (DAI), DHCP snooping, static ARP for critical hosts |
| **DNS spoofing / cache poisoning** | DNS | False records are inserted so victims resolve a domain to the attacker's IP | DNSSEC, secure resolvers, source port randomization, DNS monitoring |
| **DHCP spoofing / starvation** | DHCP | Rogue DHCP server hands out malicious gateway/DNS, or attacker exhausts the address pool | DHCP snooping, port security |
| **IP spoofing** | IP (L3) | Forged source address hides the sender or enables reflection | Ingress/egress filtering (BCP 38), uRPF |
| **ICMP abuse** | ICMP | Floods (ping flood), Smurf (broadcast amplification), ping of death (oversized packets, mostly historic), ICMP tunneling | Rate limits, disable directed broadcasts, filter unneeded ICMP |
| **TCP SYN flood** | TCP | Many SYNs, no final ACK, filling the half-open connection table | SYN cookies, rate limiting, connection limits |
| **TCP session hijacking** | TCP | Predicting sequence numbers or stealing a session token to take over a session | Encryption, randomized sequence numbers, short-lived tokens |
| **VLAN hopping** | 802.1Q (L2) | Switch spoofing or double tagging to reach other VLANs | Disable DTP, set ports to access mode, change native VLAN, prune trunks |
| **STP manipulation** | Spanning Tree | Attacker becomes root bridge to redirect traffic | BPDU Guard, Root Guard |
| **MAC flooding** | Switch CAM table | Fill the table so the switch floods frames like a hub | Port security |

## 2. Denial of service (DoS)
Goal: make a service **unavailable** (the A in CIA, Module 2.1). One source is DoS. Many sources is **DDoS**.

### Categories
| Type | Target | Examples |
|---|---|---|
| **Volumetric** | Bandwidth | UDP floods, DNS/NTP/memcached amplification |
| **Protocol** | State tables of servers/firewalls | SYN flood, fragmented packet attacks |
| **Application layer** | Web or app resources | HTTP GET/POST floods, slow connection attacks |

### Reflection and amplification
The attacker sends small requests with a **spoofed source** (the victim's IP) to open servers (DNS, NTP, memcached). The servers send much larger replies to the victim. Spoofing hides the attacker and amplification multiplies the traffic.

### DDoS and botnets
Thousands of compromised devices (a **botnet**) controlled by a command-and-control server send traffic together. The source IPs are many, so simple blocking fails.

### Mitigation
- Upstream scrubbing services and anycast CDNs.
- Rate limiting, SYN cookies, connection limits.
- BCP 38 / uRPF to drop spoofed traffic.
- Black hole or sinkhole routing as a last resort (it also drops legitimate traffic).
- Overprovisioned bandwidth, redundancy, and a DDoS response plan.

## 3. Man-in-the-middle (MITM)
The attacker secretly sits between two parties, reading and possibly changing traffic.

| Method | Idea | Defense |
|---|---|---|
| **ARP poisoning** | Victim sends traffic to the attacker's MAC | DAI, DHCP snooping |
| **Rogue access point / evil twin** | Fake Wi-Fi with a familiar name | WPA3/802.1X, wireless IPS, user awareness |
| **DNS spoofing** | Redirect to attacker's server | DNSSEC, trusted resolvers |
| **SSL stripping** | Downgrade HTTPS to HTTP | HSTS, HTTPS everywhere |
| **Rogue/forged certificate** | Fake certificate to decrypt TLS | Certificate validation, pinning, certificate transparency (Module 3.10) |

Result: confidentiality and integrity are lost (credentials stolen, sessions hijacked, data modified).

## 4. Detection ideas
- **ARP poisoning:** the same IP mapped to two MACs, or the gateway MAC changing.
- **SYN flood:** many half-open connections from one or many sources, few completed handshakes.
- **DDoS:** sudden traffic spike, many new sources, similar request patterns.
- **DNS poisoning:** unexpected answers, unusually short TTLs, answers differing between resolvers.

## Automation lab — SYN flood detector
```python
from collections import Counter

# (source, tcp_flag_seen) in a short observation window
events = (
    [("203.0.113.9", "S")] * 500 +
    [("10.1.1.25", "S")] * 20 +
    [("10.1.1.25", "A")] * 19
)

syn = Counter()
completed = Counter()
for src, flag in events:
    if flag == "S":
        syn[src] += 1
    elif flag == "A":
        completed[src] += 1

for src, n in syn.items():
    ratio = completed[src] / n
    if n > 100 and ratio < 0.1:
        print(f"ALERT: {src} sent {n} SYNs, only {ratio:.0%} completed (possible SYN flood)")
```
**Think:** with a DDoS, the SYNs come from many sources. How would you change the counting?

## Exam tips
- **DoS = one source. DDoS = many (botnet).** Both attack **availability**.
- Spoofed source + large replies = **reflection/amplification**.
- ARP poisoning is the classic **L2 MITM**. Defenses: **DAI + DHCP snooping**.
- SYN flood fills the **half-open** table. Defense: **SYN cookies**.

## Quick check
1. Which switch feature stops ARP poisoning?
2. What makes amplification attacks effective?
3. Which defense helps against SSL stripping?

<details><summary>Answers</summary>

1. Dynamic ARP Inspection (with DHCP snooping).
2. Small spoofed requests produce large replies sent to the victim.
3. HSTS (and HTTPS everywhere).
</details>
