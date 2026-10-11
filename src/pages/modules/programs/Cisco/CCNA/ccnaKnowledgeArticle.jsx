import { ArrowLeft, ArrowRight, ChevronDown, Clock, Folder, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CcnaKnowledgeModuleOne from "./ccnaKnowledgeModule1";
import CcnaKnowledgeModuleTwo from "./ccnaKnowledgeModule2";
import CcnaKnowledgeModuleThree from "./ccnaKnowledgeModule3";
import CcnaKnowledgeModuleFour from "./ccnaKnowledgeModule4";
import CcnaKnowledgeModuleFive from "./ccnaKnowledgeModule5";
import CcnaKnowledgeModuleSix from "./ccnaKnowledgeModule6";
import { markCcnaTutorialOpened } from "../../../../../utils/ccnaTutorialProgress";
import { useAuth } from "../../../../../context/auth-context";

const ccnaModuleOneSlugs = new Set([
	"spine-leaf-architecture-tutorial",
	"osi-model-tutorial",
	"tcp-and-udp-tutorial",
	"wan-tutorial",
	"cisco-command-line-interface-cli",
	"cisco-router-boot-sequence-tutorial",
	"subnetting-tutorial---subnetting-made-easy",
	"wireless-tutorial",
	"ipv6-tutorial",
	"hypervisor-type-1-and-2-tutorial-(on-digitaltut.com)",
]);

const sections = [
	{
		number: "1.0",
		title: "Network Fundamentals",
		items: [
			"OSI Model Tutorial",
			"TCP and UDP Tutorial",
			"WAN Tutorial",
			"Cisco Command Line Interface CLI",
			"Cisco Router Boot Sequence Tutorial",
			"Spine-Leaf Architecture Tutorial",
			"Subnetting Tutorial - Subnetting Made Easy",
			"Wireless Tutorial",
			"IPv6 Tutorial",
			"Hypervisor type 1 and 2 Tutorial (on digitaltut.com)",
		],
	},
	{
		number: "2.0",
		title: "Network Access",
		items: [
			"Virtual Local Area Network VLAN Tutorial",
			"InterVLAN Routing Tutorial",
			"Spanning Tree Protocol STP Tutorial",
			"STP Root Port Election Tutorial",
			"Rapid Spanning Tree Protocol RSTP Tutorial",
			"VLAN Trunking Protocol VTP Tutorial",
			"EtherChannel Tutorial",
		],
	},
	{
		number: "3.0",
		title: "IP Connectivity",
		items: [
			"How a Router Makes a Forwarding Decision",
			"OSPF Tutorial",
			"EIGRP Tutorial",
			"Hot Standby Router Protocol HSRP Tutorial",
			"Gateway Load Balancing Protocol GLBP Tutorial",
		],
	},
	{
		number: "4.0",
		title: "IP Services",
		items: [
			"Network Address Translation NAT Tutorial",
			"Network Time Protocol NTP Tutorial",
			"DHCP Tutorial",
			"Simple Network Management Protocol SNMP Tutorial",
			"Syslog Tutorial",
			"Forwarding per-hop behavior PHB for QoS Tutorial",
			"Configure SSH for Remote Access on Cisco Router",
		],
	},
	{
		number: "5.0",
		title: "Security Fundamentals",
		items: [
			"Key Security Concepts Tutorial",
			"Access List Tutorial",
			"Layer 2 Threats and Security Features",
			"AAA TACACS+ and RADIUS Tutorial",
			"Port-Security Tutorial",
			"DHCP Snooping Tutorial",
		],
	},
	{
		number: "6.0",
		title: "Automation and Programmability",
		items: [
			"What is SDN?",
			"Puppet Tutorial",
			"Chef Tutorial",
			"Ansible Tutorial",
			"JSON Tutorial",
			"Generative AI vs Predictive AI Tutorial",
			"REST API Tutorial",
		],
	},
];

const articles = {
	"what-is-sdn": {
		title: "What is SDN?",
		meta: "7 min read · CCNA 6.1 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "Software-Defined Networking (SDN)",
		body: "Distributed and centralized networking, interfaces, APIs, and benefits of SDN.",
		tags: ["CCNA 6.1", "SDN", "Automation"],
		contentType: "sdn",
	},
	"puppet-tutorial": {
		title: "Puppet Tutorial",
		meta: "8 min read · CCNA 6.2 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "Puppet automation using a master, agents, manifests, modules, templates, and catalogs.",
		body: "Learn Puppet pull-based configuration management and review a Puppet manifest example.",
		tags: ["CCNA 6.2", "Puppet", "Automation"],
		contentType: "puppet",
	},
	"chef-tutorial": {
		title: "Chef Tutorial",
		meta: "8 min read · CCNA 6.3 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "Chef infrastructure automation with Workstations, Chef Server, Nodes, Recipes, and Cookbooks.",
		body: "Learn how Chef applies configuration to managed nodes and review cookbook examples.",
		tags: ["CCNA 6.3", "Chef", "Automation"],
		contentType: "chef",
	},
	"ansible-tutorial": {
		title: "Ansible Tutorial",
		meta: "8 min read · CCNA 6.4 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "Ansible network automation with agentless management, playbooks, tasks, modules, inventory, templates, and variables.",
		body: "Review Ansible SSH-based operation and examples for managing Cisco IOS devices.",
		tags: ["CCNA 6.4", "Ansible", "Automation"],
		contentType: "ansible",
	},
	"json-tutorial": {
		title: "JSON Tutorial",
		meta: "6 min read · CCNA 6.5 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "JavaScript Object Notation (JSON) is a human readable and very popular format used by web services, programming languages (including Python) and APIs to read/write data.",
		body: "Learn JSON syntax, key-value pairs, arrays, and how to parse JSON with Python.",
		tags: ["CCNA 6.5", "JSON", "Python", "Data Formats"],
		contentType: "json",
	},
	"generative-ai-vs-predictive-ai-tutorial": {
		title: "Generative AI vs Predictive AI Tutorial",
		meta: "7 min read · CCNA 6.6 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "Artificial intelligence (AI) is full of concepts that seem familiar at first glance, but often reveal much more complexity upon closer examination.",
		body: "Explore the difference between Generative AI and Predictive AI.",
		tags: ["CCNA 6.6", "Generative AI", "Predictive AI"],
		contentType: "generative-predictive-ai",
	},
	"rest-api-tutorial": {
		title: "REST API Tutorial",
		meta: "8 min read · CCNA 6.7 · Automation and Programmability",
		section: "Automation and Programmability",
		intro: "An API (Application Programming Interface) allows different software applications to communicate with each other.",
		body: "Learn HTTP methods, CRUD operations, REST principles, response codes, and API examples.",
		tags: ["CCNA 6.7", "REST API", "HTTP", "CRUD"],
		contentType: "rest-api",
	},
	"network-time-protocol-ntp-tutorial": {
		title: "Network Time Protocol NTP Tutorial",
		meta: "12 min read · CCNA 4.2 · IP Services",
		section: "IP Services",
		intro: "Network Time Protocol (NTP) synchronizes clocks across networked devices. Consistent time helps administrators correlate logs, investigate incidents, compare events across routers and servers, and support time-dependent services.",
		body: "Learn NTP client/server and peer associations, the stratum hierarchy, UDP transport, Cisco IOS configuration, authentication, and how to verify synchronization and troubleshoot associations.",
		tags: ["CCNA 4.2", "NTP", "Time Synchronization", "IP Services"],
		contentType: "ntp",
	},
	"network-address-translation-nat-tutorial": {
		title: "Network Address Translation NAT Tutorial",
		meta: "14 min read · CCNA 4.1 · IP Services",
		section: "IP Services",
		intro: "Network Address Translation (NAT) changes IP address information as packets cross between networks. It commonly translates private inside addresses to public addresses for Internet access, and translates reply traffic back to the correct internal host.",
		body: "Learn inside and outside address terminology, static NAT, dynamic NAT, Port Address Translation (PAT), translation tables, pool behavior, and practical configuration concepts.",
		tags: ["CCNA 4.1", "NAT", "PAT", "IP Services"],
		contentType: "nat",
	},
	"dhcp-tutorial": {
		title: "DHCP Tutorial",
		meta: "12 min read · CCNA 4.3 · IP Services",
		section: "IP Services",
		intro: "Dynamic Host Configuration Protocol (DHCP) automatically leases IPv4 configuration to clients, including an address, subnet mask, default gateway, and DNS servers. It lets a device join a new network without manually knowing that network's addressing plan.",
		body: "Follow the DORA exchange, understand leases and address-conflict handling, configure a Cisco IOS router as a DHCP server, and use a relay agent when clients and the server are on different subnets.",
		tags: ["CCNA 4.3", "DHCP", "DORA", "IP Services"],
		contentType: "dhcp",
	},
	"simple-network-management-protocol-snmp-tutorial": {
		title: "Simple Network Management Protocol (SNMP) Tutorial",
		meta: "12 min read · CCNA 4.4 · IP Services",
		section: "IP Services",
		intro: "Simple Network Management Protocol (SNMP) lets a network management system monitor and manage routers, switches, servers, and other devices through structured management information. Managers poll agents for data, while agents can send notifications when significant events occur.",
		body: "Understand the manager, agent, and MIB; compare SNMPv1, SNMPv2c, and SNMPv3; follow GET, SET, TRAP, INFORM, and GETBULK messages; and configure SNMP monitoring on Cisco IOS.",
		tags: ["CCNA 4.4", "SNMP", "Network Monitoring", "IP Services"],
		contentType: "snmp",
	},
	"syslog-tutorial": {
		title: "Syslog Tutorial",
		meta: "10 min read · CCNA 4.5 · IP Services",
		section: "IP Services",
		intro: "Syslog collects device-generated event messages so administrators can monitor network health, investigate failures, and correlate activity across routers, switches, servers, and a central log server.",
		body: "Read the fields in a syslog message, distinguish facility from severity, understand all eight severity levels and their thresholds, compare local and remote logging destinations, and configure Cisco IOS logging.",
		tags: ["CCNA 4.5", "Syslog", "Logging", "IP Services"],
		contentType: "syslog",
	},
	"forwarding-per-hop-behavior-phb-for-qos-tutorial": {
		title: "Forwarding per-hop behavior (PHB) for QoS Tutorial",
		meta: "12 min read · CCNA 4.6 · IP Services",
		section: "IP Services",
		intro: "Quality of Service (QoS) manages how network devices handle traffic when resources such as bandwidth and queue space are limited. Per-hop behaviors (PHBs) define forwarding treatment at each device, while classification and packet markings help devices apply consistent policies along a path.",
		body: "Learn DSCP codepoints, classification and marking, queuing and congestion management, and how policing differs from shaping, with Cisco IOS policy examples.",
		tags: ["CCNA 4.6", "QoS", "PHB", "DSCP"],
		contentType: "qos",
	},
	"configure-ssh-for-remote-access-on-cisco-router": {
		title: "Configure SSH for Remote Access on Cisco Router",
		meta: "12 min read · CCNA 4.7 · IP Services",
		section: "IP Services",
		intro: "Secure Shell (SSH) provides authenticated, encrypted remote command-line access to Cisco routers. Unlike Telnet, which sends session data including credentials in clear text, SSH protects the management session in transit.",
		body: "Configure a hostname and domain name, generate an RSA key pair, create a local user, restrict VTY lines to SSH, and verify connections from another Cisco device or a computer running PuTTY or an SSH client.",
		tags: ["CCNA 4.7", "SSH", "Cisco IOS", "Secure Management"],
		contentType: "ssh",
	},
	"key-security-concepts-tutorial": {
		title: "Key Security Concepts Tutorial",
		meta: "10 min read · CCNA 5.1 · Security Fundamentals",
		section: "Security Fundamentals",
		intro: "Cybersecurity starts with recognizing weaknesses, understanding how they could be exploited, identifying the threats that may use them, and selecting safeguards that reduce risk while allowing systems and people to do their work.",
		body: "Use the house-security analogy to understand vulnerabilities, exploits, threats, and mitigation techniques, then apply the concepts to a practical network-security example.",
		tags: ["CCNA 5.1", "Security Fundamentals", "Vulnerability", "Threat Mitigation"],
		contentType: "security-concepts",
	},
	"access-list-tutorial": {
		title: "Access List Tutorial",
		meta: "14 min read · CCNA 5.2 · Security Fundamentals",
		section: "Security Fundamentals",
		intro: "Access control lists (ACLs) filter traffic at router interfaces by checking packet fields against ordered permit and deny entries. A packet must match an explicit permit statement to pass; unmatched traffic is denied by the implicit deny at the end.",
		body: "Learn standard, extended, and named IPv4 ACLs; apply them in the correct direction; calculate wildcard masks; choose placement; and manage ACL entries on Cisco IOS.",
		tags: ["CCNA 5.2", "ACL", "Wildcard Mask", "Cisco IOS"],
		contentType: "acl",
	},
	"layer-2-threats-and-security-features": {
		title: "Layer 2 Threats and Security Features",
		meta: "14 min read · CCNA 5.3 · Security Fundamentals",
		section: "Security Fundamentals",
		intro: "Layer 2 attacks can exploit trust in local switching, address learning, and network configuration protocols. DHCP spoofing, VLAN hopping, ARP spoofing, and MAC flooding can expose traffic or redirect users unless switch access and trunk behavior are secured.",
		body: "Learn how DHCP snooping, secure trunk configuration, VLAN ACLs, Dynamic ARP Inspection, port security, and 802.1X help mitigate common Layer 2 threats.",
		tags: ["CCNA 5.3", "Layer 2 Security", "DHCP Snooping", "DAI"],
		contentType: "layer2-security",
	},
	"aaa-tacacs+-and-radius-tutorial": {
		title: "AAA TACACS+ and RADIUS Tutorial",
		meta: "16 min read · CCNA 5.4 · Security Fundamentals",
		section: "Security Fundamentals",
		intro: "Authentication, Authorization, and Accounting (AAA) centralizes how users prove their identity, what they are allowed to do, and which actions are recorded. Network devices can use a local database or communicate with remote RADIUS or TACACS+ servers.",
		body: "Learn the three AAA functions, compare RADIUS and TACACS+, configure Cisco IOS method lists and fallback behavior, apply authentication to console and VTY lines, and reason through common AAA login scenarios.",
		tags: ["CCNA 5.4", "AAA", "TACACS+", "RADIUS"],
		contentType: "aaa",
	},
	"port-security-tutorial": {
		title: "Port-Security Tutorial",
		meta: "14 min read · CCNA 5.5 · Security Fundamentals",
		section: "Security Fundamentals",
		intro: "Cisco switch port security limits which source MAC addresses may send traffic through an access port. By allowing specific addresses or limiting how many addresses a port can learn, administrators can reduce unauthorized device connections and certain MAC-flooding risks.",
		body: "Configure static or sticky secure MAC addresses, set a maximum and violation mode, verify port-security status, interpret secure-shutdown output, and recover an err-disabled interface.",
		tags: ["CCNA 5.5", "Port Security", "MAC Address", "Cisco Switching"],
		contentType: "port-security",
	},
	"dhcp-snooping-tutorial": {
		title: "DHCP Snooping Tutorial",
		meta: "12 min read · CCNA 5.6 · Security Fundamentals",
		section: "Security Fundamentals",
		intro: "DHCP snooping is a Layer 2 switch security feature that identifies trusted and untrusted interfaces for DHCP traffic. It helps prevent rogue DHCP servers on user-facing ports from sending unauthorized offers and acknowledgements to clients.",
		body: "Learn the DHCP snooping trust model, enable snooping globally and for selected VLANs, trust only the authorized server or relay path, verify DHCP bindings and counters, and troubleshoot common client and server-path issues.",
		tags: ["CCNA 5.6", "DHCP Snooping", "Layer 2 Security", "Cisco Switching"],
		contentType: "dhcp-snooping",
	},
	"gateway-load-balancing-protocol-glbp-tutorial": {
		title: "Gateway Load Balancing Protocol GLBP Tutorial",
		meta: "14 min read · CCNA 3.5 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Gateway Load Balancing Protocol (GLBP) provides first-hop redundancy and distributes gateway forwarding among multiple routers or multilayer switches. Hosts use one virtual IP address, while GLBP assigns different virtual MAC addresses so traffic can be forwarded by multiple active virtual forwarders.",
		body: "Learn the Active Virtual Gateway and Active Virtual Forwarder roles, ARP-based load sharing, GLBP election and failover, balancing algorithms, tracking, authentication, and IOS configuration.",
		tags: ["CCNA 3.5", "GLBP", "Gateway Redundancy", "Load Balancing"],
		contentType: "glbp",
	},
	"hot-standby-router-protocol-hsrp-tutorial": {
		title: "Hot Standby Router Protocol HSRP Tutorial",
		meta: "12 min read · CCNA 3.4 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Hot Standby Router Protocol (HSRP) provides first-hop redundancy for an IPv4 LAN. Multiple routers share a virtual IP address that hosts use as their default gateway; one router forwards traffic as the active router while another waits as the standby router.",
		body: "Learn why HSRP is needed, how virtual addresses and active/standby elections work, what happens during failure, and how HSRP states, timers, versions, and Cisco IOS configuration fit together.",
		tags: ["CCNA 3.4", "HSRP", "Gateway Redundancy", "IP Connectivity"],
		contentType: "hsrp",
	},
	"eigrp-tutorial": {
		title: "EIGRP Tutorial",
		meta: "12 min read · CCNA 3.3 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Enhanced Interior Gateway Routing Protocol (EIGRP) is an advanced distance-vector routing protocol. It discovers directly connected EIGRP neighbors, exchanges reachability information, and uses the Diffusing Update Algorithm (DUAL) to select loop-free routes and maintain eligible backups.",
		body: "Explore EIGRP neighbors and packet types, its neighbor/topology/routing tables, composite metrics, successor and feasible successor routes, and basic Cisco IOS configuration.",
		tags: ["CCNA 3.3", "EIGRP", "DUAL", "Routing"],
		contentType: "eigrp",
	},
	"ospf-tutorial": {
		title: "OSPF Tutorial",
		meta: "12 min read · CCNA 3.2 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Open Shortest Path First (OSPF) is a standards-based link-state routing protocol. Routers running OSPF discover neighbors, describe their local links with link-state advertisements, build a shared link-state database for each area, and run the shortest-path-first calculation to choose routes.",
		body: "Follow how OSPF routers form adjacencies, exchange database information, select router IDs, calculate path cost, and use areas to scale a network.",
		tags: ["CCNA 3.2", "OSPF", "Link-State", "Routing"],
		contentType: "ospf",
	},
	"how-a-router-makes-a-forwarding-decision": {
		title: "How a Router Makes a Forwarding Decision",
		meta: "8 min read · CCNA 3.1 · IP Connectivity",
		section: "IP Connectivity",
		intro: "A router examines the destination IP address of each packet and consults its routing table to determine where the packet should go next. The table contains selected routes learned from connected networks, static configuration, and routing protocols.",
		body: "This lesson follows a packet through route installation and longest-prefix matching, then shows where administrative distance and protocol metrics fit into the process.",
		tags: ["CCNA 3.1", "Routing Table", "Longest-Prefix Match", "IP Connectivity"],
		contentType: "routing-decision",
	},
	"virtual-local-area-networks-(vlans)": {
		title: "Virtual Local Area Network (VLAN) Tutorial",
		meta: "8 min read · CCNA 2.1 · Network Access",
		section: "Network Access",
		intro: "A VLAN is a logical way to group switch ports into separate Layer 2 broadcast domains. Devices can belong to the same department or network group even when they connect to different switches or sit in different areas.",
		body: "VLANs make it easier to organize users by function, limit unnecessary broadcasts, and apply network policies consistently. A VLAN separates Layer 2 traffic; communication between different VLANs requires a Layer 3 device such as a router or multilayer switch.",
		tags: ["CCNA 2.1", "VLAN", "Switching", "Network Access"],
		contentType: "vlan",
	},
	"intervlan-routing-tutorial": {
		title: "Inter-VLAN Routing Tutorial",
		meta: "10 min read · CCNA 2.2 · Network Access",
		section: "Network Access",
		intro: "Devices in the same VLAN can exchange Layer 2 traffic, but devices in different VLANs need a Layer 3 gateway to route packets between their IP networks.",
		body: "Learn how router-on-a-stick and multilayer-switch SVIs provide inter-VLAN routing, then verify the VLAN, trunk, addressing, and gateway configuration.",
		tags: ["CCNA 2.2", "Inter-VLAN Routing", "802.1Q", "Network Access"],
		contentType: "intervlan",
	},
	"spanning-tree-protocol-stp-tutorial": {
		title: "Spanning Tree Protocol (STP) Tutorial",
		meta: "9 min read · CCNA 2.3 · Network Access",
		section: "Network Access",
		intro: "Spanning Tree Protocol (STP) prevents Layer 2 loops while keeping redundant switch links available as backups. It creates a loop-free logical topology by placing selected ports into a forwarding or non-forwarding role.",
		body: "Learn why loops are dangerous, how switches elect a root bridge and choose port roles, and how classic IEEE 802.1D STP reconverges after a link failure.",
		tags: ["CCNA 2.3", "STP", "Layer 2", "Network Access"],
		contentType: "stp",
	},
	"stp-root-port-election-tutorial": {
		title: "STP Root Port Election Tutorial",
		meta: "8 min read · CCNA 2.4 · Network Access",
		section: "Network Access",
		intro: "After STP elects the root bridge, every non-root switch must choose one root port: its best path toward the root. When multiple received BPDUs advertise equal-cost paths, STP uses a specific tie-break order to choose one port consistently.",
		body: "Work through path-cost comparisons, sender Bridge ID tie-breaks, and sender Port ID tie-breaks with practical switch examples.",
		tags: ["CCNA 2.4", "STP", "Root Port", "Network Access"],
		contentType: "stp-root-port",
	},
	"rapid-spanning-tree-protocol-rstp-tutorial": {
		title: "Rapid Spanning Tree Protocol (RSTP) Tutorial",
		meta: "9 min read · CCNA 2.5 · Network Access",
		section: "Network Access",
		intro: "Rapid Spanning Tree Protocol (RSTP), standardized as IEEE 802.1w and incorporated into the later 802.1D revision, improves Layer 2 recovery after topology changes. It retains loop prevention but adds port roles and proposal/agreement behavior that can bring suitable links into service faster than classic STP timers.",
		body: "Learn RSTP root, designated, alternate, and backup roles, the three RSTP port states, how a redundant path can become active, and what happens when RSTP interoperates with legacy STP.",
		tags: ["CCNA 2.5", "RSTP", "802.1w", "Network Access"],
		contentType: "rstp",
	},
	"vlan-trunking-protocol-vtp-tutorial": {
		title: "VLAN Trunking Protocol (VTP) Tutorial",
		meta: "8 min read · CCNA 2.6 · Network Access",
		section: "Network Access",
		intro: "VLAN Trunking Protocol (VTP) is a Cisco-proprietary protocol that can distribute VLAN database information among switches configured for the same VTP domain over trunk links.",
		body: "Learn the VTP server, client, and transparent modes, configuration revision behavior, status verification, trunk prerequisites, and how VTP pruning can reduce unnecessary VLAN traffic on trunks.",
		tags: ["CCNA 2.6", "VTP", "VLAN", "Network Access"],
		contentType: "vtp",
	},
	"etherchannel-tutorial": {
		title: "EtherChannel Tutorial",
		meta: "8 min read · CCNA 2.7 · Network Access",
		section: "Network Access",
		intro: "EtherChannel combines multiple compatible physical Ethernet links into one logical link, called a Port-Channel. Switches and routers can use the logical interface for configuration while the member links provide aggregate capacity and link redundancy.",
		body: "Learn why STP treats a channel as one logical link, how traffic is distributed across members, how PAgP, LACP, and static mode differ, and which settings must match before links can bundle.",
		tags: ["CCNA 2.7", "EtherChannel", "LACP", "PAgP", "Network Access"],
		contentType: "etherchannel",
	},
	"spine-leaf-architecture-tutorial": {
		title: "Spine-Leaf Architecture Tutorial",
		meta: "8 min read · Updated Sep 2026 · Networking Fundamentals",
		section: "Switching & Routing",
		intro: "Spine-leaf architecture is a modern network topology widely used in data centers and cloud environments. It's designed to offer improved scalability, high availability, and consistent low-latency communication, unlike traditional three-tiered hierarchical networks with separate core, distribution, and access layers.",
		body: "The spine layer consists of switches that perform routing and act as the core of the network. The leaf layer holds access switches that connect to servers, storage, and end-users, cutting hop count, reducing latency, and removing the bottlenecks common to three-tier designs.",
		tags: ["Data Center", "Topology", "CCNA", "Switching"],
	},
	"osi-model-tutorial": {
		title: "OSI Model Tutorial",
		meta: "9 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "The OSI model is a seven-layer framework for understanding how data moves between applications and network devices. Each layer has a focused responsibility, making complex communication easier to design, troubleshoot, and explain.",
		tags: ["Fundamentals", "OSI", "Troubleshooting", "CCNA"],
	},
	"tcp-and-udp-tutorial": {
		title: "TCP and UDP Tutorial",
		meta: "18 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) are widely used Transport layer protocols. TCP provides a reliable, ordered byte stream while a connection is active; UDP sends independent datagrams with less built-in transport behavior. Applications choose between them based on their needs.",
		tags: ["TCP", "UDP", "Transport", "CCNA"],
	},
	"wan-tutorial": {
		title: "WAN Tutorial",
		meta: "12 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "A wide area network (WAN) connects geographically separated networks. Organizations commonly use service providers to connect their locations over long distances, while each site continues to use its own local area network (LAN).",
		tags: ["WAN", "LAN", "PPP", "HDLC", "CCNA"],
	},
	"cisco-command-line-interface-cli": {
		title: "Cisco Command Line Interface CLI",
		meta: "8 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Cisco IOS uses command modes to organize available commands and configuration tasks. Recognizing the prompt before entering a command helps you know whether you are viewing device state or changing configuration.",
		tags: ["Cisco IOS", "CLI", "Configuration", "CCNA"],
	},
	"cisco-router-boot-sequence-tutorial": {
		title: "Cisco Router Boot Sequence Tutorial",
		meta: "8 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "A router startup moves through hardware checks, boot-loader execution, operating-system selection, and configuration loading. Knowing what is stored in each memory type helps explain what survives a restart and what the router does when an image or configuration is unavailable.",
		tags: ["Cisco IOS", "Boot Process", "Memory", "CCNA"],
	},
	"subnetting-tutorial---subnetting-made-easy": {
		title: "Subnetting Tutorial - Subnetting Made Easy",
		meta: "12 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Subnetting divides an IP address block into smaller networks. This lesson builds from prefix lengths and binary masks to a practical subnet-boundary calculation, using modern CIDR terminology rather than relying on obsolete class-based allocation.",
		tags: ["IPv4", "Subnetting", "CIDR", "CCNA"],
	},
	"wireless-tutorial": {
		title: "Wireless Tutorial",
		meta: "18 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Wireless LANs let clients exchange data over radio instead of a dedicated cable. This two-page lesson introduces 802.11 operation, WLAN architecture, radio techniques, security generations, and common sources of interference.",
		tags: ["WLAN", "Wi-Fi", "802.11", "CCNA"],
	},
	"ipv6-tutorial": {
		title: "IPv6 Tutorial",
		meta: "14 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "IPv6 expands the available address space and provides a modern protocol for identifying interfaces and routing traffic. This two-page tutorial covers IPv6 notation, address shortening, prefixes, unicast, multicast, anycast, and the scopes used on IPv6 networks.",
		tags: ["IPv6", "Addressing", "Subnetting", "CCNA"],
	},
	"hypervisor-type-1-and-2-tutorial-(on-digitaltut.com)": {
		title: "Hypervisor type 1 and 2 Tutorial (on digitaltut.com)",
		meta: "10 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "A hypervisor creates and runs virtual machines by sharing a host computer’s resources. Understanding the difference between type 1 and type 2 designs, and how virtual network interfaces connect through virtual switches, helps explain virtualization in data centers and labs.",
		tags: ["Virtualization", "Hypervisor", "Virtual Machine", "CCNA"],
	},
};

function slugify(value) {
	return value.toLowerCase().replaceAll(" ", "-");
}

function titleFromSlug(slug) {
	return slug
		.replaceAll("-", " ")
		.replace(/\b\w/g, (letter) => letter.toUpperCase())
		.replace(/\b(Osi|Tcp|Udp|Json|Dhcp|Dns|Nat|Snmp|Vtp|Stp|Cli|Ccnna?)\b/gi, (term) => term.toUpperCase());
}

function TutorialSidebar({ activeSlug }) {
	const [openSections, setOpenSections] = useState(() => {
		const activeSection = sections.find((section) =>
			section.items.some((item) => slugify(item) === activeSlug),
		);
		return new Set(activeSection ? [activeSection.number] : []);
	});
	const [searchQuery, setSearchQuery] = useState("");

	function toggleSection(sectionNumber) {
		setOpenSections((currentSections) => {
			const nextSections = new Set(currentSections);
			if (nextSections.has(sectionNumber)) nextSections.delete(sectionNumber);
			else nextSections.add(sectionNumber);
			return nextSections;
		});
	}

	const normalizedQuery = searchQuery.trim().toLowerCase();
	const visibleSections = sections
		.map((section) => {
			const sectionMatches = `${section.number} ${section.title}`.toLowerCase().includes(normalizedQuery);
			const items = sectionMatches || !normalizedQuery
				? section.items
				: section.items.filter((item) => item.toLowerCase().includes(normalizedQuery));
			return { ...section, visibleItems: items };
		})
		.filter((section) => section.visibleItems.length > 0);

	return (
		<aside className="border-l border-[#e1e8f3] pl-6 lg:sticky lg:top-24 lg:ml-auto lg:w-full lg:max-w-[300px] lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:self-start">
			<label className="relative block w-full">
				<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#005b6b]" />
				<input
					type="search"
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
					placeholder="Filter tutorials..."
					aria-label="Filter tutorials by title or module"
					className="h-[54px] w-full rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] pl-12 pr-4 text-base text-[#172642] outline-none transition focus:border-[#005b6b] focus:ring-2 focus:ring-[#005b6b]/15"
				/>
			</label>
			<div className="mt-6 space-y-2">
				{visibleSections.map((section) => {
					const isOpen = openSections.has(section.number) || Boolean(normalizedQuery);
					return (
						<div key={section.number}>
							<button
								type="button"
								onClick={() => toggleSection(section.number)}
								aria-expanded={isOpen}
								aria-controls={`tutorials-${section.number.replace(".", "-")}`}
								className="group flex min-h-[72px] w-full items-center justify-between gap-3 border-b border-[#dbe5f5] px-1 py-4 text-left"
							>
								<strong className="text-lg leading-tight text-[#111a2d] transition-colors group-hover:text-[#005b6b]">{section.number} {section.title}</strong>
								<span className="flex shrink-0 items-center gap-3 text-base text-[#71819b]">
									<span className="group-hover:text-[#005b6b]">{section.items.length}</span>
									<ChevronDown size={18} className={`text-[#005b6b] transition-transform duration-200 group-hover:text-[#004653] ${isOpen ? "" : "-rotate-90"}`} />
								</span>
							</button>
							{isOpen && (
								<div id={`tutorials-${section.number.replace(".", "-")}`} className="space-y-1 py-2 pl-2">
									{section.visibleItems.map((item) => {
										const slug = slugify(item);
										return (
											<Link
												key={item}
												to={`/modules/programs/ccna/knowledge-hub/${slug}`}
												className={`block rounded-lg px-3 py-2 text-sm leading-snug transition ${activeSlug === slug ? "bg-[#e8f3f4] font-semibold text-[#005b6b]" : "text-[#526584] hover:bg-[#f0f7f7] hover:text-[#005b6b]"}`}
											>
												{item}
											</Link>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
				{normalizedQuery && visibleSections.length === 0 && (
					<p className="px-1 py-4 text-sm text-[#71819b]">No tutorials match “{searchQuery.trim()}”.</p>
				)}
			</div>
		</aside>
	);
}

export default function CCNAKnowledgeArticle() {
	const { profile } = useAuth();
	const { articleSlug = "spine-leaf-architecture-tutorial" } = useParams();
	const userId = profile?.userId;
	const lessonEndRef = useRef(null);
	const vlanArticleSlug = "virtual-local-area-network-vlan-tutorial";
	const aaaArticleSlug = "aaa-tacacs+-and-radius-tutorial";
	const canonicalArticleSlug = articleSlug === "virtual-local-area-networks-(vlans)"
		? vlanArticleSlug
		: articleSlug === "aaa-tacacs-and-radius-tutorial"
			? aaaArticleSlug
			: articleSlug;
	useEffect(() => {
		if (!userId) return undefined;

		const lessonEnd = lessonEndRef.current;
		if (!lessonEnd) return undefined;

		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			markCcnaTutorialOpened(userId, canonicalArticleSlug);
			observer.disconnect();
		});
		observer.observe(lessonEnd);
		return () => observer.disconnect();
	}, [canonicalArticleSlug, userId]);
	const article = articles[articleSlug]
		|| (articleSlug === vlanArticleSlug ? articles["virtual-local-area-networks-(vlans)"] : undefined)
		|| (articleSlug === "aaa-tacacs-and-radius-tutorial" ? articles[aaaArticleSlug] : undefined)
		|| {
		title: titleFromSlug(articleSlug),
		meta: "6 min read · Updated Sep 2026 · CCNA Knowledge",
		section: "Fundamentals",
		intro: "This CCNA learning module explains a practical networking concept through clear definitions, examples, and troubleshooting guidance.",
		body: "Review the key terms, connect them to real network behavior, and use the module checklist to reinforce your understanding before moving to the next lesson.",
		tags: ["CCNA", "Networking", "Study Guide"],
	};
	const flatTutorials = sections.flatMap((section) =>
		section.items.map((item) => ({ title: item, slug: slugify(item) })),
	);
	const currentTutorialIndex = flatTutorials.findIndex((tutorial) => tutorial.slug === canonicalArticleSlug);
	const previousTutorial = currentTutorialIndex > 0 ? flatTutorials[currentTutorialIndex - 1] : null;
	const nextTutorial = currentTutorialIndex >= 0 && currentTutorialIndex < flatTutorials.length - 1
		? flatTutorials[currentTutorialIndex + 1]
		: null;

	return (
		<main className="min-h-screen bg-white text-[#526584]">
			<div className="mx-auto max-w-[1600px] px-5 pb-8 pt-10 sm:px-10 sm:pt-12 lg:px-10">
				<nav className="mb-6 flex min-w-0 flex-wrap items-center gap-2 text-sm sm:text-base" aria-label="Breadcrumb">
					<Link to="/modules/programs/ccna" className="font-semibold text-[#005b6b] hover:underline">CCNA</Link>
					<span>/</span>
					<Link to="/modules/programs/ccna/knowledge-hub" className="font-semibold text-[#005b6b] hover:underline">Knowledge Hub</Link>
					<span>/</span>
					<span className="min-w-0 truncate text-[#8492a9]">{article.title}</span>
				</nav>
				<div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
					<article className="min-w-0 break-words rounded-[24px] border border-[#dbe5f5] px-6 py-9 sm:px-10 sm:py-11">
						<div className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-4 py-2 text-sm font-semibold text-[#005b6b]"><Folder size={15} /> CCNA Knowledge</div>
						<h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#071126] sm:text-5xl">{article.title}</h1>
						<p className="mt-4 flex min-w-0 items-center gap-2 text-base text-[#7b8ca7]"><Clock size={17} /> {article.meta}</p>
						{ccnaModuleOneSlugs.has(articleSlug) ? (
							<CcnaKnowledgeModuleOne article={article} articleSlug={articleSlug} />
						) : ["vlan", "intervlan", "stp", "stp-root-port", "rstp", "vtp", "etherchannel"].includes(article.contentType) ? (
							<CcnaKnowledgeModuleTwo contentType={article.contentType} />
						) : ["routing-decision", "ospf", "eigrp", "hsrp", "glbp"].includes(article.contentType) ? (
							<CcnaKnowledgeModuleThree contentType={article.contentType} />
						) : article.meta.includes("CCNA 4.") ? (
							<CcnaKnowledgeModuleFour article={article} />
						) : article.meta.includes("CCNA 5.") ? (
							<CcnaKnowledgeModuleFive article={article} />
						) : article.meta.includes("CCNA 6.") ? (
							<CcnaKnowledgeModuleSix article={article} />
						) : (
							<CcnaKnowledgeModuleFour article={article} />
						)}
						<div ref={lessonEndRef} aria-hidden="true" className="h-px" />
						<div className="mt-7 flex flex-wrap gap-3">{article.tags.map((tag) => <span key={tag} className="rounded-full border border-[#d6e5e7] bg-[#f5f9f9] px-4 py-2 text-sm text-[#3d5c88]">{tag}</span>)}</div>
						<div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ecec] pt-5">
							{previousTutorial ? (
								<Link to={`/modules/programs/ccna/knowledge-hub/${previousTutorial.slug}`} className="inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] px-5 py-2.5 text-sm font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]">
									<ArrowLeft size={16} /> Previous
								</Link>
							) : <span />}
							<Link to="/modules/programs/ccna/knowledge-hub" className="text-sm font-semibold text-[#005b6b] hover:underline">
								Back to all lessons
							</Link>
							{nextTutorial ? (
								<Link to={`/modules/programs/ccna/knowledge-hub/${nextTutorial.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]">
									Next lesson <ArrowRight size={16} />
								</Link>
							) : <span />}
						</div>
					</article>
					<TutorialSidebar activeSlug={canonicalArticleSlug} />
				</div>
			</div>
		</main>
	);
}
