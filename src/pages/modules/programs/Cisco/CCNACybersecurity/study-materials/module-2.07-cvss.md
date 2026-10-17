# Module 2.7 — Terms as Defined in CVSS

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~75 min

## Learning objectives
- Describe CVSS and its metric groups.
- Interpret a CVSS v3.x vector string and severity rating.
- Distinguish severity from risk.

> The exam targets CVSS **v3.x**. CVSS v4.0 exists (Base, Threat, Environmental, Supplemental groups), but v3.1 is the foundation to know first.

## 1. What CVSS is
The **Common Vulnerability Scoring System** gives vulnerabilities a standardized score from **0.0 to 10.0** so they can be compared and prioritized. It is maintained by FIRST. It scores **severity**, not business risk.

## 2. Metric groups
1. **Base:** intrinsic qualities that do not change over time or environment.
2. **Temporal:** change over time (exploit availability, patch status).
3. **Environmental:** specific to *your* organization (asset importance, local controls).

## 3. Base metrics (v3.1)

**Exploitability**

| Metric | Values | Meaning |
|---|---|---|
| **AV** Attack Vector | Network (N), Adjacent (A), Local (L), Physical (P) | How the attacker reaches the target. N = most severe |
| **AC** Attack Complexity | Low (L), High (H) | Conditions outside attacker control needed |
| **PR** Privileges Required | None (N), Low (L), High (H) | Access level needed before attacking |
| **UI** User Interaction | None (N), Required (R) | Does a victim have to do something? |

**Scope**

| Metric | Values | Meaning |
|---|---|---|
| **S** Scope | Unchanged (U), Changed (C) | Does impact cross a security boundary (for example VM escape)? |

**Impact (the CIA triad from Module 2.1)**

| Metric | Values |
|---|---|
| **C** Confidentiality | None (N), Low (L), High (H) |
| **I** Integrity | None (N), Low (L), High (H) |
| **A** Availability | None (N), Low (L), High (H) |

## 4. Temporal and environmental (v3.1)
- **Temporal:** Exploit Code Maturity (E), Remediation Level (RL), Report Confidence (RC).
- **Environmental:** Confidentiality/Integrity/Availability Requirements (CR, IR, AR) plus **Modified Base Metrics** (adjusted for your controls).

## 5. Severity ratings

| Score | Rating |
|---|---|
| 0.0 | None |
| 0.1 – 3.9 | Low |
| 4.0 – 6.9 | Medium |
| 7.0 – 8.9 | High |
| 9.0 – 10.0 | Critical |

## 6. Reading a vector
`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` → **9.8 Critical**

Plain English: exploitable over the network, easy, no privileges, no user interaction, scope unchanged, with high impact on confidentiality, integrity, and availability. This is typical of a remote unauthenticated code execution flaw.

## 7. Severity ≠ risk
A 9.8 on an isolated lab box may be lower risk than a 6.5 on an internet-facing, business-critical system. Use the Environmental group and asset context (Module 2.4) when prioritizing.

## Automation lab — CVSS v3.1 base score calculator
```python
import math

AV = {"N": 0.85, "A": 0.62, "L": 0.55, "P": 0.20}
AC = {"L": 0.77, "H": 0.44}
PR_U = {"N": 0.85, "L": 0.62, "H": 0.27}   # scope unchanged
PR_C = {"N": 0.85, "L": 0.68, "H": 0.50}   # scope changed
UI = {"N": 0.85, "R": 0.62}
CIA = {"H": 0.56, "L": 0.22, "N": 0.0}

def roundup(x):
    i = round(x * 100000)
    if i % 10000 == 0:
        return i / 100000.0
    return (math.floor(i / 10000) + 1) / 10.0

def base_score(vector):
    m = dict(p.split(":") for p in vector.split("/")[1:])
    changed = m["S"] == "C"
    pr = (PR_C if changed else PR_U)[m["PR"]]
    iss = 1 - (1 - CIA[m["C"]]) * (1 - CIA[m["I"]]) * (1 - CIA[m["A"]])
    if changed:
        impact = 7.52 * (iss - 0.029) - 3.25 * (iss - 0.02) ** 15
    else:
        impact = 6.42 * iss
    expl = 8.22 * AV[m["AV"]] * AC[m["AC"]] * pr * UI[m["UI"]]
    if impact <= 0:
        return 0.0
    total = impact + expl
    return roundup(min((1.08 if changed else 1.0) * total, 10))

def rating(s):
    if s == 0: return "None"
    if s < 4: return "Low"
    if s < 7: return "Medium"
    if s < 9: return "High"
    return "Critical"

v = "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
s = base_score(v)
print(s, rating(s))   # 9.8 Critical
```
**Try it:** change `AV:N` to `AV:P`. How far does the score fall?

## Exam tips
- Know the **eight base metrics** and what N/L/H/R/U/C stand for.
- **Scope Changed** raises the score.
- Base = intrinsic, Temporal = over time, Environmental = your org.

## Quick check
1. Which metric describes whether a victim must click something?
2. A flaw needs physical access to the device. Which AV value?
3. Which metric group would you adjust for your own network's controls?

<details><summary>Answers</summary>

1. User Interaction (UI).
2. Physical (P).
3. Environmental.
</details>
