# Module 3.10 — Impact of Certificates on Security (Includes PKI)

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
- Explain what digital certificates and PKI do.
- Differentiate symmetric and asymmetric cryptography and how they are combined.
- Describe how certificates affect security and monitoring.

## 1. Cryptography basics

| | Symmetric | Asymmetric |
|---|---|---|
| **Keys** | One shared secret key | Key pair: public + private |
| **Speed** | Fast | Slower |
| **Used for** | Bulk data encryption | Key exchange, digital signatures, authentication |
| **Examples** | AES, ChaCha20 | RSA, ECDSA, ECDH, Ed25519 |
| **Problem** | How to share the key safely? | Slow for large data, need to trust the public key |

**Public/private keys across the network:**
- The **public key** may be sent openly. Anyone can use it to encrypt data for the owner or to verify the owner's signature.
- The **private key** never crosses the network. It stays with its owner and is used to decrypt and to sign.
- Encrypt with the public key → only the private key decrypts (confidentiality).
- Sign with the private key → anyone with the public key can verify (authenticity, integrity, non-repudiation).

**Hybrid use (what TLS does):** asymmetric cryptography authenticates the server and agrees on a session key. Then fast **symmetric** encryption protects the data.

## 2. Digital certificates and PKI
A **certificate** binds an identity (domain, person, device) to a public key and is signed by a trusted **Certificate Authority (CA)**.

### PKI components
| Component | Role |
|---|---|
| **Certificate Authority (CA)** | Issues and signs certificates |
| **Registration Authority (RA)** | Verifies identity before issuance |
| **Certificate repository / directory** | Stores and distributes certificates |
| **Revocation services (CRL, OCSP)** | Report certificates that are no longer valid |
| **Trust store** | List of root CAs a device or browser trusts |
| **Subscriber / end entity** | Owner of the certificate (server, user, device) |

### Chain of trust
**Root CA** (self-signed, in the trust store) → **Intermediate CA(s)** → **Leaf (end-entity) certificate**. The client validates every link up to a trusted root.

### Certificate lifecycle
Generate key pair → create **CSR** → CA validates → certificate issued → install → renew before expiry → revoke if the key is compromised.

### Validation levels
- **DV** (domain validated): proves control of the domain only.
- **OV** (organization validated): organization verified.
- **EV** (extended validation): strictest vetting.
- **Wildcard** (`*.example.com`) covers subdomains. **SAN** certificates list multiple names.

### Revocation
- **CRL:** list published by the CA, can be large and delayed.
- **OCSP:** real-time status query. **OCSP stapling** lets the server provide a signed status itself.

## 3. What certificates give security
- **Authentication:** you are talking to the real server.
- **Confidentiality:** encrypted session (Module 2.1).
- **Integrity:** tampering is detected.
- Defends against MITM (Module 3.5) when validated properly.

## 4. Security and monitoring issues

| Issue | Why it matters | Response |
|---|---|---|
| **Expired certificate** | Service outages or users trained to click through warnings | Inventory, monitoring, auto-renewal |
| **Self-signed / untrusted certificate** | No trusted third party vouches for it. Common in malware C2 | Alert, block unknown self-signed certs for external services |
| **Name mismatch** | Certificate does not match the domain | Treat as possible MITM |
| **Weak algorithms/keys** | MD5/SHA-1 signatures, short RSA keys | Enforce strong standards |
| **Compromised private key** | Anyone can impersonate the owner | Revoke and reissue immediately |
| **Rogue or compromised CA** | Fraudulent trusted certificates | Certificate transparency logs, pinning, trust store control |
| **Encrypted malware traffic** | Malicious traffic hides inside valid TLS (even with valid certs) | Metadata analysis, TLS inspection, endpoint visibility (Module 3.9) |
| **TLS inspection** | A proxy re-signs traffic with an internal CA so it can inspect it | Must be authorized, protect the inspection CA key, exclude sensitive categories |

> A valid certificate proves **identity and encryption**, not that the site is **safe or honest**. Phishing sites use valid certificates too.

## Automation lab — check certificate expiry
```python
import ssl
import time

def days_left(cert: dict) -> int:
    """cert is the dict returned by SSLSocket.getpeercert()."""
    expires = ssl.cert_time_to_seconds(cert["notAfter"])
    return int((expires - time.time()) // 86400)

example = {"notAfter": "Jan  1 00:00:00 2030 GMT"}
print("Days until expiry:", days_left(example))

# Live check (needs internet access):
# import socket
# ctx = ssl.create_default_context()
# with socket.create_connection(("example.com", 443), timeout=5) as sock:
#     with ctx.wrap_socket(sock, server_hostname="example.com") as tls:
#         print(days_left(tls.getpeercert()))
```
Command-line equivalents:
```bash
# generate a private key and a certificate signing request (CSR)
openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr -subj "/CN=www.example.test"

# look at a server's certificate
openssl s_client -connect example.com:443 -servername example.com </dev/null | openssl x509 -noout -subject -issuer -dates
```

## Exam tips
- **Public key = shared. Private key = secret, never sent.**
- Asymmetric for **key exchange/auth/signatures**. Symmetric for **bulk data**.
- Certificate = **identity + public key + CA signature**.
- Validation checks: trusted chain, valid dates, matching name, not revoked.

## Quick check
1. Which key signs data and which verifies it?
2. Why does TLS use both symmetric and asymmetric cryptography?
3. Does a valid certificate mean a website is safe?

<details><summary>Answers</summary>

1. The private key signs, the public key verifies.
2. Asymmetric handles authentication and key exchange, then symmetric is fast enough for bulk data.
3. No. It proves identity and encryption, not trustworthiness. Attackers also obtain valid certificates.
</details>
