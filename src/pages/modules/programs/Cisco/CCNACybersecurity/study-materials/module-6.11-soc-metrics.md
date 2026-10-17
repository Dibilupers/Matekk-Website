# 6.11 SOC Metrics to Scope Analysis (Time to Detect, Contain, Respond, Control)

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Define the time-based SOC metrics and calculate them
- Explain how metrics scope analysis, drive improvement, and report to management
- Understand related KPIs and pitfalls

## 1. Why Metrics?
Metrics turn SOC activity into **measurable evidence** of effectiveness, support **budget and staffing decisions**, find **process bottlenecks**, set **SLAs**, and satisfy **audit/compliance** (and NIST SP 800-61 post-incident data collection). They also help **scope analysis**: how long an attacker was active tells you how far back to hunt.

## 2. Core Time-Based Metrics
Key timeline points of an incident:
- **T0 Initial compromise** (attacker gains access)
- **T1 Detection** (alert fires or issue discovered)
- **T2 Acknowledgment/triage start** (analyst picks it up)
- **T3 Containment** (spread is stopped)
- **T4 Eradication complete** (cause removed)
- **T5 Recovery/resolution** (normal operations restored)

### 2.1 Time to Detect (TTD / MTTD)
- **Definition:** time from initial compromise (or malicious activity start) to **detection**.
- **Formula:** `TTD = T1 - T0`; **MTTD = average TTD** across incidents.
- **Also called:** **dwell time** (time the attacker stays undetected). Industry reports have shown averages ranging from days to months, improving where EDR/SIEM matured.
- **Scoping value:** a long TTD means **widen the investigation window** (lateral movement, additional persistence, more data exposed).
- **Improve with:** better telemetry, tuned detections, threat hunting, threat intel, UEBA, deception (honeypots), user reporting.

### 2.2 Time to Acknowledge (MTTA) (supporting metric)
- **Definition:** time from alert generation to an analyst **acknowledging/starting triage**.
- `MTTA = T2 - T1`.
- **Improve with:** staffing/shift coverage, alert prioritization, SOAR auto-enrichment, paging.

### 2.3 Time to Contain (TTC / MTTC)
- **Definition:** time from detection (or acknowledgment) to **containment**, meaning the incident can no longer spread or cause additional damage.
- `TTC = T3 - T1`.
- **Scoping value:** shorter TTC **limits blast radius**, preserves data, and lowers cost.
- **Improve with:** pre-approved containment actions, EDR isolation, playbooks, network segmentation, clear authority.

### 2.4 Time to Respond (TTR / MTTR)
- **Definition:** time from detection to **completion of response actions** (analysis, eradication, and recovery started or finished depending on organizational definition).
- `MTTR = average (T5 - T1)` or `(T4 - T1)`.
- **Note:** **MTTR is ambiguous**: it can mean mean time to **respond**, **resolve**, **recover**, or **repair**. State your definition in reports.
- **Improve with:** automation (SOAR), runbooks, tooling, training, root cause fixes.

### 2.5 Time to Control
- **Definition (CyberOps usage):** time taken to **bring the incident under control**, meaning the threat is **identified, understood, and effectively limited** so that the response team has stopped active harm and holds the initiative; it is closely related to containment but emphasizes **full control of the incident** (scope known, attacker access restricted, further impact prevented).
- **Scoping value:** indicates how quickly the SOC regains control, which determines whether the incident grows into a major breach.
- Many organizations track "time to control" alongside "time to contain" and "time to recover" and use whichever term fits their lifecycle; follow your course material's definitions.

## 3. Worked Example
| Event | Time |
|---|---|
| T0: Phishing macro executes | Oct 10, 09:12 |
| T1: EDR alert fires | Oct 10, 09:14 |
| T2: Analyst begins triage | Oct 10, 09:25 |
| T3: Host isolated, account disabled | Oct 10, 10:05 |
| T4: Eradication done | Oct 10, 16:00 |
| T5: Services restored | Oct 11, 08:30 |

- **TTD** = 09:14 - 09:12 = **2 minutes**
- **MTTA** = 09:25 - 09:14 = **11 minutes**
- **TTC** = 10:05 - 09:14 = **51 minutes**
- **Time to respond/resolve** (to recovery) = Oct 11 08:30 - Oct 10 09:14 = **23 h 16 min**

Interpretation: detection was fast (EDR effective). Containment took 51 minutes, so ask what slowed it (approval? tooling?). Eradication and recovery drive most of the duration → improve backups and rebuild automation.

### Averaging Example
Five incidents with TTD of 2 h, 6 h, 1 h, 48 h, 3 h → **MTTD = (2+6+1+48+3)/5 = 12 hours**. The 48 h outlier skews the mean; also report the **median (3 h)** and **90th percentile** to avoid hiding tails.

## 4. Other Common SOC Metrics and KPIs
| Metric | Description |
|---|---|
| **Dwell time** | Total time attacker present before removal |
| **Alert volume** | Number of alerts per day/analyst |
| **True/false positive rate** | Quality of detections (see 5.2) |
| **Alert closure time / backlog** | Throughput and capacity |
| **Escalation rate** | Share of alerts escalated Tier 1 to Tier 2/3 |
| **Incidents by category/severity** | Trends by vector and impact (NIST categories) |
| **Detection coverage** | % of ATT&CK techniques with detections |
| **Asset/log source coverage** | % of critical assets sending logs |
| **Patch/vulnerability SLAs** | Time to remediate critical vulnerabilities |
| **Phishing metrics** | Click rate, report rate, time to purge |
| **Analyst workload/utilization, training hours** | Staffing health |
| **Cost per incident** | Business impact |
| **Recurrence rate** | Repeat incidents (root cause not fixed) |
| **Exercise results** | Tabletop findings closed |

## 5. Using Metrics to Scope Analysis
1. **Determine the time window** to review: from earliest possible compromise (estimate T0) to now. Use MTTD history to extend backward if uncertain.
2. **Set the asset scope:** which hosts, accounts, and data were reachable within the observed dwell time.
3. **Pivot on IoCs** across the whole window (logs, NetFlow, DNS, proxy, EDR).
4. **Prioritize** by impact and by how quickly containment is needed.
5. **Report** durations to leadership to justify improvements.

## 6. Good Metric Practices
- **Define** each metric precisely (start and stop events), and apply consistently.
- Use **SMART** targets (specific, measurable, achievable, relevant, time-bound) and **SLAs by severity** (for example Critical: acknowledge 15 min, contain 4 h).
- Track **trends over time**, not single numbers; show **median and percentile**.
- Pair **speed** metrics with **quality** metrics (do not rush and miss root cause).
- Avoid **vanity metrics** (alert counts alone) and **perverse incentives** (closing tickets fast without investigation).
- Automate collection from the SIEM/ticketing/SOAR system.
- Present to the right audience: **executives** (risk, cost, trend), **managers** (SLAs, workload), **analysts** (detections, quality).

## 7. Maturity Link
Improving metrics reflects **maturity**: better visibility → lower TTD; better playbooks/automation → lower TTC/TTR; better preparation and lessons learned → fewer repeats. Many frameworks and SOC maturity models (for example SOC-CMM) track these.

## 8. Review Questions
1. How is TTD calculated? *(Detection time minus initial compromise time)*
2. Why might MTTR be ambiguous? *(Respond, resolve, recover, repair; define it explicitly)*
3. What does a long dwell time suggest for scoping? *(Widen the investigation window and asset scope)*
4. Which metric measures how fast an analyst begins triage? *(MTTA)*
5. Why report median or percentiles with averages? *(Outliers skew the mean)*
6. Name two ways to reduce time to contain. *(Pre-approved containment actions/EDR isolation, playbooks, segmentation)*
