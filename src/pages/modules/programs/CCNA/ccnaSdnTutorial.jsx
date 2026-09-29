import CcnaLessonImage from "./ccnaLessonImage";
import distributedVsCentralized from "../sdn-1-distributed-vs-centralized.png";
import northboundSouthbound from "../sdn-2-northbound-southbound-interfaces.png";
import apiTypes from "../sdn-3-apis.png";
import sdnBenefits from "../sdn-4-benefits.png";

const imageBase = "https://www.9tut.com/images";

export default function CcnaSdnTutorial() {
	return (
		<div className="mt-7 space-y-6 leading-7 sm:space-y-8">
			<p>Most traditional devices use a distributed architecture, in which each control plane is resided in a networking device. Each device will make its own decision. Therefore they need to communicate with each other via messages to work correctly.</p>
			<p>In contrast to distributed architecture, centralized (or controller-based) architectures centralizes the control of networking devices into one device, called <strong>SDN controller</strong>. This is also the main idea when creating SDN. In other words, SDN creates a king to control the whole networking kingdom!</p>
			<CcnaLessonImage src={distributedVsCentralized} alt="Distributed versus centralized SDN" />
			<CcnaLessonImage src={`${imageBase}/ccna_self_study/SDN/king_chess.jpg`} alt="King chess piece illustrating the SDN controller" />
			<p>Software-Defined Networking (SDN) is an approach to networking that centralizes the control plane into an application called a controller. Therefore a big advantage of SDN is we do not have to manually configure each device or each interface. We just plan a policy framework, and the SDN controller configures all related underlying devices. This approach is faster, more reliable and reduces errors.</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Northbound and Southbound Interfaces</h2>
			<p>As we took the control planes off networking devices but not data planes so we need a way to communicate with them. So we put a <strong>southbound interface</strong> (SBI) at the bottom of SDN controller for this task. An SBI communicates with the devices via an application programming interface (API).</p>
			<CcnaLessonImage src={northboundSouthbound} alt="SDN northbound and southbound interfaces" />
			<p>Now, in turn, the networking administrators and SDN applications want to control the controller! So the controller need a <strong>northbound interface</strong> (NBI) to communicate with the administrators.</p>
			<CcnaLessonImage src={`${imageBase}/ccna_self_study/SDN/Northbound_Interface.jpg`} alt="Northbound interface connecting SDN applications to the controller" />
			<p>The NBI applications included various network services, including network virtualization, dynamic virtual network provisioning, firewall monitoring, user identity management and access policy control.</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl"><strong>Application Programming Interfaces</strong> (APIs)</h2>
			<p>So we already knew there are two interfaces in the SDN controller, which are northbound and southbound interfaces. These two interfaces communicate with administrators and networking devices via <strong>Application Programming Interfaces</strong> (APIs).</p>
			<p>An API uses client/server architecture in which each operation needs a client and a server. The server sends the data while the client receives the data.</p>
			<CcnaLessonImage src={apiTypes} alt="Northbound and southbound API examples" />

			<h3 className="pt-2 text-lg font-bold text-[#071126] sm:text-xl">Northbound APIs</h3>
			<p>SDN northbound APIs are usually Representational State Transfer (RESTful) APIs, which are used to communicate between the administrators’ applications and the SDN Controller. With northbound APIs, the applications that the administrators use to configure the controller are the server, the SDN controller is the client.</p>
			<p><strong>Note:</strong> RESTful APIs are the most commonly used APIs in the world of web services. They use Hypertext Transfer Protocol (HTTP) requests to create, read, update, and delete (CRUD) data. We will have another tutorial for RESTful APIs so we will not mention more about it here.</p>
			<p>Another northbound API is Simple Object Access Protocol (SOAP).</p>

			<h3 className="pt-2 text-lg font-bold text-[#071126] sm:text-xl">Southbound APIs</h3>
			<p>With the southbound APIs, the SDN controller is the server while the networking devices that receives configuration from the controller are the clients.</p>
			<p>OpenFlow and NETCONF are Southbound APIs used for most SDN implementations. Another Southbound API is OpFlex, which is an open-standard, distributed control system. It send “summary policy” to network elements.</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Benefits of SDN</h2>
			<ol className="list-decimal space-y-4 pl-6">
				<li><strong>Simplified Network Management and Configuration</strong><br />By offering a centralized control plane, SDN solution helps simplify the network management and configuration compared to a traditional network, which requires lots of manual configuration and management device-by-device.</li>
				<li><strong>Programmability and Automation</strong><br />SDN allows network administrators to programmatically control and manage the network using software applications. This programmability enables automation of network tasks, reducing the need for manual intervention and minimizing the potential for human errors.</li>
				<li><strong>Improved Network Visibility</strong><br />SDN provides enhanced visibility into network traffic and performance through the centralized controller. This visibility enables better monitoring, analysis, and troubleshooting of network issues, leading to improved overall network performance.</li>
				<li><strong>Scalability</strong><br />SDN is inherently scalable, making it well-suited for environments with varying workloads. As network demands change, SDN can easily scale to accommodate increased traffic and the addition of new devices and services.</li>
				<li><strong>Vendor-Neutral Environment</strong><br />SDN promotes interoperability and reduces dependency on proprietary hardware and software. This vendor-neutral approach allows organizations to choose networking hardware and software components independently, fostering innovation and competition.</li>
				<li><strong>Security Enhancements</strong><br />SDN can improve network security by providing a centralized point for monitoring and enforcing security policies. The ability to program security protocols and responses into the network fabric enhances threat detection and mitigation.</li>
			</ol>
			<CcnaLessonImage src={sdnBenefits} alt="Benefits of SDN" />
		</div>
	);
}
