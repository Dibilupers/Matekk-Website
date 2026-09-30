import { CCNA_MODULE_QUIZ_EXTRA_QUESTIONS } from "./ccnaModuleQuizExtraData.js";

const baseModuleQuizzes = [
	{
		number: "1.0",
		title: "Network Fundamentals",
		questions: [
			{
				prompt: "At which OSI layer are IP addresses used for routing packets between networks?",
				options: ["Physical", "Data Link", "Network", "Transport"],
				answer: 2,
				explanation: "The Network layer (Layer 3) uses logical addresses such as IPv4 and IPv6 to route packets between networks.",
			},
			{
				prompt: "Which statement best describes TCP?",
				options: ["Connectionless and best-effort", "Connection-oriented and reliable", "Used only for DNS", "A Layer 2 addressing protocol"],
				answer: 1,
				explanation: "TCP establishes a connection and provides reliable, ordered delivery using acknowledgments and retransmissions.",
			},
			{
				prompt: "How many usable host addresses are available in a typical IPv4 /26 subnet?",
				options: ["30", "62", "64", "126"],
				answer: 1,
				explanation: "A /26 leaves 6 host bits, for 64 total addresses. Subtract the network and broadcast addresses to get 62 usable hosts.",
			},
			{
				prompt: "Which IPv6 prefix is reserved for link-local addresses?",
				options: ["2000::/3", "FC00::/7", "FE80::/10", "FF00::/8"],
				answer: 2,
				explanation: "IPv6 link-local unicast addresses use FE80::/10 and are used for communication on the local link.",
			},
			{
				prompt: "Which memory typically stores a Cisco router's startup configuration?",
				options: ["RAM", "NVRAM", "ROM", "Flash"],
				answer: 1,
				explanation: "The startup configuration is stored in NVRAM and loaded into RAM when the device boots.",
			},
		],
	},
	{
		number: "2.0",
		title: "Network Access",
		questions: [
			{
				prompt: "Which switchport mode normally places an end-user device in one VLAN?",
				options: ["Access", "Trunk", "Routed", "Dynamic desirable"],
				answer: 0,
				explanation: "An access port is assigned to a single data VLAN and is commonly used for end devices.",
			},
			{
				prompt: "What does an IEEE 802.1Q trunk do?",
				options: ["Encrypts Ethernet frames", "Carries traffic for multiple VLANs over one link", "Blocks all broadcast traffic", "Assigns IP addresses to VLANs"],
				answer: 1,
				explanation: "An 802.1Q trunk identifies VLAN membership with tags so multiple VLANs can share a physical link.",
			},
			{
				prompt: "What is the primary purpose of Spanning Tree Protocol?",
				options: ["Prevent Layer 2 loops", "Route between IPv4 subnets", "Negotiate IP addresses", "Aggregate IP routes"],
				answer: 0,
				explanation: "STP prevents Layer 2 switching loops by logically blocking redundant paths.",
			},
			{
				prompt: "Which protocol can negotiate an EtherChannel with devices from different vendors?",
				options: ["DTP", "PAgP", "LACP", "VTP"],
				answer: 2,
				explanation: "LACP is the IEEE 802.3ad/802.1AX standard link aggregation protocol and supports multivendor interoperability.",
			},
			{
				prompt: "Which VTP mode can create and advertise VLAN changes while keeping a local VLAN database?",
				options: ["Client", "Server", "Transparent", "Access"],
				answer: 1,
				explanation: "A VTP server can create, modify, and advertise VLAN information for its VTP domain.",
			},
		],
	},
	{
		number: "3.0",
		title: "IP Connectivity",
		questions: [
			{
				prompt: "When multiple routes match a destination, which route does a router prefer first?",
				options: ["The route with the longest matching prefix", "The route with the highest metric", "The oldest route", "The route learned last"],
				answer: 0,
				explanation: "Longest-prefix match selects the most specific route that matches the destination address.",
			},
			{
				prompt: "Which routing protocol is a link-state Interior Gateway Protocol?",
				options: ["RIP", "OSPF", "BGP", "EIGRP only"],
				answer: 1,
				explanation: "OSPF is a link-state IGP that builds a topology database and runs the SPF algorithm.",
			},
			{
				prompt: "Which route represents a default route in an IPv4 routing table?",
				options: ["255.255.255.255/32", "127.0.0.0/8", "0.0.0.0/0", "224.0.0.0/4"],
				answer: 2,
				explanation: "The IPv4 default route 0.0.0.0/0 matches destinations not matched by a more specific route.",
			},
			{
				prompt: "What is the purpose of HSRP?",
				options: ["First-hop gateway redundancy", "Encrypt routing updates", "Assign VLAN IDs", "Discover neighboring switches"],
				answer: 0,
				explanation: "HSRP lets routers share a virtual gateway address so a standby router can take over if the active router fails.",
			},
			{
				prompt: "Which protocol uses DUAL to calculate loop-free routes?",
				options: ["OSPF", "EIGRP", "STP", "LACP"],
				answer: 1,
				explanation: "EIGRP uses the Diffusing Update Algorithm (DUAL) to select loop-free successor routes.",
			},
		],
	},
	{
		number: "4.0",
		title: "IP Services",
		questions: [
			{
				prompt: "What is the correct order of the basic DHCP address assignment exchange?",
				options: ["Offer, Discover, Acknowledge, Request", "Discover, Offer, Request, Acknowledge", "Request, Discover, Offer, Acknowledge", "Discover, Request, Offer, Acknowledge"],
				answer: 1,
				explanation: "DORA stands for Discover, Offer, Request, and Acknowledgment.",
			},
			{
				prompt: "Which service translates domain names into IP addresses?",
				options: ["DHCP", "DNS", "NTP", "SNMP"],
				answer: 1,
				explanation: "The Domain Name System resolves names such as a hostname to DNS records including IP addresses.",
			},
			{
				prompt: "What does PAT commonly use to let multiple inside hosts share one public IPv4 address?",
				options: ["Different TCP/UDP port numbers", "Different VLAN IDs", "Different MAC addresses", "ICMP sequence numbers only"],
				answer: 0,
				explanation: "Port Address Translation distinguishes sessions with transport-layer port numbers while sharing a translated address.",
			},
			{
				prompt: "Which protocol helps synchronize clocks on network devices?",
				options: ["NTP", "TFTP", "SNMP", "ARP"],
				answer: 0,
				explanation: "Network Time Protocol synchronizes device clocks, which helps correlate logs and events.",
			},
			{
				prompt: "Which QoS function limits a traffic rate and may discard or remark excess traffic?",
				options: ["Shaping", "Policing", "Queuing", "Classification"],
				answer: 1,
				explanation: "Policing enforces a rate by dropping or remarking traffic that exceeds the configured profile; shaping buffers and delays excess traffic.",
			},
		],
	},
	{
		number: "5.0",
		title: "Security Fundamentals",
		questions: [
			{
				prompt: "What happens to traffic that reaches the end of an IPv4 ACL without matching an entry?",
				options: ["It is permitted by default", "It is denied by the implicit deny", "It is sent to the CPU for routing", "It is matched to the first entry"],
				answer: 1,
				explanation: "Every IPv4 ACL has an implicit deny at the end, so unmatched traffic is denied.",
			},
			{
				prompt: "What does switch port security primarily restrict?",
				options: ["Source MAC addresses on a switchport", "IP routes learned by a router", "TCP ports on a firewall", "Wireless encryption algorithms"],
				answer: 0,
				explanation: "Port security limits the number or identity of secure source MAC addresses allowed on a switchport.",
			},
			{
				prompt: "In AAA, which function determines what an authenticated user is allowed to do?",
				options: ["Authentication", "Authorization", "Accounting", "Association"],
				answer: 1,
				explanation: "Authorization determines permitted actions and resources after identity has been authenticated.",
			},
			{
				prompt: "What is a security benefit of multi-factor authentication?",
				options: ["It requires evidence from more than one authentication factor", "It removes the need to identify users", "It encrypts all network traffic automatically", "It replaces authorization and accounting"],
				answer: 0,
				explanation: "Multi-factor authentication combines different factor types, making a stolen password alone less likely to grant access.",
			},
			{
				prompt: "What does Dynamic ARP Inspection use to validate ARP messages in a common deployment?",
				options: ["DHCP snooping bindings", "NTP associations", "OSPF neighbors", "DNS cache entries"],
				answer: 0,
				explanation: "DAI can validate IP-to-MAC information in ARP messages against DHCP snooping bindings or configured ARP ACLs.",
			},
		],
	},
	{
		number: "6.0",
		title: "Automation and Programmability",
		questions: [
			{
				prompt: "In software-defined networking, what is the role of the control plane?",
				options: ["Forward frames using ASICs only", "Make decisions about where traffic should go", "Provide physical cabling", "Encrypt application payloads"],
				answer: 1,
				explanation: "The control plane makes forwarding and network policy decisions; the data plane forwards traffic according to those decisions.",
			},
			{
				prompt: "Which HTTP method is conventionally used to retrieve a resource with a REST API?",
				options: ["GET", "POST", "PATCH", "DELETE"],
				answer: 0,
				explanation: "GET retrieves a representation of a resource and is conventionally used for read operations.",
			},
			{
				prompt: "Which statement describes JSON?",
				options: ["A binary routing protocol", "A text data format with objects and arrays", "A network access control standard", "A transport-layer protocol"],
				answer: 1,
				explanation: "JSON is a text-based data-interchange format built from values such as objects, arrays, strings, numbers, and booleans.",
			},
			{
				prompt: "Which automation tool is commonly described as agentless and uses SSH for many network-device tasks?",
				options: ["Ansible", "Puppet agent", "SNMP", "NETCONF only"],
				answer: 0,
				explanation: "Ansible commonly connects to managed systems without installing a persistent agent, often using SSH for network automation.",
			},
			{
				prompt: "What is the primary idea behind declarative configuration management?",
				options: ["Describe the desired end state and let the tool converge toward it", "Issue only one-time CLI commands with no state tracking", "Replace all APIs with spreadsheets", "Require an operator to configure every device manually"],
				answer: 0,
				explanation: "Declarative tools describe the desired state and repeatedly work to keep the managed system aligned with it.",
			},
		],
	},
];

export const CCNA_MODULE_QUIZZES = baseModuleQuizzes.map((quiz) => ({
	...quiz,
	questions: [
		...quiz.questions,
		...(CCNA_MODULE_QUIZ_EXTRA_QUESTIONS[quiz.number] ?? []),
	],
}));
