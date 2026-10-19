# Module 2.1 — CIA Triad

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~45 min

## Learning objectives
By the end of this module you can:
- Define Confidentiality, Integrity, and Availability and give an example of each.
- Match common controls and attacks to the CIA property they affect.
- Explain the extended properties (authenticity, non-repudiation, accountability).

## 1. The three pillars

| Property | Goal | Typical controls | Typical attacks against it |
|---|---|---|---|
| **Confidentiality** | Only authorized parties can read data | Encryption (AES, TLS, IPsec), access control, MFA, data classification | Sniffing, MITM, shoulder surfing, data theft, social engineering |
| **Integrity** | Data is accurate and unaltered | Hashing (SHA-256), HMAC, digital signatures, file integrity monitoring, version control | Tampering, MITM modification, SQL injection, malware that alters files |
| **Availability** | Systems and data are usable when needed | Redundancy (HA, HSRP/VRRP), backups, load balancing, DR plans, patching | DoS/DDoS, ransomware, hardware failure, power loss |

> **Memory trick:** Confidentiality = *secret*, Integrity = *unchanged*, Availability = *up*.

## 2. Confidentiality in practice
- **Data at rest:** disk encryption (BitLocker, LUKS), database encryption.
- **Data in transit:** TLS for web, SSH for admin, IPsec/SSL VPN for site-to-site and remote access.
- **Data in use:** memory protections, least privilege.
- Classification labels (Public, Internal, Confidential, Restricted) drive how strong the controls must be.

## 3. Integrity in practice
- A **hash** is a one-way fingerprint. Change one bit and the hash changes completely.
- A hash alone proves nothing about *who* made it. Add a secret key (**HMAC**) or a private key (**digital signature**) to get authenticity as well.
- MD5 and SHA-1 are broken for security use. Prefer SHA-256 or stronger.

## 4. Availability in practice
- **Redundancy:** dual power, dual uplinks, clustering, first-hop redundancy (HSRP/VRRP/GLBP).
- **Resilience:** backups following the 3-2-1 rule, tested restores, DR sites.
- **Protection:** rate limiting, scrubbing services, IPS, patch management.

## 5. Extended properties
- **Authenticity:** the data/user is genuinely who/what it claims to be.
- **Non-repudiation:** a sender cannot deny sending (digital signatures, signed logs).
- **Accountability:** actions trace to an identity (AAA logging, see 2.6).

## 6. The triad is a trade-off
Strengthening one property can weaken another. Example: aggressive encryption and strict access rules (confidentiality) can slow access or lock people out (availability). Security design is about balancing the three against business need.

## Automation lab — verify file integrity
```python
import hashlib
import hmac

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()

# Integrity: compare against a known-good hash
expected = "paste-known-good-hash-here"
print("OK" if sha256_file("config.txt") == expected else "TAMPERED")

# Integrity + authenticity: HMAC with a shared secret
key = b"shared-secret"
msg = b"interface Gi0/1 shutdown"
tag = hmac.new(key, msg, hashlib.sha256).hexdigest()
print(hmac.compare_digest(tag, hmac.new(key, msg, hashlib.sha256).hexdigest()))
```
**Try it:** hash a config file, change one character, hash again, and compare.

## Exam tips
- A question about "ensuring the data wasn't modified" is **integrity**, even if it mentions encryption.
- "Keeping services running during an attack" is **availability**.
- Encryption alone does **not** give integrity.

## Quick check
1. A ransomware attack encrypts a hospital's files. Which property is hit first?
2. Which control gives integrity *and* non-repudiation?
3. Name one control that improves availability but does nothing for confidentiality.

<details><summary>Answers</summary>

1. Availability (data is inaccessible); confidentiality also at risk if data is exfiltrated.
2. Digital signature.
3. Redundant links, backups, or load balancing.
</details>
