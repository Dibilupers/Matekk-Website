# Module 3.9 — Evasion and Obfuscation Techniques: Tunneling, Encryption, Proxies

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
- Describe how attackers hide activity from detection.
- Explain tunneling, encryption, and proxies as evasion methods.
- Match each technique to a detection approach.

**Evasion** avoids detection or blocking. **Obfuscation** makes content hard to read or analyze. Attackers use both so signature-based tools (Module 2.11) miss them.

## 1. Tunneling
Hiding one protocol inside another that is allowed through the network.

| Tunnel | How | Detection |
|---|---|---|
| **DNS tunneling** | Data encoded into DNS queries/responses (long, random-looking subdomains, TXT records) | High DNS volume to one domain, long or high-entropy labels, unusual record types |
| **ICMP tunneling** | Data hidden in ping payloads | Oversized or frequent ICMP, payloads that change |
| **HTTP/HTTPS tunneling** | Malicious traffic wrapped in web traffic | Odd request patterns, regular timing, unusual user agents |
| **SSH tunneling / port forwarding** | Traffic forwarded through an SSH session | Long-lived SSH with heavy data volume, SSH to unusual destinations |
| **VPN / GRE / IPsec** | Encapsulation to cross controls | Unexpected tunnel endpoints, protocol 47 (GRE) or 50 (ESP) where not expected |

## 2. Encryption
- Attackers encrypt **C2 channels** and **exfiltrated data** (TLS, custom ciphers) so content inspection fails.
- Malware may be **encrypted/packed** so antivirus cannot match signatures.
- **Detection without decryption (metadata):** destination reputation, certificate details (self-signed, new, mismatched), JA3/JA3S fingerprints, session size and timing, DNS requests, endpoint behavior.
- **Where policy allows:** TLS inspection at a proxy/NGFW.

## 3. Proxies and anonymizers
| Method | Purpose |
|---|---|
| **Open or compromised proxies** | Hide the attacker's true IP |
| **TOR** | Layered relays hide source and destination (Module 3.3) |
| **VPN services** | Mask origin and encrypt traffic |
| **Domain fronting / CDN abuse** | C2 traffic looks like it goes to a trusted cloud/CDN domain |
| **Fast flux / bulletproof hosting** | Rapidly changing IPs behind one domain |

**Detection:** threat-intel lists of TOR and anonymizer IPs, unusual proxy use, mismatch between TLS SNI and the HTTP Host header, newly registered domains.

## 4. Other common techniques

| Technique | Idea | Counter |
|---|---|---|
| **Traffic fragmentation / segmentation tricks** | Split a malicious payload across packets or overlap fragments so each looks harmless to the IDS | IPS that **reassembles and normalizes** traffic before inspection |
| **Encoding and obfuscation** | Base64, hex, URL double-encoding, string splitting in scripts | Decode and normalize, script block logging |
| **Polymorphic / metamorphic malware** | Code changes on each copy so hashes and signatures differ | Behavioral detection, sandboxing |
| **Packers / crypters** | Compress or encrypt the real payload | Sandbox detonation, memory scanning |
| **Living off the land (LOLBins)** | Abuse built-in tools (PowerShell, certutil, WMI, mshta) | Command-line logging, EDR behavior rules, application control |
| **Protocol impersonation / non-standard ports** | Malware on port 443 that is not TLS | Application identification (AVC), protocol validation |
| **Low and slow / timing jitter** | Spread activity over time and randomize beacon intervals | Long-window statistics, behavioral analytics |
| **Steganography** | Hide data inside images or other files | File analysis, outbound content review, DLP |
| **Anti-analysis** | Detect sandboxes/VMs and stay dormant | Realistic sandboxes, extended detonation time |
| **Log tampering / cleaning** | Delete or alter evidence | Forward logs to a central SIEM immediately, write-once storage |

## 5. Defender strategy
- Use **multiple detection methods** together (signature + behavioral + statistical).
- Monitor **metadata** and **endpoint** behavior when payloads are hidden.
- **Normalize** traffic before inspection (reassembly, decoding).
- Centralize and protect logs.
- Baselines (Module 2.9) make unusual tunnels and beacons stand out.

## Automation lab — spot suspicious DNS labels
```python
import math
from collections import Counter

def entropy(s: str) -> float:
    counts = Counter(s)
    n = len(s)
    return -sum((c / n) * math.log2(c / n) for c in counts.values())

def suspicious(query: str) -> bool:
    label = query.split(".")[0]
    return len(label) > 30 or (len(label) > 15 and entropy(label) > 3.5)

queries = [
    "www.example.com",
    "mail.example.com",
    "aGVsbG8gd29ybGQgdGhpcyBpcyBkYXRhISE.t.bad.example",
    "x9f3kq8z1vb7m2ncl0pa4tr6.t.bad.example",
]

for q in queries:
    print("ALERT" if suspicious(q) else "ok   ", q)
```
**Think:** what legitimate DNS names might trigger false positives (CDNs, security vendors, long cloud hostnames)?

## Exam tips
- **DNS tunneling** signs: long/high-entropy subdomains, many queries to one domain.
- Encrypted traffic: use **metadata** and **endpoint** data, or TLS inspection where allowed.
- Fragmentation evasion is countered by **reassembly/normalization** in the IPS.
- LOLBins evade by using **trusted built-in tools**.

## Quick check
1. Which detection approach helps when payloads are encrypted and cannot be decrypted?
2. Why do attackers fragment packets?
3. What is "living off the land"?

<details><summary>Answers</summary>

1. Metadata and behavioral analysis (certificate details, JA3, volume, timing, endpoint telemetry).
2. To split malicious content so an IDS that inspects packets one by one misses it.
3. Using legitimate built-in tools (PowerShell, certutil, WMI) to avoid dropping detectable malware.
</details>
