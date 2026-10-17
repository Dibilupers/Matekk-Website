# 4.6 Interpreting OS, Application, and Command Line Logs

**Domain 4.0 Host-Based Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Read common log formats and identify events of interest
- Spot suspicious activity in logs

## 1. Windows Logs (Event Viewer)
Channels: **Security, System, Application**, plus PowerShell and Sysmon.

| Event ID | Meaning |
|---|---|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4648 | Logon with explicit credentials |
| 4672 | Special privileges assigned |
| 4688 | New process created |
| 4720 | User account created |
| 4732 | Member added to security group |
| 1102 | Audit log cleared |
| 7045 | New service installed |

Logon types: 2 interactive, 3 network, 10 remote desktop (RDP).

## 2. Linux Logs
- `/var/log/auth.log` or `/var/log/secure`: logins, sudo, SSH
- `/var/log/syslog` or `messages`: general system
- `/var/log/kern.log`, `/var/log/cron`, `/var/log/apache2/access.log`
- Commands: `journalctl`, `last`, `lastb`, `grep`, `tail -f`

Example SSH brute force:
```
Oct 17 02:14:01 srv sshd[2210]: Failed password for root from 203.0.113.5 port 51122 ssh2
Oct 17 02:14:03 srv sshd[2212]: Failed password for root from 203.0.113.5 port 51130 ssh2
Oct 17 02:14:09 srv sshd[2220]: Accepted password for root from 203.0.113.5 port 51144 ssh2
```
Interpretation: repeated failures then success from one IP suggests brute force succeeded.

## 3. Application and Web Logs
Look for SQL injection (`' OR 1=1--`), directory traversal (`../../`), repeated 401/403/404, unusual user agents, large response sizes.
```
203.0.113.5 - - [17/Oct/2026:02:20:11] "GET /index.php?id=1' OR '1'='1 HTTP/1.1" 200 5120
```

## 4. Command Line Logs
- Bash history (`~/.bash_history`), PowerShell logging (Event ID 4104 script block).
- Suspicious: `whoami`, `net user`, `mimikatz`, encoded PowerShell (`-enc`), `certutil -urlcache`, `wget | sh`, `nc -e`.

## 5. Analysis Approach
1. Establish **who, what, when, where, how**.
2. Correlate timestamps across sources (NTP, time zones).
3. Look for patterns: repeats, off-hours, privilege changes, log clearing.
4. Pivot from one indicator to related events.

## 6. Review Questions
1. Event ID for failed logon? *(4625)*
2. Which Windows event shows the audit log was cleared? *(1102)*
3. Where are Linux SSH auth events found? *(auth.log or secure)*
4. What does a flood of 4625 followed by 4624 suggest? *(Successful brute force or password spray)*
