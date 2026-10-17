# 5.9 Identify an Alert (Interpreting Common Artifact Elements)

**Domain 5.0 Network Intrusion Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Interpret common artifacts in an event: IP addresses, ports, hashes, URLs, processes, registry, OS logs
- Determine whether an alert is a true or false positive
- Document findings and escalate properly

## 1. Artifact Elements and What They Tell You
| Artifact | What to check |
|---|---|
| **Source / destination IP** | Internal vs external, reputation, geolocation, ownership (WHOIS), asset criticality |
| **Client / server port** | Expected service? Ephemeral (49152-65535) is usually the client; well-known ports (0-1023) are usually the server |
| **Process name / PID / parent** | Legitimate path? Expected parent? (for example `winword.exe` → `powershell.exe` = suspicious) |
| **File name / path** | Odd locations (`%TEMP%`, `AppData`, `/tmp`), double extensions (`invoice.pdf.exe`) |
| **Hash (MD5/SHA-1/SHA-256)** | Reputation lookup (VirusTotal, threat intel), match with known malware |
| **URL / URI / domain** | Newly registered, typo-squat, random-looking (DGA), known-bad category |
| **User account** | Normal behavior? Privileged? Impossible travel? |
| **Registry key** | Persistence (`Run`, `RunOnce`, services), tampering with security settings |
| **OS log entries** | Event IDs (4624, 4625, 4688, 7045, 1102) |
| **Timestamp** | Business hours? Correlate across sources; verify time zone/NTP |
| **Severity / signature ID** | Vendor rating and known behavior of the rule |

## 2. Anatomy of an IDS Alert (Snort-style)
```
[**] [1:2013504:3] ET POLICY Executable Download Over HTTP [**]
[Classification: Potentially Bad Traffic] [Priority: 2]
10/17-02:14:05.123456 198.51.100.7:80 -> 10.1.1.50:49822
TCP TTL:55 TOS:0x0 ID:4411 IpLen:20 DgmLen:1480 DF
***A**** Seq: 0x1A2B3C Ack: 0x4D5E6F Win: 0x7210
```
- **[1:2013504:3]** = Generator ID : Signature ID : Revision.
- **Classification & Priority:** vendor risk category.
- **Direction:** server 198.51.100.7:80 → client 10.1.1.50:49822 (a download).
- **Next step:** examine proxy/PCAP for the file, hash it, check the endpoint.

## 3. Triage Workflow
1. **Read** the alert: what rule, what severity, what was observed.
2. **Validate** the data: is the time right? Are IPs internal or NAT'd?
3. **Enrich:** reputation of IPs/domains/hashes, asset owner and criticality, vulnerability status of the target.
4. **Correlate:** other logs (firewall, proxy, DNS, EDR, auth) for the same host/time.
5. **Determine:** true positive, false positive, or benign trigger; assess **impact and scope**.
6. **Act:** contain (isolate, block), eradicate, recover; or tune the rule if FP.
7. **Document and escalate:** ticket with evidence, hashes, timeline, decisions.

## 4. Examples

### Example A: Suspicious Process (EDR alert)
```
Host: WS-014  User: jdoe
Parent: WINWORD.EXE (PID 3120)
Process: powershell.exe -nop -w hidden -enc JABzAD0A...
```
- Word spawning hidden, encoded PowerShell = **malicious macro**. Likely **TP**. Decode Base64, find network connections, isolate host.

### Example B: Authentication Logs
```
4625 x 150 from 203.0.113.5 (user: administrator) 02:00-02:03
4624 (type 3) administrator from 203.0.113.5 at 02:04
```
- Brute force followed by success. **TP**; reset credentials, block IP, review post-login activity.

### Example C: Likely False Positive
```
Alert: ET SCAN Nmap Scripting Engine User-Agent
Source: 10.5.5.9 (security-scanner.corp.local) at 22:00 Saturday
```
- Matches scheduled vulnerability scan window and an authorized asset. **FP/benign trigger**; whitelist or tune.

### Example D: Registry Persistence
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
   Updater = C:\Users\jdoe\AppData\Roaming\svch0st.exe
```
- Misspelled system name, user-writable path, autostart: **persistence**. Hash the file, check reputation.

## 5. Quick Reputation Checks
- IP/domain: VirusTotal, Talos, AbuseIPDB, WHOIS.
- Hash: VirusTotal, internal sandbox.
- URL: URL scanners, proxy category.
- Never browse suspicious links from your workstation; use an isolated environment.

## 6. Escalation Triggers
Confirmed compromise, privileged accounts, critical assets, data exfiltration, lateral movement, ransomware indicators, regulatory impact.

## 7. Review Questions
1. In a Snort alert `[1:2013504:3]`, what is 2013504? *(Signature ID)*
2. Which port in a flow is typically the client's? *(High ephemeral port)*
3. Why is Word spawning PowerShell suspicious? *(Common macro malware behavior)*
4. What do repeated 4625 then a 4624 indicate? *(Brute force that succeeded)*
5. What is the first step in alert triage? *(Read and understand the alert, then validate)*
