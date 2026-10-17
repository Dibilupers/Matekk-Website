# 4.4 Types of Evidence Based on Provided Logs

**Domain 4.0 Host-Based Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Classify evidence as best, corroborative, or indirect
- Apply these categories to log data

## 1. The Three Types

### Best Evidence
Original, direct evidence that proves a fact on its own, such as the **original disk image**, the original log file, or a verified forensic copy. Courts prefer it over copies.
- Log example: an unaltered authentication log showing user `jdoe` logged in from IP 203.0.113.5 at 02:14.

### Corroborative Evidence
Supports and strengthens other evidence but isn't sufficient alone.
- Log example: a firewall log showing traffic from the same IP at 02:14, backing up the authentication log.

### Indirect (Circumstantial) Evidence
Does not prove a fact directly; it lets you **infer** it.
- Log example: a spike in outbound traffic at 02:30 suggests data exfiltration, but doesn't show what was taken.

## 2. Comparison
| Type | Proves fact alone? | Example |
|---|---|---|
| Best | Yes | Original system log, forensic image |
| Corroborative | No, supports | Second log source that agrees |
| Indirect | No, infers | Behavioral anomaly |

## 3. Log Sources to Know
OS logs (Windows Security, Linux auth.log), application logs, web server logs, firewall/IDS logs, DNS and proxy logs, EDR telemetry.

## 4. Good Evidence Practices
- **Order of volatility:** RAM, then network state, then running processes, then disk, then remote logs/backups.
- Hash (SHA-256) copies to prove integrity.
- Synchronize time (**NTP**) so logs correlate.
- Keep chain of custody; analyze **copies**, never originals.

## 5. Review Questions
1. Which type directly proves a fact on its own? *(Best evidence)*
2. A second log confirming the first is...? *(Corroborative)*
3. Unusual traffic pattern implying exfiltration is...? *(Indirect)*
4. Why does NTP matter? *(Accurate timeline correlation across logs)*
