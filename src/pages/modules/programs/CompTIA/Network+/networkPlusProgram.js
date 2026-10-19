import NetworkPlusBadge from "../../../../../assets/network+.webp";

const NETWORK_PLUS_PROGRAM = {
	programKey: "comptia-network-plus",
	title: "Network+",
	badge: NetworkPlusBadge,
	coursePath: "/training/comptia/network",
	gradebookPath: "/modules/programs/comptia-network-plus/gradebook",
	headline: "Build confidence in",
	highlight: "networking.",
	intros: [
		"Strengthen your network foundation, from core concepts and implementation to operations, security, and troubleshooting.",
		"Explore practical networking skills for connecting, securing, and supporting modern infrastructure.",
		"Follow the CompTIA Network+ learning path through five focused exam domains.",
	],
	banner: {
		before: "Build practical networking skills to connect, manage, secure, and troubleshoot",
		highlight: "modern networks.",
	},
	overview: "A guided learning path through the five CompTIA Network+ exam domains and the practical skills behind them.",
	focusAreas: ["Network architecture and addressing", "Routing, switching, and wireless", "Operations, security, and troubleshooting"],
	modules: [
		{
			number: "1.0",
			title: "Networking concepts",
			weight: "23%",
			description: "Understand the components, protocols, architectures, and addressing that make networks work.",
			topics: ["OSI model, ports, protocols, and traffic types", "Network devices, services, and cloud concepts", "Media, connectors, and network topologies", "IPv4, IPv6, subnetting, and addressing"],
		},
		{
			number: "2.0",
			title: "Network implementation",
			weight: "20%",
			description: "Apply routing, switching, wireless, and physical installation fundamentals.",
			topics: ["Static and dynamic routing, NAT, and redundancy", "VLANs, spanning tree, MTU, and switching", "Wireless standards, channels, security, and access points", "Power, cabling, and environmental considerations"],
		},
		{
			number: "3.0",
			title: "Network operations",
			weight: "19%",
			description: "Maintain dependable networks through documentation, monitoring, and lifecycle practices.",
			topics: ["Network diagrams, asset inventory, and IPAM", "Change, configuration, and lifecycle management", "Monitoring, packet capture, logs, and metrics", "Disaster recovery, network services, and remote access"],
		},
		{
			number: "4.0",
			title: "Network security",
			weight: "14%",
			description: "Protect network resources through access controls, segmentation, and layered defenses.",
			topics: ["Identity, authentication, authorization, and encryption", "Physical security, segmentation, and compliance", "Common network, wireless, and social engineering attacks", "Hardening, ACLs, NAC, and network security zones"],
		},
		{
			number: "5.0",
			title: "Network troubleshooting",
			weight: "24%",
			description: "Use a consistent troubleshooting process to identify, resolve, and document network issues.",
			topics: ["Troubleshooting methodology and verification", "Cabling, interfaces, power, and hardware faults", "Switching, routing, addressing, and network services", "Performance, wireless, and diagnostic tools"],
		},
	],
};

export default NETWORK_PLUS_PROGRAM;
