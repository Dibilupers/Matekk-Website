# 4.3 Attribution in an Investigation

**Domain 4.0 Host-Based Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Define attribution and explain what it needs
- Identify assets, threat actors, and indicators
- Describe how evidence handling supports attribution

## 1. What Is Attribution?
Determining **who** (or what group) is responsible for an incident, plus their motives, tools, and methods. It is difficult: attackers use proxies, VPNs, compromised hosts, and false flags. Treat it as a confidence-based judgment, not certainty.

## 2. Key Elements

### Assets
What was targeted or affected: hosts, data, credentials, services. Knowing asset value helps infer **motive** (financial, espionage, disruption).

### Threat Actor
Categories: cybercriminals, hacktivists, nation-state/APT, insiders, script kiddies. Profiled by **TTPs** (tactics, techniques, procedures), infrastructure, tooling, and targeting.

### Indicators
- **IoC (Indicator of Compromise):** evidence a breach occurred, such as file hashes, malicious IPs/domains, registry keys, mutexes, unusual accounts.
- **IoA (Indicator of Attack):** evidence an attack is *in progress*, such as suspicious behavior sequences (credential dumping, lateral movement).

### Chain of Custody
Documented record of who handled evidence, when, and why. Without it, evidence may be inadmissible and attribution claims weaken.

## 3. Frameworks That Help
- **MITRE ATT&CK:** maps behaviors to known actor techniques.
- **Cyber Kill Chain:** reconnaissance, weaponization, delivery, exploitation, installation, C2, actions on objectives.
- **Diamond Model:** adversary, capability, infrastructure, victim.

## 4. Practical Workflow
1. Collect and preserve evidence (maintain chain of custody).
2. Extract IoCs and behaviors.
3. Enrich with threat intelligence.
4. Compare TTPs to known groups.
5. Assign a **confidence level** and document assumptions.

## 5. Pitfalls
- False flags and reused tools
- Shared malware kits
- Confirmation bias

## 6. Review Questions
1. Difference between IoC and IoA? *(IoC = past compromise evidence; IoA = active attack behavior)*
2. What supports legal admissibility? *(Chain of custody)*
3. Which model has adversary, capability, infrastructure, victim? *(Diamond Model)*
