# 4.2 Components of an Operating System (Windows and Linux)

**Domain 4.0 Host-Based Analysis | CyberOps Associate (200-201)**

## Learning Objectives
- Identify key OS components and why analysts care about them
- Recognize where malware hides and persists on Windows and Linux

## 1. Windows Components

### Processes, Threads, and Services
- **Process:** a running program with its own memory space. **Thread:** unit of execution inside a process.
- **Service:** background process, often starting at boot (`services.msc`). Malware commonly installs itself as a service for persistence.
- **Handle:** a reference a process holds to a resource (file, registry key, etc.).
- Key legitimate processes: `System`, `smss.exe`, `csrss.exe`, `wininit.exe`, `services.exe`, `lsass.exe`, `svchost.exe`, `explorer.exe`.
- Red flags: misspelled names (`svch0st.exe`), wrong path, wrong parent process, unusual user context.

### Memory Allocation
- Virtual memory with stack (function calls) and heap (dynamic data).
- Malware techniques: **process injection**, **DLL injection**, and **process hollowing** to hide in trusted processes.

### Windows Registry
Hierarchical database of configuration. Main hives: `HKLM`, `HKCU`, `HKCR`, `HKU`, `HKCC`.
- Persistence keys: `...\CurrentVersion\Run` and `RunOnce`.
- Tools: `regedit`, `reg query`.

### WMI (Windows Management Instrumentation)
- Used to query and manage systems locally and remotely.
- Abused for **fileless** persistence and lateral movement.

### Other Windows Items
- **NTFS** (permissions, ACLs, Alternate Data Streams), **Event Viewer**, **Task Manager**, **Sysinternals** (Process Explorer, Autoruns).

## 2. Linux Components

### Processes and Daemons
- Processes created by `fork()` and `exec()`; `init`/`systemd` is PID 1.
- **Daemon:** background service (names often end in `d`, like `sshd`).
- Commands: `ps aux`, `top`, `kill`, `systemctl`.

### File System and Permissions
- Everything is a file. Key paths: `/etc` (config), `/var/log` (logs), `/home`, `/tmp`, `/bin`.
- Permissions: read (4), write (2), execute (1) for **user / group / other**. Example: `chmod 755 file` is `rwxr-xr-x`.
- **Symbolic links** point to other files; attackers abuse them to redirect writes.
- Special bits: **SUID**, SGID, sticky bit (privilege escalation target).

### Persistence on Linux
- `cron` jobs, systemd units, `~/.bashrc`, `/etc/rc.local`, SSH `authorized_keys`.

## 3. Windows vs Linux Quick Table
| Concept | Windows | Linux |
|---|---|---|
| Background service | Service | Daemon |
| Config store | Registry | Text files in `/etc` |
| Logs | Event Viewer (EVTX) | `/var/log` |
| Admin | Administrator / SYSTEM | root |

## 4. Review Questions
1. Which Windows component is a common persistence location? *(Registry Run keys)*
2. What is PID 1 on modern Linux? *(systemd/init)*
3. What does `chmod 644` allow for others? *(Read only)*
4. Which technique hides malware inside a legitimate process? *(Process injection/hollowing)*
