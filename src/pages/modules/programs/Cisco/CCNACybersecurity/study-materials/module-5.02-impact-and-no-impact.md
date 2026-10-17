# 5.2 Impact and No Impact for These Items

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

> This objective covers the **alert classification outcomes**: true positive, true negative, false positive, false negative, plus the effect of each on operations (impact vs no impact), and related terms such as benign and risk.

## Learning Objectives
- Define TP, TN, FP, FN and give an example of each
- Explain the operational impact of each outcome
- Use the confusion matrix and basic metrics
- Describe how tuning reduces bad outcomes

## 1. The Four Outcomes
An alert system makes a prediction (alert or no alert). Reality is either malicious or benign.

| | **Actually malicious** | **Actually benign** |
|---|---|---|
| **Alert fired** | **True Positive (TP)** | **False Positive (FP)** |
| **No alert** | **False Negative (FN)** | **True Negative (TN)** |

### True Positive (TP)
- Alert fired **and** the activity really was malicious.
- Example: IPS signature for EternalBlue triggers on a real exploit attempt.
- **Impact:** Desired outcome. Analyst investigates, contains, and remediates. Some work is required, but it is *necessary* work.

### True Negative (TN)
- No alert **and** the activity was benign.
- Example: A user browses the intranet and no alert is raised.
- **Impact:** No impact. This is normal operation and the ideal state for most traffic.

### False Positive (FP)
- Alert fired but the activity was **actually benign**.
- Example: A vulnerability scanner run by IT triggers a port-scan alert.
- **Impact:** Wasted analyst time, **alert fatigue**, possibly blocked legitimate traffic (if inline/IPS) causing business disruption. No actual breach.

### False Negative (FN)
- No alert but the activity **was malicious**.
- Example: A zero-day exploit with no signature passes through undetected.
- **Impact:** The **most dangerous** outcome. Undetected compromise, data loss, dwell time grows, and a false sense of security.

## 2. Impact Summary
| Outcome | Security impact | Operational impact |
|---|---|---|
| TP | Threat detected | Investigation and response effort |
| TN | None | None |
| FP | None (but attention diverted) | Wasted time, possible outage if blocked |
| FN | Severe (missed threat) | Discovered late, costly incident |

## 3. Metrics Derived from the Matrix
- **Accuracy** = (TP + TN) / (TP + TN + FP + FN)
- **Precision** = TP / (TP + FP) (how many alerts were real)
- **Recall / Detection rate** = TP / (TP + FN) (how many real attacks were caught)
- **False positive rate** = FP / (FP + TN)

Worked example: 100 alerts, 80 TP, 20 FP, 10 FN, 890 TN.
- Precision = 80 / 100 = **80%**
- Recall = 80 / 90 = **88.9%**
- FPR = 20 / 910 = **2.2%**

## 4. Tuning Trade-off
- Making detection **more sensitive** lowers FNs but raises FPs.
- Making it **less sensitive** lowers FPs but raises FNs.
- Goal: balance via tuning, whitelisting known-good sources (like authorized scanners), threat intel enrichment, and baselining.

## 5. Related Terms
- **Benign trigger:** activity that matches a rule but is legitimate (a form of FP).
- **Risk = likelihood x impact.** Severity of an alert alone is not risk; asset value matters.
- **Dwell time:** how long an attacker remains undetected (FN extends it).
- **Alert fatigue:** analysts ignore alerts because too many are FPs.

## 6. Scenario Practice
1. Antivirus quarantines a legitimate admin tool flagged as hacktool. → **FP**.
2. Ransomware encrypts files and no tool alerts. → **FN**.
3. IDS alerts on a real SQL injection against a web app. → **TP**.
4. Normal DNS lookups produce no alerts. → **TN**.

## 7. Review Questions
1. Which outcome is worst from a security standpoint? *(False negative)*
2. A scanner run by IT triggers an alert. Classify. *(False positive)*
3. Why do many FPs harm a SOC? *(Alert fatigue, wasted time, missed real threats)*
4. Formula for precision? *(TP / (TP + FP))*
