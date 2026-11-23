const action = (command, context = "priv", output = "Command completed in the simulator.", device, interfaceName) => ({
	command,
	context,
	output,
	device,
	interfaceName,
});

const task = (text, hint, ...actions) => ({ text, hint, actions });

const lab = (id, title, summary, devices, tasks) => ({
	id,
	title,
	summary,
	devices,
	tasks: tasks.map((item, index) => ({ ...item, id: `${id}-${index + 1}` })),
});

export const COMPTIA_PRACTICE_LABS = {
	"comptia-network-plus": [
		lab(1, "DHCP scope recovery", "Inspect and restore address assignment for an office subnet.", ["R1"], [
			task("Inspect the current DHCP pool.", "enable, then show ip dhcp pool", action("show ip dhcp pool", "priv", "Pool STAFF has no network statement or default gateway.")),
			task("Create the STAFF address pool.", "conf t, then ip dhcp pool STAFF", action("ip dhcp pool STAFF", "config", "Entered DHCP pool configuration for STAFF.")),
			task("Set the pool network and mask.", "In DHCP pool mode: network 10.20.30.0 255.255.255.0", action("network 10.20.30.0 255.255.255.0", "dhcp", "Network 10.20.30.0/24 added to pool STAFF.")),
			task("Set the default gateway and DNS resolver.", "In DHCP pool mode: default-router 10.20.30.1, then dns-server 10.20.1.10",
				action("default-router 10.20.30.1", "dhcp", "Default router set to 10.20.30.1."),
				action("dns-server 10.20.1.10", "dhcp", "DNS server set to 10.20.1.10.")),
			task("Verify the updated DHCP pool.", "end, then show ip dhcp pool", action("show ip dhcp pool", "priv", "STAFF: 10.20.30.0/24 · gateway 10.20.30.1 · DNS 10.20.1.10")),
		]),
		lab(2, "VLAN access and trunk ports", "Configure endpoint segmentation and a tagged switch uplink.", ["SW-1", "SW-2"], [
			task("Create and name the STAFF VLAN on SW-1.", "SW-1: enable, conf t, vlan 20, name STAFF", action("vlan 20", "config", "VLAN 20 created." , "SW-1"), action("name STAFF", "vlan", "VLAN 20 named STAFF.", "SW-1")),
			task("Assign the workstation port to VLAN 20.", "SW-1: exit, interface gi0/2, switchport mode access, switchport access vlan 20",
				action("switchport mode access", "interface", "Gi0/2 is now an access port.", "SW-1", "gi0/2"),
				action("switchport access vlan 20", "interface", "Gi0/2 assigned to access VLAN 20.", "SW-1", "gi0/2")),
			task("Configure the inter-switch uplink as a trunk.", "SW-1: interface gi0/1, switchport mode trunk, switchport trunk allowed vlan 10,20",
				action("switchport mode trunk", "interface", "Gi0/1 trunk mode enabled.", "SW-1", "gi0/1"),
				action("switchport trunk allowed vlan 10,20", "interface", "Trunk allows VLANs 10 and 20.", "SW-1", "gi0/1")),
			task("Verify the trunk on SW-2.", "SW-2: enable, show interfaces trunk", action("show interfaces trunk", "priv", "Gi0/1 is trunking; allowed VLANs: 10,20.", "SW-2")),
		]),
		lab(3, "Static route restoration", "Restore routed access between two private IPv4 subnets.", ["R1", "R2"], [
			task("Review the current route table on R1.", "R1: enable, show ip route", action("show ip route", "priv", "Connected: 10.10.1.0/24. No route to 10.20.2.0/24.", "R1")),
			task("Add a route to the remote subnet on R1.", "R1: conf t, ip route 10.20.2.0 255.255.255.0 10.10.1.2", action("ip route 10.20.2.0 255.255.255.0 10.10.1.2", "config", "Static route to 10.20.2.0/24 installed via 10.10.1.2.", "R1")),
			task("Add the return route on R2.", "R2: conf t, ip route 10.10.1.0 255.255.255.0 10.10.1.1", action("ip route 10.10.1.0 255.255.255.0 10.10.1.1", "config", "Return route to 10.10.1.0/24 installed via 10.10.1.1.", "R2")),
			task("Verify the route on R1.", "R1: end, show ip route", action("show ip route", "priv", "S 10.20.2.0/24 via 10.10.1.2 · route is active.", "R1")),
		]),
		lab(4, "DNS and name resolution", "Troubleshoot a client that can reach services by IP but not by hostname.", ["R1"], [
			task("Inspect the configured name servers.", "enable, show hosts", action("show hosts", "priv", "Name server list is empty; internal DNS is 10.20.1.10.")),
			task("Configure the approved DNS resolver.", "conf t, ip name-server 10.20.1.10", action("ip name-server 10.20.1.10", "config", "Name server 10.20.1.10 configured.")),
			task("Set the internal DNS domain suffix.", "ip domain-name corp.example", action("ip domain-name corp.example", "config", "Domain suffix corp.example configured.")),
			task("Verify name resolution.", "end, ping portal.corp.example", action("ping portal.corp.example", "priv", "Resolved portal.corp.example to 10.20.4.25; 4/4 replies received.")),
		]),
		lab(5, "Wireless access recovery", "Restore a secure WLAN and confirm client association.", ["WLC-1"], [
			task("Review the wireless network status.", "show wlan summary", action("show wlan summary", "user", "WLAN 20 STAFF is disabled; security profile is WPA2-Personal.")),
			task("Select the approved enterprise security profile.", "wlan 20, then security wpa2-enterprise", action("security wpa2-enterprise", "wlan", "WLAN 20 now uses the enterprise authentication profile.")),
			task("Enable the STAFF WLAN.", "wlan 20, then no shutdown", action("no shutdown", "wlan", "WLAN 20 STAFF enabled.")),
			task("Verify client association.", "show wireless clients", action("show wireless clients", "any", "STAFF WLAN is active; test client associated on channel 36.")),
		]),
		lab(6, "Switch port and cabling diagnosis", "Use interface state and error counters to restore an endpoint link.", ["SW-1"], [
			task("Inspect interface state and error counters.", "enable, show interfaces gi0/8", action("show interfaces gi0/8", "priv", "Gi0/8 is administratively down; no input errors.")),
			task("Select the affected switch port.", "conf t, interface gi0/8", action("interface gi0/8", "config", "Selected interface Gi0/8.")),
			task("Restore the interface administratively.", "no shutdown", action("no shutdown", "interface", "Gi0/8 is enabled; link state is up.", undefined, "gi0/8")),
			task("Verify the link state.", "end, show interfaces status", action("show interfaces status", "priv", "Gi0/8 connected · 1000 Mb/s · full duplex.")),
		]),
		lab(7, "Layer 3 gateway setup", "Configure a router interface for a new user subnet.", ["R1"], [
			task("Inspect the router interface.", "enable, show ip interface brief", action("show ip interface brief", "priv", "Gi0/1 is unassigned and administratively down.")),
			task("Select the user-network interface.", "conf t, interface gi0/1", action("interface gi0/1", "config", "Selected interface Gi0/1.")),
			task("Assign the gateway address and mask.", "ip address 10.30.5.1 255.255.255.0", action("ip address 10.30.5.1 255.255.255.0", "interface", "Gi0/1 configured as 10.30.5.1/24.", undefined, "gi0/1")),
			task("Bring the interface online and verify it.", "no shutdown, end, show ip interface brief", action("no shutdown", "interface", "Gi0/1 enabled.", undefined, "gi0/1"), action("show ip interface brief", "priv", "Gi0/1 10.30.5.1 up/up.")),
		]),
		lab(8, "Network ACL segmentation", "Limit a subnet to approved application traffic while preserving required services.", ["R1"], [
			task("Review the current access lists.", "enable, show access-lists", action("show access-lists", "priv", "No extended access list is configured.")),
			task("Permit HTTPS to the internal application.", "conf t, access-list 110 permit tcp 10.30.5.0 0.0.0.255 host 10.20.4.25 eq 443", action("access-list 110 permit tcp 10.30.5.0 0.0.0.255 host 10.20.4.25 eq 443", "config", "HTTPS access to 10.20.4.25 permitted for 10.30.5.0/24.")),
			task("Apply the policy inbound on the user interface.", "interface gi0/1, ip access-group 110 in", action("ip access-group 110 in", "interface", "Access list 110 applied inbound on Gi0/1.", undefined, "gi0/1")),
			task("Verify the active policy.", "end, show access-lists", action("show access-lists", "priv", "ACL 110: HTTPS to application host permitted; inbound on Gi0/1.")),
		]),
		lab(9, "Wireless channel planning", "Reduce co-channel interference and confirm the access point radio plan.", ["WLC-1"], [
			task("Inspect current access point channel utilization.", "show ap radio summary", action("show ap radio summary", "user", "AP-LOBBY on channel 6: 82% utilization; neighboring APs also use channel 6.")),
			task("Select the affected radio.", "ap name AP-LOBBY radio 1", action("ap name AP-LOBBY radio 1", "user", "Selected AP-LOBBY 2.4 GHz radio.")),
			task("Move the radio to the least congested allowed channel.", "channel 1", action("channel 1", "radio", "AP-LOBBY radio set to channel 1.")),
			task("Confirm the updated channel plan.", "show ap radio summary", action("show ap radio summary", "any", "AP-LOBBY channel 1 · utilization 24% · radio operational.")),
		]),
		lab(10, "Link aggregation resilience", "Bundle two switch links and verify the resulting port channel.", ["SW-1"], [
			task("Check the existing EtherChannel state.", "enable, show etherchannel summary", action("show etherchannel summary", "priv", "No port channels configured; Gi0/1 and Gi0/2 are available.")),
			task("Select both member interfaces.", "conf t, interface range gi0/1-2", action("interface range gi0/1-2", "config", "Selected Gi0/1 and Gi0/2.")),
			task("Configure LACP active mode for the bundle.", "channel-group 1 mode active", action("channel-group 1 mode active", "interface", "Gi0/1 and Gi0/2 joined port channel 1 using LACP.", undefined, "gi0/1-2")),
			task("Verify port-channel status.", "end, show etherchannel summary", action("show etherchannel summary", "priv", "Po1 is up; Gi0/1 and Gi0/2 are bundled with LACP.")),
		]),
		lab(11, "Network monitoring and time sync", "Configure reliable event timestamps and a centralized log destination.", ["R1"], [
			task("Review the current clock synchronization state.", "enable, show ntp status", action("show ntp status", "priv", "Clock is unsynchronized; no NTP peer configured.")),
			task("Configure the approved NTP peer.", "conf t, ntp server 10.20.1.20", action("ntp server 10.20.1.20", "config", "NTP peer 10.20.1.20 configured.")),
			task("Forward system events to the log collector.", "logging host 10.20.1.30", action("logging host 10.20.1.30", "config", "Remote logging destination 10.20.1.30 configured.")),
			task("Verify time synchronization.", "end, show ntp status", action("show ntp status", "priv", "Clock synchronized to 10.20.1.20; stratum 3.")),
		]),
		lab(12, "MTU and interface performance", "Diagnose a path-MTU mismatch affecting a business application.", ["R1"], [
			task("Inspect interface counters and MTU.", "enable, show interfaces gi0/1", action("show interfaces gi0/1", "priv", "Gi0/1 MTU 9000; application path supports standard 1500-byte frames.")),
			task("Select the application-facing interface.", "conf t, interface gi0/1", action("interface gi0/1", "config", "Selected interface Gi0/1.")),
			task("Set the path-compatible MTU.", "mtu 1500", action("mtu 1500", "interface", "Gi0/1 MTU set to 1500 bytes.", undefined, "gi0/1")),
			task("Confirm packet delivery after the change.", "end, ping 10.20.4.25", action("ping 10.20.4.25", "priv", "4/4 replies received; no oversized packet errors.")),
		]),
		lab(13, "Configuration backup and recovery", "Save a verified network change and confirm the startup configuration.", ["SW-1"], [
			task("Review the configuration archive status.", "enable, show archive", action("show archive", "priv", "No configuration archive location is set.")),
			task("Set the approved archive destination.", "conf t, archive, path flash:/config-backup", action("path flash:/config-backup", "archive", "Configuration archive path set to flash:/config-backup.")),
			task("Save the current running configuration.", "end, copy running-config startup-config", action("copy running-config startup-config", "priv", "Running configuration copied to startup configuration.")),
			task("Verify the saved configuration.", "show startup-config", action("show startup-config", "priv", "Startup configuration is present and matches the latest saved revision.")),
		]),
	],
	"comptia-security-plus": [
		lab(1, "Account sign-in incident", "Triage a suspicious sign-in and contain the affected identity.", ["SOC-CLI"], [
			task("Review recent identity alerts.", "alerts list", action("alerts list", "user", "AUTH-104: unfamiliar sign-in followed by repeated MFA prompts for j.lee.")),
			task("Inspect the related authentication events.", "events show AUTH-104", action("events show AUTH-104", "user", "Successful sign-in from an unrecognized location; employee denied the activity.")),
			task("Temporarily disable the affected account.", "account disable j.lee", action("account disable j.lee", "user", "Sign-in disabled for j.lee; audit event recorded.")),
			task("Revoke active sessions and require phishing-resistant MFA.", "sessions revoke j.lee, then mfa enforce j.lee phishing-resistant",
				action("sessions revoke j.lee", "user", "Active sessions revoked for j.lee."),
				action("mfa enforce j.lee phishing-resistant", "user", "Phishing-resistant MFA enrollment required for j.lee.")),
		]),
		lab(2, "Firewall policy review", "Review a proposed rule and apply least-privilege application access.", ["FW-EDGE"], [
			task("Inspect the current policy and change request.", "policy review CHG-204", action("policy review CHG-204", "user", "Request needs HTTPS from STAFF to PAYMENTS; broad any-to-any access is not approved.")),
			task("Add the narrow HTTPS rule.", "rule add allow tcp source STAFF destination PAYMENTS port 443", action("rule add allow tcp source STAFF destination PAYMENTS port 443", "user", "Scoped HTTPS rule added to the pending policy.")),
			task("Confirm the broad temporary rule is absent.", "rule remove TEMP-ANY-ANY", action("rule remove TEMP-ANY-ANY", "user", "Temporary broad rule removed.")),
			task("Validate and publish the reviewed policy.", "policy validate, then policy publish CHG-204",
				action("policy validate", "user", "Validation passed: no shadowed rules or unintended broad access."),
				action("policy publish CHG-204", "user", "Reviewed policy published; change record updated.")),
		]),
		lab(3, "Vulnerability remediation", "Prioritize a critical asset finding and verify the remediation workflow.", ["VULN-CLI"], [
			task("Review the affected asset and finding.", "finding show VULN-318", action("finding show VULN-318", "user", "Critical severity on internet-facing APP-02; vendor fix is available.")),
			task("Confirm the asset owner and maintenance window.", "asset owner APP-02", action("asset owner APP-02", "user", "Owner: Application Operations; approved maintenance window: 22:00 UTC.")),
			task("Schedule the approved patch.", "patch schedule APP-02 VULN-318 window 22:00UTC", action("patch schedule APP-02 VULN-318 window 22:00UTC", "user", "Patch scheduled for the approved maintenance window.")),
			task("Schedule a verification scan after remediation.", "scan schedule APP-02 after-patch", action("scan schedule APP-02 after-patch", "user", "Verification scan queued for after the patch window.")),
		]),
		lab(4, "Endpoint incident response", "Contain a suspected endpoint incident while preserving investigation evidence.", ["IR-CLI"], [
			task("Review the endpoint alert.", "alert show EDR-77", action("alert show EDR-77", "user", "EDR-77: unusual process activity on WS-17; investigation required.")),
			task("Isolate the affected endpoint from the network.", "host isolate WS-17", action("host isolate WS-17", "user", "WS-17 isolated from the network; management channel retained.")),
			task("Preserve endpoint and event evidence.", "evidence collect WS-17", action("evidence collect WS-17", "user", "Volatile event timeline and endpoint metadata preserved with an audit record.")),
			task("Open an incident record and assign the response team.", "incident open EDR-77 severity high", action("incident open EDR-77 severity high", "user", "Incident IR-2026-077 opened at high severity and assigned to Incident Response.")),
		]),
		lab(5, "Data protection and access review", "Apply data handling controls and review access to a sensitive repository.", ["GRC-CLI"], [
			task("Review the repository classification and owner.", "data asset show PAYROLL-DB", action("data asset show PAYROLL-DB", "user", "PAYROLL-DB contains confidential employee data; owner is HR Systems.")),
			task("Confirm encryption at rest is enabled.", "encryption verify PAYROLL-DB", action("encryption verify PAYROLL-DB", "user", "Encryption at rest is enabled with centrally managed keys.")),
			task("Remove the unapproved broad access group.", "access revoke PAYROLL-DB group ALL-STAFF", action("access revoke PAYROLL-DB group ALL-STAFF", "user", "ALL-STAFF access removed; change recorded for the asset owner.")),
			task("Export the access review evidence.", "audit export PAYROLL-DB access-review", action("audit export PAYROLL-DB access-review", "user", "Access review evidence exported with timestamp and reviewer details.")),
		]),
	],
};
