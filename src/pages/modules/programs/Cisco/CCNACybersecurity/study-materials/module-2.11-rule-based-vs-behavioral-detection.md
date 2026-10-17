# Module 2.11 — Rule-Based Detection vs. Behavioral and Statistical Detection

**Domain:** 2.0 Security Concepts | **Level:** Associate | **Study time:** ~60 min

## Learning objectives
- Compare rule/signature-based detection with behavioral and statistical (anomaly) detection.
- State strengths, weaknesses, and typical use cases.
- Explain false positives and false negatives.

## 1. Rule-based (signature) detection
Match activity against **known patterns**: specific byte strings, hashes, IPs, header values, or event sequences.

**Example (Snort-style rule):**
```
alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (msg:"Possible SSH brute force"; flow:to_server,established; detection_filter:track by_src, count 5, seconds 60; sid:1000001; rev:1;)
```
Reads as: alert when one external source makes 5+ SSH connections to the home network within 60 seconds.

| Strengths | Weaknesses |
|---|---|
| Precise on known threats, low false positives | **Blind to new (zero-day) or modified attacks** |
| Easy to understand, tune, and explain | Must be constantly updated |
| Fast and cheap to run | Evasion by small changes (obfuscation, encryption) |
| Good for compliance and known-bad IOCs | Large rule sets need maintenance |

## 2. Statistical detection
Build a **baseline** from historical data, then flag values that deviate significantly (for example more than 3 standard deviations, or outside a percentile range).

- Works well on measurable things: bytes per hour, logins per minute, connections per host.
- Uses ideas from Module 2.3 (**sliding window**) and Module 2.9 (**traffic profiles**).

## 3. Behavioral detection
Models **how users, hosts, and applications normally behave** and detects out-of-character actions, often with machine learning (UEBA, EDR behavior engines).

Examples:
- An accountant's account suddenly queries the source-code server at 03:00 from a new country.
- A word processor spawns PowerShell that contacts the internet.
- A server that only ever talks to two databases starts scanning the subnet.

## 4. Comparison

| | Rule/signature | Statistical | Behavioral |
|---|---|---|---|
| Looks for | Known bad patterns | Numeric deviation from baseline | Deviation from learned behavior |
| New/unknown attacks | Poor | Good | Good |
| False positives | Low | Medium–High | Medium–High (tuning needed) |
| Needs baseline/training | No | Yes | Yes (longer) |
| Explainability | Very clear | Clear | Can be opaque |
| Examples | Snort/Suricata rules, AV signatures | Threshold on traffic volume, z-score | UEBA, EDR behavior analytics, NDR |

**Best practice:** combine them. Signatures catch known threats cheaply and precisely, while statistical/behavioral methods catch what signatures miss.

## 5. False positives and negatives

| | Real attack | No attack |
|---|---|---|
| **Alert raised** | True positive | **False positive** (wasted analyst time, alert fatigue) |
| **No alert** | **False negative** (missed attack, the dangerous one) | True negative |

- Tightening detection reduces false positives but may add false negatives, and vice versa.
- A **poisoned baseline** (built during a compromise) causes false negatives.
- Tune continuously using analyst feedback.

## Automation lab — statistical alert with a z-score
```python
import statistics

baseline = [42, 38, 45, 40, 43, 39, 41, 44]   # logins/hour in normal weeks
mean = statistics.mean(baseline)
sd = statistics.pstdev(baseline)

def check(value):
    z = (value - mean) / sd
    return ("ANOMALY" if abs(z) > 3 else "normal", round(z, 1))

print(check(46))    # normal
print(check(120))   # anomaly
```
Combine it with a rule: if `check()` says anomaly **and** the source IP is on a threat-intel list, raise severity.

## Exam tips
- "Known threats, precise, low false positives" → **rule/signature**.
- "Detects unknown/zero-day by deviation from normal" → **behavioral/statistical (anomaly)**.
- A **false negative** is the more dangerous error.
- Anomaly detection needs a good **baseline**.

## Quick check
1. Which method cannot detect a brand-new exploit with no signature?
2. An alert fires on a legitimate nightly backup. What type of result?
3. Why combine detection methods?

<details><summary>Answers</summary>

1. Rule/signature-based detection.
2. False positive.
3. Signatures give precision on known threats and anomaly/behavioral methods cover unknown ones, so each covers the other's weakness.
</details>
