# 5.4 Inline Traffic Interrogation and Taps or Traffic Monitoring

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Distinguish inline from passive traffic collection
- Explain network TAPs and SPAN/mirror ports
- Weigh benefits, risks, and placement decisions

## 1. Two Collection Models
| Model | Position | Can block? | Failure impact |
|---|---|---|---|
| **Inline** | In the traffic path | Yes | Can cause outage |
| **Passive (out-of-band)** | Receives a copy | No | No effect on traffic |

## 2. Inline Traffic Interrogation
- The device sits **in the data path**; all packets pass through it (IPS, NGFW, proxy, inline sensor).
- **Capabilities:** drop packets, reset connections, rate limit, quarantine, rewrite, sanitize.
- **Pros:** real-time prevention, full enforcement.
- **Cons:**
  - **Single point of failure** and latency source.
  - **Fail-open** (traffic continues uninspected if device fails) vs **fail-closed** (traffic blocked if device fails). Choose by business need: availability vs security.
  - False positives directly disrupt users.
  - Must handle line-rate throughput.
- Mitigations: **bypass switches/ports**, HA pairs, clustering, "monitor mode" before enabling blocking.

## 3. Network TAP (Test Access Point)
- Dedicated hardware placed in a link that **copies all traffic** to a monitoring port.
- **Passive (copper/optical splitter):** requires no power for fiber, fail-safe.
- **Active TAP:** powered, can regenerate signal; link may fail without power unless it has fail-safe relays.
- **Aggregation TAP:** combines both directions into one stream; **full-duplex TAP** sends each direction to separate ports.
- **Pros:** copies **all** traffic including errors and malformed frames, no packet loss, invisible to the network, does not burden switch CPU, tamper-resistant.
- **Cons:** extra hardware cost, requires inserting into link (brief outage), one TAP per link.

## 4. SPAN / Port Mirroring
- Switch feature: copy traffic from a source port/VLAN to a destination port where the sensor connects.
- Types: **SPAN** (local), **RSPAN** (remote via VLAN), **ERSPAN** (encapsulated over GRE across L3).
- **Pros:** cheap, no new hardware, flexible.
- **Cons:**
  - Can **drop packets** when oversubscribed (mirroring a busy link to a smaller port).
  - Consumes switch resources and may not copy errored frames or some control traffic.
  - Not guaranteed time-accurate; configuration changes by admins can disable it.
  - Duplex and VLAN tag handling quirks.

Example (Cisco):
```
monitor session 1 source interface gi0/1 both
monitor session 1 destination interface gi0/24
```

## 5. TAP vs SPAN
| Feature | TAP | SPAN |
|---|---|---|
| Cost | Higher | Free (switch feature) |
| Packet loss | None | Possible under load |
| Copies errors/malformed frames | Yes | Often no |
| Impact on switch | None | Uses resources |
| Forensic reliability | High | Moderate |

## 6. Traffic Monitoring Tools
- **IDS sensors** (Snort, Suricata, Zeek), **packet capture** (Wireshark, tcpdump), **flow collectors**, **network packet brokers** that aggregate and filter TAP feeds.
- Place sensors at: internet edge, data center ingress, between VLANs/zones, and near critical servers.

## 7. Placement Considerations
- **North-south** traffic (in/out of network) vs **east-west** (internal lateral movement).
- Encrypted traffic requires TLS decryption point or endpoint visibility.
- Consider storage for full PCAP and retention policy.

## 8. Review Questions
1. Which model can block traffic? *(Inline)*
2. Why might a SPAN port miss packets? *(Oversubscription and switch resource limits)*
3. What does fail-open mean? *(Traffic keeps flowing without inspection if device fails)*
4. Which method copies malformed frames reliably? *(TAP)*
5. What is ERSPAN used for? *(Mirroring traffic across a routed network via GRE)*
