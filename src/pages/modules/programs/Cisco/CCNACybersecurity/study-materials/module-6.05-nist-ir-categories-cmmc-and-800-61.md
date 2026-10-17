# 6.5 NIST IR Categories (CMMC, NIST SP 800-61)

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Categorize incidents using the NIST SP 800-61 attack vector and impact categories
- Explain how CMMC addresses incident response
- Relate NIST SP 800-171, CMMC levels, and IR practices

## 1. NIST SP 800-61 Categories

### 1.1 Attack Vector Categories
| Category | Description | Example |
|---|---|---|
| External/removable media | Attack executed from removable media or a peripheral | Infected USB dropped in a parking lot |
| Attrition | Brute force or resource exhaustion | DDoS, password guessing |
| Web | Attack from a website or web application | Drive-by download, SQLi |
| Email | Via message body or attachment | Phishing, malicious macro |
| Impersonation | Replacing something benign with something malicious | Spoofing, MITM, rogue AP |
| Improper usage | Policy violation by an authorized user | Data exfiltration to personal cloud |
| Loss or theft | Lost/stolen device or media | Stolen laptop |
| Other | Anything not covered | Unknown vector |

### 1.2 Functional Impact Categories
| Level | Definition |
|---|---|
| **None** | No effect on the organization's ability to provide services |
| **Low** | Minimal effect; can still provide all critical services to all users but lost efficiency |
| **Medium** | Lost ability to provide a critical service to a subset of system users |
| **High** | No longer able to provide some critical services to any users |

### 1.3 Information Impact Categories
| Level | Definition |
|---|---|
| **None** | No information was exfiltrated, changed, deleted, or compromised |
| **Privacy breach** | Sensitive personally identifiable information (PII) accessed or exfiltrated |
| **Proprietary breach** | Unclassified proprietary information (for example PII, intellectual property, trade secrets, critical infrastructure info) accessed or exfiltrated |
| **Integrity loss** | Sensitive or proprietary information was changed or deleted |

### 1.4 Recoverability Effort Categories
| Level | Definition |
|---|---|
| **Regular** | Time to recovery predictable with existing resources |
| **Supplemented** | Time to recovery predictable with additional resources |
| **Extended** | Time to recovery unpredictable; additional resources and outside help needed |
| **Not recoverable** | Recovery impossible (for example data exfiltrated and posted publicly); launch investigation |

## 2. Categorization Example
Event: attacker used phishing email, encrypted two file servers, backups available but need extra staff to restore.
- **Attack vector:** Email
- **Functional impact:** High
- **Information impact:** Integrity loss (and possible privacy/proprietary breach if exfiltrated)
- **Recoverability:** Supplemented

## 3. CMMC (Cybersecurity Maturity Model Certification)

### 3.1 What It Is
A **U.S. Department of Defense (DoD)** program to verify that contractors in the Defense Industrial Base (DIB) protect **Federal Contract Information (FCI)** and **Controlled Unclassified Information (CUI)**. It is implemented through contract requirements and phased in. Controls derive from **NIST SP 800-171** (and 800-172 for the highest level).

### 3.2 CMMC 2.0 Levels
| Level | Name | Practices | Based on | Assessment |
|---|---|---|---|---|
| **Level 1** | Foundational | 17 practices | FAR 52.204-21 (basic safeguarding of FCI) | Annual self-assessment |
| **Level 2** | Advanced | 110 practices | NIST SP 800-171 Rev. 2 | Self-assessment or third-party (C3PAO) assessment depending on contract/CUI criticality |
| **Level 3** | Expert | 110 + selected enhanced requirements | NIST SP 800-172 | Government-led assessment |

### 3.3 CMMC Domains (17 families aligned to NIST 800-171)
Access Control (AC), Awareness and Training (AT), Audit and Accountability (AU), Configuration Management (CM), Identification and Authentication (IA), **Incident Response (IR)**, Maintenance (MA), Media Protection (MP), Personnel Security (PS), Physical Protection (PE), Risk Assessment (RA), Security Assessment (CA), Situational Awareness (SA), System and Communications Protection (SC), System and Information Integrity (SI), plus Asset Management (AM) and Recovery (RE) from earlier model versions.

### 3.4 CMMC Incident Response (IR) Practices (Level 2)
These map to NIST SP 800-171 requirements **3.6.1 to 3.6.3**:
| Practice | Requirement | What it means |
|---|---|---|
| **IR.L2-3.6.1** | Incident handling | Establish an operational incident-handling capability that includes **preparation, detection, analysis, containment, recovery, and user response activities** |
| **IR.L2-3.6.2** | Incident reporting | **Track, document, and report** incidents to designated officials and/or authorities both internal and external to the organization |
| **IR.L2-3.6.3** | Incident response testing | **Test** the organization's incident response capability (tabletop, simulated attack) |

For DoD contractors, **cyber incidents affecting covered defense information must be reported to DoD within 72 hours** (DFARS 252.204-7012) and malware samples preserved/submitted, with images and logs retained for at least 90 days.

### 3.5 CMMC Maturity Concept
CMMC originally described five maturity levels (Basic cyber hygiene to Advanced/progressive). CMMC 2.0 simplified this to three levels. The idea remains: **maturity and process institutionalization** (documented, practiced, repeatable), not merely having tools.

## 4. Related NIST Families and Frameworks
- **NIST CSF** functions: Identify, Protect, Detect, Respond, Recover (CSF 2.0 adds **Govern**). The **Respond** function includes response planning, communications, analysis, mitigation, and improvements.
- **NIST SP 800-53:** control family **IR** (Incident Response) includes IR-1 policy, IR-2 training, IR-3 testing, IR-4 handling, IR-5 monitoring, IR-6 reporting, IR-7 assistance, IR-8 plan.
- **NIST SP 800-171:** protecting CUI in nonfederal systems; IR requirements 3.6.x.
- **NIST SP 800-86:** forensics (see 6.6).
- **FISMA** and **FedRAMP** for federal and cloud service requirements.

## 5. Comparing the Two Uses of "Categories"
| Concept | NIST SP 800-61 | CMMC |
|---|---|---|
| Focus | How to classify and handle an incident | Whether an organization has a mature, certifiable IR capability |
| Output | Vector, impact, recoverability labels | Pass/fail certification at a level |
| Audience | Analysts and IR teams | Contractors, assessors, DoD |

## 6. Review Questions
1. Name four attack vector categories. *(Any of: external/removable media, attrition, web, email, impersonation, improper usage, loss/theft, other)*
2. Which functional impact level means some critical services are unavailable to all users? *(High)*
3. Which recoverability level indicates a need for outside help and unpredictable time? *(Extended)*
4. How many practices are in CMMC Level 2? *(110)*
5. Which NIST publication underlies CMMC Level 2? *(SP 800-171)*
6. How soon must DoD contractors report covered cyber incidents? *(72 hours)*
