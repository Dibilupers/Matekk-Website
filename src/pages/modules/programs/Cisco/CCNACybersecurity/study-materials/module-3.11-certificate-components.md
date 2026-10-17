# Module 3.11 — Certificate Components

**Domain:** 3.0 Security Monitoring | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
Identify, in a given scenario: **cipher suite, X.509 certificate fields, key exchange, protocol version, and PKCS standards.**

## 1. X.509 certificate structure

| Field | Meaning | Why it matters |
|---|---|---|
| **Version** | Usually v3 | v3 supports extensions |
| **Serial number** | Unique per CA | Used in revocation |
| **Signature algorithm** | How the CA signed it (for example SHA-256 with RSA) | Weak hashes (MD5, SHA-1) are untrusted |
| **Issuer** | CA that signed it | Chain of trust |
| **Validity (Not Before / Not After)** | Dates it is valid | Expired or not-yet-valid = failure |
| **Subject** | Owner identity (CN, O, C) | Who the cert represents |
| **Subject public key info** | Algorithm, key size, public key | RSA 2048+ or ECDSA P-256+ |
| **Extensions** | Extra data (below) | Control how the cert can be used |

### Important v3 extensions
- **Subject Alternative Name (SAN):** all valid DNS names/IPs. Modern browsers rely on SAN, not CN.
- **Key Usage / Extended Key Usage:** what the key may do (digital signature, server auth, client auth, code signing).
- **Basic Constraints:** `CA:TRUE` or `CA:FALSE`, and path length. Marks a CA certificate.
- **CRL Distribution Points / Authority Information Access (AIA):** where to get revocation info (CRL, OCSP) and the issuer certificate.
- **Subject/Authority Key Identifier:** links certificates in a chain.

### Quick validation checklist
1. Chain leads to a trusted root.
2. Current date is within Validity.
3. Hostname matches SAN.
4. Not revoked (CRL/OCSP).
5. Key usage fits the purpose.
6. Strong signature algorithm and key size.

## 2. Protocol version

| Version | Status |
|---|---|
| SSL 2.0 / 3.0 | Broken, must be disabled |
| TLS 1.0 / 1.1 | Deprecated (RFC 8996), disable |
| **TLS 1.2** | Acceptable with strong cipher suites |
| **TLS 1.3** | Preferred: faster handshake, removes weak algorithms, forward secrecy always |

**Monitoring use:** old protocol versions seen in logs indicate weak clients/servers or downgrade attempts.

## 3. Key exchange
How client and server agree on the session keys.

| Method | Notes |
|---|---|
| **RSA key exchange** | Client encrypts a secret with the server's public key. **No forward secrecy.** Removed in TLS 1.3 |
| **DHE / ECDHE (ephemeral Diffie-Hellman)** | Temporary keys per session. Gives **forward secrecy**: a later private key theft cannot decrypt old captured traffic |

## 4. Cipher suite
A named set of algorithms used for a TLS session.

**TLS 1.2 example:** `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`

| Part | Value | Role |
|---|---|---|
| Key exchange | **ECDHE** | Agrees session key with forward secrecy |
| Authentication | **RSA** | Server proves identity with an RSA certificate |
| Bulk encryption | **AES_256_GCM** | Symmetric cipher and mode (GCM also authenticates) |
| Hash / PRF | **SHA384** | Integrity/key derivation |

**TLS 1.3 example:** `TLS_AES_256_GCM_SHA384`. Key exchange and authentication are negotiated separately, and only strong AEAD ciphers remain.

**Weak signs:** `NULL`, `EXPORT`, `RC4`, `DES/3DES`, `MD5`, `anon` (no authentication), CBC with old protocols.

## 5. PKCS standards (Public-Key Cryptography Standards)

| Standard | What it covers | Common file |
|---|---|---|
| **PKCS #1** | RSA cryptography | RSA keys and signatures |
| **PKCS #7** | Cryptographic Message Syntax: certificates and chains (no private key) | `.p7b`, `.p7c` |
| **PKCS #8** | Private key information format | `.key`, `.pem` |
| **PKCS #10** | Certificate Signing Request (CSR) format | `.csr` |
| **PKCS #12** | Archive that bundles certificate + private key (+ chain), password-protected | `.p12`, `.pfx` |

Common file encodings: **PEM** (Base64 text with `-----BEGIN CERTIFICATE-----`), **DER** (binary). Extensions `.crt`, `.cer`, `.pem`.

## 6. Scenario practice

**Scenario A:** A browser warns "certificate is not valid for this name." Which field failed? → **SAN/Subject** (hostname mismatch).

**Scenario B:** Admin must send a CA the request to get a certificate. Which standard/format? → **PKCS #10 CSR**.

**Scenario C:** Moving a certificate **with its private key** to another server. → **PKCS #12 (.pfx/.p12)**.

**Scenario D:** Packet capture shows `TLS_RSA_WITH_AES_128_CBC_SHA` negotiated with TLS 1.0. Concerns? → Old protocol, **no forward secrecy**, CBC and SHA-1 MAC. Upgrade to TLS 1.2+/1.3 with ECDHE and GCM.

**Scenario E:** A certificate shows Issuer = Subject. → **Self-signed**, not trusted by third parties unless manually installed.

## Automation lab — read the fields of a certificate
Create a test certificate and inspect it:
```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.crt -days 30 \
  -subj "/CN=www.example.test" -addext "subjectAltName=DNS:www.example.test,DNS:example.test"
openssl x509 -in server.crt -noout -text | head -40
```
Then parse it in Python (`pip install cryptography`, version 42 or newer):
```python
from cryptography import x509

with open("server.crt", "rb") as f:
    cert = x509.load_pem_x509_certificate(f.read())

print("Subject  :", cert.subject.rfc4514_string())
print("Issuer   :", cert.issuer.rfc4514_string())
print("Serial   :", hex(cert.serial_number))
print("Valid    :", cert.not_valid_before_utc, "->", cert.not_valid_after_utc)
print("Sig hash :", cert.signature_hash_algorithm.name)

pub = cert.public_key()
print("Key      :", type(pub).__name__, getattr(pub, "key_size", ""))

try:
    san = cert.extensions.get_extension_for_class(x509.SubjectAlternativeName)
    print("SAN      :", san.value.get_values_for_type(x509.DNSName))
except x509.ExtensionNotFound:
    print("SAN      : none")

print("Self-signed:", cert.issuer == cert.subject)
```
See which negotiated settings a server uses:
```bash
openssl s_client -connect example.com:443 -tls1_2 </dev/null 2>/dev/null | grep -E "Protocol|Cipher"
```

## Exam tips
- **SAN** is what hostnames are matched against.
- **ECDHE/DHE** = forward secrecy. **Static RSA key exchange** = none.
- **PKCS #10 = CSR. PKCS #12 = cert + private key bundle. PKCS #7 = certificates/chain only.**
- Break a cipher suite into **key exchange, authentication, bulk cipher, hash**.
- Prefer **TLS 1.3 / 1.2** and disable SSL and TLS 1.0/1.1.

## Quick check
1. In `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`, what does ECDHE do?
2. Which PKCS format carries both certificate and private key?
3. Which field lists the valid hostnames for a certificate?

<details><summary>Answers</summary>

1. Performs the key exchange with ephemeral keys (forward secrecy).
2. PKCS #12 (.pfx/.p12).
3. Subject Alternative Name (SAN).
</details>
