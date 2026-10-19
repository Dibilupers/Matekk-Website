# Module 2.4 — Security Concepts: Risk, Threat, Vulnerability, Exploit

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~45 min

## Learning objectives
- Compare risk, threat, vulnerability, and exploit.
- Explain risk assessment, risk scoring/weighting, and risk reduction.

## 1. The four core terms

| Term | Meaning | Example |
|---|---|---|
| **Vulnerability** | A weakness in a system, process, or person | Unpatched web server; weak password policy |
| **Threat** | Something that could exploit a vulnerability and cause harm | Ransomware gang; disgruntled employee; flood |
| **Exploit** | The method/code that takes advantage of a vulnerability | A public script for CVE-XXXX-YYYY |
| **Risk** | The *likelihood* a threat exploits a vulnerability × the *impact* | Chance of the server being breached × cost of the breach |

**Chain of events:** Threat actor → uses exploit → against vulnerability → causing impact → that potential is the risk.

Related: **Asset** (what you protect), **Countermeasure/control** (what reduces risk), **Attack surface** (all exposed entry points).

## 2. Risk assessment
Identify assets → identify threats and vulnerabilities → estimate likelihood and impact → prioritize → choose treatment.

- **Qualitative:** High/Medium/Low ratings. Fast, subjective.
- **Quantitative:** money values. Uses:
  - **SLE** (single loss expectancy) = Asset value × Exposure factor
  - **ARO** (annual rate of occurrence)
  - **ALE** (annual loss expectancy) = SLE × ARO

## 3. Risk scoring and weighting
- **Risk score** = Likelihood × Impact (for example on 1–5 scales → 1 to 25).
- **Risk weighting** gives more importance to some factors (for example asset criticality or regulatory impact) before ranking.
- Scores help rank *which* risks to fix first. CVSS (Module 2.7) scores the *vulnerability*, while risk also considers the business context.

## 4. Risk treatment (reduction and alternatives)

| Option | Meaning | Example |
|---|---|---|
| **Reduce / mitigate** | Add controls | Patch, segment, MFA |
| **Transfer** | Shift cost to another party | Cyber insurance, outsourcing |
| **Accept** | Live with it knowingly | Low-impact risk with a costly fix |
| **Avoid** | Stop the risky activity | Retire a legacy service |

**Residual risk** is what remains after controls are applied.

## Automation lab — rank risks
```python
risks = [
    {"name": "Unpatched VPN",   "likelihood": 4, "impact": 5},
    {"name": "Weak guest Wi-Fi", "likelihood": 3, "impact": 2},
    {"name": "No backups",       "likelihood": 2, "impact": 5},
]
for r in risks:
    r["score"] = r["likelihood"] * r["impact"]

for r in sorted(risks, key=lambda x: x["score"], reverse=True):
    print(f'{r["score"]:>2}  {r["name"]}')
```
Add a `weight` field (criticality 1–3) and multiply it in. Does the ranking change?

## Exam tips
- Vulnerability = **weakness**. Threat = **danger source**. Exploit = **the tool/method**. Risk = **likelihood × impact**.
- A vulnerability with no threat or no exposure is lower risk.
- Buying insurance is **transfer**, not mitigation.

## Quick check
1. An unpatched server exists, but no known attacker targets it and it is unreachable from outside. Higher or lower risk?
2. SLE is $20,000 and the event happens twice a year. What is ALE?
3. Which term describes a published piece of code that abuses a flaw?

<details><summary>Answers</summary>

1. Lower (likelihood is reduced), though the vulnerability still exists.
2. $40,000.
3. Exploit.
</details>
