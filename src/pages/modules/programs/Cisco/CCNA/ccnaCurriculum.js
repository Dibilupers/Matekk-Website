export const CCNA_CURRICULUM = [
	{
		number: "1.0",
		title: "Network Fundamentals",
		description: "Learn foundational networking, addressing, device setup, and architecture.",
		tutorials: [
			{ number: "1.1", title: "OSI Model Tutorial", duration: "6 min", summary: "Understand seven layers and how network communication flows." },
			{ number: "1.2", title: "TCP and UDP Tutorial", duration: "18 min", summary: "Compare TCP and UDP, including features, handshakes, and connection teardown." },
			{ number: "1.3", title: "WAN Tutorial", duration: "12 min", summary: "Learn WAN services, provider links, devices, PPP, HDLC, and packet switching." },
			{ number: "1.4", title: "Cisco Command Line Interface CLI", duration: "8 min", summary: "Understand Cisco IOS command modes, prompts, and configuration navigation." },
			{ number: "1.5", title: "Cisco Router Boot Sequence Tutorial", duration: "8 min", summary: "Follow router startup, memory roles, IOS selection, and configuration loading." },
			{ number: "1.6", title: "Spine-Leaf Architecture Tutorial", duration: "8 min", summary: "Explore scalable data center fabric and leaf-spine design." },
			{ number: "1.7", title: "Subnetting Tutorial - Subnetting Made Easy", duration: "12 min", summary: "Read prefixes and calculate subnet boundaries, network bits, and host ranges." },
			{ number: "1.8", title: "Wireless Tutorial", duration: "18 min", summary: "Learn WLAN operation, Wi-Fi architecture, radio basics, security, and interference." },
			{ number: "1.9", title: "IPv6 Tutorial", duration: "14 min", summary: "Read IPv6 addresses, abbreviations, address types, prefixes, and scopes." },
			{ number: "1.10", title: "Hypervisor type 1 and 2 Tutorial (on digitaltut.com)", duration: "10 min", summary: "Compare hypervisor types, virtual machines, virtual switches, and paravirtualization." },
		],
	},
	{
		number: "2.0",
		title: "Network Access",
		description: "Learn VLANs, inter-VLAN routing, spanning tree, VTP, and EtherChannel.",
		tutorials: [
			{ number: "2.1", title: "Virtual Local Area Network VLAN Tutorial", duration: "8 min", summary: "Segment broadcast domains and organize devices using VLANs." },
			{ number: "2.2", title: "InterVLAN Routing Tutorial", duration: "10 min", summary: "Route traffic between VLANs using routers or multilayer switches." },
			{ number: "2.3", title: "Spanning Tree Protocol STP Tutorial", duration: "9 min", summary: "Prevent Layer 2 loops by understanding spanning tree operation." },
			{ number: "2.4", title: "STP Root Port Election Tutorial", duration: "8 min", summary: "Learn how spanning tree selects the best root path." },
			{ number: "2.5", title: "Rapid Spanning Tree Protocol RSTP Tutorial", duration: "9 min", summary: "Learn faster convergence using Rapid Spanning Tree Protocol." },
			{ number: "2.6", title: "VLAN Trunking Protocol VTP Tutorial", duration: "8 min", summary: "Understand how VTP distributes VLAN information across switches." },
			{ number: "2.7", title: "EtherChannel Tutorial", duration: "8 min", summary: "Bundle switch links into resilient, higher-bandwidth connection groups." },
		],
	},
	{
		number: "3.0",
		title: "IP Connectivity",
		description: "Explore routing decisions, dynamic routing protocols, and gateway redundancy.",
		tutorials: [
			{ number: "3.1", title: "How a Router Makes a Forwarding Decision", duration: "8 min", summary: "Follow how a router uses the routing table and longest-prefix match to forward packets." },
			{ number: "3.2", title: "OSPF Tutorial", duration: "12 min", summary: "Learn how OSPF discovers routes and selects paths within an autonomous system." },
			{ number: "3.3", title: "EIGRP Tutorial", duration: "10 min", summary: "Understand EIGRP neighbors, metrics, and route selection." },
			{ number: "3.4", title: "Hot Standby Router Protocol HSRP Tutorial", duration: "8 min", summary: "Provide a resilient default gateway with an active and standby router." },
			{ number: "3.5", title: "Gateway Load Balancing Protocol GLBP Tutorial", duration: "8 min", summary: "Learn how GLBP provides gateway redundancy while sharing forwarding load." },
		],
	},
	{
		number: "4.0",
		title: "IP Services",
		description: "Review the services that support addressing, time, monitoring, logging, QoS, and remote access.",
		tutorials: [
			{ number: "4.1", title: "Network Address Translation NAT Tutorial", duration: "14 min", summary: "Learn static NAT, dynamic address pools, PAT overload, address roles, and translation behavior." },
			{ number: "4.2", title: "Network Time Protocol NTP Tutorial", duration: "7 min", summary: "Synchronize network device clocks for consistent logs and operations." },
			{ number: "4.3", title: "DHCP Tutorial", duration: "12 min", summary: "Learn DORA, lease renewal, DHCP relay, address conflicts, and Cisco IOS DHCP server configuration." },
			{ number: "4.4", title: "Simple Network Management Protocol SNMP Tutorial", duration: "12 min", summary: "Learn SNMP managers, agents, MIBs, polling, notifications, versions, and secure Cisco IOS configuration." },
			{ number: "4.5", title: "Syslog Tutorial", duration: "10 min", summary: "Interpret syslog message fields and severity levels, compare logging destinations, and configure centralized Cisco IOS logging." },
			{ number: "4.6", title: "Forwarding per-hop behavior PHB for QoS Tutorial", duration: "12 min", summary: "Understand DSCP, classification, marking, queuing, congestion management, policing, and shaping." },
			{ number: "4.7", title: "Configure SSH for Remote Access on Cisco Router", duration: "12 min", summary: "Configure RSA keys, local authentication, SSH-only VTY access, and verify access from a Cisco device or PC." },
		],
	},
	{
		number: "5.0",
		title: "Security Fundamentals",
		description: "Build a foundation in network security concepts, access control, and Layer 2 protections.",
		tutorials: [
			{ number: "5.1", title: "Key Security Concepts Tutorial", duration: "8 min", summary: "Review core security principles, threats, vulnerabilities, and risk." },
			{ number: "5.2", title: "Access List Tutorial", duration: "14 min", summary: "Configure standard, extended, and named ACLs; apply directionally; calculate wildcard masks; and manage entries." },
			{ number: "5.3", title: "Layer 2 Threats and Security Features", duration: "14 min", summary: "Understand DHCP spoofing, VLAN hopping, ARP spoofing, and MAC flooding with switch mitigations." },
			{ number: "5.4", title: "AAA TACACS+ and RADIUS Tutorial", duration: "16 min", summary: "Understand Authentication, Authorization, Accounting, TACACS+ and RADIUS, method lists, fallback, and login examples." },
			{ number: "5.5", title: "Port-Security Tutorial", duration: "14 min", summary: "Configure static and sticky secure MACs, maximum addresses, violation actions, verification, and recovery." },
			{ number: "5.6", title: "DHCP Snooping Tutorial", duration: "12 min", summary: "Enable snooping for selected VLANs, trust the authorized DHCP server path, inspect client bindings, and troubleshoot rogue-server filtering." },
		],
	},
	{
		number: "6.0",
		title: "Automation and Programmability",
		description: "Discover software-defined networking, configuration tools, data formats, AI, and APIs.",
		tutorials: [
			{ number: "6.1", title: "What is SDN?", duration: "7 min", summary: "Explore software-defined networking and the separation of control and data planes." },
			{ number: "6.2", title: "Puppet Tutorial", duration: "8 min", summary: "Learn how Puppet automates and manages infrastructure configuration." },
			{ number: "6.3", title: "Chef Tutorial", duration: "8 min", summary: "Understand infrastructure automation with Chef resources and recipes." },
			{ number: "6.4", title: "Ansible Tutorial", duration: "8 min", summary: "Automate device and infrastructure tasks using Ansible playbooks." },
			{ number: "6.5", title: "JSON Tutorial", duration: "6 min", summary: "Read the key-value and array structures used to exchange network data." },
			{ number: "6.6", title: "Generative AI vs Predictive AI Tutorial", duration: "7 min", summary: "Compare generative and predictive AI in the context of the CCNA v1.1 topic." },
			{ number: "6.7", title: "REST API Tutorial", duration: "8 min", summary: "Learn how REST APIs expose network resources through HTTP requests and responses." },
		],
	},
];

export function slugifyCcnaTutorial(value) {
	return value.toLowerCase().replaceAll(" ", "-");
}
