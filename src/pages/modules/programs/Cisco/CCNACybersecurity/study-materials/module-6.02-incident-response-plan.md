# 6.2 Incident Response Plan (NIST SP 800-61)

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Define what belongs in an incident response policy and plan
- Compare IR team structures and staffing models
- Describe roles, communication, and readiness activities

## 1. Key Definitions
- **Event:** any observable occurrence in a system or network (a login, a firewall block).
- **Adverse event:** an event with negative consequences (system crash, flood, unauthorized access).
- **Security incident:** a violation or imminent threat of violation of security policies, acceptable use policies, or standard security practices.
- **Computer security incident response team (CSIRT/CIRT/CERT):** the group that handles incidents.
- Not every event is an incident. Triage decides.

## 2. Incident Response Policy
Written, approved by senior management. Per NIST SP 800-61 it should contain:
1. **Statement of management commitment** and authority.
2. **Purpose and objectives.**
3. **Scope:** who and what it applies to (employees, contractors, systems, locations).
4. **Definitions** of incident terms.
5. **Organizational structure and roles/responsibilities.**
6. **Prioritization or severity ratings** of incidents.
7. **Performance measures** (metrics).
8. **Reporting and contact forms.**

## 3. Incident Response Plan Elements
The plan provides a **roadmap** for implementing the IR capability. NIST recommends it include:
1. **Mission** of the IR capability.
2. **Strategies and goals.**
3. **Senior management approval.**
4. **Organizational approach** to incident response.
5. **How the IR team communicates** with the rest of the organization and with other organizations.
6. **Metrics** for measuring IR capability and effectiveness.
7. **Roadmap for maturing** the capability.
8. **How the program fits into the overall organization.**

Plans are supported by **procedures** (standard operating procedures, playbooks, runbooks), **checklists**, **forms**, and **call trees**.

## 4. Playbooks and Runbooks
- **Playbook:** scenario-specific guidance (ransomware, phishing, DDoS, insider threat, lost device, web defacement, data breach). Lists detection sources, decision points, containment actions, owners, and communications.
- **Runbook:** automatable, technical step list (isolate host via EDR, block hash).
- **SOAR** tools automate playbooks (enrichment, ticketing, containment).

## 5. Team Structures
| Model | Description | Pros | Cons |
|---|---|---|---|
| **Central IR team** | One team for the whole organization | Consistent, efficient, shared expertise | Distant from remote sites |
| **Distributed IR teams** | Multiple teams by location/business unit | Local knowledge, fast access | Coordination and consistency issues |
| **Coordinating team** | Advises other teams without authority over them | Shares expertise across autonomous units | Limited direct control |

## 6. Staffing Models
- **Employees:** in-house, full control and knowledge; costly to staff 24x7.
- **Partially outsourced:** in-house plus MSSP/MDR/retainer for after-hours or specialist needs.
- **Fully outsourced:** vendor handles all; less internal knowledge, concerns about trust, data handling, and response speed.
- **Factors:** need for 24x7 availability, full vs part-time team members, employee morale/turnover, cost, expertise required, organizational structure.

## 7. Team Roles
- **Incident manager/lead:** coordinates, makes decisions, interfaces with management.
- **Analysts (Tier 1/2/3):** triage, investigate, deep-dive/forensics, threat hunting.
- **Forensic specialists / malware analysts.**
- **Communications/PR, Legal, HR, Compliance/Privacy, Physical security, IT/system owners, Executive sponsor.**
- Clear **authority** to take systems offline must be defined in advance.

## 8. Services a CSIRT May Offer
Intrusion detection, incident handling, vulnerability assessment, threat intelligence, security awareness training, forensics, penetration testing support, product evaluation, advisory distribution.

## 9. Communication and Coordination
- **Internal:** management, legal, HR, PR, IT, business owners.
- **External:** law enforcement, **ISACs**, CERT/CC and national CERTs, ISPs, software vendors, customers, regulators, media, incident response retainers, cyber insurers.
- **Rules:** need-to-know, out-of-band channels (assume the network may be compromised), encryption for sensitive messages, a **single point of contact** for media, **pre-approved notification templates** and breach-notification timelines.
- **Information sharing:** use **TLP (Traffic Light Protocol)** markings (RED, AMBER, GREEN, CLEAR) to control sharing; use standards like STIX/TAXII.

## 10. Preparation Checklist (Tools and Resources)
- **Communication:** contact lists, on-call roster, phones, encrypted messaging, war room, PGP keys.
- **Hardware/software:** forensic workstations, laptops, write blockers, blank media, packet sniffers, protocol analyzers, digital forensic suites, evidence bags and tags, secure storage.
- **Analysis resources:** network diagrams, asset lists, baselines/profiles, port lists, cryptographic hash databases, threat intel.
- **Mitigation software:** clean OS images, installation media, patches.
- **Training and exercises:** tabletop, functional, and full-scale exercises; lessons feed plan updates.
- **Prevention:** risk assessment, host/network security, malware prevention, user awareness.

## 11. Plan Maintenance
- Review at least **annually** and after every significant incident or organizational change.
- Update contacts, tools, and procedures; version control; test regularly.

## 12. Review Questions
1. Who must approve the IR policy? *(Senior management)*
2. Which team model advises but does not control other teams? *(Coordinating team)*
3. What is the difference between a playbook and a runbook? *(Playbook = scenario guidance; runbook = technical steps)*
4. Why use out-of-band communication? *(The primary network may be compromised/monitored)*
5. Name two reasons to partially outsource IR. *(24x7 coverage, specialist skills, cost)*
