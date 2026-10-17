# 4.5 Tampered and Untampered Disk Images

**Domain 4.0 Host-Based Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Explain how to verify disk image integrity
- Compare tampered and untampered images
- Describe safe acquisition practices

## 1. Why Integrity Matters
A forensic image must be a **bit-for-bit copy** of the original. If it changes, evidence may be inadmissible and conclusions unreliable.

## 2. Hashing: The Integrity Test
A cryptographic hash is a fixed-length fingerprint. **Any** change to the data produces a different hash.
- Use **SHA-256** (preferred). MD5 and SHA-1 are collision-prone, though often still used alongside.
- Hash the source drive, hash the image, and compare.

| Scenario | Hash result | Meaning |
|---|---|---|
| Untampered | Source hash equals image hash | Image is a faithful copy |
| Tampered | Hashes differ | Data modified or copy corrupted |

Example commands:
```
sha256sum evidence.img
dd if=/dev/sdb of=evidence.img bs=4M conv=noerror,sync
dcfldd if=/dev/sdb of=evidence.img hash=sha256
```

## 3. Safe Acquisition
1. Use a **write blocker** (hardware preferred) so the source is never altered.
2. Make a forensic image; work only on **copies**.
3. Record hashes before and after, with timestamps and examiner name.
4. Document everything in the chain of custody.
5. Store the original securely.

## 4. Signs of Tampering
- Hash mismatch
- Modified timestamps (MACB: Modified, Accessed, Changed, Born)
- Missing/cleared logs (for example Windows Event ID 1102 log cleared)
- Timestomping, wiped free space, unexpected file system changes

## 5. Tools
FTK Imager, Autopsy, EnCase, dd/dcfldd, Sleuth Kit.

## 6. Review Questions
1. What proves an image matches the original? *(Matching hash values)*
2. What device prevents writes to the source? *(Write blocker)*
3. Hash values differ. What does that indicate? *(Tampering or corruption)*
4. Why prefer SHA-256 over MD5? *(Collision resistance)*
