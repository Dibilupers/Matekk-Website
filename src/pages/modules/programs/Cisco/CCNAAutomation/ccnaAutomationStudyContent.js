export const CCNA_AUTOMATION_STUDY_CONTENT = {
	"1.0": {
		intro: "Network programmability uses software, data models, and APIs to make network operations consistent and repeatable. The CCNA tutorial lessons in this module introduce the controller model, configuration tools, structured data, AI concepts, and REST APIs.",
		sections: [
			{
				title: "Controllers, planes, and interfaces",
				body: "Traditional devices make forwarding decisions locally. In software-defined networking, a controller coordinates policy and communicates with devices through southbound interfaces, while applications and operators use northbound APIs. The data plane still forwards packets; automation changes how configuration and policy are delivered.",
				points: ["Use the controller to coordinate intent across devices, not as a replacement for packet forwarding.", "Treat APIs as explicit contracts between an application, controller, and network device."],
				example: "A controller can apply the same approved access policy to a group of switches and report which devices accepted the change.",
			},
			{
				title: "Configuration tools and structured data",
				body: "Puppet, Chef, and Ansible describe repeatable configuration tasks in different ways. JSON represents objects and arrays, while YAML is commonly used for readable configuration and playbooks. A script or tool should parse these formats into structured values rather than rely on fragile text matching.",
				points: ["Compare a tool's execution model and device support before selecting it.", "Validate data structure and required fields before applying a configuration."],
				example: "An Ansible playbook can read YAML variables, connect to managed devices, apply a task, and report whether state changed.",
			},
			{
				title: "APIs and responsible automation",
				body: "REST APIs use HTTP requests to read or change resources. A useful workflow checks documentation, authenticates safely, sends a request, validates the response, and reports failures. Predictive AI estimates likely outcomes from data; generative AI creates new content, so outputs must be reviewed before being used in operational work.",
				points: ["Check status codes and response data instead of assuming a request succeeded.", "Keep credentials protected and review generated or automated changes before deployment."],
				example: "A script can query an API for device inventory, validate that the response contains device IDs, and stop with a clear error if the service rejects the request.",
			},
		],
	},
	"2.0": {
		intro: "Software development and design turn automation ideas into code that can be tested, understood, reused, and maintained. Network automation scripts often process structured data and coordinate changes across multiple devices, so clear design and a recoverable change history are essential.",
		sections: [
			{
				title: "Data formats and parsing",
				body: "XML represents nested data with tagged elements, JSON uses objects and arrays, and YAML uses indentation for readable mappings and lists. Parsing converts these documents into program data structures. Validate required keys, expected types, and nested values before using parsed data to build a device configuration.",
				points: ["Use a format supported by the API or tool you are integrating.", "Treat external input as untrusted; handle malformed or missing fields explicitly."],
				example: "A JSON inventory object such as {\"device\":\"edge-1\",\"enabled\":true} becomes a dictionary whose fields can be checked before a script connects.",
			},
			{
				title: "Testing, methods, classes, and patterns",
				body: "Test-driven development starts with a test that describes expected behavior, then implements the smallest change that makes it pass. Functions isolate operations; classes group related state and behavior; modules divide a larger project into focused files. MVC separates data, interface, and control responsibilities, while Observer lets interested components react to state changes.",
				points: ["Test normal, boundary, and failure cases, including unreachable devices and invalid responses.", "Prefer small focused functions over copying similar device logic throughout a script."],
				example: "A unit test can mock an API response and verify that a parser extracts the management address without contacting a live network.",
			},
			{
				title: "Development methods and Git",
				body: "Agile delivers work in short feedback cycles, Lean reduces waste and improves flow, and Waterfall plans work in sequential phases. Git records snapshots of project changes. Clone obtains a repository, add stages changes, commit records them, push and pull exchange work, branches isolate tasks, merge combines histories, and diff displays changes.",
				points: ["Choose a workflow that fits the team's delivery and review needs.", "Review a diff before committing or merging so unintended configuration or secrets are not included."],
				example: "Make a feature branch, change a parser, run its tests, inspect the diff, commit the work, then open it for review before merging.",
			},
		],
	},
	"3.0": {
		intro: "An API exposes operations through documented endpoints or methods. To automate safely, translate a requirement into a request, supply the correct identity and data, interpret the response, and account for service constraints such as pagination, rate limits, and asynchronous jobs.",
		sections: [
			{
				title: "Constructing and troubleshooting REST requests",
				body: "A REST request combines an HTTP method, URL, headers, authentication, and sometimes a body. GET commonly reads, POST creates or starts an operation, PUT replaces, PATCH partially updates, and DELETE removes. Status codes describe the outcome: 2xx success, 3xx redirection, 4xx request or authorization problems, and 5xx server failures.",
				points: ["Compare the actual method, URL, headers, and payload against the API documentation.", "Inspect response headers and body for error details, pagination links, and request identifiers."],
				example: "A 401 points first to authentication; a 403 suggests the identity lacks permission; a 429 means the client should respect the service's rate limit.",
			},
			{
				title: "Webhooks, constraints, and API styles",
				body: "Polling repeatedly asks a service for updates; a webhook sends an event to a registered receiver when something changes. APIs may impose rate limits, payload-size limits, pagination, version requirements, and timeouts. Synchronous calls return a result in the same interaction; asynchronous calls return a job or receipt that must be checked later. REST is resource-oriented; RPC focuses on invoking operations.",
				points: ["Make webhook receivers authenticate, validate, and safely handle duplicate events.", "Use pagination and backoff rather than requesting unbounded data or retrying rapidly."],
				example: "After submitting a long-running change, an API may return a job ID. Poll the documented job endpoint until it reports completion or failure.",
			},
			{
				title: "Authentication and Python requests",
				body: "Basic authentication encodes a username and password and must be protected by TLS. Custom tokens and API keys identify a client but still require secure storage, rotation, and least privilege. In Python, requests can send headers and JSON, set a timeout, check the status, and parse the body. Never silently treat a failed response as a successful change.",
				points: ["Load secrets from an approved secret store or environment injection, not source code.", "Set timeouts and explicitly handle authentication, connection, parsing, and server errors."],
				example: "A script should call raise_for_status or inspect the status, then validate the expected JSON fields before reporting success.",
			},
		],
	},
	"4.0": {
		intro: "Cisco platforms expose network, compute, collaboration, and security capabilities through APIs and SDKs. The exact resource model varies by platform, so automation should begin with a requirement, select the matching platform, and use its documented authentication and API workflow.",
		sections: [
			{
				title: "Cisco network, compute, and collaboration platforms",
				body: "Meraki and Catalyst Center provide network management and client/device data; ACI manages application-centric data-center policy; Catalyst SD-WAN manages WAN fabric; NSO models and orchestrates services. UCS Manager and Intersight manage compute infrastructure. Webex, Webex devices, and Unified CM expose collaboration capabilities, including AXL and UDS interfaces.",
				points: ["Map the requested operation to the platform that owns that resource.", "Check platform roles, API version, permissions, and supported operations before coding."],
				example: "To list clients visible on a Meraki network, use the documented organization/network context and paginate through the endpoint's results.",
			},
			{
				title: "Security platforms and device interfaces",
				body: "Cisco security products expose events, policy, endpoint, identity, and threat-analysis data through their own APIs. IOS XE and NX-OS can also expose device-level programmable interfaces. Model-driven interfaces use YANG to describe data; NETCONF and RESTCONF provide mechanisms to read or change modeled configuration and operational state.",
				points: ["Request only the data needed and apply least-privilege access to API identities.", "Distinguish controller-level operations from direct device-level changes to avoid conflicting sources of truth."],
				example: "A workflow can query a security platform for an alert, retrieve related endpoint context, and produce a report without automatically changing enforcement policy.",
			},
			{
				title: "Build an SDK/API workflow from requirements",
				body: "A reliable script identifies inputs and expected output, authenticates, calls the SDK or endpoint, handles pagination and errors, transforms data, and verifies the result. Keep platform-specific calls separate from business logic so a change in endpoint details does not spread through the entire application.",
				points: ["Read SDK examples and API schemas; do not guess parameter names or response shapes.", "Test with a small, read-only request before enabling any operation that changes resources."],
				example: "For a device inventory, define the required fields, fetch pages, normalize IDs and names, reject incomplete records, then report totals and any API errors.",
			},
		],
	},
	"5.0": {
		intro: "Application deployment is the process of building, packaging, configuring, and operating software. The placement and packaging model affects latency, scaling, reliability, and security; delivery pipelines and security controls help make releases predictable.",
		sections: [
			{
				title: "Edge, cloud, virtual machines, and containers",
				body: "Edge computing places processing near users, devices, or data sources to reduce latency and backhaul. Private cloud is dedicated to one organization, public cloud uses a provider's shared platform, and hybrid cloud combines environments. Bare metal runs directly on hardware, virtual machines include a guest operating system, and containers package an application with its dependencies while sharing a host kernel.",
				points: ["Choose placement based on latency, connectivity, data location, and operational constraints.", "Do not treat containers as identical to virtual machines; their isolation and packaging models differ."],
				example: "A local analytics service may run at the edge when it must continue working during a WAN outage, while centralized reporting runs in a cloud service.",
			},
			{
				title: "CI/CD, tests, and Docker",
				body: "A CI/CD pipeline typically checks out source, installs dependencies, runs lint and tests, builds an artifact or image, scans it, and deploys through controlled environments. A Dockerfile describes how to build an image; the image is an immutable package used to create containers. Unit tests isolate a small piece of code and check its behavior.",
				points: ["Use reproducible builds and test the same artifact that will be deployed.", "Review Dockerfile base images, copied files, exposed ports, and runtime user."],
				example: "A pipeline can reject a change when a unit test fails, build the image only after tests pass, and require approval before production deployment.",
			},
			{
				title: "Application security and operations",
				body: "Secrets must not be committed to source or embedded in images. Protect data in transit with authenticated encryption and protect stored data according to its sensitivity. Firewalls restrict flows; DNS resolves names; load balancers distribute traffic; reverse proxies provide an application-facing intermediary. OWASP risks include injection, cross-site scripting, and cross-site request forgery. DevOps joins development and operations through shared responsibility and feedback.",
				points: ["Validate input and use parameterized database operations to reduce injection risk.", "Use secure cookie and request protections against XSS and CSRF, and review access controls."],
				example: "A reverse proxy can terminate TLS and route requests to application containers, while the firewall only permits the proxy to reach the service port.",
			},
		],
	},
	"6.0": {
		intro: "Infrastructure automation applies planned and repeatable changes to networks. Model-driven data, APIs, configuration tools, test environments, version control, and review combine to reduce manual repetition while keeping operators in control of the change.",
		sections: [
			{
				title: "Models, controllers, and testing environments",
				body: "Model-driven programmability represents configuration and state as structured data defined by a schema such as YANG. A controller manages a broader network view; device-level management addresses an individual device. Cisco Modeling Labs can simulate network topologies, while pyATS supports structured network testing and validation.",
				points: ["Use the schema to understand valid paths, types, and constraints before changing data.", "Test the effect on representative topologies before production deployment."],
				example: "A pre-change test can capture interface and route state, apply a lab change, then compare expected and observed state.",
			},
			{
				title: "Infrastructure as code and pipelines",
				body: "Infrastructure as code stores desired infrastructure state and procedures in version-controlled files. CI/CD can lint and validate changes, run tests, produce a diff, and gate deployment on review. Python may call Cisco APIs; Ansible expresses tasks and target inventory; Bash handles operating-system workflows. Each tool has a different role and failure mode.",
				points: ["Make changes idempotent where possible so repeated runs converge on the desired state.", "Separate validation from deployment and require appropriate approval for high-impact changes."],
				example: "A pipeline can parse a network change file, validate required fields, run pyATS checks in a lab, and display a unified diff to a reviewer.",
			},
			{
				title: "Read outputs, diffs, and API sequences",
				body: "NETCONF and RESTCONF responses contain modeled data that should be interpreted against the YANG schema. A unified diff marks removed lines with a minus and added lines with a plus, helping reviewers see the exact change. A sequence diagram shows actors, messages, and ordering, which helps locate timeouts or unexpected dependencies in API workflows.",
				points: ["Check response status and data paths rather than relying on a successful transport connection alone.", "Review both additions and removals in a diff; a small deletion can have a large operational effect."],
				example: "A sequence diagram may show a script authenticating, requesting a token, fetching device data, submitting a change, then polling the job result.",
			},
		],
	},
	"7.0": {
		intro: "Network fundamentals let an automation engineer reason about what a script is changing and diagnose why an application cannot communicate. Addressing, VLANs, routing, common devices, service protocols, and network planes form the operational context for automated workflows.",
		sections: [
			{
				title: "Layer 2 and Layer 3 addressing",
				body: "A MAC address identifies a Layer 2 interface on a local segment, and switches learn source MAC addresses to forward frames. VLANs divide a switched network into broadcast domains. IP addresses identify Layer 3 interfaces; a subnet mask or prefix determines which addresses are local, while a route and gateway guide traffic to remote networks.",
				points: ["Check the VLAN and MAC learning when a host cannot reach its local gateway.", "Check prefix, route, and default gateway when a host can reach local devices but not remote networks."],
				example: "A host with address 192.0.2.20/24 treats 192.0.2.1 as local, but sends traffic for another subnet to its configured gateway.",
			},
			{
				title: "Devices, topology, and network planes",
				body: "Switches forward frames, routers forward packets between networks, firewalls enforce traffic policy, and load balancers distribute application requests. A topology diagram describes links, interfaces, and paths. The control plane computes decisions, the data plane forwards traffic, and the management plane provides administrative access and monitoring.",
				points: ["Trace each hop and identify the interface, device role, and policy boundary.", "Use plane separation to distinguish a forwarding problem from a control or management problem."],
				example: "If a route exists but packets are dropped at a firewall, the routing control plane may be healthy while the security policy blocks the data plane flow.",
			},
			{
				title: "Services, ports, and connectivity troubleshooting",
				body: "DHCP assigns network configuration, DNS maps names to addresses, NAT translates addresses, SNMP supports monitoring, and NTP synchronizes time. Common ports include SSH 22, Telnet 23, HTTP 80, HTTPS 443, and NETCONF over SSH 830. Troubleshoot from name resolution and addressing through route, policy, transport port, proxy, VPN, and application response.",
				points: ["Correlate port and protocol with the actual service rather than guessing from a symptom.", "Account for NAT translation, proxy policy, VPN routes, and firewall rules along the path."],
				example: "For a failed HTTPS request, resolve DNS, test reachability to the destination, confirm TCP/443 is permitted, check proxy/VPN settings, and inspect the TLS or application error.",
			},
		],
	},
};

export const CCNA_AUTOMATION_OBJECTIVE_CONTENT = {
	"2.2": {
		intro: "Parsing, also called deserialization, converts JSON, YAML, or XML text into native Python data structures such as dictionaries, lists, strings, integers, booleans, and None. Serialization does the reverse: it turns Python objects back into text. Network automation uses parsing to read API responses, load inventories, validate input, select fields, and create new payloads. Prefer format parsers over regular expressions or string slicing because parsers understand nesting, quotes, and escaping.",
		sections: [
			{
				title: "What parsing means and why it matters",
				body: "A common workflow is data in → parse to Python objects → validate and process → serialize data out. Python's standard library includes json and xml.etree.ElementTree; YAML commonly uses the PyYAML package, and xmltodict can map XML to dictionaries.",
				points: [
					"Use json for JSON and xml.etree.ElementTree for XML; install PyYAML for the yaml module and xmltodict when a dictionary representation of XML is useful.",
					"Validate required fields and expected types after parsing, before using external data to configure devices.",
				],
				code: `# Text data -> Python objects -> text data
data = json.loads(json_text)
validate(data)
json_text = json.dumps(data, indent=2)`,
				example: "A network inventory can be parsed into dictionaries and lists, checked for required device names and addresses, and then used to create a validated API payload.",
			},
			{
				title: "Parse JSON with Python's json module",
				body: "JSON objects become Python dictionaries, arrays become lists, strings remain strings, numbers become int or float, true and false become True and False, and null becomes None. Use loads and dumps for strings, and load and dump for file objects. The s in loads and dumps is a reminder that those functions work with strings. The requests response method r.json() parses the response body for you.",
				points: [
					"Use json.loads(text) to parse a string and json.load(file) to parse an open file.",
					"Use json.dumps(object) to serialize to a string and json.dump(object, file) to write JSON to a file.",
					"Read nested data one step at a time: dictionary key, list index, then the next key.",
				],
				code: `import json

raw = '{"hostname":"SW1","mgmt":{"ip":"10.1.1.1"},"vlans":[10,20,30],"poe":null,"up":true}'
device = json.loads(raw)

print(device["hostname"])       # SW1
print(device["mgmt"]["ip"])     # 10.1.1.1
print(device["vlans"][0])       # 10
print(device["poe"] is None)    # True

with open("device.json") as file:
    inventory = json.load(file)
with open("out.json", "w") as file:
    json.dump(inventory, file, indent=2)`,
				example: "If a REST API returns JSON, r.json() produces Python dictionaries and lists that a script can inspect, for example response.json()[\"hostname\"].",
			},
			{
				title: "Parse YAML safely with PyYAML",
				body: "YAML mappings become dictionaries and sequences become lists. Scalar values may become strings, integers, floats, booleans, or None. Use yaml.safe_load for ordinary or untrusted YAML; yaml.safe_dump serializes Python objects as readable YAML. Multiple YAML documents separated by --- can be read with yaml.safe_load_all.",
				points: [
					"Always use yaml.safe_load for untrusted or normal configuration files; plain yaml.load may execute arbitrary code.",
					"Indentation defines structure. Use spaces rather than tabs.",
					"Quote ambiguous strings such as no or version values such as 1.10 when they must not be interpreted as booleans or numbers.",
				],
				code: `import yaml

with open("inventory.yml") as file:
    inventory = yaml.safe_load(file)

print(inventory["site"])  # HQ
for device in inventory["devices"]:
    print(device["name"], device["ip"], device.get("enabled", True))

yaml_text = yaml.safe_dump(inventory, default_flow_style=False)`,
				example: "A YAML sequence of devices becomes a list of dictionaries, so a script can loop through each device and read its name, IP address, and optional settings.",
			},
			{
				title: "Parse XML with ElementTree or xmltodict",
				body: "XML is a tree of elements. An ElementTree element has a tag, optional attributes, text, and child elements; ElementTree keeps the tree rather than automatically converting it to a dictionary. XML text is always a string, so convert numeric values explicitly. For NETCONF XML namespaces, pass a prefix-to-namespace map when searching.",
				points: [
					"Use ElementTree.fromstring for XML text or ElementTree.parse for a file; find and findall locate children, and iter searches the tree.",
					"Use element.attrib or element.get(name) to read attributes, and element.text to read text.",
					"xmltodict.parse converts XML into nested dictionaries; attributes use keys prefixed with @. Use force_list when a child should always be a list, even when only one appears.",
				],
				code: `import xml.etree.ElementTree as ET

xml_text = """<device id="sw1">
  <hostname>SW1</hostname>
  <interfaces>
    <interface><name>Gi1</name><vlan>10</vlan></interface>
    <interface><name>Gi2</name><vlan>20</vlan></interface>
  </interfaces>
</device>"""

root = ET.fromstring(xml_text)
print(root.tag, root.get("id"))  # device sw1
print(root.find("hostname").text)  # SW1
for interface in root.findall("interfaces/interface"):
    name = interface.find("name").text
    vlan = int(interface.find("vlan").text)
    print(name, vlan)

# NETCONF replies commonly use namespaces:
ns = {"if": "urn:ietf:params:xml:ns:yang:ietf-interfaces"}
interfaces = root.findall(".//if:interface", ns)`,
				example: "Use xmltodict when dictionary-style access is more convenient: xmltodict.parse(xml_text)[\"device\"][\"@id\"] reads the device id attribute. Repeated XML elements may be a list, but a single element may be a dictionary unless force_list is used.",
			},
			{
				title: "Map common format values to Python types",
				body: "JSON and YAML have native representations for many scalar and collection types. XML parsing preserves element text as strings and represents structure as a tree (or, with xmltodict, nested dictionaries); convert values such as VLAN IDs when numeric operations are needed.",
				points: [
					"JSON objects and YAML mappings become dict; JSON arrays and YAML sequences become list.",
					"JSON and YAML numbers become int or float. XML text such as 10 remains str until explicitly converted.",
					"JSON null and YAML null or ~ become None; XML has no universal built-in null mapping.",
					"ElementTree exposes XML attributes through .attrib; xmltodict represents them with an @ prefix.",
				],
				code: `# The same first VLAN, expressed in different formats:
json.loads('{"vlans":[10,20]}')["vlans"][0]
yaml.safe_load("vlans: [10, 20]")["vlans"][0]
int(ET.fromstring("<vlans><v>10</v><v>20</v></vlans>").find("v").text)`,
				example: "The three expressions each produce the integer 10. The XML example explicitly converts element text from a string to an integer.",
			},
			{
				title: "Use parsed data in network automation",
				body: "Parsing connects structured data to network tasks: inspect a RESTCONF JSON response, process a NETCONF XML reply, or load a YAML inventory to generate commands. Validate the response shape and required keys rather than assuming every service response is successful or complete.",
				points: [
					"RESTCONF commonly returns JSON objects containing lists of interfaces; inspect nested fields and use defaults only for genuinely optional values.",
					"NETCONF returns XML that can be parsed with xmltodict or ElementTree to read configuration data.",
					"YAML inventory lists can drive repeatable per-device work, such as creating VLAN commands from each device's configuration.",
				],
				code: `# YAML inventory -> commands
inventory = yaml.safe_load(open("inventory.yml"))
for device in inventory["devices"]:
    commands = [f"vlan {vlan}" for vlan in device.get("vlans", [])]
    print(device["name"], commands)`,
				example: "For production scripts, also verify the service identity and transport security, protect credentials, and explicitly check HTTP or NETCONF errors before reporting success.",
			},
			{
				title: "Common parsing errors and safe practices",
				body: "Parsing errors often indicate malformed input or an unexpected response structure. Inspect the actual response and Python types, then handle expected failures explicitly. Do not use eval to parse data, and use context managers so files close reliably.",
				points: [
					"JSONDecodeError: check for invalid JSON such as single quotes or trailing commas, and check that an API did not return an HTML error page.",
					"KeyError, IndexError, or TypeError: verify each key and list index and inspect type(value); use dict.get when a field is optional.",
					"YAMLError: check indentation, tabs, ambiguous scalar values, and YAML version behavior.",
					"ElementTree ParseError or a missing .text: check malformed XML, spelling, and whether a namespace map is needed.",
					"xmltodict can return a dictionary for one child and a list for repeated children; use force_list when consistent list behavior is needed.",
					"Use yaml.safe_load; for untrusted XML consider defusedxml; never use eval to parse external data.",
				],
				code: `try:
    data = response.json()
    vlan = data["vlans"][0]
except json.JSONDecodeError:
    print("Response was not valid JSON:", response.text[:100])
except (KeyError, IndexError, TypeError) as error:
    print("Unexpected response structure:", error)`,
				example: "If ElementTree find() returns None, accessing .text raises an AttributeError. Check the tag and namespace and handle a missing element before reading its text.",
			},
			{
				title: "Practice: access nested data",
				body: "Given a parsed inventory dictionary, combine dictionary keys and list indexes to reach the requested value. A dictionary lookup with [] raises KeyError when the key does not exist, while .get() returns None or a supplied default.",
				points: [
					"data[\"devices\"][0][\"name\"] returns SW1.",
					"data[\"devices\"][0][\"vlans\"][1] returns 20.",
					"data[\"devices\"][1][\"mgmt\"][\"ip\"] returns 10.1.1.2.",
					"len(data[\"devices\"]) returns 2; data[\"devices\"][0].get(\"mgmt\") returns None if that key is absent.",
					"Debug nested values with print(type(value)) and json.dumps(value, indent=2).",
				],
				code: `data = {
    "site": "HQ",
    "devices": [
        {"name": "SW1", "vlans": [10, 20], "poe": None},
        {"name": "SW2", "vlans": [30], "mgmt": {"ip": "10.1.1.2"}}
    ]
}

data["devices"][0]["name"]       # "SW1"
data["devices"][0]["vlans"][1]   # 20
data["devices"][1]["mgmt"]["ip"] # "10.1.1.2"`,
				example: "For review, remember which functions work with strings versus files (loads/load/dumps/dump), the safe YAML function (safe_load), and XML entry points (fromstring/parse).",
			},
		],
	},
	"2.1": {
		intro: "A data format is a structured way to organize and represent information so people and computer programs can store, read, and exchange it. The same student record can be represented in XML, JSON, or YAML.",
		sections: [
			{
				title: "XML — Extensible Markup Language",
				body: "XML represents data with opening and closing tags. The tags describe the structure, and applications interpret the text values.",
				points: [
					"Commonly used for document exchange, enterprise systems, and structured configuration.",
					"Supports attributes, namespaces, and document structures, and documents can be validated against schemas.",
					"Can be verbose and more complex to read and process than compact formats.",
				],
				code: `<student>
    <name>Ana</name>
    <age>20</age>
    <course>Information Technology</course>
</student>`,
				example: "Tags such as <student>, <name>, and <age> mark the data's structure. Values are text unless the application interprets them as other types.",
			},
			{
				title: "JSON — JavaScript Object Notation",
				body: "JSON organizes data with objects, arrays, and key-value pairs. Strings use double quotation marks; numbers, booleans, and null have distinct representations.",
				points: [
					"Commonly used by web APIs and for exchanging data between applications.",
					"Compact, widely supported, and maps naturally to Python dictionaries, lists, and basic values.",
					"Standard JSON does not support comments and has no native syntax for dates or custom objects.",
				],
				code: `{
    "student": {
        "name": "Ana",
        "age": 20,
        "course": "Information Technology"
    }
}`,
				example: "The age value 20 is a number, while the name and course values are strings.",
			},
			{
				title: "YAML — YAML Ain't Markup Language",
				body: "YAML uses indentation and key-value pairs to organize mappings and sequences. A colon separates a key from its value; quotation marks are often optional for simple strings.",
				points: [
					"Commonly used for human-edited configuration, automation, and deployment tools.",
					"Readable and convenient for comments and multiline structures.",
					"Indentation errors can break parsing, and some values can be interpreted differently depending on the YAML version and parser.",
				],
				code: `student:
  name: Ana
  age: 20
  course: Information Technology`,
				example: "Indentation shows which values belong to student. Correct and consistent indentation is essential.",
			},
			{
				title: "Key differences",
				body: "Each format can represent the same information, but its syntax and common use differ.",
				points: [
					"Basic syntax: XML uses tags; JSON uses braces and brackets; YAML uses indentation.",
					"Readability: XML is more verbose; JSON is simple and compact; YAML is designed to be human-friendly.",
					"Data types: XML elements and attributes are primarily text; JSON supports strings, numbers, booleans, null, objects, and arrays; YAML supports strings, numbers, booleans, null, mappings, and sequences.",
					"Comments: XML and YAML support comments; standard JSON does not.",
					"Common Python representation: XML is commonly processed as an element tree; JSON and YAML commonly become dictionaries, lists, and basic values.",
				],
				example: "Choose a format that matches the receiving system and the people or tools that need to maintain the data.",
			},
			{
				title: "When should you use each format?",
				body: "No format is always the best choice. Select the format based on application requirements, system compatibility, and maintainability.",
				points: [
					"Use XML when working with systems that require XML documents, namespaces, or XML-based standards.",
					"Use JSON when sending structured data through web APIs or exchanging data between applications.",
					"Use YAML when writing human-edited configuration files, such as application settings or deployment instructions.",
				],
				example: "Before parsing or sending data, check the API or tool documentation for the required format and validate the data structure.",
			},
		],
	},
	"2.3": {
		intro: "Test-driven development (TDD) is a practice where you write an automated test before writing the code it checks. The test defines the expected behavior, and the implementation is developed in short Red, Green, Refactor cycles. This approach is especially useful in network automation, where a defect can affect many devices.",
		sections: [
			{
				title: "The Red, Green, Refactor cycle",
				body: "Start with one small behavior. Write a test and run it to see it fail for the expected reason (Red). Add the minimum code needed to make it pass (Green). Improve the code and test structure without changing behavior, then rerun the tests (Refactor). Repeat the cycle for the next behavior.",
				points: [
					"Red: write a small failing test and confirm it detects the missing behavior.",
					"Green: implement only enough to pass the test.",
					"Refactor: remove duplication and improve names or structure while all tests stay green.",
					"Tests describe the specification, provide regression protection, and encourage small, loosely coupled code.",
				],
				code: `# 1. RED: write and run the test first
def test_accepts_normal_vlan():
    assert is_valid_vlan(100) is True

# 2. GREEN: implement the minimum correct behavior
VLAN_MIN, VLAN_MAX = 1, 4094

def is_valid_vlan(value):
    if isinstance(value, bool) or not isinstance(value, int):
        return False
    return VLAN_MIN <= value <= VLAN_MAX

# 3. REFACTOR: improve structure; rerun tests`,
				example: "For a VLAN validator, tests for 100, 0, 4094, 4095, strings, and booleans reveal both normal behavior and boundary cases. In Python, bool is a subclass of int, so True must be rejected explicitly.",
			},
			{
				title: "Why TDD matters for network automation",
				body: "Automation scripts validate input, transform data, generate configurations, call APIs, and check post-change state. Much of this logic can be tested without contacting a device. Automated checks catch defects early, document intent for teammates, make refactoring safer, and can gate changes in a CI/CD pipeline.",
				points: [
					"Test input validation, such as VLAN ranges, IP addresses, and hostnames.",
					"Test data transformations and generated configuration against expected results.",
					"Test API wrappers for correct URLs, headers, request bodies, and handling of 401, 404, 429, and 500 responses.",
					"Test pre-change and post-change checks, such as confirming BGP neighbors and routes after a deployment.",
				],
				example: "Validate a configuration template using sample inventory data before it is ever sent to a router; a bad VLAN or missing address can be caught without touching the network.",
			},
			{
				title: "Test types and the test pyramid",
				body: "Unit tests exercise one function or class in isolation and are typically fast. Integration tests verify several components together. Functional or end-to-end tests validate a complete workflow in a realistic environment. Acceptance tests check a business requirement, and regression tests rerun existing checks after a change.",
				points: [
					"Build many fast unit tests at the base of the pyramid, some integration tests, and fewer slow end-to-end tests.",
					"Use unit tests for logic such as is_valid_vlan(); use a lab switch to verify a complete playbook deployment.",
					"Use acceptance tests to check outcomes such as guest VLAN traffic being isolated from corporate networks.",
				],
				code: `Many fast unit tests
        Some integration tests
              Few end-to-end tests`,
				example: "A parser plus a template can be tested as an integration; deploying a VLAN to a lab switch and checking show vlan is an end-to-end test.",
			},
			{
				title: "Write tests with unittest or pytest",
				body: "Python's built-in unittest uses classes derived from unittest.TestCase and methods such as assertTrue and assertRaises. pytest uses plain functions, assert statements, fixtures, and parametrization. In either framework, organize each test as Arrange, Act, Assert: prepare inputs, run the behavior, and check the result.",
				points: [
					"Run unittest with python -m unittest -v; run pytest with pytest -v.",
					"Use fixtures for reusable test setup and parameterized tests for multiple inputs.",
					"Give each test a behavior-focused name, such as test_rejects_vlan_above_4094.",
					"Test expected exceptions as well as successful outcomes.",
				],
				code: `import pytest

@pytest.mark.parametrize(
    "vlan, expected",
    [(1, True), (100, True), (4094, True),
     (0, False), (4095, False), ("10", False), (True, False)],
)
def test_vlan_range(vlan, expected):
    assert is_valid_vlan(vlan) is expected`,
				example: "The parameterized test runs the same behavior against normal values, boundaries, invalid strings, and booleans.",
			},
			{
				title: "Mock external APIs and devices",
				body: "A unit test should be fast and isolated, so it should not depend on a real controller or network. A mock replaces an external dependency, such as requests.get, with a controlled response. Patch the dependency where the code under test uses it; test both successful responses and failures.",
				points: [
					"Mock external systems such as network calls, files, or time; do not mock the function whose behavior the test is meant to verify.",
					"Check success paths and failures such as HTTP errors, timeouts, and rate limits.",
					"Use real devices, CML, or DevNet Sandbox for integration and end-to-end tests rather than ordinary unit tests.",
				],
				code: `from unittest.mock import Mock, patch
from devices import get_hostnames

@patch("devices.requests.get")
def test_get_hostnames(mock_get):
    mock_get.return_value = Mock()
    mock_get.return_value.json.return_value = {
        "response": [{"hostname": "SW1"}, {"hostname": "R1"}]
    }
    assert get_hostnames("https://dnac", "token") == ["SW1", "R1"]
    mock_get.assert_called_once()`,
				example: "A mock API response makes the test repeatable and avoids requiring controller credentials or network access.",
			},
			{
				title: "TDD compared with test-after development",
				body: "TDD writes tests before implementation, allowing tests to shape small and testable designs. Test-after development writes code first and may add tests later, so coverage can be incomplete and code may be harder to test. TDD has more upfront effort but provides earlier feedback; defects are generally cheaper to fix when found early.",
				points: [
					"TDD order: test, then code. Test-after order: code, then tests (if time allows).",
					"TDD tests can guide design and provide immediate feedback for each small step.",
					"Related approaches include BDD, which uses Given/When/Then examples, and ATDD, which begins with acceptance criteria agreed with stakeholders.",
				],
				example: "A test written before a VLAN change can specify exact valid and invalid inputs; tests added only after implementation may miss edge cases the design did not consider.",
			},
			{
				title: "Benefits, limits, and common mistakes",
				body: "TDD can reduce production defects, enable safe refactoring, provide executable documentation, and encourage modular design. It requires discipline and test maintenance, cannot prove the absence of bugs, and can be difficult around tightly coupled hardware. A passing coverage percentage alone does not prove that tests check meaningful behavior.",
				points: [
					"Do not call it TDD if tests are written after the implementation, or skip the Red step without confirming a test can fail.",
					"Keep cycles and tests small; avoid tests that depend on ordering, current time, or a live network.",
					"Include edge cases such as empty input, None, wrong types, and boundary values.",
					"Good tests are F.I.R.S.T.: Fast, Independent, Repeatable, Self-validating, and Timely.",
					"Use CI to run tests on every change; network tools include pyATS/Genie, Batfish, CML, and Ansible --check --diff for dry runs.",
				],
				code: `pytest -v
pytest --cov=. --cov-report=term-missing

# In CI, fail the build when tests fail:
- run: pip install -r requirements.txt pytest
- run: pytest`,
				example: "Coverage shows which lines ran, not whether assertions checked the right behavior. A focused boundary test is more useful than an unverified 100% coverage target.",
			},
			{
				title: "Practice: normalize a hostname",
				body: "Apply TDD to normalize_hostname(name), which strips surrounding spaces and converts a name to lowercase. Add one expected behavior, observe the failure, implement the simplest solution, rerun tests, and then add edge cases.",
				points: [
					"Write a test asserting normalize_hostname(' SW1 ') == 'sw1'.",
					"Run it and observe the expected failure (Red).",
					"Implement name.strip().lower() and rerun the test (Green).",
					"Refactor only if useful, rerun all tests, then add cases such as an empty string and None.",
				],
				code: `def test_normalizes_hostname():
    assert normalize_hostname(" SW1 ") == "sw1"

def normalize_hostname(name):
    return name.strip().lower()`,
				example: "Remember the cycle: Red (fail for the right reason), Green (minimum code that passes), Refactor (improve while tests stay green).",
			},
		],
	},
	"2.4": {
		intro: "A software development methodology is the agreed way a team plans, builds, tests, delivers, and improves software. All methods address the software development life cycle—requirements, design, implementation, testing, deployment, and maintenance—but differ in how they handle planning, change, feedback, and delivery. These choices apply to network automation scripts, playbooks, templates, and controller integrations.",
		sections: [
			{
				title: "Waterfall: plan-driven and sequential",
				body: "Waterfall completes and approves each phase before the next begins: requirements, design, implementation, verification, deployment, and maintenance. It defines scope and schedule up front, documents each phase, tests late, and typically delivers one large release. The V-model pairs each build phase with a corresponding test phase.",
				points: [
					"Strengths: clear milestones, schedule, budget, documentation, and traceability.",
					"Weaknesses: late feedback, costly changes after a phase closes, and working software delivered late.",
					"Best for stable requirements, regulatory or contractual constraints, hardware dependencies, and work where change is costly.",
				],
				code: `Requirements -> Design -> Implementation
            -> Verification / Testing
            -> Deployment -> Maintenance`,
				example: "A data center migration with a fixed cutover date, hardware dependencies, and signed-off requirements may suit Waterfall.",
			},
			{
				title: "Agile: iterative and adaptive",
				body: "Agile is a family of approaches that deliver small working increments frequently, gather feedback, and adapt priorities. Its values favor individuals and interactions, working software, customer collaboration, and responding to change. Agile emphasizes early delivery, sustainable pace, technical excellence, and regular reflection.",
				points: [
					"Scrum uses short sprints (one month or less), a Product Owner, Scrum Master, and Developers, with planning, a Daily Scrum, review, and retrospective.",
					"Scrum artifacts include the Product Backlog, Sprint Backlog, and Increment. A user story can follow: As a role, I want a capability, so that I get a benefit.",
					"Kanban visualizes work, limits work in progress (WIP), and pulls new work when capacity is available; useful metrics include lead time, cycle time, and throughput.",
					"Extreme Programming (XP) includes pair programming, test-driven development, continuous integration, small releases, refactoring, and collective code ownership.",
					"Strengths: early feedback and adaptability. Risks: less predictable final scope and dates, scope creep, and under-documentation without discipline.",
				],
				code: `Backlog -> Plan sprint -> Build + Test
        -> Working increment -> Review + Feedback
        ^                                |
        +------ adapt and reprioritize --+`,
				example: "A network team can deliver a VLAN provisioning playbook in one sprint, gather engineer feedback, then improve it in later increments.",
			},
			{
				title: "Lean: optimize flow and remove waste",
				body: "Lean software development adapts ideas from the Toyota Production System. Its goal is to deliver customer value quickly by eliminating waste and optimizing the whole flow of work. Lean is a philosophy rather than a fixed sequence of phases, and Agile teams often use Lean principles.",
				points: [
					"Seven principles: eliminate waste, amplify learning, decide as late as possible, deliver as fast as possible, empower the team, build integrity in, and see the whole.",
					"Software waste includes partially done work, extra features, unnecessary processing, handoffs, task switching, waiting, and defects.",
					"Value-stream mapping identifies value-adding steps and delays; a minimum viable product (MVP) supports a Build-Measure-Learn feedback loop.",
					"Kanban is a common Lean tool: use WIP limits and a pull system to improve flow.",
				],
				example: "Map a change from request through approval, configuration, and verification; automate the slowest, most error-prone steps first.",
			},
			{
				title: "Compare Waterfall, Agile, and Lean",
				body: "Waterfall is linear and plan-driven; Agile is iterative and change-driven; Lean is flow-focused and waste-driven. Agile and Lean are not opposites—a team can use Scrum sprints while also limiting WIP.",
				points: [
					"Planning and requirements: Waterfall plans in detail and fixes scope early; Agile adapts plans and reprioritizes a backlog; Lean uses flow and delays decisions until useful information is available.",
					"Delivery and testing: Waterfall commonly releases once after late testing; Agile delivers increments and tests each iteration; Lean delivers small batches with quality built in.",
					"Feedback and risk: Waterfall gets most feedback near the beginning and end; Agile and Lean seek frequent feedback to reduce risk early.",
					"Documentation and tools: Waterfall uses formal deliverables and phase gates; Agile uses backlogs and Scrum boards; Lean uses Kanban boards, value-stream maps, and WIP limits.",
				],
				code: `Waterfall: sequential phases, fixed scope, one major release
Agile:     short iterations, adaptable backlog, frequent increments
Lean:      continuous flow, small batches, remove waste`,
				example: "Choose Waterfall for stable, regulated scope; Agile for evolving product requirements; and Lean for improving operational flow and reducing delays.",
			},
			{
				title: "Choose a method for the scenario",
				body: "Select a method based on requirement stability, risk, customer availability, team skills, regulation, and the cost of change. Hybrid approaches are common: plan an overall roadmap up front, then deliver software in Agile increments.",
				points: [
					"Fixed-scope government contract with formal sign-offs: Waterfall, because requirements and documentation are stable and prescribed.",
					"Network dashboard whose users frequently change priorities: Agile/Scrum, for rapid feedback and reprioritization.",
					"NOC team with a constant stream of small requests: Kanban, to visualize unpredictable work and control WIP.",
					"Team delayed by approvals and test environments: Lean, to map the value stream and remove bottlenecks.",
					"New data center with fixed cutover and hardware dependencies: Waterfall for the physical sequence, possibly Agile for software components.",
				],
				example: "For a playbook library, Agile with TDD and CI delivers working, tested capabilities early and allows regular improvement.",
			},
			{
				title: "Methods in network automation and NetDevOps",
				body: "Agile can deliver network automation from a prioritized backlog. Kanban helps operations teams control incoming change requests. Lean identifies and removes delays in manual workflows. Waterfall planning still helps with change windows, hardware refreshes, and compliance approvals. NetDevOps combines version control, CI/CD, automated testing, and operational feedback.",
				points: [
					"Start with valuable automation work such as configuration backups, standard NTP/AAA settings, or VLAN provisioning.",
					"Use automated tests and dry runs to verify each increment before deployment.",
					"Sequence work into useful increments: collect configurations into Git, audit standards, deploy to a lab, then run lint, tests, and dry runs in pull requests.",
				],
				code: `Increment 1: collect running configs and store them in Git
Increment 2: audit NTP, AAA, and SNMP against a standard
Increment 3: deploy a tested configuration to a lab
Increment 4: run lint, tests, and dry runs on every pull request`,
				example: "A hybrid plan can schedule a compliance-approved maintenance window while the automation itself is developed and tested in short Agile sprints.",
			},
			{
				title: "Practice and review",
				body: "Match the method to how work is planned and delivered: fixed sequential phases indicate Waterfall; short sprints and retrospectives indicate Agile; WIP limits, pull, and waste reduction indicate Lean.",
				points: [
					"Requirements are frozen before design; testing happens after implementation; phase gates are typical Waterfall signals.",
					"Two-week sprints, working increments, and a Sprint Retrospective are Agile signals.",
					"Removing waste, shortening cycle time, value-stream mapping, and WIP limits are Lean signals.",
					"Key terms: Product Owner, Scrum Master, Developers, sprint, backlog, increment, Daily Scrum, and retrospective.",
				],
				example: "Exam tip: Waterfall = sequential and plan-driven; Agile = iterative and adaptive; Lean = eliminate waste and optimize flow.",
			},
		],
	},
	"2.5": {
		intro: "Organizing code means grouping related logic into named, reusable units so a growing network automation project remains readable, testable, and safe to change. A function or method groups statements that perform one task; a class combines related data and behavior; a module or package groups related code by responsibility.",
		sections: [
			{
				title: "Why organize code?",
				body: "Copy-pasting the same RESTCONF request for many devices makes changes risky: a URL or authentication update may require edits in many places. Extract repeated behavior into reusable functions and separate responsibilities into classes and modules.",
				points: [
					"Functions and methods group statements that perform one task.",
					"Classes combine data (attributes) with behavior (methods) for a concept such as a device or interface.",
					"Modules and packages group related functions and classes by area of responsibility, such as inventory or RESTCONF.",
				],
				code: `# Repeated inline requests duplicate logic for each device.
# Extract the request into one reusable function instead:
def get_interfaces(host, user, password, timeout=10):
    url = f"https://{host}/restconf/data/ietf-interfaces:interfaces"
    response = requests.get(
        url,
        headers={"Accept": "application/yang-data+json"},
        auth=(user, password),
        timeout=timeout,
    )
    response.raise_for_status()
    return response.json()["ietf-interfaces:interfaces"]["interface"]`,
				example: "With one function definition, a loop can collect interface data from many devices; a fix to the request happens in one place rather than in every copied block.",
			},
			{
				title: "Functions and methods",
				body: "A function is a named, reusable block that accepts parameters, performs a task, and may return a result. A method is a function defined on a class and called through an object. Parameters are names in a definition; arguments are values passed by a caller. Defaults are used when an argument is omitted, and keyword arguments are passed by name.",
				points: [
					"Give each function a single responsibility and a descriptive verb-based name such as get_interfaces or build_vlan_config.",
					"Return data rather than only printing it so other code and tests can use the result.",
					"Keep functions short, use local variables, and document the public behavior with a docstring and optional type hints.",
					"Avoid mutable default arguments such as items=[] because the same object is reused across calls; use None and create a new list inside.",
				],
				code: `def get_interfaces(host, user, password, timeout=10):
    """Return interface data from a RESTCONF device."""
    url = f"https://{host}/restconf/data/ietf-interfaces:interfaces"
    response = requests.get(url, auth=(user, password), timeout=timeout)
    response.raise_for_status()
    return response.json()["ietf-interfaces:interfaces"]["interface"]

for ip in ["10.1.1.1", "10.1.1.2"]:
    interfaces = get_interfaces(ip, "admin", "secret")
    print(ip, [interface["name"] for interface in interfaces])

def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`,
				example: "The timeout parameter has a default of 10 seconds; a caller can override it with get_interfaces(host, user, password, timeout=20).",
			},
			{
				title: "Classes and objects",
				body: "A class is a blueprint that combines attributes and methods. An object (instance) is a concrete value created from that class. The __init__ constructor initializes each new instance, and self refers to that instance. Class attributes are shared at the class level; instance attributes belong to each object.",
				points: [
					"Encapsulation keeps data and the behavior that uses it together; abstraction exposes a simple interface while hiding implementation details.",
					"Inheritance lets a child class reuse and extend a parent class; polymorphism lets different classes provide different behavior under the same method name.",
					"Use a class when state and behavior belong together, such as a device with a hostname, IP address, and device operations.",
					"Prefer plain functions for stateless transformations; use class methods (cls) or static methods when their class/instance behavior fits.",
				],
				code: `class Device:
    vendor = "Cisco"

    def __init__(self, hostname, ip):
        self.hostname = hostname
        self.ip = ip

    def describe(self):
        return f"Device {self.hostname} ({self.ip})"

class Router(Device):
    def describe(self):
        return f"Router {self.hostname} (Layer 3)"

switch = Device("SW1", "10.1.1.1")
router = Router("R1", "10.1.1.2")
print(switch.describe())
print(router.describe())`,
				example: "Device is the class; switch and router are objects. Router inherits the shared hostname and IP attributes, then overrides describe with router-specific behavior.",
			},
			{
				title: "Modules and packages",
				body: "A module is a Python file containing functions, classes, or variables. A package is a folder of related modules, commonly marked by an __init__.py file. Each module has its own namespace, which helps avoid name collisions. Use imports to make dependencies explicit.",
				points: [
					"Import a whole module, an alias, or specific names; avoid from module import * because it pollutes the namespace and obscures where names come from.",
					"Use if __name__ == \"__main__\": to run an entry point only when a file is executed directly, not when it is imported.",
					"Keep data such as inventories separate from code; isolate project dependencies in a virtual environment.",
					"Avoid circular imports by moving shared code into a third module; use short, lowercase module names.",
				],
				code: `netauto/
  __init__.py
  restconf.py
  device.py
tests/
  test_device.py
main.py

from netauto.device import Device

def main():
    print(Device("SW1", "10.1.1.1").describe())

if __name__ == "__main__":
    main()`,
				example: "Putting RESTCONF helpers in restconf.py and device classes in device.py allows both the application and its tests to import the same implementation.",
			},
			{
				title: "Refactor a script into layers",
				body: "Separate the network/API layer, the domain model, and the application entry point. This lets each part change for one clear reason and makes the logic easier to test without real devices.",
				points: [
					"Put RESTCONF request details in a helper module.",
					"Represent devices and device-specific behavior in a class when the object has state and operations.",
					"Let main.py load inventory and credentials, then coordinate the helper and model layers.",
					"Keep credentials in environment variables or a secret store, not in source code.",
				],
				code: `# netauto/restconf.py
def get_interfaces(host, user, password):
    response = requests.get(
        f"https://{host}/restconf/data/ietf-interfaces:interfaces",
        auth=(user, password),
        timeout=10,
    )
    response.raise_for_status()
    return response.json()["ietf-interfaces:interfaces"]["interface"]

# netauto/device.py
class Device:
    def __init__(self, hostname, ip, user, password):
        self.hostname, self.ip = hostname, ip
        self._user, self._password = user, password

    def up_interfaces(self):
        interfaces = get_interfaces(self.ip, self._user, self._password)
        return [item["name"] for item in interfaces if item.get("enabled")]

# main.py loads inventory and calls Device methods`,
				example: "A RESTCONF authentication change belongs in one helper; adding a device changes inventory data; adding a device operation adds a focused method that can be tested with a mocked API call.",
			},
			{
				title: "Benefits and best practices",
				body: "Well-organized code supports reuse (DRY), readability, maintainability, separation of concerns, testability, abstraction, collaboration, namespacing, easier debugging, and growth without tangling responsibilities.",
				points: [
					"Follow DRY (Don't Repeat Yourself), KISS (Keep It Simple), and single responsibility.",
					"Follow PEP 8: snake_case for functions and variables, CapWords for classes, and four-space indentation.",
					"Use meaningful names and docstrings; comments should explain why when needed.",
					"Keep configuration and secrets outside source code, prefer composition and small classes over deep inheritance, and add tests that run in CI.",
				],
				example: "A stateless hostname normalization belongs in a function; a switch with an IP address and operations is a good class; a set of RESTCONF helper functions belongs in a module.",
			},
			{
				title: "Practice and review",
				body: "Choose the smallest code unit that matches the responsibility: a function for one reusable task, a class for related state and behavior, a module for related code, and a package for a group of modules.",
				points: [
					"Convert a hostname to lowercase and strip spaces: function, because it is one stateless task.",
					"Model a switch with an IP, credentials, and operations: class, because state and behavior belong together.",
					"Group RESTCONF helper functions in one file: module.",
					"Share common code between Router and Switch: inheritance when the shared behavior genuinely belongs in a parent.",
					"Ship related modules as a library: package; run code only on direct execution with the __main__ guard.",
				],
				example: "Review the hierarchy: statements → function or method → class → module → package. Organizing by responsibility improves reuse, testing, collaboration, and maintenance.",
			},
		],
	},
	"2.6": {
		intro: "A design pattern is a proven, reusable solution template for a recurring software design problem. In network automation, patterns help keep growing scripts understandable, easier to test, and safer to extend. Model-View-Controller (MVC) separates data, presentation, and input handling; Observer notifies multiple interested components when a subject changes.",
		sections: [
			{
				title: "Model-View-Controller (MVC)",
				body: "MVC divides an application into three components. The Model holds data and business rules, such as device inventory, interface data, or intended configuration. The View presents information without business logic, for example as a dashboard, CLI table, or report. The Controller receives user input, updates the Model, and coordinates which View is shown.",
				points: [
					"The user performs an action; the Controller interprets the request.",
					"The Controller asks the Model to retrieve or change data, then the View presents the updated state.",
					"Keep data, display, and control responsibilities separate so each part can be changed and tested independently.",
					"MVC supports maintenance, parallel development, reuse of one Model by multiple Views, and testing without a user interface.",
				],
				example: "In a network monitoring web app, the Model stores interface counters retrieved through a controller API, the View displays a table, and the Controller handles a refresh action. The same Model can later serve a mobile View without changing how the data is stored.",
			},
			{
				title: "Observer pattern",
				body: "Observer defines a one-to-many dependency: when a subject changes state, it automatically notifies its registered observers. The subject (publisher) keeps the observer list and sends notifications; each observer (subscriber) registers, receives the event, and reacts. Observers may unsubscribe when they are no longer interested.",
				points: [
					"Observers subscribe to the subject, which notifies them when its state changes.",
					"Each observer can respond differently to the same event, such as logging it, sending an alert, or updating a display.",
					"Observer provides loose coupling because the subject does not need to know what observers do.",
					"It avoids constant polling and makes it easy to add a new reaction without changing the event source.",
				],
				example: "When a router interface goes down, a link-state event can notify a logging service, an alerting service, and a dashboard. A Slack notifier can be added by registering another observer.",
			},
			{
				title: "Compare and combine the patterns",
				body: "MVC solves tangled data, logic, and display code through separation of concerns. Observer solves the problem of keeping multiple components in sync when state changes. The patterns can work together: in an MVC application, the View can observe the Model and redraw when the Model changes.",
				points: [
					"Use MVC for dashboards, web applications, and other interfaces with distinct data, presentation, and control roles.",
					"Use Observer for event handling, alerts, and telemetry with several interested components.",
					"Key terms: separation of concerns means assigning each component one responsibility; coupling describes how strongly components depend on one another.",
				],
				example: "A View observing a Model combines both patterns: MVC defines the application roles, while Observer automatically updates the View when interface data changes.",
			},
			{
				title: "Review",
				body: "Check your understanding of the responsibilities and benefits of each pattern.",
				points: [
					"MVC components: Model holds data and rules, View displays information, and Controller handles input and coordinates the other components.",
					"The View should not contain business logic.",
					"Observer reduces coupling because a subject only sends notifications; it does not depend on observers' internal behavior.",
					"An interface-down event is an Observer use case when logging, alerting, and dashboard components all react to the same change.",
				],
				example: "MVC separates responsibilities; Observer automatically informs interested components of a state change. Using both makes automation software easier to maintain and extend.",
			},
		],
	},
	"2.7": {
		intro: "Version control, also called source control, records changes to files over time so earlier versions can be recovered and teams can see what changed, who changed it, and why. For network automation, track scripts, configuration templates, inventories, playbooks, and documentation in a repository instead of relying on ad hoc backup copies.",
		sections: [
			{
				title: "Version control systems and Git",
				body: "A local version control system keeps history on one computer, a centralized system such as Subversion (SVN) stores history on a central server, and a distributed system gives every user a full repository copy and history. Git is the widely used distributed version control system expected in CCNA Automation. GitHub, GitLab, and Bitbucket host Git repositories and add collaboration features.",
				points: [
					"A repository (repo) is a project folder together with its complete change history.",
					"A commit is a saved snapshot of changes with a message and author.",
					"A branch is an independent line of development; a merge combines changes from one branch into another.",
					"Clone makes a local copy of a remote repository. Push sends commits to the remote, and pull fetches and integrates others' commits.",
					"The working directory, staging area, and repository are the places changes pass through in Git.",
					"A merge conflict occurs when branches change the same lines and Git needs a person to decide how to combine them.",
				],
				example: "Create a feature branch to change a configuration template without affecting the stable main branch, then merge the reviewed work when it is ready.",
			},
			{
				title: "A basic Git workflow",
				body: "Work through a deliberate cycle: obtain the repository, isolate the task on a branch, edit and stage only the intended files, save a commit, and share the branch for review before merging it into the main branch.",
				points: [
					"Clone a remote repository, or use git init to create a local repository.",
					"Create a branch for the feature or fix and edit files in the working directory.",
					"Inspect changes, stage the files you want to save, and commit with a clear message.",
					"Push the branch to the remote repository, request review, and merge after approval.",
				],
				code: `git clone <url>
git checkout -b add-ntp-config
# Edit the playbook or template
git status
git diff
git add <file>
git commit -m "Add NTP servers to access switches"
git push`,
				example: "Before committing, git status shows changed and staged files, and git diff shows what changed. A pull or merge request lets a teammate review the work before it reaches main.",
			},
			{
				title: "Useful commands and advantages",
				body: "Git commands help inspect, record, and exchange project history. Version control provides traceability for audits and troubleshooting, quick rollback to a known-good version, safe experimentation on branches, team collaboration, backup through distributed copies, review before release, and consistent templates as a source of truth. Commits can also trigger CI/CD tests and deployment pipelines.",
				points: [
					"git init creates a repository; git clone <url> copies a remote repository.",
					"git status shows changed and staged files; git add <file> stages a change.",
					"git commit -m \"message\" saves a snapshot; git log shows commit history; git diff shows changes.",
					"git branch lists branches; git checkout -b <name> creates and switches to a branch.",
					"git merge <branch> merges a branch into the current one; git push and git pull send or receive commits.",
				],
				example: "If a playbook change causes a problem after deployment, use git log to identify the change and revert that commit. The network can return to its previous state while the repository preserves the history of what happened.",
			},
			{
				title: "Network automation practices and review",
				body: "Store Ansible playbooks and Jinja2 templates in Git so a team can review and trace network changes. A branch isolates proposed work; a reviewed merge makes the approved version available to the team. If an issue appears, the recorded history helps locate and reverse the responsible change.",
				points: [
					"Write small, frequent commits with clear messages that explain why a change was made.",
					"Use branches for features and fixes, and keep main stable.",
					"Pull before pushing to reduce conflicts; resolve merge conflicts by reviewing the actual intended result.",
					"Never commit passwords, API tokens, or private keys. Use environment variables or a secrets manager, and exclude untracked files with .gitignore.",
					"Version control terms: rollback or revert returns to an earlier version; a source of truth is the authoritative copy of code or configuration.",
				],
				example: "A team can commit an NTP template change on an add-ntp-config branch, have a teammate review it, merge it to main, and use the commit history to investigate or revert a later deployment problem.",
			},
			{
				title: "Review",
				body: "Use these prompts to check your understanding of version control and Git.",
				points: [
					"Version control records file changes over time, helping recover earlier versions and clarify project history.",
					"Centralized systems keep history on one server; distributed systems such as Git give every user a full repository and history.",
					"Branches allow features and fixes to be developed independently from stable code.",
					"Advantages include traceability, rollback, collaboration, experimentation, backup, review, and consistent configuration.",
					"Never commit passwords because repository history is shared and a committed secret can be exposed even if removed later.",
					"Use git log to view commit history.",
				],
				example: "The core Git workflow moves changes from the working directory to staging, then into a commit and—after review—into the shared main branch.",
			},
		],
	},
	"2.8": {
		intro: "Git moves work through four areas: the working directory contains files being edited, the staging area holds changes selected for the next commit, the local repository stores commits and history in .git, and the remote repository is the shared copy hosted on a service such as GitHub or GitLab. The everyday flow is edit, stage with git add, save locally with git commit, then share with git push.",
		sections: [
			{
				title: "Clone and initialize a repository",
				body: "Use git clone to copy a remote repository locally, including its files and complete history. Git names the original remote origin by default. Use git init instead to start tracking a new project that does not yet have a remote repository.",
				points: [
					"Use git clone <url> to copy a remote repository and its history to your computer.",
					"Git records the remote source as origin by default.",
					"Use git init when starting a new local project without a remote repository.",
				],
				code: `git clone https://github.com/example/network-automation.git
cd network-automation

# For a new local project with no remote:
git init`,
				example: "After cloning a network automation project, edit and test the local copy before staging any changes.",
			},
			{
				title: "Stage, remove, and restore files",
				body: "git add stages working-directory changes for the next commit; it does not save them permanently. git rm deletes a file and stages that deletion. Use git rm --cached to stop tracking a file while keeping it on disk, and git mv to rename a tracked file. Before committing, git restore --staged can unstage a file.",
				points: [
					"Use git status to inspect modified, staged, and untracked files.",
					"Stage one intended file with git add <file>, or stage changes in the current directory with git add . after reviewing them.",
					"Use git rm <file> to delete and stage a file; use git rm --cached <file> to untrack it but retain the local file.",
					"Use git mv <old> <new> to rename and stage a file.",
					"Use git restore --staged <file> to undo staging before a commit.",
				],
				code: `git status
git add backup.py
git add .
git rm old_script.py
git rm --cached secrets.yml
git mv old_name.py new_name.py
git restore --staged <file>`,
				example: "If secrets.yml should remain on your computer but must no longer be tracked, run git rm --cached secrets.yml, then commit the staged removal. Add the filename to .gitignore to avoid accidentally tracking it again.",
			},
			{
				title: "Commit and inspect history",
				body: "A commit is a saved snapshot of everything in the staging area. Each commit has a unique ID (hash), author, timestamp, and message. Keep commits small and logical; write a short, specific message describing the change and its purpose.",
				points: [
					"A commit saves the staged changes as a snapshot in the local repository.",
					"Each commit records an ID, author, timestamp, and message.",
					"Use git log for the full history or git log --oneline for a compact view.",
				],
				code: `git commit -m "Add NTP servers to access switch template"
git log
git log --oneline`,
				example: "Stage only the tested NTP template change, then commit it with a message that makes the project history easy for teammates to understand.",
			},
			{
				title: "Push, pull, and fetch",
				body: "git push sends local commits to a remote repository. git pull downloads remote commits and integrates them into the current branch; it is a git fetch followed by a git merge. git fetch downloads remote updates without merging them yet. Pull before pushing to begin with the latest shared work and reduce conflicts.",
				points: [
					"Use git push to send local commits to the remote repository.",
					"Use git pull to fetch remote commits and merge them into the current branch.",
					"Use git fetch to download remote updates without merging them.",
					"Pull before pushing so your work starts from the latest shared history.",
				],
				code: `git pull origin main
git push origin main
git fetch`,
				example: "Fetch lets you download updates first and inspect them; pull also merges those updates into your current branch.",
			},
			{
				title: "Create, switch, and delete branches",
				body: "A branch is an independent line of development. Use branches to build or test a feature without changing stable code on main. Several engineers can work in parallel while main remains in a known-good state.",
				points: [
					"git branch lists branches; git branch <name> creates a branch.",
					"git checkout <name> switches branches; git checkout -b <name> creates and switches in one step.",
					"git switch <name> is a modern command for switching branches.",
					"git branch -d <name> deletes a branch that has been merged.",
				],
				code: `git branch
git branch add-vlan-playbook
git checkout add-vlan-playbook

# Or create and switch in one step:
git checkout -b add-vlan-playbook
git switch main
git branch -d add-vlan-playbook`,
				example: "Develop and test an add-vlan-playbook branch without editing main directly, then merge the reviewed branch when it is ready.",
			},
			{
				title: "Merge branches and resolve conflicts",
				body: "A merge combines the history of one branch into another. Check out the destination branch first, then merge the source branch. A fast-forward merge moves the destination pointer forward when it has no new commits; a three-way merge combines work when both branches have new commits and creates a merge commit.",
				points: [
					"A conflict can occur when branches change the same lines, or when one branch deletes a file that another edits.",
					"Run git status to identify conflicted files, then edit each file to keep the correct result or combine the changes.",
					"Remove the conflict markers (<<<<<<<, =======, and >>>>>>>), stage each resolved file with git add, and finish with git commit.",
					"Use git merge --abort to abandon the merge and return to the state before it began.",
				],
				code: `git checkout main
git merge add-vlan-playbook

# A conflict may look like:
    <<<<<<< HEAD
    ntp server 10.0.0.1
    =======
    ntp server 10.0.0.50
    >>>>>>> add-vlan-playbook

# Edit the file to its intended final content, remove all markers, then:
git status
git add <file>
git commit

# To abandon a merge instead:
git merge --abort`,
				example: "For a conflicting NTP line, choose the intended server value (or combine the required configuration), remove every marker, stage the corrected file, and commit the merge.",
			},
			{
				title: "Review changes with diff",
				body: "git diff shows line-by-line changes between states. A minus line was removed, a plus line was added, and lines without either prefix provide unchanged context.",
				points: [
					"git diff compares the working directory with the staging area.",
					"git diff --staged compares staged changes with the last commit.",
					"git diff main add-vlan-playbook compares two branches.",
					"git diff <commit1> <commit2> compares two commits.",
				],
				code: `git diff
git diff --staged
git diff main add-vlan-playbook
git diff <commit1> <commit2>`,
				example: "Before applying a template change, inspect the diff to verify exactly which configuration line was removed and which one was added.",
			},
			{
				title: "Practice lab and review",
				body: "Practice the Git workflow in a disposable local folder. Create a commit, make divergent changes on two branches, observe a merge conflict, resolve it, and inspect the resulting history and diff.",
				points: [
					"Create a folder, run git init, create ntp.txt with ntp server 10.0.0.1, then stage and commit it.",
					"Create and switch to change-ntp; change the server to 10.0.0.50 and commit.",
					"Switch back to main; change the same line to 10.0.0.99 and commit.",
					"Merge change-ntp, resolve the conflict by editing the final value and removing the markers, then stage and commit.",
					"Run git log --oneline and git diff HEAD~1 to review the result.",
					"Review questions: how do add and commit differ; what does pull do; why use branches; what causes and resolves a conflict; what does a plus line mean in diff; and how do you stop tracking a file without deleting it?",
				],
				example: "Key answers: add stages changes while commit saves the staged snapshot; pull fetches then merges; a branch isolates work; a conflict requires editing, removing markers, staging, and committing; plus means added; git rm --cached <file> untracks a file while retaining it locally.",
			},
		],
	},
	"3.1": {
		intro: "Construct a REST API request by matching a task to the API documentation, selecting the correct HTTP method and endpoint, then supplying the required path or query parameters, headers, authentication, and body. REST clients send HTTP requests to resources identified by URIs; each request carries the information the server needs rather than relying on server-side session memory.",
		sections: [
			{
				title: "Anatomy of a REST request",
				body: "A request includes an HTTP method, a URL or URI, optional query parameters and headers, and sometimes a body. A URL can be read as scheme (https), host (api.example.com), path (/v1/devices), and query (?status=up). Path parameters identify a resource; query parameters filter or modify the request.",
				points: [
					"The method states the action, such as GET to retrieve or POST to create.",
					"The URL identifies the resource; replace path placeholders such as {id} with the actual resource identifier.",
					"Headers carry metadata such as the expected response format, body content type, and credentials.",
					"A body carries data sent to the server, commonly with POST, PUT, or PATCH.",
					"REST is stateless: each request includes what the server needs, without relying on remembered client session state.",
				],
				code: `GET https://api.example.com/v1/devices?status=up&limit=10
Accept: application/json
Authorization: Bearer <token>`,
				example: "In /devices/7, 7 is a path parameter identifying one device. In /devices?status=up, status=up is a query parameter filtering a collection.",
			},
			{
				title: "Match HTTP methods to CRUD actions",
				body: "Choose the method that matches the documented operation. GET reads a resource, POST commonly creates one, PUT replaces a resource, PATCH changes part of it, and DELETE removes it. The endpoint documentation is authoritative; confirm the methods it allows.",
				points: [
					"GET retrieves a resource or list.",
					"POST creates a resource or submits an operation.",
					"PUT replaces a resource; PATCH modifies part of it.",
					"DELETE removes a resource.",
				],
				example: "Creating a device is a POST operation; removing device 7 is DELETE /api/v1/devices/7.",
			},
			{
				title: "Read API documentation and build a request",
				body: "For an endpoint, find the base URL and version, path, allowed method, required authentication and headers, path/query/body parameters, example request and response, and possible response codes. Then assemble the full URL and body in the documented format, send it, and check the response.",
				points: [
					"Identify the task and corresponding CRUD action.",
					"Find the exact endpoint and method; fill in path parameters and required query values.",
					"Include required headers such as Content-Type and authentication.",
					"Format the body as required (often JSON) and include all required fields with the correct types.",
					"Check the response code and response body rather than assuming the operation succeeded.",
				],
				code: `POST /api/v1/devices HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer <token>

{"name": "SW1", "ip": "10.1.1.5"}

curl -X POST "https://api.example.com/api/v1/devices" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{"name":"SW1","ip":"10.1.1.5"}'`,
				example: "If the documentation specifies POST /api/v1/devices with required string fields name and ip, send both fields as JSON and expect the documented success response, such as 201 Created.",
			},
			{
				title: "Common request mistakes and review",
				body: "A request that differs from the API contract may fail or act on the wrong resource. Compare the method, full URL, headers, credentials, and body with the endpoint documentation before troubleshooting.",
				points: [
					"Using the wrong HTTP method or leaving a placeholder such as {id} in the URL.",
					"Forgetting Content-Type: application/json when sending a JSON body.",
					"Sending malformed JSON, such as missing quotes or a trailing comma.",
					"Missing, invalid, expired, or insufficient authentication.",
					"Review: POST typically creates; path parameters identify a resource; query parameters filter or modify a request; Content-Type describes the request body.",
				],
				example: "A DELETE request for device 7 should use the documented endpoint /api/v1/devices/7, the DELETE method, and any required authentication header.",
			},
		],
	},
	"3.2": {
		intro: "A webhook is an event-driven HTTP callback: when something happens, a provider sends an HTTP POST to a callback URL chosen by a consumer. This reverses the usual polling pattern, where a client repeatedly asks for updates, and can deliver notifications with lower delay and fewer unnecessary requests.",
		sections: [
			{
				title: "Webhooks compared with polling",
				body: "With polling, the client initiates requests on a schedule and may repeatedly receive no changes. With a webhook, the provider pushes an event to the consumer when it occurs. Webhooks are usually near real time and more efficient for event notifications, but the receiving endpoint must be reachable and reliable.",
				points: [
					"Polling: client asks the server for updates at regular intervals.",
					"Webhook: provider sends an event to the consumer when a change occurs.",
					"Polling can delay detection until the next interval and waste requests when nothing changed.",
					"Webhooks reduce that delay and send data only when there is an event.",
				],
				example: "Polling a network monitor every minute may delay an interface-down alert. A webhook can notify the alert service as soon as the event occurs.",
			},
			{
				title: "Webhook event flow and common uses",
				body: "The consumer registers a callback URL and subscribes to event types. When an event occurs, the provider sends a POST containing a payload, often JSON. The receiver validates and processes the delivery, then quickly returns a success response such as 200 OK or 204 No Content.",
				points: [
					"Register the callback URL and select subscribed events.",
					"The provider sends a POST request with event details.",
					"The consumer validates the payload, acknowledges delivery, and performs the relevant action.",
					"Common uses include interface alerts, CI/CD triggers, ticket creation, configuration change tracking, chat bots, data synchronization, and payment notifications.",
				],
				code: `POST /hook HTTP/1.1
Content-Type: application/json

{
  "event": "device.down",
  "device": "R1",
  "timestamp": "2026-10-17T05:30:00Z"
}`,
				example: "A controller can notify a logging service when device configuration changes, or a Git provider can trigger an automated test pipeline after a push.",
			},
			{
				title: "Secure and reliable webhook receivers",
				body: "A webhook endpoint receives requests from outside systems, so treat every delivery as untrusted input. Authenticate the provider, validate the payload, acknowledge promptly, and design for retries and duplicate deliveries.",
				points: [
					"Use HTTPS and verify a shared secret, token, or HMAC signature so forged requests are rejected.",
					"Validate payload structure and expected values before taking action.",
					"Return a success response quickly; queue longer processing so provider retries are less likely.",
					"Make processing idempotent so a duplicate delivery does not repeat an action.",
					"Keep the endpoint reachable from the provider and log deliveries for troubleshooting.",
				],
				code: `from flask import Flask, request

app = Flask(__name__)

@app.route("/hook", methods=["POST"])
def hook():
    event = request.get_json()
    if not isinstance(event, dict) or "event" not in event:
        return {"error": "invalid event"}, 400
    # Verify the provider signature and enqueue the event for processing.
    return "", 204`,
				example: "If the same device.down event is delivered twice, use an event ID or other deduplication key so only one incident ticket is created.",
			},
			{
				title: "Test and review webhooks",
				body: "Test the receiver with representative payloads and error cases before relying on it operationally. Tools such as curl, Postman, or a request-inspection endpoint can send test requests. In a lab, a local receiver may need a secure public tunnel for a remote provider to reach it.",
				points: [
					"Verify the receiver accepts a valid event and returns the expected success status.",
					"Test malformed payloads and invalid signatures; reject them without triggering automation.",
					"Test duplicate delivery to confirm idempotent behavior.",
					"Review: webhooks normally use POST; unlike polling, the provider initiates notification; signatures verify event origin.",
				],
				example: "A safe test should demonstrate that a valid interface-down event produces one notification, while an invalid signature or repeated event does not trigger unauthorized or duplicate actions.",
			},
		],
	},
	"3.3": {
		intro: "APIs enforce constraints to protect availability, performance, security, and cost. A reliable consumer plans for authentication and authorization, rate limits, pagination, payload and time limits, required formats and parameters, versioning, quotas, and network reachability rather than assuming every request can return all data immediately.",
		sections: [
			{
				title: "Common API constraints",
				body: "An API may require valid credentials and permissions, limit requests, divide large results into pages, restrict request or response size, time out slow operations, require a specific data format and parameters, or enforce quotas and version compatibility. Transport requirements such as HTTPS and network reachability can also determine whether a call succeeds.",
				points: [
					"Authentication identifies the caller; authorization determines whether the requested operation is permitted (often 401 or 403 on failure).",
					"Rate limits cap requests per user or time window; exceeding them commonly returns 429.",
					"Pagination means a response may include only part of a collection.",
					"Payload size limits may reject large bodies; timeouts stop requests that take too long.",
					"Wrong formats or missing required parameters can cause request errors; versions, quotas, certificates, firewalls, proxies, and VPNs also affect access.",
				],
				example: "An inventory script can appear successful while missing devices if it reads only the first page of results.",
			},
			{
				title: "Respect rate limits and retry safely",
				body: "Rate limiting prevents clients from overloading a service. A provider may expose limit and remaining-count headers, and may include Retry-After with a 429 response. Slow down, batch when supported, reuse cached results, and apply exponential backoff instead of retrying rapidly.",
				points: [
					"Inspect rate-limit headers and the Retry-After value when provided.",
					"Wait before retrying; exponential backoff grows the delay after repeated failures (for example 1, 2, then 4 seconds).",
					"Batch requests where supported and avoid fetching unchanged data repeatedly.",
					"Retry only when appropriate; repeating a POST may create duplicate resources unless the API supports idempotency keys.",
				],
				code: `import time
import requests

delay = 1
for attempt in range(5):
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code != 429:
        response.raise_for_status()
        break
    time.sleep(delay)
    delay *= 2`,
				example: "If a response includes Retry-After, use that provider instruction instead of retrying immediately.",
			},
			{
				title: "Handle paginated results",
				body: "Large collections are commonly split across pages to limit response size and server load. APIs may use offset/limit, page/per_page, or a cursor/next link. Continue requesting pages until the API indicates there are no more results.",
				points: [
					"Offset and limit select a window such as ?offset=100&limit=50.",
					"Page-based APIs may accept parameters such as ?page=3&per_page=50.",
					"Cursor APIs often return a next URL or token; follow the documented value.",
					"Validate the response shape and prevent loops if an invalid next link repeats.",
				],
				code: `url = "https://api.example.com/v1/devices?limit=50"
while url:
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    page = response.json()
    process(page["items"])
    url = page.get("next")`,
				example: "Following each next link until it is absent ensures the automation processes the complete device inventory rather than only the first page.",
			},
			{
				title: "Plan for timeouts, versions, and operational behavior",
				body: "Some operations are asynchronous and return a job ID that must be checked later. Requests also depend on valid credentials, current documentation, reachable hosts, transport security, and service quotas. Validate those conditions and preserve clear error handling in the client.",
				points: [
					"Set timeouts and distinguish a slow or unreachable service from an HTTP error response.",
					"Use the documented API version; version changes can alter fields, paths, or behavior.",
					"Use HTTPS with valid certificates and account for firewalls, proxies, and VPNs.",
					"GET, PUT, and DELETE are normally idempotent; a repeated POST may produce duplicates.",
					"Protect and renew credentials; test the actual API because deployed behavior may differ from documentation.",
				],
				example: "For a long-running configuration deployment, accept a task ID and check the documented task endpoint instead of holding a single request open indefinitely.",
			},
		],
	},
	"3.4": {
		intro: "HTTP status codes are three-digit indicators at the beginning of a response. The first digit identifies the response class: informational (1xx), success (2xx), redirection (3xx), client error (4xx), or server error (5xx). Use the code together with response headers and body to decide what to inspect or do next.",
		sections: [
			{
				title: "Success and redirection responses",
				body: "A 2xx code indicates the request succeeded, though the response may be complete or still processing. A 3xx code indicates that the client may need to take further action, such as using a different URL or a valid cached representation.",
				points: [
					"200 OK commonly indicates a successful GET, PUT, or PATCH with a response body.",
					"201 Created commonly follows a successful POST and may include a Location header for the new resource.",
					"202 Accepted means processing was accepted but is not yet complete.",
					"204 No Content indicates success with no response body, often after DELETE.",
					"301 Moved Permanently, 302 Found, and 304 Not Modified are common redirection responses.",
				],
				code: `HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/devices/42

{"id": 42, "name": "SW1"}`,
				example: "A successful POST may return 201 and a Location header pointing to the device that was just created.",
			},
			{
				title: "Client errors (4xx)",
				body: "A 4xx response usually means the client request, credentials, or permission needs attention. Read the response body for details, then compare the method, URL, headers, payload, and identity with the documentation.",
				points: [
					"400 Bad Request: malformed syntax, invalid JSON, missing fields, or invalid parameters.",
					"401 Unauthorized: credentials are missing, invalid, or expired; the caller is not authenticated.",
					"403 Forbidden: the caller is authenticated but lacks permission.",
					"404 Not Found: the URL or resource does not exist; 405 Method Not Allowed: the endpoint does not allow that method.",
					"409 Conflict: the request conflicts with existing state; 415 Unsupported Media Type: the body format or Content-Type is unsupported.",
					"429 Too Many Requests: the rate limit was exceeded; wait and respect Retry-After when provided.",
				],
				example: "A 401 suggests checking credentials, while a 403 with a valid token suggests checking scope or permissions.",
			},
			{
				title: "Server errors (5xx) and troubleshooting clues",
				body: "A 5xx response means the server or an upstream service failed to complete a request. Confirm the request is valid, then retry later when appropriate and report persistent service problems to the provider.",
				points: [
					"500 Internal Server Error: unexpected server failure.",
					"502 Bad Gateway: a gateway or proxy received an invalid upstream response.",
					"503 Service Unavailable: the service may be down, overloaded, or under maintenance.",
					"504 Gateway Timeout: an upstream service took too long.",
					"Memory aid: 2xx succeeded, 4xx points to the client request or permission, and 5xx points to the server side.",
				],
				example: "A 503 is usually an availability issue; verify the request, then retry later rather than changing a valid payload without evidence.",
			},
			{
				title: "Use status codes in automation",
				body: "Automation should inspect status codes explicitly, distinguish success from accepted-but-pending work, and avoid assuming every successful response contains a body. Error bodies often provide a useful clue, but should be handled as potentially untrusted data.",
				points: [
					"Typical pairings include GET → 200, resource-creating POST → 201, and successful DELETE without a body → 204.",
					"Poll or use a callback after 202 Accepted when the operation is asynchronous.",
					"401 means not authenticated; 403 means authenticated but not authorized.",
					"A 404 may indicate a wrong path or a missing resource; verify both the base URL/version and resource ID.",
				],
				code: `if response.status_code == 202:
    monitor_job(response.json()["taskId"])
elif response.status_code == 204:
    print("Completed; no response body.")
else:
    response.raise_for_status()`,
				example: "Do not call response.json() for a 204 response; it has no body to parse.",
			},
		],
	},
	"3.5": {
		intro: "Troubleshoot an API failure by combining three pieces of evidence: the HTTP response code and body, the request actually sent, and the API documentation. Compare the method, URL, headers, authentication, and body with the documented contract, using the status code to decide where to investigate first.",
		sections: [
			{
				title: "Use a systematic troubleshooting process",
				body: "Start with the response status class: 4xx usually points to the request or permissions, while 5xx usually points to a server-side or availability problem. Read the response body, compare the request with the documentation, change one thing at a time, and resend to identify which correction resolves the issue.",
				points: [
					"Read the status code and response body for the initial diagnostic clue.",
					"Check URL spelling, API version, base URL, resource path, path parameters, and HTTP method.",
					"Check the authentication header, token value and expiry, permissions, and required scope.",
					"Check Content-Type and Accept headers and validate the body, field names, types, and required values.",
					"Fix one issue at a time; retry later or contact the provider if a valid request continues to receive a 5xx response or timeout.",
				],
				example: "A JSON error body such as {\"error\":\"name is required\"} points to a missing request field even before you inspect the application code.",
			},
			{
				title: "Map response codes to likely causes",
				body: "Common status codes narrow the search. Use the code as a starting point, not as a substitute for reading the response body and checking the documented endpoint contract.",
				points: [
					"400: invalid JSON, field name/type, missing required field, or bad query parameter.",
					"401: missing Authorization header or invalid/expired credentials; 403: identity lacks permission or scope.",
					"404: path typo, wrong API version/base URL, or nonexistent resource ID; 405: wrong method.",
					"409: duplicate or conflicting state; 415: missing or incorrect Content-Type.",
					"429: wait and retry with backoff; 500, 502, 503, or 504: verify the request, then retry or report a server/upstream issue.",
				],
				example: "If a documented DELETE endpoint returns 405 after a POST, use the documented DELETE method rather than changing the payload first.",
			},
			{
				title: "Diagnose common request failures",
				body: "Compare a failing request to the exact endpoint contract. A missing header, required body field, or path segment can explain a client error. For example, a missing Authorization header can cause 401, a missing required ip can cause 400, a singular/plural path typo can cause 404, and the wrong method can cause 405.",
				points: [
					"401 example: add the required Authorization header with a valid token.",
					"400 example: include the required name and ip fields as valid JSON.",
					"404 example: correct /api/v1/device/42 to the documented /api/v1/devices/42.",
					"405 example: use DELETE /api/v1/devices/42 when the documented delete operation requires DELETE.",
				],
				code: `import requests

response = requests.get(url, headers=headers, timeout=10)
print(response.status_code)
print(response.headers)
print(response.text)`,
				example: "curl -v displays request and response headers; Postman helps vary one request field at a time; Python requests can print the status, headers, and response text.",
			},
			{
				title: "Tools, review, and decision-making",
				body: "Use command-line clients, API tools, Python output, and browser developer tools to inspect traffic. Keep the evidence from the failed request and verify that a fix addresses the documented cause.",
				points: [
					"A 403 with a valid token most likely indicates missing permission, role, or scope.",
					"A 415 after sending JSON suggests checking Content-Type: application/json.",
					"A 503 is a service availability problem; do not rewrite a valid request before investigating the server.",
					"A 404 warrants checking the URL spelling, base URL, version, and resource ID.",
					"Change one thing at a time so the successful correction is clear.",
				],
				example: "Troubleshooting is complete when the corrected request matches the documentation and the response confirms the requested operation, not merely when an error disappears.",
			},
		],
	},
	"3.6": {
		intro: "An HTTP response is the message a server sends after receiving a request. Its status line identifies the HTTP version and result code; headers provide response metadata; a blank line separates headers from an optional body containing returned data or an error message.",
		sections: [
			{
				title: "Parts of a response",
				body: "A response begins with a status line containing the HTTP version, status code, and reason phrase. Name-value response headers follow. A blank line marks the end of headers, after which an optional body carries JSON, XML, HTML, plain text, or no data.",
				points: [
					"Status line: HTTP version, numeric status code, and human-readable reason phrase.",
					"Headers: name/value metadata about the response and instructions for the client.",
					"Blank line: separates headers from the body.",
					"Body: returned resource data or error details; it may be empty, such as with 204 No Content.",
				],
				code: `HTTP/1.1 200 OK
Date: Sat, 17 Oct 2026 05:30:00 GMT
Content-Type: application/json
Content-Length: 58
Cache-Control: no-cache

{"id": 42, "name": "SW1", "ip": "10.1.1.5"}`,
				example: "In the sample, HTTP/1.1 200 OK is the status line, Date through Cache-Control are headers, and the JSON after the blank line is the body.",
			},
			{
				title: "Interpret status code and headers",
				body: "The first digit of the status code identifies the response class: 2xx success, 3xx redirection, 4xx client error, and 5xx server error. Headers explain how to interpret the response or what the client should do next.",
				points: [
					"Content-Type identifies the body format, such as application/json or application/xml.",
					"Content-Length reports body size in bytes; Date indicates when the response was generated.",
					"Location may identify a newly created resource with 201 or a redirect target with 3xx.",
					"Cache-Control describes caching rules; Set-Cookie sends a cookie to the client.",
					"Retry-After can say how long to wait after 429 or 503; WWW-Authenticate describes authentication expected after 401.",
				],
				example: "Read Content-Type before selecting a parser, and follow Retry-After rather than retrying a rate-limited request immediately.",
			},
			{
				title: "Read the response body",
				body: "The body contains requested data or an error message. JSON is common for REST APIs; XML, plain text, and HTML may also appear. Some successful responses deliberately have no body, such as 204 No Content after a DELETE.",
				points: [
					"Parse a body according to its Content-Type and validate the expected shape.",
					"Use error body details to diagnose a failed request, but do not treat error text as trusted input.",
					"Do not attempt JSON parsing when the response has no body.",
				],
				code: `response = requests.get(url, timeout=10)
print(response.status_code)  # 200
print(response.reason)       # OK
print(response.headers["Content-Type"])
print(response.json())      # parsed body
print(response.text)        # raw body text`,
				example: "A 204 response after a DELETE is successful even though there is no JSON value to parse.",
			},
			{
				title: "Request and response comparison",
				body: "Requests and responses have related but different first lines, headers, and bodies. The request starts with a method and path, while the response starts with the HTTP version and status. Request headers describe the client and any body being sent; response headers describe the server and returned data.",
				points: [
					"Request first line example: GET /devices HTTP/1.1; response first line example: HTTP/1.1 200 OK.",
					"Request body is optional data sent to the server; response body is optional data returned to the client.",
					"Review: the response code is in the status line, Content-Type describes the body, and Location may point to a created resource.",
				],
				example: "In Python requests, response.status_code reads the code and response.json() parses a JSON body into Python data.",
			},
		],
	},
	"3.7": {
		intro: "API authentication proves who a caller is; authorization determines what that identity may do. Common mechanisms include basic authentication, long-lived custom tokens or API keys, and short-lived dynamic tokens obtained through a login flow. Protect credentials with HTTPS and secure storage, and use only the permissions the task requires.",
		sections: [
			{
				title: "Authentication and authorization",
				body: "Authentication answers “Who are you?” by verifying identity. Authorization answers “What are you allowed to do?” by checking permissions after identity is established. A failed authentication commonly returns 401 Unauthorized; a valid identity without permission commonly receives 403 Forbidden.",
				points: [
					"Do not treat authentication and authorization as interchangeable.",
					"Use the response code and API policy to tell an invalid identity from an insufficient permission.",
				],
				example: "A valid token with insufficient access may receive 403 even though authentication succeeded.",
			},
			{
				title: "Basic authentication",
				body: "Basic authentication combines username and password as username:password, encodes the result with Base64, and sends it in the Authorization header. Base64 is encoding, not encryption; anyone who captures the header can decode it. The password is sent with every request, so use basic authentication only over HTTPS and protect the credential.",
				points: [
					"Basic authentication is simple and widely supported.",
					"Base64 does not conceal credentials; always use HTTPS.",
					"The password is present on each request and has no built-in token expiry.",
				],
				code: `import requests

response = requests.get(
    "https://api.example.com/v1/devices",
    auth=("admin", "<password>"),
    timeout=10,
)`,
				example: "HTTPS protects the connection in transit; it does not make it safe to hard-code or commit the password.",
			},
			{
				title: "Custom tokens and API keys",
				body: "A provider-issued static token or API key replaces the password on each call. The documentation defines whether it belongs in a header such as X-API-Key or Authorization, and which format to use. Tokens can be scoped or revoked, but a leaked long-lived token may be usable until revoked.",
				points: [
					"Read the API documentation for the exact header name and token format.",
					"Keep the key out of public code and shared commits.",
					"Use minimum required permissions and revoke or rotate unused or exposed tokens.",
				],
				code: `headers = {
    "X-API-Key": "<token>",
    "Accept": "application/json",
}`,
				example: "A static key may be easier to use than a login flow, but it should be stored in a secret manager or environment injection and revoked if exposed.",
			},
			{
				title: "Dynamic and temporary tokens",
				body: "A dynamic token is issued after a client authenticates with a login endpoint. The client uses the returned short-lived token for later API calls. When it expires, the server may return 401; the client must authenticate again or use a documented refresh-token flow.",
				points: [
					"Send credentials to the documented token endpoint over HTTPS.",
					"Read the returned token and expiry; include the token in subsequent requests as documented.",
					"Renew an expired token through login or a refresh flow rather than silently retrying with stale credentials.",
					"Short lifetimes reduce the period in which a stolen access token can be used, but require expiry handling.",
				],
				code: `login = requests.post(
    "https://api.example.com/v1/auth/token",
    json={"username": "admin", "password": password},
    timeout=10,
)
login.raise_for_status()
token = login.json()["token"]
headers = {"Authorization": f"Bearer {token}"}`,
				example: "OAuth 2.0 access tokens are commonly issued by an authorization server and may be renewed using a separate refresh token.",
			},
			{
				title: "Compare mechanisms and protect credentials",
				body: "Basic authentication has the lowest setup complexity but sends credentials with each request. A custom key is often long-lived until revoked. A dynamic token adds a login and renewal flow but expires automatically. Choose the strongest mechanism the API supports and apply secure credential handling in every case.",
				points: [
					"Always use HTTPS and least privilege.",
					"Never hard-code or commit passwords and tokens; use environment variables or a secrets manager.",
					"Rotate keys and passwords, revoke unused tokens, and handle 401 by renewing credentials when appropriate.",
					"Review: Base64 can be decoded; a static key persists until revoked; a dynamic token is obtained through login and expires.",
				],
				example: "When a dynamic-token API returns 401 due to expiry, renew the token according to the documented flow, then retry only if the operation can be safely repeated.",
			},
		],
	},
	"3.8": {
		intro: "API styles can be classified by how operations are modeled and how results are delivered. REST is resource-oriented and uses standard HTTP methods; RPC is action-oriented and invokes remote procedures. Independently, synchronous calls wait for their result, while asynchronous calls return quickly and report completion later.",
		sections: [
			{
				title: "REST: resource-oriented APIs",
				body: "REST models the system as resources (nouns) identified by URLs and uses standard HTTP verbs to act on them. REST APIs are stateless and commonly exchange JSON or XML. Their uniform structure is widely adopted, though related information may require multiple calls and a fixed response may include more or less data than needed.",
				points: [
					"Examples of resource URLs include /devices, /devices/42, and /devices/42/interfaces.",
					"GET, POST, PUT, PATCH, and DELETE select common resource operations.",
					"REST is a strong fit for CRUD operations on data.",
				],
				code: `GET /api/v1/devices/42
DELETE /api/v1/devices/42`,
				example: "Deleting a device is expressed as an HTTP operation on the device resource.",
			},
			{
				title: "RPC: action-oriented APIs",
				body: "Remote Procedure Call models an API as actions or functions invoked remotely. The request focuses on a verb or method name and parameters, often sent to one endpoint. JSON-RPC, XML-RPC, gRPC, and NETCONF are examples or related forms. RPC is useful for commands that do not map naturally to resource CRUD, but can be less uniform and more tightly coupled to server operations.",
				points: [
					"An RPC operation may look like reboot_device(42) or getInterfaceStatus(\"R1\").",
					"The request body can carry a method name and parameters.",
					"RPC fits direct commands and operations; REST fits resource-oriented data operations.",
				],
				code: `POST /rpc
{
  "method": "reboot_device",
  "params": {"id": 42}
}`,
				example: "A reboot command is naturally modeled as an action; a device inventory is naturally modeled as resources.",
			},
			{
				title: "Compare REST and RPC",
				body: "REST focuses on nouns (resources), often with many resource URLs and the HTTP method selecting the operation. RPC focuses on verbs (actions), often using an operation name in the body. Choose the style based on whether the task is best represented as CRUD on data or as a command.",
				points: [
					"REST commonly uses JSON or XML; RPC may use JSON-RPC, XML-RPC, or gRPC Protocol Buffers.",
					"REST's uniform interface is broadly familiar; RPC can express specialized commands directly.",
					"REST and RPC describe API design; synchronous and asynchronous describe when a result is delivered.",
				],
				example: "A REST API can still expose an asynchronous operation: API design style and response timing are separate choices.",
			},
			{
				title: "Synchronous operations",
				body: "A synchronous client sends a request and waits (blocks) until the server returns the final response. This is straightforward and fits quick operations, but a long-running task can leave the client waiting or cause a timeout.",
				points: [
					"The result is returned during the same request, often as a 200 response.",
					"Synchronous calls work well for quick reads and small changes.",
					"Set a client timeout so an unresponsive operation does not wait forever.",
				],
				example: "Reading a device name is normally a short operation that can return its final result synchronously.",
			},
			{
				title: "Asynchronous operations",
				body: "An asynchronous server accepts a request and performs the work in the background, allowing the client to continue. It may return 202 Accepted and a job ID; the client later polls a task endpoint or receives a callback/webhook. Streaming or messaging may also deliver results as events.",
				points: [
					"Track the task or job identifier and check its documented status endpoint until completion.",
					"A callback or webhook can notify the client when work finishes.",
					"Asynchronous handling fits long-running operations such as software upgrades or large configuration deployments.",
					"Plan for later failure, polling limits, callbacks, and task expiration; asynchronous designs are more complex.",
				],
				code: `POST /api/v1/configs/deploy
Response: 202 Accepted
{"taskId": "a1b2c3", "status": "in-progress"}

GET /api/v1/tasks/a1b2c3
Response: 200 OK
{"taskId": "a1b2c3", "status": "completed"}`,
				example: "A client can submit a large change, receive a job ID, and continue other work before checking whether deployment completed successfully.",
			},
			{
				title: "Choose an API style and response model",
				body: "Use REST for standard resource operations, RPC for commands, synchronous behavior for quick results, and asynchronous behavior for long-running tasks. Always verify completion rather than treating an accepted request as a finished operation.",
				points: [
					"REST is resource-oriented; RPC is action-oriented.",
					"202 Accepted commonly signals that asynchronous processing has started, not that it has finished.",
					"Poll a task endpoint or receive a callback/webhook to obtain an asynchronous result.",
					"Review: software upgrades may need asynchronous handling to avoid waiting on a long request.",
				],
				example: "For an API-triggered device upgrade, use the returned task ID and confirm the final status before reporting success.",
			},
		],
	},
	"3.9": {
		intro: "Python's requests library provides convenient functions for making HTTP calls without manually formatting low-level HTTP messages. Its get, post, put, patch, and delete functions map to familiar REST methods. Add parameters, headers, authentication, JSON bodies, timeouts, and explicit error handling to make API calls reliable.",
		sections: [
			{
				title: "Install requests and make a GET call",
				body: "Install the package with pip install requests and import it as requests. A basic GET sends a request and returns a Response object. Inspect its status code and parse the response JSON only after checking that the call succeeded and that a body is expected.",
				code: `import requests

url = "https://api.example.com/v1/devices"
response = requests.get(url, timeout=10)
response.raise_for_status()
print(response.status_code)
print(response.json())`,
				points: [
					"requests.get reads data; requests.post creates; requests.put replaces; requests.patch partially modifies; requests.delete removes.",
					"Use response.raise_for_status() to raise an exception for 4xx or 5xx responses.",
				],
				example: "If the request succeeds with a JSON body, response.json() converts that body into a Python dictionary or list.",
			},
			{
				title: "Pass request arguments",
				body: "requests methods accept keyword arguments for query parameters, headers, body formats, authentication, timeouts, and TLS verification. Use json= with a Python dictionary for JSON; requests serializes it and sets the appropriate Content-Type. Use data= for form data or a raw body.",
				points: [
					"params adds query parameters, such as params={\"status\": \"up\", \"limit\": 10}.",
					"headers adds request headers such as Accept or Authorization.",
					"json sends a Python object as JSON; data sends form data or raw content.",
					"auth=(username, password) configures basic authentication.",
					"timeout bounds how long to wait; verify=True checks the TLS certificate and is the safe default.",
				],
				code: `headers = {
    "Authorization": "Bearer <token>",
    "Accept": "application/json",
}
params = {"status": "up"}
response = requests.get(
    "https://api.example.com/v1/devices",
    headers=headers,
    params=params,
    timeout=10,
    verify=True,
)`,
				example: "Do not disable certificate verification in production; fixing the trust configuration is safer than ignoring a TLS certificate error.",
			},
			{
				title: "Use requests with common REST methods",
				body: "The same request pattern supports the CRUD methods. Supply the endpoint, headers, and any needed JSON body; use the status code and returned data to confirm each operation.",
				code: `body = {"name": "SW1", "ip": "10.1.1.5"}
created = requests.post(url, headers=headers, json=body, timeout=10)
created.raise_for_status()
print(created.status_code, created.json())

replacement = {"name": "SW1", "ip": "10.1.1.99"}
updated = requests.put(
    "https://api.example.com/v1/devices/42",
    headers=headers,
    json=replacement,
    timeout=10,
)
updated.raise_for_status()

deleted = requests.delete(
    "https://api.example.com/v1/devices/42",
    headers=headers,
    timeout=10,
)
deleted.raise_for_status()
print(deleted.status_code)`,
				points: [
					"GET reads, POST creates, PUT replaces, PATCH modifies part of a resource, and DELETE removes.",
					"Do not parse a JSON body after a successful 204 No Content response.",
					"Respect API rate limits and pagination while processing collections.",
				],
				example: "A successful create may return 201 and a JSON resource; a successful delete may return 204 with no body.",
			},
			{
				title: "Inspect the response object",
				body: "The Response object exposes the status code, reason phrase, headers, body text, parsed JSON, success flag, and final requested URL. Choose the representation that matches the response content and status.",
				points: [
					"response.status_code gives the numeric code; response.reason gives its reason phrase.",
					"response.headers exposes response headers; response.text gives raw body text.",
					"response.json() parses JSON into a Python dictionary or list.",
					"response.ok is true for status codes below 400; response.raise_for_status() raises on 4xx/5xx.",
					"Validate expected fields after parsing instead of assuming every response has the same shape.",
				],
				example: "For debugging, inspect response.status_code, response.headers, and response.text before assuming the API returned the expected JSON.",
			},
			{
				title: "Handle errors and temporary tokens",
				body: "HTTP failures, connectivity problems, and timeouts are different failure modes. Call raise_for_status() and catch the specific requests exceptions the script can recover from. For APIs that issue dynamic tokens, authenticate first and then add the token to subsequent request headers.",
				code: `import requests

try:
    response = requests.get(
        "https://api.example.com/v1/devices/42",
        headers=headers,
        timeout=10,
    )
    response.raise_for_status()
    device = response.json()
    print(device["name"])
except requests.exceptions.HTTPError as error:
    print("HTTP error:", error)
except requests.exceptions.ConnectionError:
    print("Could not connect to the server")
except requests.exceptions.Timeout:
    print("The request timed out")

login = requests.post(
    "https://api.example.com/v1/auth/token",
    json={"username": username, "password": password},
    timeout=10,
)
login.raise_for_status()
token = login.json()["token"]
headers = {"Authorization": f"Bearer {token}"}`,
				points: [
					"Keep usernames, passwords, and tokens in environment variables or a secrets manager, not in source code.",
					"Handle token expiration and renew credentials through the documented flow.",
					"Report errors clearly; do not convert failed requests into success-shaped results.",
				],
				example: "A timeout means the client stopped waiting; it does not prove the server did not apply a change. Check operation status before blindly repeating a non-idempotent POST.",
			},
			{
				title: "Reliable requests practices and exercise",
				body: "Every request should have an appropriate timeout. Use JSON arguments instead of building JSON strings by hand, check status before using returned data, preserve TLS verification, reuse a Session for repeated calls to one server, and protect credentials. A small exercise can combine GET and POST against a test API.",
				points: [
					"Send GET to /posts/1 and print the status code and title.",
					"Send POST to /posts with a JSON body and print the returned ID.",
					"Wrap both calls with a timeout and appropriate requests exception handling.",
					"Review: POST creates; response.text is raw text while response.json() parses JSON; params= and headers= set query and header values; raise_for_status() raises for 4xx/5xx.",
				],
				code: `import requests

base_url = "https://jsonplaceholder.typicode.com"
try:
    post = requests.get(f"{base_url}/posts/1", timeout=10)
    post.raise_for_status()
    print(post.status_code, post.json()["title"])

    created = requests.post(
        f"{base_url}/posts",
        json={"title": "Network automation", "body": "API practice", "userId": 1},
        timeout=10,
    )
    created.raise_for_status()
    print(created.json()["id"])
except requests.exceptions.RequestException as error:
    print("Request failed:", error)`,
				example: "The timeout prevents a stalled connection from waiting forever; the exception handler reports transport or HTTP errors instead of silently treating them as success.",
			},
		],
	},
	"4.1": {
		intro: "A Software Development Kit (SDK) packages libraries, tools, and documentation for a platform. Cisco SDKs wrap platform APIs in familiar language methods, reducing manual request construction, authentication, parsing, pagination, and error handling. Use the SDK documentation to install the correct package, create a client, call the documented method, and handle its results safely.",
		sections: [
			{
				title: "What an SDK provides",
				body: "An SDK is a set of libraries, tools, and documentation for building applications for a platform. A Cisco SDK often wraps REST calls so a Python program can call a method instead of manually assembling a URL, headers, and body. SDKs can also return Python objects, raise exceptions, and provide retries, pagination, or rate-limit handling depending on the library.",
				points: [
					"SDKs simplify request building, authentication, response parsing, and error handling compared with raw REST calls.",
					"SDK behavior varies; confirm whether pagination, retries, and rate limits are handled automatically.",
					"Package names and versions change, so use the platform's current SDK documentation.",
				],
				example: "A Meraki SDK method such as getOrganizations() wraps the corresponding API operation and returns data the Python program can process.",
			},
			{
				title: "Cisco SDK examples",
				body: "Cisco SDKs target different platforms and tasks. Examples include the Meraki Dashboard API Python library, Catalyst Center's dnacentersdk, Webex SDKs, Cisco Intersight SDKs, Cisco ACI tools such as acitoolkit, and pyATS/Genie for network testing and parsing.",
				points: [
					"Pick the SDK for the platform and task rather than assuming one library manages every Cisco product.",
					"Use the platform's official or current documentation to confirm supported Python and platform versions.",
					"An SDK may expose data and operations differently from another platform's SDK.",
				],
				example: "Use the Meraki library for Dashboard operations, while pyATS/Genie is useful for network testing, learning device state, and parsing supported command output.",
			},
			{
				title: "Use the SDK documentation step by step",
				body: "Begin with the SDK overview and requirements, then install the package and obtain the credentials required by the platform. Import the library, construct a client as documented, find the method for the required task, pass the documented parameters, inspect the return type, and handle exceptions.",
				points: [
					"Confirm supported Python and platform versions before installation.",
					"Install the package in an isolated virtual environment.",
					"Find constructor and authentication details, then create a client.",
					"Use the API reference to confirm method names, required/optional parameters, and return types.",
					"Handle errors and test in a lab or sandbox before production use.",
				],
				example: "The Quick Start shows installation and a first call; the API reference describes exact method parameters and return types; release notes call out breaking changes.",
			},
			{
				title: "Meraki SDK example",
				body: "The Meraki Dashboard API Python library exposes organizations and networks as client methods. The method names correspond to documented API operations. Store the API key outside the source file and use the documentation to configure the client and logging options.",
				code: `import os
import meraki

dashboard = meraki.DashboardAPI(
    api_key=os.environ["MERAKI_API_KEY"],
    suppress_logging=True,
)

organizations = dashboard.organizations.getOrganizations()
for organization in organizations:
    print(organization["id"], organization["name"])

if organizations:
    networks = dashboard.organizations.getOrganizationNetworks(
        organizations[0]["id"]
    )
    for network in networks:
        print(network["name"])`,
				points: [
					"Create the SDK client with documented credentials and options.",
					"Call the documented method and inspect the returned objects before iterating.",
					"Check behavior for an empty result instead of assuming the first item exists.",
				],
				example: "After listing organizations, check that the result is not empty before requesting networks for the first organization.",
			},
			{
				title: "Good practices and review",
				body: "Use isolated dependencies, protect credentials, understand return types, and test safely. SDKs reduce boilerplate but do not remove the need to validate results, observe errors, or comply with API limits.",
				points: [
					"Use a virtual environment and pin dependencies in a requirements file.",
					"Read credentials from environment variables or a secrets manager, never from source code.",
					"Review SDK pagination, rate-limit, retry, and exception behavior.",
					"Use a Cisco DevNet sandbox or lab before changes to production.",
					"Review: SDKs wrap API details; method parameters are in the API reference; virtual environments isolate dependencies.",
				],
				example: "A production-ready SDK workflow checks the method's returned data, reports failures, and avoids logging credentials.",
			},
		],
	},
	"4.2": {
		intro: "Cisco network management platforms expose APIs that let scripts and applications manage a network domain through a controller. Match the operation to the platform that owns the resource, understand its API and authentication model, and distinguish northbound application interfaces from southbound controller-to-device protocols.",
		sections: [
			{
				title: "Controller-based network management",
				body: "Managing devices individually through CLI becomes difficult at scale. A controller provides a central point of management and typically exposes a northbound REST API to applications, while communicating southbound with network devices using protocols such as NETCONF, SSH, SNMP, OpenFlow, or vendor-specific interfaces.",
				points: [
					"Northbound interfaces connect applications and scripts to the controller.",
					"Southbound protocols connect the controller to managed network devices.",
					"Use the controller API for domain-wide workflows and device APIs when a task specifically requires direct device access.",
				],
				example: "A campus automation tool calls Catalyst Center northbound; the controller then coordinates with the relevant switches and routers southbound.",
			},
			{
				title: "Match Cisco platforms to their domains",
				body: "Cisco network management platforms serve different domains: Meraki manages cloud-managed networking; DNA Center, now Catalyst Center, supports campus and branch intent-based networking; ACI/APIC manages data-center fabric policy; vManage centralizes SD-WAN management; and NSO orchestrates services across multiple vendors.",
				points: [
					"Meraki: cloud-managed wireless, switching, security appliances, and cameras.",
					"Catalyst Center: campus/branch design, provisioning, policy, and assurance.",
					"ACI/APIC: policy-driven data-center fabric and managed objects.",
					"SD-WAN/vManage: centralized WAN overlay configuration, templates, policy, and monitoring.",
					"NSO: model-driven network service orchestration across multi-vendor devices.",
				],
				example: "Choose NSO for a service that must coordinate configuration across multi-vendor devices; choose Meraki for cloud-managed branch network inventory.",
			},
			{
				title: "Meraki Dashboard API",
				body: "Meraki's cloud Dashboard API is REST-based, uses JSON, and commonly has a base URL under https://api.meraki.com/api/v1. Its organization-to-network-to-device hierarchy shapes how inventory calls are made. API keys are supplied using the documented authentication header.",
				points: [
					"Follow the hierarchy organizations → networks → devices.",
					"Typical tasks include listing organizations and networks, configuring SSIDs or VLANs, and reading device status.",
					"Use pagination and rate-limit guidance from the API documentation.",
					"Meraki also provides webhook and other APIs for specific functions.",
				],
				code: `GET https://api.meraki.com/api/v1/organizations
Authorization: Bearer <API_KEY>
Accept: application/json`,
				example: "To list devices for a network, first identify the organization and network context required by the documented endpoint.",
			},
			{
				title: "Catalyst Center, ACI, and SD-WAN APIs",
				body: "Catalyst Center exposes REST APIs for intent, device management, integrations, events, and webhooks. It uses a dynamic token obtained from the authentication endpoint and sent in the X-Auth-Token header. ACI APIC exposes REST operations on a managed-object tree; SD-WAN vManage exposes REST APIs for devices, templates, monitoring, and policies.",
				points: [
					"Catalyst Center authentication: obtain a token using the documented basic-auth token endpoint, then send X-Auth-Token.",
					"ACI objects include tenants, application profiles, EPGs, bridge domains, VRFs, and contracts; each has a distinguished name.",
					"ACI login returns a token used as a cookie in later requests; tools include Cobra SDK, Visore, and API Inspector.",
					"SD-WAN includes vManage (management), vSmart (control), vBond (orchestration), and WAN Edge routers.",
					"Follow vManage's documented session cookie and token requirements, especially for state-changing calls.",
				],
				example: "A Catalyst Center workflow can obtain a token, call the device endpoint with X-Auth-Token, then inspect reachability or health data.",
			},
			{
				title: "NSO and choosing the right platform",
				body: "Cisco NSO uses YANG models for services and devices, Network Element Drivers (NEDs) to communicate with vendors, and a transactional approach that can roll back changes if a multi-device operation fails. It offers RESTCONF, NETCONF, CLI, and Python interfaces.",
				points: [
					"Use NSO when one service definition should produce coordinated multi-vendor device configuration.",
					"Use the platform that owns the target resource and supports the required operation.",
					"Review platform version, permissions, authentication, API docs, and object hierarchy before coding.",
					"Review: northbound connects applications to a controller; southbound connects controllers to devices; NSO uses YANG for modeled services.",
				],
				example: "An L3 VPN service can be defined once in NSO and rendered into vendor-specific device configuration through the appropriate NEDs.",
			},
		],
	},
	"4.3": {
		intro: "Cisco Unified Computing System (UCS) combines servers, Fabric Interconnects, networking, and management. Its compute platforms use policies and reusable profiles so server identity and configuration can be managed independently of a particular physical server. UCS Manager, UCS Director, and Intersight differ in scope, deployment, API style, and authentication.",
		sections: [
			{
				title: "Cisco UCS and stateless computing",
				body: "Cisco UCS is a data-center compute platform that combines blade and rack servers, Fabric Interconnects, networking, and management. A service profile in UCS Manager or a server profile in Intersight holds server identity and configuration such as MAC addresses, WWNs, UUID, BIOS settings, boot order, firmware, and connectivity.",
				points: [
					"Profiles make configuration reusable and policy-based rather than manually tied to one physical server.",
					"If hardware fails, a profile can be applied to replacement hardware so it assumes the same configured identity.",
					"This separation between profile and hardware is the basis of stateless computing.",
				],
				example: "Moving a service profile to a replacement server can restore the intended network and boot identity without rebuilding the configuration by hand.",
			},
			{
				title: "UCS Manager and its XML API",
				body: "UCS Manager manages a single UCS domain and is embedded in the Fabric Interconnects. Its management interfaces include GUI, CLI, and the UCS XML API over HTTP/HTTPS. The Management Information Tree (MIT) stores configuration and state as managed objects; each object is identified by a distinguished name (DN).",
				points: [
					"An object DN is a path in the management tree, such as sys/chassis-1/blade-2.",
					"Authentication uses aaaLogin to return a session cookie for subsequent API calls; aaaLogout ends the session.",
					"UCSM Python SDK (ucsmsdk), UCSM PowerTool, and the UCS Platform Emulator support automation and testing.",
				],
				code: `from ucsmsdk.ucshandle import UcsHandle

handle = UcsHandle("192.0.2.10", username, password)
handle.login()
try:
    blades = handle.query_classid("computeBlade")
    for blade in blades:
        print(blade.dn, blade.model)
finally:
    handle.logout()`,
				example: "Querying computeBlade objects returns managed server inventory that can be inspected through each object's DN and model.",
			},
			{
				title: "UCS Director orchestration",
				body: "UCS Director is an orchestration and automation platform spanning compute, storage, and networking. It uses reusable workflows assembled from tasks and provides self-service catalogs for infrastructure requests. It exposes a REST API and workflow tasks.",
				points: [
					"Workflows combine repeatable tasks into a controlled sequence.",
					"Self-service catalogs let users request supported infrastructure.",
					"UCS Director is a legacy product; check current Cisco documentation and roadmap before choosing it for new work.",
				],
				example: "A workflow can combine provisioning tasks so a request for infrastructure triggers a consistent series of compute, storage, and network actions.",
			},
			{
				title: "Cisco Intersight",
				body: "Cisco Intersight is a cloud operations platform for managing UCS and other Cisco infrastructure across sites and domains. Device Connectors link managed devices to the service. Its REST API follows OpenAPI and identifies resources with a managed object ID (Moid).",
				points: [
					"Intersight supports profiles, pools, policies, inventory, updates, and support insights.",
					"API authentication uses an API key ID and secret to sign requests; SDKs avoid hand-building signatures.",
					"Query options include OData-style $filter, $select, $top, and $orderby.",
					"Python, PowerShell, and Go SDKs, Terraform, and Ansible can automate Intersight.",
				],
				code: `GET /api/v1/compute/PhysicalSummaries?$filter=Model%20eq%20'UCSB-B200-M5'&$top=10`,
				example: "A filtered PhysicalSummaries query can return a limited set of servers matching a specific model.",
			},
			{
				title: "Compare compute platforms and review",
				body: "Choose the platform by scope and API need: UCS Manager for detailed control of one UCS domain, UCS Director for legacy cross-domain workflows, or Intersight for cloud-based, multi-site operations and modern SDK/tooling.",
				points: [
					"UCS Manager: embedded deployment, one domain, XML API, login cookie.",
					"UCS Director: on-premises orchestration appliance, workflows, REST API, legacy status.",
					"Intersight: cloud/SaaS management, REST/OpenAPI, signed API-key requests.",
					"Review: service profiles define server identity; DNs identify managed objects; Intersight is cloud-based.",
				],
				example: "Use the API and authentication method documented for the selected platform; UCS Manager's session cookie and Intersight's signed requests are not interchangeable.",
			},
		],
	},
	"4.4": {
		intro: "Cisco collaboration platforms cover messaging, meetings, calling, room devices, on-premises call control, and contact centers. Each provides APIs matched to its role: Webex REST and webhooks, device xAPI, CUCM AXL and UDS, and Finesse REST APIs and gadgets. Select the interface based on the collaboration resource and operation.",
		sections: [
			{
				title: "Webex REST APIs, OAuth, and webhooks",
				body: "Webex provides REST APIs for people, rooms, memberships, messages, meetings, participants, recordings, calling, and administration. The common API base is https://webexapis.com/v1/. OAuth 2.0 access tokens are sent as bearer tokens; personal tokens are useful for short-term testing, bots use bot tokens, and integrations use OAuth so users grant permission.",
				points: [
					"Use Webex webhooks for real-time events such as a new message.",
					"Keep access tokens secret and request only the permissions needed.",
					"Use documented room IDs and payload fields when posting messages.",
				],
				code: `POST https://webexapis.com/v1/messages
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json

{"roomId": "<ROOM_ID>", "text": "Interface Gi0/1 is down on R1"}`,
				example: "A monitoring script can post an alert to an existing Webex space, while a bot can receive a webhook and act on a permitted command.",
			},
			{
				title: "Webex device xAPI",
				body: "Webex Room, Desk, and Board devices expose xAPI for device-level commands, configuration, status, and events. xAPI is available through device CLI, SSH, WebSocket, or HTTP. JavaScript macros run on the device and use xAPI to customize behavior or respond to events; cloud APIs manage device and workspace data centrally.",
				points: [
					"xAPI separates commands (actions), configurations (settings), statuses (state), and events.",
					"Typical tasks include placing a call, adjusting volume, reading room occupancy, or checking device health.",
					"Choose local xAPI or cloud device APIs according to whether the task requires device-local behavior or centralized management.",
				],
				example: "A room device macro can respond to a local event, while a cloud API can help an administrator review inventory and status across rooms.",
			},
			{
				title: "CUCM AXL and UDS",
				body: "Cisco Unified Communications Manager (CUCM) provides on-premises call control. AXL (Administrative XML Web Service) is SOAP over HTTPS/XML for administrative provisioning of phones, users, lines, and device pools. UDS is a REST-style interface intended for end-user data and self-service, such as a user's devices and settings.",
				points: [
					"AXL supports administrative operations such as addPhone, getPhone, updateUser, removeLine, and listPhone.",
					"AXL uses XML in a SOAP envelope, commonly at an endpoint such as https://<cucm>:8443/axl/.",
					"AXL authentication uses basic authentication for an application user with the correct role; tools such as Python zeep can use the WSDL.",
					"UDS is REST-oriented and user-focused, rather than a full administrative provisioning interface.",
					"Other CUCM interfaces include RIS, PAWS, and CDR/CAR for related status and records.",
				],
				code: `<soapenv:Envelope>
  <soapenv:Body>
    <ns:getPhone>
      <name>SEP001122334455</name>
    </ns:getPhone>
  </soapenv:Body>
</soapenv:Envelope>`,
				example: "Bulk-provisioning phones from a managed inventory is an AXL task; showing an end user their own devices is a UDS use case.",
			},
			{
				title: "Cisco Finesse contact-center APIs",
				body: "Cisco Finesse provides agent and supervisor desktops for Unified Contact Center. Its REST API manages users, queues, teams, dialogs, and agent state, with XML and often JSON representations. Real-time events may use XMPP or BOSH; JavaScript and HTML gadgets add custom widgets to the desktop.",
				points: [
					"Basic authentication is used for agents and supervisors, according to the platform setup.",
					"Gadgets can display customer data or add controls within the Finesse desktop.",
					"Common tasks include changing ready/not-ready state, handling calls, and showing a customer record when a call arrives.",
				],
				example: "A Finesse gadget can listen for call events and display relevant customer information in an agent's desktop.",
			},
			{
				title: "Choose a collaboration API and review",
				body: "Match the operation to the system that owns it: Webex Messaging REST for a space message, xAPI for device-local commands, CUCM AXL for administrative provisioning, UDS for a user's own data, and Finesse for contact-center desktop workflows.",
				points: [
					"Webex REST uses OAuth 2.0 access tokens.",
					"AXL is SOAP over HTTPS/XML; UDS is REST-oriented and end-user focused.",
					"xAPI controls and monitors Webex devices through commands, configurations, statuses, and events.",
					"Finesse gadgets are JavaScript/HTML widgets embedded in the desktop.",
				],
				example: "For a Webex room alert, use the Messaging REST API and a permitted roomId; for a device command, use xAPI or the documented Webex device API.",
			},
		],
	},
	"4.5": {
		intro: "Cisco security APIs automate investigation, enrichment, policy, endpoint response, identity, and malware analysis. Choose the platform that owns the required security action, understand its authentication method, and treat state-changing response operations—such as blocking or isolating—as controlled changes that require verification.",
		sections: [
			{
				title: "Security automation and platform roles",
				body: "Security APIs help teams process high volumes of alerts by enriching indicators, opening tickets, blocking malicious destinations, or isolating infected endpoints. Product names evolve, so consult current documentation; Firepower is part of Cisco Secure Firewall and AMP for Endpoints became Secure Endpoint.",
				points: [
					"Use Cisco XDR for cross-source incident investigation and response workflows.",
					"Use Secure Firewall/FMC for firewall policy, objects, and deployment.",
					"Use Secure Endpoint for endpoint events and host isolation.",
					"Use Umbrella for DNS-layer policy and reporting; ISE for network access and identity policy.",
					"Use Secure Malware Analytics for sandbox analysis of suspicious files and URLs.",
				],
				example: "An alert workflow can enrich an observable, create a ticket for review, and require explicit approval before blocking or isolating.",
			},
			{
				title: "Cisco XDR and Secure Firewall",
				body: "Cisco XDR correlates detections into incidents and investigates observables such as IP addresses, domains, file hashes, and URLs using integrated sources. Its REST APIs support incidents, enrichment, and orchestration; OAuth 2.0 client credentials obtain a bearer token. Firepower Management Center (FMC) APIs manage access-control policies, objects, devices, NAT, and deployments.",
				points: [
					"XDR can enrich an observable and gather verdicts or sightings from integrated tools.",
					"XDR authentication: client ID and secret obtain an OAuth access token.",
					"FMC token-based login uses basic authentication at the token endpoint and returns access/refresh tokens in response headers.",
					"FMC configuration changes do not take effect on managed devices until a deployment operation is performed.",
				],
				example: "A firewall response may create a network object and block rule, then explicitly deploy the change so managed devices receive it.",
			},
			{
				title: "Secure Endpoint and Umbrella",
				body: "Secure Endpoint monitors endpoint behavior and supports queries of computers, events, files, groups, and policies, including host-isolation actions. Umbrella provides cloud DNS-layer security and secure web gateway capabilities; APIs manage organizations, networks, policies, reports, events, and destination lists.",
				points: [
					"Secure Endpoint commonly uses basic authentication with an API client ID and key.",
					"Use Secure Endpoint to identify affected computers and isolate a host when approved.",
					"Umbrella OAuth uses an API key and secret to obtain an access token.",
					"Umbrella can add a domain to a destination list used by a blocking policy.",
				],
				example: "To respond to a confirmed malicious file, find the affected endpoints and use the documented Secure Endpoint isolation action with appropriate authorization.",
			},
			{
				title: "ISE and Secure Malware Analytics",
				body: "Cisco Identity Services Engine (ISE) authenticates users and devices and applies network authorization policy. ERS (External RESTful Services) supports CRUD on endpoints, identity groups, network devices, and users; newer OpenAPI interfaces and pxGrid provide additional integration and event sharing. Secure Malware Analytics (formerly Threat Grid) runs suspicious files or URLs in a sandbox and returns behavioral reports and threat scores.",
				points: [
					"ISE ERS and OpenAPI operations require the documented API access and administrator permissions; the lesson source describes basic authentication.",
					"pxGrid shares context and publish/subscribe events with other security products.",
					"Secure Malware Analytics accepts samples, reports analysis status, and returns reports, indicators, and threat scores.",
					"Secure Malware Analytics uses an API key.",
				],
				example: "An automation can submit an unknown attachment for sandbox analysis, then route the resulting score and indicators to an analyst workflow.",
			},
			{
				title: "Compare authentication and review",
				body: "Authentication varies by security platform. Do not assume one token format works everywhere; follow the product's API documentation and protect credentials. Verify the result of a state-changing operation and preserve an approval trail for impactful response actions.",
				points: [
					"XDR: OAuth 2.0 client credentials; Umbrella: OAuth token from API key and secret.",
					"FMC: token from a login endpoint; Secure Endpoint: basic authentication with client ID/key.",
					"ISE: basic authentication in the lesson's API model; Secure Malware Analytics: API key.",
					"Review: Secure Endpoint supports endpoint isolation; ISE ERS manages identity-related resources; Secure Malware Analytics analyzes suspicious samples.",
				],
				example: "If blocking a domain through FMC, verify the target policy and deploy status; a successful object creation alone does not prove the device received the policy.",
			},
		],
	},
	"4.6": {
		intro: "Device-level APIs communicate directly with an individual router or switch, unlike controller APIs that manage a fleet. IOS XE and NX-OS provide structured interfaces such as NETCONF, RESTCONF, gNMI, and NX-API, reducing the fragility of scraping unstructured CLI output and enabling model-driven or platform-specific automation.",
		sections: [
			{
				title: "Controller APIs and device-level interfaces",
				body: "Controller APIs manage many devices from a centralized platform. Device-level APIs connect directly to one switch or router when no controller is available, device-specific detail is needed, or custom automation is required. Structured JSON/XML responses are more predictable than parsing raw CLI text.",
				points: [
					"NETCONF: IOS XE, NX-OS, and IOS XR; SSH transport, default port 830; XML encoded YANG data.",
					"RESTCONF: IOS XE and supported NX-OS platforms; HTTPS with JSON or XML and YANG data.",
					"gNMI/gRPC: supported platforms; gRPC over HTTP/2 with Protocol Buffers and YANG-modeled data.",
					"NX-API CLI: NX-OS; HTTP/HTTPS carrying CLI commands and returning structured JSON or XML.",
				],
				example: "A script that needs a single device's interface configuration can call that device's RESTCONF endpoint rather than a fleet controller.",
			},
			{
				title: "IOS XE programmability",
				body: "IOS XE runs on Catalyst switches, ISR/ASR routers, and Catalyst 9800 controllers. It supports model-driven NETCONF and RESTCONF, model-driven telemetry, and on-box automation through Guest Shell, EEM, and Python. Enabling an interface requires appropriate configuration and user privilege.",
				points: [
					"Example configuration commands include ip http secure-server and restconf for RESTCONF, and netconf-yang for NETCONF.",
					"RESTCONF uses HTTPS and commonly basic authentication; use a local account with appropriate privileges.",
					"Use YANG data and the documented media types rather than scraping CLI output.",
					"Disable certificate verification only in an isolated lab; keep it enabled with valid trust in production.",
				],
				code: `import requests

url = "https://192.0.2.1/restconf/data/ietf-interfaces:interfaces"
headers = {"Accept": "application/yang-data+json"}
response = requests.get(
    url,
    headers=headers,
    auth=(username, password),
    timeout=10,
    verify=True,
)
response.raise_for_status()
print(response.json())`,
				example: "The RESTCONF response is structured interface data that can be traversed without depending on terminal spacing or command output formatting.",
			},
			{
				title: "NX-OS and NX-API",
				body: "NX-OS runs on Nexus data-center switches. NX-API CLI sends CLI commands inside a JSON or XML request over HTTP/HTTPS and can return structured output. NX-API REST exposes the NX-OS Data Management Engine (DME) object model. Supported devices may also provide NETCONF, RESTCONF, gNMI, Python, Bash, and Guest Shell.",
				points: [
					"Enable NX-API with feature nxapi on supported devices.",
					"The NX-API sandbox can help learners translate CLI input to request and response formats.",
					"NX-API CLI can convert a familiar show command into JSON for structured processing.",
					"Use HTTPS, secure credentials, and device/version-specific documentation.",
				],
				code: `POST https://192.0.2.10/ins
Content-Type: application/json

{
  "ins_api": {
    "version": "1.0",
    "type": "cli_show",
    "chunk": "0",
    "sid": "1",
    "input": "show version",
    "output_format": "json"
  }
}`,
				example: "With output_format set to json, a show command's result can be consumed as structured response data instead of terminal text.",
			},
			{
				title: "Static CLI and dynamic interfaces",
				body: "Traditional static automation sends CLI commands over SSH and parses text using tools such as TextFSM, Genie parsers, or NTC templates. A dynamic model-driven interface exposes supported capabilities through YANG and allows clients to discover and operate on structured data. Telemetry can push state to a collector instead of requiring repeated SNMP polling.",
				points: [
					"CLI scraping is sensitive to output changes and formatting; structured interfaces reduce that dependency.",
					"Dynamic interfaces adapt to the capabilities and models exposed by a device.",
					"Model-driven telemetry can stream data on a schedule or when values change.",
					"Distinguish telemetry push from request/response polling.",
				],
				example: "A telemetry subscription can send interface state to a collector as it changes, rather than having the collector query every device repeatedly.",
			},
			{
				title: "Tools and platform comparison",
				body: "Select a client library or tool based on the protocol and operational goal. requests can call RESTCONF/NX-API; ncclient supports NETCONF; pyATS/Genie tests and parses network state; Netmiko and NAPALM abstract CLI workflows; Ansible provides configuration modules; Postman can test HTTP endpoints.",
				points: [
					"IOS XE commonly uses NETCONF, RESTCONF, gNMI, Guest Shell, EEM, and on-box Python.",
					"NX-OS commonly uses NX-API CLI/REST and the DME object model, alongside supported model-driven interfaces.",
					"NETCONF defaults to SSH port 830.",
					"Review: NX-API is enabled with feature nxapi; device APIs return structured data; telemetry pushes data instead of repeated polling.",
				],
				example: "For a supported Nexus show command with JSON output, NX-API CLI is a suitable device-level interface; for a YANG data path, use NETCONF or RESTCONF.",
			},
		],
	},
	"4.7": {
		intro: "Model-driven programmability separates the data model from the protocol and wire encoding. YANG describes configuration, operational state, RPCs, and notifications; NETCONF and RESTCONF access that modeled data using different transports, encodings, and transaction capabilities.",
		sections: [
			{
				title: "Model, protocol, and encoding",
				body: "A data model defines which data exists and its structure; a protocol moves data between client and device; an encoding describes how that data is represented on the wire. Model-driven automation uses structured schema-defined data instead of relying on CLI text output.",
				points: [
					"YANG is a data modeling language.",
					"NETCONF, RESTCONF, and gNMI are protocols/interfaces for accessing modeled data.",
					"XML and JSON are data encodings.",
					"Models describe both configuration that can be changed and operational state that is read.",
				],
				example: "A client uses a YANG model to understand an interface's valid fields, then uses NETCONF or RESTCONF to read or change those fields.",
			},
			{
				title: "YANG models and schema structure",
				body: "YANG (Yet Another Next Generation) describes device configuration, state, remote procedure calls, and notifications. Models may be open standards from IETF/IEEE, operator-driven OpenConfig models, or vendor-native models such as Cisco-IOS-XE-native.",
				points: [
					"module is the top-level model container.",
					"container groups related nodes; list is a collection of keyed entries.",
					"leaf holds one typed value; leaf-list holds a list of simple values.",
					"rpc defines a callable operation; notification describes an event.",
					"pyang validates and displays model trees; YANG Suite can explore models and build requests.",
				],
				code: `module example-interfaces {
  container interfaces {
    list interface {
      key "name";
      leaf name { type string; }
      leaf description { type string; }
      leaf enabled { type boolean; }
    }
  }
}`,
				example: "The list interface uses name as its key; each interface has a string description and a boolean enabled value.",
			},
			{
				title: "NETCONF",
				body: "NETCONF (RFC 6241) is a network configuration protocol for installing, manipulating, and deleting device configuration. It uses SSH (default port 830), XML messages, and RPC requests/replies. Datastores include running (active configuration), candidate (a staging area that can be committed), and startup.",
				points: [
					"<get> retrieves configuration and state; <get-config> retrieves configuration.",
					"<edit-config> creates, merges, replaces, or deletes configuration; <copy-config> copies a datastore.",
					"<lock> and <unlock> control access to a datastore; <commit> applies candidate configuration.",
					"NETCONF supports validation, locking, and transactional multi-step changes.",
					"ncclient is a Python NETCONF client; verify host keys and credentials according to deployment security requirements.",
				],
				code: `from ncclient import manager

with manager.connect(
    host="192.0.2.1",
    port=830,
    username=username,
    password=password,
    hostkey_verify=True,
) as connection:
    reply = connection.get_config(source="running")
    print(reply.xml)`,
				example: "Using a candidate datastore allows a client to validate and commit a group of related configuration changes as a transaction.",
			},
			{
				title: "RESTCONF",
				body: "RESTCONF (RFC 8040) offers a REST-style HTTP interface to YANG-modeled data. It uses HTTPS and XML or JSON media types such as application/yang-data+json. The root path is commonly /restconf/data/ followed by a model-qualified container/list path. HTTP methods map to retrieval and configuration operations.",
				points: [
					"GET retrieves; POST creates; PUT creates or replaces; PATCH merges changes; DELETE removes.",
					"RESTCONF commonly uses basic authentication over HTTPS as documented by the device.",
					"Use the correct YANG media type in Accept and Content-Type headers.",
					"RESTCONF performs individual HTTP operations; it does not provide NETCONF-style datastore locking and multi-step commit transactions.",
				],
				code: `GET https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1
Accept: application/yang-data+json`,
				example: "A PATCH can merge an interface description change; PUT replaces the resource and should only be used when the full replacement payload is intended.",
			},
			{
				title: "Compare and apply model-driven interfaces",
				body: "NETCONF and RESTCONF access YANG data with different protocols and transaction features. NETCONF uses XML over SSH and supports datastores, locking, and commits; RESTCONF uses HTTP over HTTPS with JSON or XML and familiar HTTP methods.",
				points: [
					"NETCONF: RFC 6241, SSH port 830, XML, RPC operations, running/candidate/startup datastores, transactional locking and commits.",
					"RESTCONF: RFC 8040, HTTPS, JSON or XML, HTTP methods, typically simpler request/response operations.",
					"Typical workflow: discover device capabilities and YANG models, choose a model, access it using NETCONF or RESTCONF, and exchange the model-defined data.",
					"Review: YANG defines data; a container groups nodes; a leaf stores one typed value.",
				],
				example: "Prefer NETCONF when a change needs candidate validation and a transactional commit; choose RESTCONF for a simple HTTP integration when its capabilities are sufficient.",
			},
		],
	},
	"4.8": {
		intro: "To perform an operation with Cisco APIs, translate the requirement into a target resource and action, select the platform and API, authenticate using that platform's mechanism, construct the documented request, and verify the response and resulting state. The same repeatable method applies across management controllers, collaboration systems, security platforms, and device APIs.",
		sections: [
			{
				title: "A repeatable API operation workflow",
				body: "This objective combines the module's APIs and platforms. Given a requirement and documentation, determine what resource and action are needed, select the platform that owns it, construct the request, and confirm that the intended result occurred.",
				points: [
					"Restate the requirement: what data or action, on which platform?",
					"Find the documented API endpoint, method, parameters, headers, body, and response codes.",
					"Authenticate using the platform's required method.",
					"Send the request with an SDK, requests, or the appropriate protocol client.",
					"Check the response code and body, handle errors and constraints, then verify the resulting resource or state.",
				],
				example: "For “list devices that are down,” identify the controller and device inventory endpoint, authenticate, retrieve all pages, filter the documented state field, and report the result.",
			},
			{
				title: "Match requirements to a Cisco API",
				body: "The right API depends on the resource and operation. Similar tasks can use different APIs depending on whether they affect a controller, a device, or a collaboration/security service.",
				points: [
					"Cloud-managed branch networks: Meraki Dashboard API with API key.",
					"Campus device health: Catalyst Center Intent API with a token from basic authentication to its token endpoint.",
					"Data-center fabric tenant: ACI APIC REST API with login and cookie.",
					"Compute inventory: UCS Manager XML API with a cookie, or Intersight REST API with signed API-key requests.",
					"Webex message: Webex REST API with OAuth bearer token; CUCM phone provisioning: AXL with basic auth.",
					"Block a domain: Umbrella API with OAuth; isolate an endpoint: Secure Endpoint API with client ID/key credentials.",
					"Read IOS XE interface config: RESTCONF or NETCONF; run a Nexus show command as JSON: NX-API CLI.",
				],
				example: "For a device-level interface change on IOS XE, use its supported RESTCONF or NETCONF interface rather than an unrelated Cisco management API.",
			},
			{
				title: "Worked example: Catalyst Center device inventory",
				body: "To print each network device's hostname and reachability, first obtain a Catalyst Center token with the documented authentication endpoint, then call the Intent API with X-Auth-Token. Validate the response before iterating through its device data.",
				code: `import requests

base = "https://catalyst.example.com"
token_response = requests.post(
    f"{base}/dna/system/api/v1/auth/token",
    auth=(username, password),
    timeout=10,
)
token_response.raise_for_status()
token = token_response.json()["Token"]

headers = {"X-Auth-Token": token, "Accept": "application/json"}
response = requests.get(
    f"{base}/dna/intent/api/v1/network-device",
    headers=headers,
    timeout=10,
)
response.raise_for_status()
for device in response.json()["response"]:
    print(device["hostname"], device["reachabilityStatus"])`,
				points: [
					"Use the platform-specific token header X-Auth-Token for the Intent API call.",
					"Use valid TLS certificates in production; do not disable certificate verification outside a lab.",
					"Check the response status and the expected response field before reporting results.",
				],
				example: "The token request and the device list request are separate steps; authenticate first, then attach the token to the API call.",
			},
			{
				title: "Worked examples: Webex, RESTCONF, and NX-API",
				body: "Different Cisco platforms require different request shapes. Webex uses OAuth and JSON, RESTCONF uses YANG media types and HTTP operations, and NX-API CLI wraps a command in the documented JSON envelope.",
				code: `# Post to an existing Webex space
webex_response = requests.post(
    "https://webexapis.com/v1/messages",
    headers={"Authorization": f"Bearer {webex_token}"},
    json={"roomId": room_id, "text": "Backup complete"},
    timeout=10,
)
webex_response.raise_for_status()

# RESTCONF PATCH merges an interface change
interface_url = (
    "https://192.0.2.1/restconf/data/"
    "ietf-interfaces:interfaces/interface=GigabitEthernet1"
)
interface_body = {"ietf-interfaces:interface": {
    "name": "GigabitEthernet1",
    "description": "Uplink to core",
    "type": "iana-if-type:ethernetCsmacd",
}}
response = requests.patch(
    interface_url,
    headers={
        "Content-Type": "application/yang-data+json",
        "Accept": "application/yang-data+json",
    },
    json=interface_body,
    auth=(username, password),
    timeout=10,
)
response.raise_for_status()

# NX-API CLI request body
payload = {"ins_api": {
    "version": "1.0", "type": "cli_show", "chunk": "0", "sid": "1",
    "input": "show version", "output_format": "json",
}}`,
				points: [
					"Use POST /v1/messages with a room ID to send a Webex message.",
					"PATCH merges RESTCONF data; PUT replaces the resource.",
					"A successful RESTCONF PATCH commonly returns 204 No Content.",
					"NX-API CLI sends its command and output format inside the ins_api request structure.",
				],
				example: "A 204 response is a successful RESTCONF update even though there is no JSON response body to parse.",
			},
			{
				title: "Avoid common pitfalls and practice",
				body: "A request can be syntactically valid but still fail to meet the task if authentication, resource selection, headers, or response handling is wrong. Verify the exact operation and resulting state rather than treating a successful transport as proof of success.",
				points: [
					"Do not mix platform authentication mechanisms: bearer token, session cookie, X-Auth-Token, and signed API keys are not interchangeable.",
					"Include required Content-Type and Accept headers; use the documented request body.",
					"Do not confuse PUT replacement with PATCH merge.",
					"Check status codes, handle pagination and rate limits, and protect credentials.",
					"Keep TLS certificate verification enabled in production.",
					"Practice: list Meraki networks; post a Webex alert; read IOS XE interfaces; run show ip interface brief through NX-API; combine an interface-down check with a Webex alert.",
				],
				example: "Before reporting completion, confirm the server accepted the operation and, when possible, read back the resource or status to verify the requested state.",
			},
		],
	},
	"5.1": {
		intro: "Edge computing processes data close to where it is created instead of sending every task to a distant cloud region. It complements cloud computing: local systems handle time-sensitive decisions, while centralized services can store history, analyze large datasets, and distribute updates.",
		sections: [
			{
				title: "Edge and centralized cloud",
				body: "An edge location may be a factory, branch, vehicle, mobile carrier network, or gateway near sensors and users. A centralized cloud offers large-scale compute and mature centralized tooling; edge sites are smaller and distributed, which can make them harder to operate consistently.",
				points: [
					"Edge reduces round-trip latency and can keep local services working during a WAN or cloud outage.",
					"Filtering or summarizing data locally can save bandwidth, and sensitive information may remain at its site.",
					"Fog computing describes an intermediate layer between devices and cloud; an IoT gateway collects and processes local sensor data; a CDN caches content near users; MEC places compute in a mobile carrier network near 5G access.",
				],
				example: "A factory camera can detect a defective part locally and trigger a reject arm within milliseconds, while sending a small summary to the cloud for long-term analysis.",
			},
			{
				title: "Benefits, trade-offs, and automation",
				body: "Edge sites trade centralized scale for proximity. They can reduce delay and dependence on connectivity, but many remote locations must be patched, monitored, secured, and configured consistently. Physical access and distributed credentials also expand operational and security concerns.",
				points: [
					"Choose edge when response time, local resilience, bandwidth, or data locality matters.",
					"Use centralized cloud services for large-scale storage, analytics, model training, and coordination.",
					"Containers and automation such as CI/CD, Ansible, or Terraform help manage deployments consistently across many sites.",
				],
				code: `Camera -> local edge gateway -> immediate control action
                         -> filtered summary to cloud
Cloud: retain history, analyze trends, and distribute approved updates`,
				example: "A branch can continue making local decisions during an internet outage and synchronize only the data needed for centralized reporting after connectivity returns.",
			},
			{
				title: "Review edge use cases",
				body: "The best design is often hybrid rather than edge-only or cloud-only. Place a workload according to its latency, connectivity, data-handling, and operational requirements.",
				points: [
					"Real-time video analytics is a poor fit for sending every raw frame to a distant cloud when a local decision is required.",
					"Do not assume that a small edge footprint is automatically easier to secure; distributed devices need physical and logical protection.",
					"Remember: cloud is suited to large-scale analysis; edge is suited to fast local response.",
				],
				example: "For a factory inspection system, keep detection and machine control at the edge, but send aggregated defect counts to the cloud for cross-site analysis.",
			},
		],
	},
	"5.2": {
		intro: "Application deployment models describe where workloads run and who manages the infrastructure. Compare private, public, hybrid, and community cloud deployment models with IaaS, PaaS, and SaaS service models; also consider multicloud when using more than one public provider.",
		sections: [
			{
				title: "Cloud deployment models",
				body: "A private cloud is dedicated to one organization and may be on premises or hosted; it offers control but requires more operational investment. A public cloud is provider-owned and shared across customers, enabling rapid provisioning and elastic capacity. Hybrid cloud connects private and public environments. A community cloud is shared by organizations with common needs, and multicloud uses multiple public providers.",
				points: [
					"Private: greater control and potential compliance fit, but higher capital and management costs.",
					"Public: fast scaling and pay-as-you-go capacity, but requires attention to cost, configuration, and shared security responsibilities.",
					"Hybrid: combines environments and can support cloud bursting, but adds networking and management complexity.",
					"Multicloud can reduce dependence on one provider, but does not remove integration and operations complexity.",
				],
				example: "A bank can retain regulated records in a private environment and run a public marketing site that scales during campaigns; this is a hybrid deployment.",
			},
			{
				title: "IaaS, PaaS, and SaaS responsibilities",
				body: "Service models describe how much of the stack the provider operates. With IaaS, the customer manages the operating system, runtime, application, and data. With PaaS, the customer focuses on the application and data. With SaaS, the provider manages the application and underlying platform, while the customer configures and uses the service.",
				points: [
					"IaaS examples include virtual machines such as AWS EC2 or Azure VMs.",
					"PaaS examples include Heroku or Azure App Service.",
					"SaaS examples include Webex or Microsoft 365.",
					"The provider secures the cloud infrastructure; the customer remains responsible for its data, identities, and configuration. The responsibility boundary moves as the provider manages more of the stack.",
				],
				code: `Customer management (most)                   Provider management (most)
IaaS: OS, runtime, app, data | infrastructure
PaaS: app, data              | OS, runtime, infrastructure
SaaS: settings and usage     | application and infrastructure`,
				example: "Choose IaaS when operating-system control is required; choose PaaS to focus on application code; choose SaaS when a ready-to-use application meets the need.",
			},
			{
				title: "Choose a model for requirements",
				body: "Select a model by balancing control, cost, staffing, demand variability, data residency, and the need to avoid lock-in. Security remains shared in public cloud regardless of the service chosen.",
				points: [
					"Strict data residency may favor private or hybrid deployment.",
					"Highly variable demand may favor public capacity or hybrid cloud bursting.",
					"A small IT team may reduce operational work with SaaS or PaaS.",
					"Use a multicloud strategy only when its resilience or provider choice benefits justify the additional management effort.",
				],
				example: "A team that needs a managed web runtime but must retain its database on premises can use PaaS for the web tier and a private environment for the database.",
			},
		],
	},
	"5.3": {
		intro: "A deployment strategy controls how users move from an existing application version to a new one. The strategy affects downtime, infrastructure cost, risk, observation, and rollback speed; choose it to match the application's availability and release requirements.",
		sections: [
			{
				title: "Compare release strategies",
				body: "Recreate stops the old version before starting the new one and normally causes downtime. Rolling replaces instances in small groups. Blue-green keeps two environments and switches traffic after testing the new environment. Canary exposes a small percentage of users to a new version before gradually expanding.",
				points: [
					"Recreate is simple and uses little extra infrastructure, but has downtime and slower rollback.",
					"Rolling updates avoid full downtime and use limited extra capacity, but rollback can take longer.",
					"Blue-green supports a fast traffic switch and rollback, at the cost of maintaining two environments.",
					"Canary limits exposure while metrics are observed; it needs traffic control and monitoring.",
				],
				example: "For a critical service that needs a rapid rollback, deploy and test the new version in green, then switch traffic from blue only when it is ready.",
			},
			{
				title: "Related deployment patterns",
				body: "A/B testing compares user behavior or outcomes across versions. Shadow deployment copies live requests to a new version but does not return its responses to users. Feature flags deploy code in a disabled state and enable it for selected users or conditions.",
				points: [
					"Canary asks whether the new version is safe and stable for a small group; A/B testing compares behavior or business results.",
					"Shadow traffic helps evaluate a rewrite under real load without affecting user responses.",
					"Feature flags can quickly disable a feature, but flag ownership and cleanup must be managed.",
					"Database changes should remain backward compatible while old and new application versions may run at the same time or a rollback is possible.",
				],
				code: `# Kubernetes rolling-update example
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1`,
				example: "A canary release might send 5% of traffic to version 2, check errors and latency, and increase traffic only while health remains acceptable.",
			},
			{
				title: "Match the strategy to the scenario",
				body: "Evaluate acceptable downtime, the cost of duplicate capacity, rollback requirements, application state, and the quality of health metrics. A strategy is only as safe as the checks used to decide whether to proceed.",
				points: [
					"Recreate may suit an internal tool where a brief outage is acceptable.",
					"Rolling can fit stateless services with multiple replicas.",
					"Blue-green can fit a critical application that needs an immediate switch back.",
					"Canary can reduce exposure for a risky change with a large user base.",
				],
				example: "Before expanding a canary, compare error rates, latency, and health checks against the old version; stop and roll back if the new version violates its release criteria.",
			},
		],
	},
	"5.4": {
		intro: "A CI/CD pipeline automates the path from a source change to a tested and deployable application. Continuous Integration builds and tests frequent changes; Continuous Delivery keeps passing changes ready for release with a manual production approval; Continuous Deployment releases passing changes automatically.",
		sections: [
			{
				title: "Pipeline stages and flow",
				body: "A typical pipeline starts from a push or pull request, builds the application, runs checks, packages an artifact, deploys it through environments, and monitors the result. Each stage should use the output of the prior stage and stop the release when a required check fails.",
				points: [
					"Source: Git event or webhook triggers the workflow.",
					"Build and test: install dependencies, compile, lint, run unit and integration tests, and scan for security issues.",
					"Package: version the artifact or container image and publish it to a registry.",
					"Deploy and monitor: release to development, staging, and production; use health checks, alerts, and rollback procedures.",
				],
				example: "A pull request can trigger linting and unit tests; only a passing change proceeds to an image build and a reviewed deployment.",
			},
			{
				title: "Pipeline components and controls",
				body: "Source control stores application and pipeline definitions. A CI/CD server or runner executes jobs. Build and test tools create and validate artifacts; registries store them; deployment tools release them; secrets managers provide credentials; monitoring detects problems after release.",
				points: [
					"Examples: GitHub Actions, GitLab CI, or Jenkins for jobs; npm, pip, or Docker for building; pytest or Selenium for tests.",
					"Examples: Nexus, Artifactory, and container registries for artifacts; Ansible, Terraform, Helm, or kubectl for deployment.",
					"Store pipeline definitions as code in the repository so changes are reviewable and repeatable.",
					"Keep credentials in protected CI variables or a secrets manager, not in workflow files.",
				],
				code: `name: test-and-build
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pytest
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: docker build -t myapp:latest .`,
				example: "The build job depends on the test job, so a failed test prevents the pipeline from building and promoting that change.",
			},
			{
				title: "Distinguish delivery from deployment",
				body: "Continuous Delivery automates validation and keeps the application deployable, while a person may approve the production release. Continuous Deployment has no manual production gate: every change that passes the pipeline is released automatically.",
				points: [
					"CI means integrate changes often and automatically build and test them.",
					"Delivery means ready to release; deployment means the pipeline releases automatically.",
					"A failed required stage should stop promotion and notify the team.",
					"Use smoke tests, health checks, monitoring, and a documented rollback path after deployment.",
				],
				example: "A regulated service may use Continuous Delivery with an approval gate, while a low-risk service with strong automated checks may use Continuous Deployment.",
			},
		],
	},
	"5.5": {
		intro: "A Python unit test checks one small function or method in isolation and reports pass or fail automatically. Fast, repeatable unit tests catch regressions early and can run on every change in a CI/CD pipeline.",
		sections: [
			{
				title: "Write focused tests",
				body: "Use Arrange, Act, Assert: prepare inputs, call the unit, and check its result. Test normal behavior as well as boundaries and errors. The testing pyramid has many fast unit tests, fewer integration tests, and a smaller number of end-to-end tests.",
				points: [
					"unittest is included with Python and commonly groups tests in classes derived from unittest.TestCase.",
					"pytest is a separate package that supports plain test functions and ordinary assert statements.",
					"Test files commonly use test_*.py and test functions or methods start with test_.",
					"Use setUp and tearDown in unittest when a test needs preparation or cleanup before and after each test.",
				],
				code: `import unittest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestDivide(unittest.TestCase):
    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)

    def test_zero_divisor(self):
        with self.assertRaises(ValueError):
            divide(1, 0)`,
				example: "The second test verifies the documented error behavior instead of allowing division by zero to pass unnoticed.",
			},
			{
				title: "Assertions, discovery, and test-driven development",
				body: "Assertions express expected behavior. unittest offers methods such as assertEqual, assertTrue, assertIn, assertIsNone, and assertRaises; pytest uses Python assert and provides pytest.raises for exceptions. Test discovery runs tests by naming convention.",
				points: [
					"Run unittest tests with python -m unittest; pytest discovers matching test files and functions when invoked with pytest.",
					"TDD writes a failing test first, implements enough code to pass, then refactors while keeping tests green.",
					"Use meaningful test names that describe the behavior being checked.",
				],
				code: `import pytest

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(1, 0)`,
				example: "A test for an invalid input should assert the specific exception expected, so unrelated failures do not look like success.",
			},
			{
				title: "Mock external dependencies",
				body: "A unit test should not contact real networks, APIs, or routers. Mock external dependencies so the test controls the response and remains fast, safe, and repeatable.",
				points: [
					"Use unittest.mock.patch to replace the dependency at the location where the code under test looks it up.",
					"Set the mock's return value and assert both the result and, when useful, how the dependency was called.",
					"Keep real service and device interactions for appropriately controlled integration tests.",
				],
				code: `from unittest.mock import patch
import requests

def get_status(url):
    return requests.get(url, timeout=5).status_code

@patch("requests.get")
def test_get_status(mock_get):
    mock_get.return_value.status_code = 200
    assert get_status("https://example.invalid") == 200`,
				example: "Mocking requests.get lets the test validate response handling without sending traffic to a real endpoint.",
			},
		],
	},
	"5.6": {
		intro: "A Dockerfile is a set of build instructions that produces an image; a container is a running instance of that image. Understanding common instructions and build-time versus run-time behavior helps create reproducible and safer application packages.",
		sections: [
			{
				title: "Common Dockerfile instructions",
				body: "FROM selects a base image; WORKDIR sets the working directory; COPY adds files from the build context; RUN executes commands during the build; ENV defines run-time environment values; and ARG supplies build-time values. EXPOSE documents a container port but does not publish it to the host.",
				points: [
					"Prefer COPY over ADD unless URL retrieval or automatic archive extraction is specifically needed.",
					"USER selects the identity used by subsequent instructions and the running container.",
					"CMD sets a default command or arguments; ENTRYPOINT identifies the main executable.",
					"HEALTHCHECK defines a command Docker can use to assess container health.",
				],
				code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
USER appuser
CMD ["python", "app.py"]`,
				example: "EXPOSE 5000 documents the application port; publishing it for host access still requires a run-time port mapping such as -p 8080:5000.",
			},
			{
				title: "CMD and ENTRYPOINT",
				body: "CMD provides a default command or default arguments that can be replaced when docker run starts the container. ENTRYPOINT defines the main executable; arguments supplied at run time are passed to it. The exec form uses a JSON array and handles process signals more predictably than a shell-form command.",
				points: [
					"Use CMD when the default process should be easy to replace.",
					"Use ENTRYPOINT when the image always runs a particular program and CMD can supply its default arguments.",
					"RUN executes while building an image; CMD and ENTRYPOINT configure container start-up.",
				],
				code: `ENTRYPOINT ["python", "app.py"]
CMD ["--port", "5000"]`,
				example: "With this combination, the container starts the Python application with a default port, and run-time arguments can replace the default arguments.",
			},
			{
				title: "Build secure, cacheable images",
				body: "Build order affects caching: copy dependency manifests and install packages before copying frequently changing application code. Keep the final image small, avoid embedding credentials, and use a non-root run-time identity.",
				points: [
					"Use a small, official, pinned base image rather than relying on a mutable latest tag.",
					"Add a .dockerignore file to exclude .git, .env files, caches, and other unnecessary build-context content.",
					"Use multi-stage builds when build tools are not required in the final image.",
					"Do not put passwords, API tokens, or private keys in Dockerfile instructions or image layers.",
				],
				example: "Copying requirements.txt and installing dependencies before COPY . allows Docker to reuse the dependency layer when only application source changes.",
			},
		],
	},
	"5.7": {
		intro: "Docker images and containers make local development environments reproducible. Build or pull an image, run it as a container, inspect its logs and state, and use volumes or Compose when the environment needs persistent data or multiple services.",
		sections: [
			{
				title: "Build and manage images",
				body: "An image is a read-only package used to create containers. Build from the Dockerfile in the current directory, tag the result, and use a registry to share it with other developers or environments.",
				points: [
					"docker build -t myapp:1.0 . builds and tags a local image.",
					"docker images lists local images; docker pull downloads one from a registry.",
					"docker tag adds another name or tag; docker push publishes an image to a registry.",
					"docker rmi removes a local image when it is no longer needed.",
				],
				code: `docker build -t myapp:1.0 .
docker images
docker tag myapp:1.0 registry.example/myapp:1.0
docker push registry.example/myapp:1.0`,
				example: "Use a versioned tag so developers can tell which build they are running and avoid treating an unpinned latest image as a reproducible version.",
			},
			{
				title: "Run and inspect containers",
				body: "docker run creates and starts a container from an image. Use container commands to check status, read logs, open a shell, and stop or remove the instance.",
				points: [
					"docker ps lists running containers; docker ps -a includes stopped containers.",
					"docker logs -f web follows a container's output; docker exec -it web /bin/sh opens a shell.",
					"docker stop web stops a container; docker rm web removes it.",
					"Options include -d for detached mode, --name for a readable name, -e for environment variables, and --rm for automatic removal after exit.",
				],
				code: `docker run -d --name web -p 8080:5000 -e APP_ENV=dev myapp:1.0
docker ps
docker logs -f web
docker exec -it web /bin/sh`,
				example: "The -p 8080:5000 option maps host port 8080 to container port 5000, so a client on the host connects to localhost:8080.",
			},
			{
				title: "Persist data and use Compose",
				body: "A container's writable layer is not a safe place for data that must outlive the container. Mount a volume or bind mount for persistence. Docker Compose describes related services and their dependencies in one file.",
				points: [
					"Use -v or a Compose volume for data that must remain after a container is removed.",
					"docker compose up -d starts the services; docker compose down stops and removes the Compose containers and network.",
					"Services in the same Compose project can reach each other by service name.",
					"Publish only the ports needed by the local workflow.",
				],
				code: `services:
  web:
    build: .
    ports: ["8080:5000"]
    environment: [DB_HOST=db]
    depends_on: [db]
  db:
    image: postgres:16
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:`,
				example: "The web service can connect to the database using the hostname db, while pgdata keeps database files outside the disposable container layer.",
			},
		],
	},
	"5.8": {
		intro: "Secrets are values that grant access, including passwords, API keys, tokens, private keys, and cloud credentials. Protect them from source repositories, container images, logs, and over-broad pipeline access; use encryption appropriately for stored and transmitted data.",
		sections: [
			{
				title: "Protect application secrets",
				body: "A secret can leak when hard-coded into source, copied into an image, printed in logs, shared in tickets, or exposed to too many CI/CD jobs. Removing a secret from the latest version does not remove it from Git history; rotate it after exposure.",
				points: [
					"Prefer a secrets manager with access controls, audit logs, and rotation; inject secrets at run time.",
					"Environment variables keep secrets out of source but may still appear in process lists, diagnostics, or logs.",
					"Use .dockerignore to exclude local .env files and never bake credentials into image layers.",
					"Apply least privilege, restrict pipeline variable access, mask sensitive log values, and rotate credentials regularly or after a leak.",
					"Ansible Vault can encrypt sensitive values stored with automation content.",
				],
				code: `# Avoid: committing a literal credential
import os
database_password = os.environ["DB_PASSWORD"]

# Exclude local secrets from the build context
# .dockerignore: .env`,
				example: "If an API key is committed, remove exposure where possible, revoke and replace the key, and review its access history; deleting the visible line alone is not enough.",
			},
			{
				title: "Encryption and hashing",
				body: "Symmetric encryption uses one shared key and is efficient for bulk data. Asymmetric cryptography uses a public/private key pair for functions such as key exchange and digital signatures. Hashing is a one-way transformation used for integrity checks and password verification.",
				points: [
					"AES is a symmetric algorithm; RSA and ECC are examples of asymmetric cryptography.",
					"Hashing is not encryption: it is not intended to be decrypted.",
					"Do not store passwords by encrypting them; use a slow, salted password-hashing algorithm such as bcrypt or Argon2.",
					"TLS uses asymmetric cryptography during connection setup to establish a symmetric session key for data transfer.",
				],
				example: "A password verifier can store a salted Argon2 hash; an application verifies a login by hashing the candidate password rather than retrieving the original password.",
			},
			{
				title: "Protect data in transit and at rest",
				body: "Data in transit is moving across a network and should use authenticated encryption such as TLS for HTTPS, SSH, or an IPsec VPN. Data at rest is stored on disks, databases, or backups and may require disk or database encryption.",
				points: [
					"Use valid TLS certificates and keep certificate verification enabled in production.",
					"Do not set verify=False in Python requests outside a controlled lab; it disables certificate checking.",
					"Encryption at rest does not replace access control, backups, key management, or secure application handling.",
				],
				example: "An HTTPS request protects credentials in transit, while disk encryption can protect a stored database if the physical storage is lost or accessed improperly.",
			},
		],
	},
	"5.9": {
		intro: "Firewalls, DNS, load balancers, and reverse proxies affect how an application is reached, protected, and scaled. Understand where each component sits in the request path and which layer of traffic it evaluates.",
		sections: [
			{
				title: "Firewalls and DNS",
				body: "A stateless packet filter evaluates each packet independently; a stateful firewall tracks connections and can allow return traffic for permitted sessions. A next-generation firewall may inspect applications and users, while a Web Application Firewall examines HTTP or HTTPS requests for web attacks.",
				points: [
					"Use default deny: block traffic unless it is explicitly required.",
					"Cloud security groups and network ACLs provide cloud equivalents for controlling traffic.",
					"DNS maps names to records: A for IPv4, AAAA for IPv6, CNAME for an alias, MX for mail, TXT for text such as verification data, and NS for authoritative name servers.",
					"DNS can steer or fail over traffic between environments; a lower TTL can make record changes take effect sooner, subject to caching behavior.",
				],
				example: "A firewall rule can allow HTTPS only to a public reverse proxy, while the application port is reachable only from that proxy.",
			},
			{
				title: "Load balancers and reverse proxies",
				body: "A load balancer distributes requests across healthy servers and improves capacity and availability. Layer 4 balancing uses transport information such as IP addresses and ports; Layer 7 balancing can route using HTTP paths, headers, or cookies.",
				points: [
					"Common algorithms include round robin, least connections, weighted distribution, and IP hash.",
					"Health checks should remove failed backends from rotation.",
					"A reverse proxy sits in front of servers and can route, cache, rate-limit, filter, or terminate TLS.",
					"A forward proxy sits in front of clients; a load balancer is often implemented as a specialized reverse proxy.",
				],
				code: `upstream app_servers {
    server 10.0.0.11:5000;
    server 10.0.0.12:5000;
}
server {
    listen 443 ssl;
    server_name app.example.com;
    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
    }
}`,
				example: "A Layer 7 proxy can send /api requests to one backend pool and /images requests to another after DNS resolves the application name.",
			},
			{
				title: "Trace the application request path",
				body: "A common path is DNS resolution, firewall or WAF filtering, load-balancer selection, reverse-proxy processing, and then the application. TLS termination means the proxy decrypts HTTPS at the edge; the network between proxy and backend still needs an appropriate security design.",
				points: [
					"Check name resolution before troubleshooting application routing.",
					"Verify firewall rules and listener ports, then check backend health and proxy routing.",
					"Distinguish Layer 4 connection failures from Layer 7 path, header, or application errors.",
				],
				example: "If DNS resolves correctly but requests fail, check whether the firewall permits the listener, whether the load balancer marks a backend healthy, and whether the reverse proxy uses the expected host and path.",
			},
		],
	},
	"5.10": {
		intro: "OWASP publishes practical guidance on application security, including the OWASP Top 10 web risks. Understand common threat categories and pair each with controls in application design, coding, deployment, and monitoring; check OWASP for the current edition because names and ordering can change.",
		sections: [
			{
				title: "OWASP Top 10 threat categories",
				body: "The 2021 OWASP Top 10 groups common risks: Broken Access Control; Cryptographic Failures; Injection; Insecure Design; Security Misconfiguration; Vulnerable and Outdated Components; Identification and Authentication Failures; Software and Data Integrity Failures; Security Logging and Monitoring Failures; and Server-Side Request Forgery (SSRF).",
				points: [
					"Broken access control lets users exceed their permissions; enforce authorization on the server for every request.",
					"Injection occurs when untrusted input changes a command or query; use parameterized queries and avoid unsafe shell execution.",
					"Misconfiguration and outdated dependencies expose insecure defaults or known vulnerabilities.",
					"OWASP also publishes API security guidance; assess APIs as well as browser-facing applications.",
				],
				example: "A user interface hiding an admin button is not authorization; the server must check permission whenever the protected operation is requested.",
			},
			{
				title: "Recognize common web attacks",
				body: "SQL injection changes a database query through attacker-controlled input. Cross-site scripting (XSS) runs attacker-controlled script in another user's browser. Cross-site request forgery (CSRF) abuses a logged-in browser to send an unwanted request. Command injection causes input to be interpreted by an operating-system shell.",
				points: [
					"Use parameterized queries so input remains data rather than SQL syntax.",
					"Encode output for its context, validate input, and use a Content Security Policy as a supporting control against XSS.",
					"Use anti-CSRF tokens and SameSite cookie settings to reduce CSRF risk.",
					"Avoid shell=True for untrusted command input; pass a validated argument list to subprocess tools.",
				],
				code: `# Parameterized SQL keeps the value separate from the query
cursor.execute(
    "SELECT * FROM users WHERE name = %s",
    (name,),
)

# Prefer an argument list over building a shell command string
subprocess.run(["ping", "-c", "1", host], check=True)`,
				example: "The parameterized query treats a value such as ' OR '1'='1 as a name to search for, not as SQL logic.",
			},
			{
				title: "Build security into the delivery pipeline",
				body: "Shift left by finding vulnerabilities early, when they are generally cheaper to fix. Combine secure defaults with automated checks and operational monitoring.",
				points: [
					"Validate input, encode output, use least privilege, and protect secrets with TLS.",
					"Patch dependencies and base images; disable debug mode and default accounts in production.",
					"SAST analyzes source code, DAST tests a running application, SCA checks third-party dependencies, and image scanning checks container contents.",
					"Log security events and monitor for suspicious activity without recording secrets.",
				],
				example: "A pipeline can run SAST and dependency checks on a pull request, scan the built image, and block promotion when a required check finds a high-risk issue.",
			},
		],
	},
	"5.11": {
		intro: "Bash commands support everyday work in Linux environments used for applications, containers, and automation. Navigate directories, manage files, inspect data, combine commands with pipes and redirection, set permissions, and pass configuration through environment variables.",
		sections: [
			{
				title: "Navigate and manage files",
				body: "pwd prints the current directory; ls lists its contents; cd changes directories. An absolute path starts from /, while a relative path starts from the current directory. File commands create, copy, move, search, display, or remove data.",
				points: [
					"Use cd .. to move up one directory, cd ~ for the home directory, and cd - to return to the previous location.",
					"mkdir -p creates nested directories; touch creates an empty file; cp copies; mv renames or moves.",
					"cat, less, head, and tail -f display files or follow logs; grep searches text; find locates files by name.",
					"rm deletes without a recycle bin; carefully verify the path before using recursive removal.",
				],
				code: `pwd
ls -lah
mkdir -p backups/daily
find . -name "*.log"
grep -rin "error" .`,
				example: "Use tail -f app.log to watch new log lines while reproducing an application issue.",
			},
			{
				title: "Pipes, redirection, and permissions",
				body: "A pipe sends one command's output to another. Redirection writes output to a file; > overwrites and >> appends. File permissions use read (4), write (2), and execute (1) values for owner, group, and others.",
				points: [
					"Use 2> to redirect standard error; distinguish it from redirecting normal output.",
					"chmod +x script.sh makes a script executable; chmod 600 key.pem restricts a private key to owner read/write.",
					"644 means rw-r--r--; 755 means rwxr-xr-x. chown changes file owner and group.",
					"Quote variables such as \"$FILE\" so spaces and wildcard characters do not split or expand unexpectedly.",
				],
				code: `grep -i "error" app.log | wc -l
command > output.txt 2> errors.txt
chmod 600 key.pem`,
				example: "Use >> when preserving earlier output matters; using > on the wrong file replaces its existing contents.",
			},
			{
				title: "Environment variables and safe scripts",
				body: "Environment variables pass configuration to a process without hard-coding it in application source. export makes a variable available to child processes in the current shell; assigning a variable before one command limits it to that command.",
				points: [
					"echo $HOME reads a variable; env or printenv lists exported variables; unset removes a variable.",
					"PATH lists directories searched for commands. A shell startup file such as ~/.bashrc can set values for future interactive sessions.",
					"Use set -e only with awareness of Bash error-handling behavior, and validate required inputs explicitly.",
					"Treat rm -rf and privileged commands as hazardous; verify the exact target path before execution.",
				],
				code: `#!/bin/bash
set -e
if [ -z "$APP_ENV" ]; then
    echo "APP_ENV is not set" >&2
    exit 1
fi
backup="/tmp/backup_$(date +%F)"
mkdir -p "$backup"

# Run with a variable for this command:
APP_ENV=prod ./backup.sh`,
				example: "Python can read an injected setting with os.environ[\"APP_ENV\"], keeping deployment-specific configuration outside the script.",
			},
		],
	},
	"5.12": {
		intro: "DevOps combines culture and practices that bring development and operations together to deliver software and infrastructure changes more quickly, reliably, and safely. Teams share ownership across planning, coding, release, operations, and feedback.",
		sections: [
			{
				title: "DevOps lifecycle and core practices",
				body: "The DevOps lifecycle connects Plan, Code, Build, Test, Release, Deploy, Operate, and Monitor, with operational feedback returning to planning. Version control, automation, infrastructure as code, configuration management, containers, automated testing, monitoring, and logging make this lifecycle repeatable.",
				points: [
					"Store application code, configurations, and infrastructure definitions in Git with review and rollback history.",
					"Automate build, test, and deployment with CI/CD tools such as GitHub Actions, GitLab CI, or Jenkins.",
					"Use tools such as Terraform for infrastructure as code and Ansible, Puppet, or Chef for configuration management.",
					"Use containers and orchestration for consistent packaging and operations; use tests and monitoring for feedback.",
				],
				example: "A pipeline can test a change, build an image, deploy it to staging, run health checks, and report results to the team.",
			},
			{
				title: "Infrastructure as code, DevSecOps, and measurement",
				body: "Declarative automation describes the desired end state; imperative automation describes the steps to perform. Idempotent automation can run repeatedly and converge on the same desired result, helping prevent configuration drift. DevSecOps adds security checks throughout delivery.",
				points: [
					"Use secret scanning, dependency checks, SAST/DAST, and image scanning as appropriate to the pipeline.",
					"DORA metrics are Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service.",
					"CALMS summarizes DevOps: Culture, Automation, Lean, Measurement, and Sharing.",
					"Small, frequent changes and blameless postmortems support learning and safer recovery.",
				],
				example: "A declarative configuration says which NTP server should be present; an idempotent run can apply it again without creating duplicate or drifting settings.",
			},
			{
				title: "Apply DevOps to network automation",
				body: "NetDevOps applies these practices to network operations: store device configurations in version control, generate consistent configurations, test changes in a lab, deploy through reviewed automation, and validate results with monitoring or rollback.",
				points: [
					"Use Jinja2 templates to generate configurations and Ansible, Python libraries, or APIs such as RESTCONF and NETCONF to apply them.",
					"Test changes in Cisco Modeling Labs or another suitable lab and validate expected behavior with automated checks.",
					"Review diffs before deployment and include approval gates for high-impact changes.",
					"Keep operational feedback and incident findings in the backlog so automation improves over time.",
				],
				code: `- name: Standardize NTP on switches
  hosts: switches
  gather_facts: false
  tasks:
    - name: Set NTP server
      cisco.ios.ios_config:
        lines:
          - ntp server 192.0.2.10`,
				example: "A network change can be proposed in Git, tested in a lab, reviewed as a diff, deployed through a pipeline, and checked against the intended device state.",
			},
		],
	},
	"6.1": {
		intro: "Model-driven programmability represents device configuration and operational state as structured data instead of unstructured CLI text. YANG defines the data model, while protocols such as NETCONF, RESTCONF, and gNMI let software read or change that data.",
		sections: [
			{
				title: "From CLI scraping to structured models",
				body: "CLI scraping often depends on text formatting, regular expressions, or templates that can break when device output changes. Model-driven interfaces return fields defined by a schema, support validation, and make it easier to use consistent automation across many devices.",
				points: [
					"YANG defines the structure, types, and constraints for modeled network data.",
					"NETCONF can stage and validate changes using candidate configuration, commit, and rollback capabilities.",
					"Model-driven access supports structured parsing, reusable automation, and validation before configuration is applied.",
				],
				example: "A script that reads a named interface leaf through RESTCONF is less dependent on the display formatting of a show command than a script that scrapes CLI output.",
			},
			{
				title: "Compare NETCONF, RESTCONF, and gNMI",
				body: "NETCONF uses XML over SSH, commonly on port 830, and provides RPC operations for configuration and state. RESTCONF exposes YANG data through HTTP-style operations over HTTPS and commonly returns XML or JSON. gNMI uses gRPC over HTTP/2 and supports Get, Set, and Subscribe operations, including streaming telemetry.",
				points: [
					"YANG is the blueprint; NETCONF, RESTCONF, and gNMI are ways to communicate with modeled data.",
					"IETF models are standards-based, OpenConfig models are operator-driven and vendor-neutral, and native models are vendor-specific.",
					"Model-driven telemetry can stream updates rather than relying only on repeated polling.",
				],
				code: `YANG      -> describes data structure and rules
NETCONF   -> XML RPC over SSH (commonly port 830)
RESTCONF  -> HTTP methods over HTTPS, JSON or XML
gNMI      -> gRPC, Get / Set / Subscribe`,
				example: "Use the model and protocol supported by the device and task; check the device's advertised capabilities and documentation before building the request.",
			},
		],
	},
	"6.2": {
		intro: "Controller-level management applies intent or policy across a network through a centralized platform. Device-level management communicates with individual network devices using interfaces such as CLI, NETCONF, RESTCONF, gNMI, SNMP, or automation tools.",
		sections: [
			{
				title: "Compare management scope and abstraction",
				body: "A controller can coordinate changes across many devices and enforce network-wide policy through a northbound API. Device-level management offers detailed access to an individual device. Controllers abstract how policy is implemented; device-level tools expose more of the configuration details.",
				points: [
					"Controller northbound APIs connect applications and operators to the controller.",
					"Southbound interfaces connect the controller to network devices and may use NETCONF, CLI/SSH, SNMP, or gRPC.",
					"Controller management improves consistency but introduces a central dependency; device-level changes give control but can create configuration drift.",
				],
				example: "Catalyst Center manages campus and branch intent, ACI APIC manages a data-center fabric, Meraki Dashboard manages cloud-connected networks, and NSO orchestrates multivendor services.",
			},
			{
				title: "Choose the appropriate management level",
				body: "Use a controller for network-wide onboarding, policy, assurance, and consistent rollouts. Use device-level access for troubleshooting, lab work, smaller environments, or a feature not exposed by the controller.",
				points: [
					"Identify which system is the source of truth before making a change.",
					"A direct change to a controller-managed device can be overwritten or reported as drift by the controller.",
					"Do not assume a controller API and a device API use the same data model or authentication.",
				],
				example: "To list all devices managed by Catalyst Center, use its controller API; to inspect one device's interface data directly, use that device's supported interface such as RESTCONF.",
			},
		],
	},
	"6.3": {
		intro: "Network simulation and test tools provide a safer place to validate automation before production. Use a suitable lab to check scripts, playbooks, configurations, and expected network behavior, then combine automated code tests with network-state verification.",
		sections: [
			{
				title: "Select simulation and lab tools",
				body: "Cisco Modeling Labs (CML) runs virtual Cisco network images and offers an API. GNS3 and EVE-NG can build virtual topologies with device images. Packet Tracer is a simplified training simulator, while DevNet Sandbox provides hosted labs and Containerlab builds container-based topologies.",
				points: [
					"Choose a lab with sufficient fidelity for the feature and protocol being tested.",
					"CML, GNS3, and EVE-NG can provide high-fidelity virtual topologies; Packet Tracer is useful for learning but has limitations for automation testing.",
					"Use a sandbox when a hosted controller or real-device environment is needed and available.",
				],
				example: "A playbook that configures a platform-specific feature should be tested in a lab that supports that feature, not assumed to behave the same in a simplified simulator.",
			},
			{
				title: "Test code, APIs, and network state",
				body: "Different tests answer different questions. Lint and syntax checks validate files, unit tests check individual code functions, integration tests exercise scripts against a lab or API, and pre/post-change checks compare actual network state.",
				points: [
					"pyATS and Genie support structured device testing, parsing, snapshots, and before/after comparisons.",
					"Postman, curl, and Python requests help construct and test API calls.",
					"pytest and unittest test automation code; ansible-lint, yamllint, and Ansible check mode validate playbooks.",
					"pyang and YANG Suite help validate or explore YANG models.",
				],
				example: "Capture lab state, apply a proposed playbook, capture state again with pyATS, and review the difference before approving a production rollout.",
			},
			{
				title: "Build a safe validation sequence",
				body: "Test from low-impact checks toward realistic integration and state verification. Never make production the first environment in which new automation runs.",
				points: [
					"Run lint and unit tests before applying changes to a lab.",
					"Use dry-run options such as Ansible --check where supported, then test the actual change in simulation.",
					"Compare pre-change and post-change state and check for regressions before approval.",
				],
				example: "A network pipeline can start a CML topology, run a playbook, validate state with pyATS, and block production deployment if the result differs from expectations.",
			},
		],
	},
	"6.4": {
		intro: "A CI/CD pipeline for infrastructure stores network changes in version control and automatically checks them before deployment. Linting, testing, simulation, review, staged rollout, and monitoring make changes repeatable, auditable, and easier to reverse.",
		sections: [
			{
				title: "Infrastructure pipeline stages",
				body: "A network pipeline can start when an engineer commits templates, variables, playbooks, or infrastructure files. It checks syntax and schemas, tests code, applies changes in a virtual lab, verifies state, requires approval, and then deploys to production in a controlled way.",
				points: [
					"Common checks include yamllint, ansible-lint, schema or YANG validation, and pytest.",
					"Use CML or Containerlab to simulate changes and pyATS or Genie to compare network state.",
					"Deploy with Ansible, Terraform, or Python, and monitor health after changes.",
					"Keep credentials in a secrets manager; notify and log pipeline results for operational visibility.",
				],
				example: "A failed lint, test, or simulation stage should block promotion rather than allowing an unverified configuration into production.",
			},
			{
				title: "Components and benefits",
				body: "Git stores the source of truth and history. A CI runner executes jobs, a test or simulation environment provides a safe validation target, an automation engine applies changes, and secure credential handling supports access to devices and APIs.",
				points: [
					"Git history shows what changed, who changed it, and supports reverting to an earlier version.",
					"Automated repeated steps improve speed and consistency and catch errors before deployment.",
					"Reviews, logs, and policy checks support collaboration, auditability, and compliance.",
					"Monitoring can detect post-deployment problems and trigger an approved recovery or rollback procedure.",
				],
				code: `Commit -> Lint/Validate -> Unit Test -> Simulate
       -> Verify -> Approve -> Deploy -> Monitor`,
				example: "If a deployment fails its health check, the team can use the versioned change history to identify the change and restore the prior known-good configuration.",
			},
		],
	},
	"6.5": {
		intro: "Infrastructure as Code (IaC) defines networks, servers, and other resources in machine-readable files that can be versioned, tested, reviewed, and applied by automation tools. It makes infrastructure repeatable and provides a shared source of intended state.",
		sections: [
			{
				title: "Core IaC principles",
				body: "Good IaC is declarative where appropriate, idempotent, version-controlled, repeatable, modular, reusable, and tested. The code and data describe the intended infrastructure so environments can be built or updated consistently.",
				points: [
					"Declarative automation describes the desired end state; imperative automation specifies the steps.",
					"Idempotence means repeated runs converge on the same state without introducing additional changes when the target is already correct.",
					"Keep definitions in Git for history, review, and rollback; use a single source of truth.",
					"Use variables, templates, roles, and modules to reuse logic, and validate changes before applying them.",
				],
				example: "A declarative playbook can ensure that a VLAN exists with a required name; a repeat run should not create a duplicate VLAN.",
			},
			{
				title: "Manage drift and separate data from logic",
				body: "Configuration drift occurs when the real device differs from the intended configuration, often because of an untracked manual change. IaC tools can compare actual and desired state and correct differences; routing changes through the reviewed workflow helps prevent new drift.",
				points: [
					"Separate input data such as VLAN IDs and names from the template or task logic.",
					"Test and render templates before applying generated configuration.",
					"Immutable infrastructure, where practical, replaces resources from definitions instead of relying on undocumented manual edits.",
				],
				code: `# Data
vlans:
  - {id: 10, name: USERS}
  - {id: 20, name: VOICE}

# A template can render each VLAN from this data.`,
				example: "One template can produce configuration for multiple sites by reading different site-specific variables rather than duplicating the template.",
			},
		],
	},
	"6.6": {
		intro: "Python scripts that use Cisco APIs follow a repeatable workflow: authenticate, construct a request, send it, check the result, and parse the response. Cisco ACI, Meraki, and Catalyst Center have different authentication methods and response shapes, so consult the current platform documentation.",
		sections: [
			{
				title: "Authenticate and query Cisco platforms",
				body: "ACI APIC commonly uses a login request and session cookie; Meraki Dashboard uses an API key in a request header; Catalyst Center obtains a token through its authentication endpoint and sends that token in an X-Auth-Token header for later API calls.",
				points: [
					"ACI responses commonly place managed objects in the imdata array.",
					"Meraki organization endpoints return JSON objects such as organization IDs and names.",
					"Catalyst Center device inventory results are commonly contained in a response field.",
					"Verify the current endpoint paths, fields, and authentication details in official platform references.",
				],
				example: "A Meraki inventory script can request organizations, check for a successful HTTP response, then print each returned organization's ID and name.",
			},
			{
				title: "Build safe API scripts with requests",
				body: "Use requests to send the documented method, URL, headers, and JSON body. Set timeouts, call raise_for_status or otherwise handle errors explicitly, and parse the response only after checking the request succeeded.",
				points: [
					"Load credentials from environment variables or a secrets manager rather than hard-coding them.",
					"Keep TLS certificate verification enabled in production; disabling verification is appropriate only in a controlled lab.",
					"Handle pagination and service rate limits, including HTTP 429 responses.",
					"Use an official SDK when it fits the task and is supported.",
				],
				code: `import os
import requests

base = "https://api.meraki.com/api/v1"
headers = {
    "X-Cisco-Meraki-API-Key": os.environ["MERAKI_API_KEY"],
    "Accept": "application/json",
}
response = requests.get(
    f"{base}/organizations",
    headers=headers,
    timeout=10,
)
response.raise_for_status()
for organization in response.json():
    print(organization["id"], organization["name"])`,
				example: "Never disable certificate verification in production: doing so prevents the client from properly validating the server's TLS identity.",
			},
			{
				title: "Follow the API request lifecycle",
				body: "Authenticate first, construct the correct request, send it with a timeout, verify the HTTP result, parse the documented response structure, and use only validated fields. Different Cisco APIs can use different wrappers and credentials even when the goal is similar.",
				points: [
					"Use GET to retrieve data; POST to create or start operations; PUT or PATCH to update; DELETE to remove, according to the API documentation.",
					"Add error handling, pagination, and rate-limit backoff for production automation.",
					"Test read-only queries before enabling configuration-changing requests.",
				],
				example: "Catalyst Center automation should obtain its token, use it in the documented header on the inventory call, and confirm the response contains the expected device data before iterating.",
			},
		],
	},
	"6.7": {
		intro: "Ansible playbooks describe tasks to run on groups of hosts or network devices. Inventory defines where automation runs, plays select the targets, tasks call modules to perform work, and handlers can react to changes.",
		sections: [
			{
				title: "Understand Ansible structure",
				body: "Ansible is agentless: a control node runs the playbook against an inventory. A play maps hosts to tasks; each task calls a module. Variables and gathered facts provide data, while reusable roles group tasks, templates, and variables.",
				points: [
					"Inventory says where; the playbook says what; modules do the work.",
					"Common host modules include package, user, service, and template.",
					"Network automation can use modules such as cisco.ios.ios_config and cisco.ios.ios_facts.",
					"Handlers run when notified by a changed task, commonly to restart a service.",
				],
				example: "A play targeting the webservers group can install nginx, create a deployment user, and ensure the nginx service is enabled and started.",
			},
			{
				title: "Manage hosts and network devices",
				body: "Use state-oriented module parameters to describe what should exist. For network devices, define the network operating system and connection method in inventory, then use the platform module to apply configuration.",
				points: [
					"package with state: present ensures a package is installed; user manages accounts; service manages current and boot-time service state.",
					"state: started starts a service; enabled: true configures it to start at boot.",
					"Use --check for a dry run and --diff to display proposed changes where supported.",
					"Store sensitive values in Ansible Vault or an external secrets manager, not in plain-text inventory.",
				],
				code: `- name: Configure an IOS XE interface
  hosts: switches
  gather_facts: false
  tasks:
    - name: Set interface description
      cisco.ios.ios_config:
        parents: interface GigabitEthernet1/0/5
        lines:
          - description Access port`,
				example: "Use the inventory to target the intended switch group, preview changes where possible, then validate the resulting device state.",
			},
			{
				title: "Write repeatable playbooks",
				body: "Ansible modules generally aim for idempotent behavior: applying the same desired state repeatedly should not produce unnecessary changes. YAML structure and indentation matter, so validate playbooks before execution.",
				points: [
					"Tasks begin with a dash and use spaces rather than tabs.",
					"Use check mode and diffs to review changes, but remember that support varies by module.",
					"Keep the task scope narrow and verify that inventory targets only the intended devices.",
				],
				example: "A playbook should set the desired NTP server state, not append the same CLI line blindly on every run.",
			},
		],
	},
	"6.8": {
		intro: "Bash scripts automate repetitive system and network tasks using variables, conditions, loops, functions, and exit codes. Use Bash for focused glue tasks, quote variable expansions, validate inputs, and move complex workflows to Python or Ansible.",
		sections: [
			{
				title: "Script basics and control flow",
				body: "The shebang #!/bin/bash selects Bash as the interpreter. Make a script executable with chmod +x and run it using ./script.sh. Variables use VAR=value without spaces around the equals sign; positional parameters such as $1 and $@ contain script arguments.",
				points: [
					"$? contains the previous command's exit code; zero conventionally means success.",
					"Use if/else for conditions, for and while for loops, and functions to reuse a sequence of commands.",
					"Command substitution $(command) captures output; set -e requests that the script stop on many command failures.",
					"Use spaces inside test brackets, for example [ -z \"$TOKEN\" ].",
				],
				code: `#!/bin/bash
for host in router1 router2 router3; do
    if ping -c 1 -W 1 "$host" > /dev/null; then
        echo "$host is UP"
    else
        echo "$host is DOWN"
    fi
done`,
				example: "A loop can check a list of devices and report reachability without repeating the same command manually.",
			},
			{
				title: "Check errors and protect credentials",
				body: "Scripts should validate required inputs and report failures clearly. Read tokens from a protected environment or secret source rather than embedding them in the script, and send diagnostics to standard error when appropriate.",
				points: [
					"Quote variable references such as \"$HOST\" to handle spaces and prevent unintended splitting or expansion.",
					"Check HTTP status codes and command exit codes before treating a task as successful.",
					"Use set -e carefully and consider nounset checks; handle expected failures explicitly.",
					"Use SSH keys or a secrets manager for credentials and avoid printing tokens in logs.",
				],
				code: `#!/bin/bash
set -e
: "\${TOKEN:?TOKEN is not set}"
status=$(curl -s -o response.json -w "%{http_code}" \\
    -H "X-Auth-Token: $TOKEN" \\
    "https://controller.example.invalid/api/devices")
if [ "$status" -eq 200 ]; then
    jq -r '.response[].hostname' response.json
else
    echo "Request failed with HTTP $status" >&2
    exit 1
fi`,
				example: "A non-200 API response must be reported as a failure rather than silently producing an empty device list.",
			},
			{
				title: "Automate repeatable tasks",
				body: "Loops can process hosts from a file, collect configuration backups, or run simple checks. Ensure files and output paths are explicit and quote variables in redirections and command arguments.",
				points: [
					"Use while read -r to read lines without interpreting backslashes.",
					"Create destination directories before writing output and check that each command succeeds.",
					"Keep scripts small; use Ansible for declarative multi-device configuration and Python for complex data or API handling.",
				],
				code: `destination="backup_$(date +%F)"
mkdir -p "$destination"
while read -r host; do
    ssh "admin@$host" "show running-config" > "$destination/$host.cfg"
done < hosts.txt`,
				example: "A backup script should report which host failed and preserve a nonzero exit status if a configuration could not be collected.",
			},
		],
	},
	"6.9": {
		intro: "RESTCONF and NETCONF expose YANG-modeled data through different request and response patterns. Interpret the protocol, transport, media type, status or RPC result, and returned data tree instead of relying on the transport connection alone.",
		sections: [
			{
				title: "Compare RESTCONF and NETCONF responses",
				body: "RESTCONF uses HTTPS and returns JSON or XML through HTTP requests such as GET, POST, PUT, PATCH, and DELETE. NETCONF uses SSH, commonly port 830, and exchanges XML RPC messages such as get, get-config, edit-config, commit, and lock.",
				points: [
					"RESTCONF paths identify YANG data nodes; Accept and Content-Type headers select the representation.",
					"NETCONF requests and replies carry a message-id so the client can match the response to the request.",
					"get-config retrieves configuration; get can include configuration and operational data.",
					"A NETCONF error is represented by rpc-error; a successful operation can return ok.",
				],
				example: "A RESTCONF Accept header of application/yang-data+json requests JSON-formatted YANG data when the device supports it.",
			},
			{
				title: "Read status codes and modeled data",
				body: "HTTP status codes summarize RESTCONF outcomes. A 200 response commonly returns data, 201 indicates a resource was created, and 204 indicates success without a response body. Client errors such as 400, 401, 404, or 409 indicate malformed input, authentication failure, missing data, or a conflict.",
				points: [
					"Read a response from the model prefix to its container, list, and leaf values.",
					"Validate the expected content type and data keys before processing a JSON body.",
					"Do not attempt to parse a JSON response body for a successful 204 No Content response.",
				],
				code: `GET /restconf/data/ietf-interfaces:interfaces
Accept: application/yang-data+json

200 OK
{
  "ietf-interfaces:interfaces": {
    "interface": [
      {"name": "GigabitEthernet1", "enabled": true}
    ]
  }
}`,
				example: "The interface list contains entries; each entry has leaves such as name and enabled, which a client can read by their documented names.",
			},
			{
				title: "Parse and troubleshoot query results",
				body: "Use the API response code and body together to determine whether a query worked. With Python requests, check the response status before traversing nested JSON fields. With NETCONF, inspect rpc-reply and look for data or rpc-error.",
				points: [
					"RESTCONF commonly uses 200 for a successful GET, 201 for creation, and 204 for successful updates or deletion without content.",
					"NETCONF uses XML rpc-reply; a matching message-id correlates the reply, and rpc-error signals failure.",
					"Confirm that the URL or filter selects the intended YANG node and that the client requests a supported media type.",
				],
				example: "A 404 can mean the resource path or model node is wrong; a 401 points to credentials; an empty successful result may mean the filter or requested data is not present.",
			},
		],
	},
	"6.10": {
		intro: "YANG is a data modeling language for network configuration, operational state, RPCs, and notifications. A YANG model is a tree that specifies node structure, types, keys, and constraints so clients can construct valid data for NETCONF or RESTCONF.",
		sections: [
			{
				title: "Recognize common YANG nodes",
				body: "A module has a name, namespace, and prefix. Containers group related nodes; lists represent repeated entries and use keys to identify them; leaves hold single typed values; and leaf-lists hold multiple simple values.",
				points: [
					"typedef defines a reusable type; grouping and uses define and reuse node blocks; import references another module.",
					"rpc and action describe operations; notification describes events.",
					"config true indicates configurable data; config false indicates read-only operational state.",
					"Common types include string, boolean, integer types, enumeration, union, and leafref.",
				],
				example: "A list of interfaces can use the interface name as its key, while each entry contains leaves such as enabled, mtu, and operational status.",
			},
			{
				title: "Map YANG models to XML and JSON",
				body: "A YANG tree maps to hierarchical XML or JSON. A module prefix can qualify a top-level data node in RESTCONF JSON; list entries appear as repeated objects, while leaf types determine whether values are strings, booleans, or numbers.",
				points: [
					"A container groups related nodes but does not itself hold a scalar value.",
					"A list can contain multiple entries; key leaves uniquely identify each entry.",
					"A leaf stores one value constrained by its declared type and any range or enumeration.",
					"Invalid values can be rejected before they are applied to the device.",
				],
				code: `container interfaces {
  list interface {
    key "name";
    leaf name { type string; }
    leaf enabled { type boolean; }
    leaf mtu { type uint16 { range "68..9000"; } }
    leaf oper-status {
      config false;
      type enumeration { enum up; enum down; }
    }
  }
}`,
				example: "If mtu has a range of 68 through 9000, a request setting it to 10 violates the model constraint and should be rejected.",
			},
			{
				title: "Find and validate models",
				body: "Models may be IETF standards, OpenConfig models, or vendor-native models. Tools such as pyang can validate a YANG file and display its tree; YANG Suite and YANG Explorer help browse models and build requests.",
				points: [
					"IETF models include common interface and IP schemas.",
					"OpenConfig aims for operator-driven, vendor-neutral models.",
					"Native models expose vendor-specific capabilities, such as Cisco IOS XE native data.",
					"Confirm which model and revision a device supports before constructing a request.",
				],
				example: "Use pyang -f tree module.yang to inspect a model's hierarchy and identify the correct container, list key, leaf, and read/write behavior.",
			},
		],
	},
	"6.11": {
		intro: "A unified diff displays how a file changed between two versions. It marks removed lines, added lines, and unchanged context, while hunk headers identify the affected line ranges in each version.",
		sections: [
			{
				title: "Read diff headers and hunk markers",
				body: "The --- header names the old file and the +++ header names the new file. A hunk header such as @@ -10,6 +10,7 @@ indicates that the displayed change covers six lines beginning at line 10 in the old file and seven lines beginning at line 10 in the new file.",
				points: [
					"A line beginning with a space is unchanged context.",
					"A line beginning with - was removed from the old version.",
					"A line beginning with + was added in the new version.",
					"Indentation after the diff marker belongs to the file content, not the marker.",
				],
				code: `--- a/r1.cfg
+++ b/r1.cfg
@@ -10,6 +10,7 @@
  interface GigabitEthernet1
- description UPLINK
+ description WAN-LINK
+ ip mtu 1500
  ip address 192.0.2.1 255.255.255.0`,
				example: "The example changes the interface description and adds an MTU line; the surrounding space-prefixed lines are unchanged context.",
			},
			{
				title: "Generate and use unified diffs",
				body: "Unified diffs are produced by tools such as diff -u and git diff, appear in pull requests, and can be applied with patch. In network automation, compare intended and running configurations or pre-change and post-change state.",
				points: [
					"git diff shows unstaged changes; git diff --staged shows staged changes.",
					"git diff main..feature compares branch contents; Ansible --diff can display proposed host changes where supported.",
					"Use a diff to focus review on exact additions and removals and to identify configuration drift.",
					"Review both additions and deletions; removing a line can change behavior just as much as adding one.",
				],
				example: "Before approval, verify that the diff contains only the intended interface change and does not remove unrelated network configuration.",
			},
		],
	},
	"6.12": {
		intro: "Code review is a human check of a proposed change before it is merged. For network automation, review scripts, playbooks, templates, and configuration data so that changes are understandable, tested, and safe before reaching production.",
		sections: [
			{
				title: "Follow a review workflow",
				body: "A typical workflow creates a feature branch, makes focused commits, pushes the branch, and opens a pull request or merge request. Automated checks run, a reviewer examines the diff and tests, the author addresses feedback, and an approved change is merged.",
				points: [
					"Describe what changed, why it is needed, how it was tested, and how to recover or roll back.",
					"Run lint, tests, and simulation automatically where appropriate.",
					"Protect the main branch with required checks and at least one approval.",
					"The author should not approve their own change.",
				],
				example: "A small pull request that changes one NTP template and its variables is easier to review and roll back than a single large change mixing unrelated tasks.",
			},
			{
				title: "Use constructive principles and checklists",
				body: "Review the change, not the person. Keep changes small, make feedback respectful and specific, and automate routine formatting checks so human reviewers can focus on logic, security, and operational risk.",
				points: [
					"Check that the change does what its description promises and no more.",
					"Look for hard-coded secrets, unintended targets, missing error handling, and unsafe assumptions.",
					"Confirm idempotence, test or simulation evidence, and a rollback or recovery plan.",
					"Use review to share knowledge, improve consistency, and maintain an audit trail of approvals and rationale.",
				],
				example: "For a network change, review the unified diff and simulation results, verify the target inventory and idempotence, and confirm how the change can be reversed.",
			},
		],
	},
	"6.13": {
		intro: "A sequence diagram shows how participants exchange messages over time. Participants are arranged across the top, lifelines run vertically, and messages flow from top to bottom so a reader can follow an API workflow in order.",
		sections: [
			{
				title: "Read sequence diagram elements",
				body: "Participants may be users, scripts, controllers, APIs, or devices. A solid arrow commonly represents a request or synchronous call; a dashed arrow represents a response. Activation bars show processing, and notes attach explanations to a message.",
				points: [
					"Time flows top to bottom; left-to-right placement shows participants, not chronology.",
					"An alt fragment shows alternative paths such as success and error; opt indicates an optional step; loop shows repeated steps.",
					"Label API calls with method and path, relevant authentication or headers, and response status or key data.",
				],
				example: "A controller API diagram can show a script obtaining a token, requesting inventory, the controller querying a switch, and the controller returning a device list.",
			},
			{
				title: "Represent API calls, errors, and retries",
				body: "Show authentication before protected data requests, and include important success and failure responses. A loop can represent repeated requests for multiple devices; an alternative fragment can distinguish a successful response from a rate limit or authentication error.",
				points: [
					"Include method and path, such as GET /network-device, on the request arrow.",
					"Show a response such as 200 OK plus device data or 429 Too Many Requests.",
					"Use an alt branch to show handling for 401, 404, or 429; retries should respect the service's backoff guidance.",
					"PlantUML and Mermaid use text definitions that can be stored and reviewed in Git.",
				],
				code: `@startuml
actor Engineer
participant Script
participant API
Engineer -> Script : run
Script -> API : POST /login
API --> Script : 200 + token
loop for each device
  Script -> API : GET /devices/{id}
  alt status 200
    API --> Script : device data
  else status 429
    API --> Script : Too Many Requests
    Script -> Script : wait and retry
  end
end
Script --> Engineer : report
@enduml`,
				example: "A diagram lets a reviewer see that the script authenticates first, sends a token with subsequent requests, handles throttling, and reports results to the caller.",
			},
		],
	},
	"7.1": {
		intro: "MAC addresses identify interfaces at Layer 2 on a local network segment. Switches learn source MAC addresses and forward frames within VLANs; VLANs divide a physical switched network into separate logical broadcast domains.",
		sections: [
			{
				title: "MAC addresses and switch forwarding",
				body: "A MAC address is a 48-bit Layer 2 address, commonly written as six hexadecimal octets. Its first 24 bits are the Organizationally Unique Identifier (OUI), associated with the manufacturer; the remaining bits identify the interface. Addresses may be unicast, broadcast, or multicast.",
				points: [
					"A switch learns the source MAC address and ingress port from each received frame.",
					"When the destination MAC is known, the switch forwards the frame to the associated port; unknown unicast and broadcast traffic is flooded within the VLAN, except out the incoming port.",
					"MAC table entries age out when they have not been refreshed.",
					"ARP maps an IPv4 address to a MAC address on the local segment.",
				],
				example: "When a host needs to send to a local IPv4 neighbor, it uses ARP to learn that neighbor's MAC address before sending an Ethernet frame.",
			},
			{
				title: "VLANs, access ports, and trunks",
				body: "A VLAN creates a separate Layer 2 broadcast domain. Devices in different VLANs need a Layer 3 router or switch to communicate. Access ports carry one VLAN, usually untagged, while trunk ports carry multiple VLANs using IEEE 802.1Q tags.",
				points: [
					"VLANs help reduce broadcast scope, separate user or service groups, and simplify logical network management.",
					"An 802.1Q trunk tag identifies the VLAN for a frame; the native VLAN is sent untagged on a trunk.",
					"Inter-VLAN routing can use router subinterfaces or switched virtual interfaces (SVIs) on a Layer 3 switch.",
					"MAC addresses are local Layer 2 identifiers; IP addresses provide Layer 3 addressing between networks.",
				],
				code: `vlan 10
 name USERS
vlan 20
 name VOICE
interface GigabitEthernet1/0/5
 switchport mode access
 switchport access vlan 10
interface GigabitEthernet1/0/48
 switchport mode trunk
 switchport trunk allowed vlan 10,20`,
				example: "Use an access port for an end-user device in VLAN 10 and a trunk between switches when both VLAN 10 and VLAN 20 must cross the link.",
			},
		],
	},
	"7.2": {
		intro: "IP addresses identify Layer 3 interfaces. A subnet mask or prefix divides an address into network and host portions; routers use routing tables to select a next hop, while hosts send off-subnet traffic to a default gateway.",
		sections: [
			{
				title: "IPv4, IPv6, and subnet prefixes",
				body: "IPv4 addresses are 32 bits, written as four decimal octets; IPv6 addresses are 128 bits, written in hexadecimal groups. A prefix length indicates how many leading bits identify the network. IPv4 private ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16; IPv4 loopback is 127.0.0.1. IPv6 link-local addresses use fe80::/10.",
				points: [
					"IPv4 supports broadcast; IPv6 uses multicast instead.",
					"For a conventional IPv4 subnet, usable host count is 2^(host bits) minus the network and broadcast addresses.",
					"A /24 has mask 255.255.255.0; a /26 has mask 255.255.255.192.",
					"Use the Python ipaddress module to calculate network, broadcast, and host information reliably.",
				],
				code: `import ipaddress

interface = ipaddress.ip_interface("192.168.10.77/26")
network = interface.network
print(network)                 # 192.168.10.64/26
print(network.netmask)         # 255.255.255.192
print(network.broadcast_address)  # 192.168.10.127`,
				example: "For 192.168.10.77/26, the network is 192.168.10.64, the broadcast address is 192.168.10.127, and the usable host range is .65 through .126.",
			},
			{
				title: "Routing tables and the default gateway",
				body: "A routing table maps destination prefixes to next hops and exit interfaces. Routers select the longest matching prefix. Routes can be directly connected, statically configured, or learned dynamically through protocols such as OSPF, EIGRP, or BGP.",
				points: [
					"A default route 0.0.0.0/0 is used when no more-specific IPv4 route matches.",
					"A host sends traffic directly to a destination in its own subnet, resolving the destination MAC with ARP.",
					"For an off-subnet destination, a host sends the packet to its configured default gateway.",
					"A missing or incorrect gateway can allow local communication while preventing remote communication.",
				],
				example: "A route for 10.0.3.0/24 is preferred over a matching 10.0.0.0/8 route because /24 is the longer, more-specific prefix.",
			},
		],
	},
	"7.3": {
		intro: "Networking components perform distinct functions at different layers. Knowing what a switch, router, firewall, load balancer, access point, controller, or proxy does helps trace application traffic and identify where a problem occurs.",
		sections: [
			{
				title: "Core network components",
				body: "A network interface card connects a host to the network. Layer 2 switches forward frames using MAC addresses, Layer 3 switches and routers forward packets using IP routes, and firewalls enforce traffic policy. Load balancers distribute requests among servers.",
				points: [
					"Wireless access points connect wireless clients to a wired network; a wireless LAN controller manages multiple access points.",
					"Proxies act as intermediaries for requests; IDS detects suspicious activity and IPS can detect and block it.",
					"Network controllers such as Catalyst Center, ACI APIC, and Meraki Dashboard provide centralized management.",
					"Servers, NAS/SAN storage, VPN gateways, cabling, and transceivers support application and network services.",
				],
				example: "A web request may pass from a laptop through an access switch, a Layer 3 switch or router, a firewall, a load balancer, and then one of several web servers.",
			},
			{
				title: "Distinguish switching, routing, and filtering",
				body: "A switch connects devices within a network and forwards frames by MAC address. A router connects networks and forwards packets according to IP routes. A firewall permits or blocks flows using rules and may inspect sessions, ports, applications, or users.",
				points: [
					"A Layer 3 switch can also route between VLANs.",
					"A load balancer selects a healthy server for an incoming request.",
					"A hub repeats signals to every port and is obsolete in modern switched LANs.",
					"Components may operate across multiple OSI layers; use the function and traffic information to understand their role.",
				],
				example: "If clients reach the load balancer but not the application, check whether the firewall allows the backend flow and whether the load balancer has healthy servers.",
			},
		],
	},
	"7.4": {
		intro: "A network topology diagram shows which devices exist and how they connect. Physical diagrams emphasize cables, ports, racks, and locations; logical diagrams emphasize IP subnets, VLANs, and traffic flows.",
		sections: [
			{
				title: "Read topology symbols and labels",
				body: "A useful diagram identifies routers, switches, firewalls, load balancers, servers, links, and external networks. Labels can include hostnames, interfaces, IP addresses, VLANs, security zones, service ports, and link speeds.",
				points: [
					"Show a router's hostname and relevant interface or address, a switch's role and VLANs, and firewall trust zones.",
					"Label a load balancer's virtual IP and backend pool; label server names, addresses, services, and ports.",
					"Use a legend and include a title, date, and version.",
					"Show traffic direction and trust boundaries such as outside, DMZ, and inside.",
				],
				example: "A web topology may show clients reaching a load-balancer VIP on TCP 443, which forwards requests to web servers on TCP 8080.",
			},
			{
				title: "Recognize common topology patterns",
				body: "A star connects endpoints to a central switch; full mesh connects every device to every other device; partial mesh adds selected redundant links. Hub-and-spoke connects branches to a central site, while a campus three-tier design uses access, distribution, and core layers.",
				points: [
					"Spine-leaf is common in data centers; each leaf connects to each spine.",
					"Full mesh offers many paths but increases link and management costs.",
					"Choose a logical or physical view according to the planning or troubleshooting question.",
				],
				code: `Internet
   |
Router -- Firewall -- Load balancer (VIP :443)
                         |             |
                     Web1 :8080    Web2 :8080
                         |
                      DB :5432`,
				example: "A diagram with interface names, subnets, VLANs, and ports makes it easier to verify the expected path and create narrowly scoped firewall rules.",
			},
		],
	},
	"7.5": {
		intro: "A network device separates work into management, control, and data planes. The management plane configures and monitors the device, the control plane builds forwarding decisions, and the data plane forwards user traffic.",
		sections: [
			{
				title: "Understand the three planes",
				body: "The data or forwarding plane receives packets, looks up forwarding information, and sends traffic onward. The control plane runs protocols and builds routing information. The management plane provides administrative access, configuration, and monitoring.",
				points: [
					"Data plane examples include forwarding table lookups, ACL filtering, NAT, and QoS.",
					"Control plane examples include OSPF, BGP, EIGRP, STP, and routing-table construction.",
					"Management plane examples include SSH, HTTPS, NETCONF, RESTCONF, SNMP, syslog, AAA, and CLI.",
					"Traffic passing through a router is data-plane traffic; OSPF messages to the router are control-plane traffic; SSH administration is management-plane traffic.",
				],
				example: "An OSPF process builds the routing information and programs the forwarding table; the data plane then uses that table to forward packets efficiently.",
			},
			{
				title: "Connect RIB, FIB, and SDN",
				body: "The control plane builds the Routing Information Base (RIB) and programs the Forwarding Information Base (FIB). The data plane uses the FIB to forward packets. Software-defined networking separates control from forwarding and can use a controller to program devices.",
				points: [
					"Management configures routing protocols; the control plane exchanges routes and builds the RIB.",
					"The FIB contains forwarding information used by the data plane.",
					"Network automation commonly reaches a controller through its northbound API; a controller may program devices through southbound interfaces.",
					"Protect management access with secure protocols, strong authentication, access controls, and an appropriate management network.",
				],
				example: "If routing neighbors and the RIB are healthy but packets are not forwarded, inspect the forwarding state and data-plane policy separately.",
			},
		],
	},
	"7.6": {
		intro: "DHCP, DNS, NAT, SNMP, and NTP are common IP services. Understand what each service does, how clients and servers interact, and which transport or port values matter when troubleshooting.",
		sections: [
			{
				title: "Addressing and name services",
				body: "DHCP assigns addresses and related settings such as masks, gateways, and DNS servers. Its DORA exchange is Discover, Offer, Request, Acknowledge; a lease lasts for a configured period. A DHCP relay can forward client broadcasts to a server on another subnet.",
				points: [
					"DHCP uses UDP 67 on the server side and UDP 68 on the client side.",
					"DNS resolves names to addresses and uses both UDP and TCP port 53.",
					"DNS records include A/AAAA for IPv4/IPv6, CNAME for aliases, PTR for reverse lookup, MX for mail, and NS for authoritative name servers.",
					"Check DHCP scope, relay, and DNS resolver settings when clients receive incomplete or incorrect network configuration.",
				],
				example: "A DHCP relay such as ip helper-address forwards a client request to a DHCP server located on another subnet.",
			},
			{
				title: "NAT, SNMP, and NTP",
				body: "NAT translates address information, commonly between private and public networks. SNMP supports device monitoring and management. NTP synchronizes clocks so logs and security processes use consistent time.",
				points: [
					"Static NAT maps one private address to one fixed public address; dynamic NAT uses a pool; PAT lets many private hosts share one public address using port numbers.",
					"SNMP uses UDP 161 for queries and 162 for traps; a MIB organizes variables and an OID identifies a specific variable.",
					"SNMPv1 and v2c community strings are not encrypted; prefer SNMPv3 with authentication and privacy where supported.",
					"NTP uses UDP 123. Stratum indicates distance from a reference clock; stratum 0 is the reference source and each hop increases the stratum.",
				],
				example: "Accurate NTP helps correlate logs across devices and supports time-sensitive systems such as certificates and Kerberos.",
			},
		],
	},
	"7.7": {
		intro: "Port numbers identify application services carried over TCP or UDP. Knowing common ports helps configure filters and troubleshoot connectivity, but some protocols use IP protocol numbers rather than TCP or UDP ports.",
		sections: [
			{
				title: "Port ranges and common services",
				body: "Well-known ports range from 0 to 1023; registered ports range from 1024 to 49151; dynamic or ephemeral ports range from 49152 to 65535. A socket combines an IP address and a port. TCP is connection-oriented and reliable; UDP is connectionless and has lower overhead.",
				points: [
					"SSH/SCP/SFTP use TCP 22; Telnet uses TCP 23 and is unencrypted.",
					"DNS uses port 53 over UDP or TCP; DHCP uses UDP 67/68; TFTP uses UDP 69.",
					"HTTP uses TCP 80; HTTPS and common REST APIs use TCP 443.",
					"NTP uses UDP 123; SNMP uses UDP 161 for polling and 162 for traps.",
				],
				example: "A connection to a service can be written as 10.0.10.100:443, meaning TCP or UDP traffic addressed to port 443 on that host, with the actual transport determined by the application.",
			},
			{
				title: "Ports used by network and automation protocols",
				body: "Network and application services use a mixture of well-known ports and portless IP protocols. Verify both protocol and transport when reviewing an access rule.",
				points: [
					"BGP uses TCP 179; LDAP/LDAPS use TCP 389/636; syslog commonly uses UDP 514.",
					"NETCONF over SSH uses TCP 830; RDP uses TCP 3389.",
					"ICMP (including ping) and OSPF are IP protocols, not TCP/UDP ports; IPsec ESP and AH are also IP protocols.",
					"Common secure/insecure pairs include HTTPS 443 vs HTTP 80, SSH 22 vs Telnet 23, and LDAPS 636 vs LDAP 389.",
				],
				code: `# Show listening sockets
ss -tulpn

# Test a TCP service
nc -zv 10.0.10.100 443

# Python TCP connection test
import socket
with socket.create_connection(("10.0.10.100", 443), timeout=3):
    print("TCP port is reachable")`,
				example: "If a RESTCONF request cannot connect, verify that TCP 443 is permitted to the device and that the service is listening.",
			},
		],
	},
	"7.8": {
		intro: "Application connectivity failures can result from NAT, blocked transport ports, proxy settings, VPN routes, DNS, or gateway problems. Troubleshoot systematically from the observed symptom, test one layer at a time, and confirm the fix.",
		sections: [
			{
				title: "Use symptoms to narrow the cause",
				body: "Start by defining what fails, for whom, when it began, and what changed. Work bottom-up from physical and link connectivity through IP, transport, and application, or divide the path into smaller segments.",
				points: [
					"Connection refused usually means the host responded but no service is listening or a rule rejected the connection.",
					"Connection timed out usually means packets were dropped, a route is missing, or the host did not respond.",
					"Could not resolve host points to DNS; no route to host points to routing or gateway; certificate verification failure points to TLS trust or proxy inspection.",
					"Test one hypothesis at a time, record results, verify recovery, and document the change.",
				],
				example: "If an IP address works but its hostname does not, investigate resolver settings and DNS records before changing application configuration.",
			},
			{
				title: "Troubleshoot NAT, ports, proxy, and VPN",
				body: "NAT failures can result from missing static translation, incorrect inside/outside interfaces, exhausted pools, ACL mismatches, or asymmetric return paths. A blocked port may allow ping while the application times out. Proxy problems often affect scripts and browsers differently; VPN problems may involve routes, address overlap, MTU, DNS, or blocked tunnel protocols.",
				points: [
					"Check NAT translations and ACL counters; verify the return path and public mapping for published services.",
					"Check firewall rules, cloud security groups, host firewalls, and whether the service is listening on the expected port.",
					"Review HTTP_PROXY, HTTPS_PROXY, NO_PROXY, proxy credentials, allow lists, and TLS inspection certificates.",
					"For a VPN, check tunnel state, split/full-tunnel routes, overlapping subnets, MTU/fragmentation, DNS, IKE UDP 500/4500, and ESP.",
				],
				example: "If ping works but an API request to TCP 443 times out, check the firewall or ACL for that transport port and confirm the API service is listening.",
			},
			{
				title: "Choose diagnostic tools",
				body: "Use multiple tools to compare name resolution, reachability, route path, port state, and packet behavior. ICMP may be blocked even when an application works, so interpret ping results in context.",
				points: [
					"ping measures basic reachability and round-trip time; traceroute or mtr helps locate where a path changes or stops.",
					"nslookup or dig checks DNS; nc -zv tests a TCP port; curl -v shows HTTP(S) request details.",
					"ss -tulpn or netstat shows listening sockets; device commands such as show ip nat translations and show access-lists help inspect NAT and ACL state.",
					"tcpdump or Wireshark can reveal what packets were sent and received.",
				],
				example: "A hostname lookup failure followed by a successful test to the resolved IP identifies name resolution as a likely cause before port or application troubleshooting.",
			},
		],
	},
	"7.9": {
		intro: "Network constraints affect application speed, quality, and reliability. Bandwidth, throughput, latency, jitter, packet loss, MTU, and congestion impact different workloads, so application design and network controls should match the workload.",
		sections: [
			{
				title: "Understand performance constraints",
				body: "Bandwidth is a link's maximum data rate; throughput is the rate actually achieved. Latency is the time for data to travel, jitter is variation in delay, and packet loss is data dropped in transit. MTU is the largest packet a link can carry; congestion occurs when demand exceeds capacity.",
				points: [
					"Latency slows interactive sessions and chatty APIs; packet loss causes retransmissions and can reduce TCP throughput.",
					"Jitter, loss, and delay affect voice and video quality; bandwidth limits large transfers and video streams.",
					"MTU mismatches can cause fragmentation or drops, especially over VPNs and tunnels.",
					"Congestion increases queueing delay and loss; throughput is typically lower than nominal bandwidth because of overhead and conditions.",
				],
				example: "One hundred sequential API requests with 80 ms round-trip time can spend about eight seconds waiting; batching the same information into one request can greatly reduce latency cost.",
			},
			{
				title: "Match constraints to application types",
				body: "Voice is sensitive to delay, jitter, and loss; interactive SSH or RDP needs low latency; bulk backups need capacity; REST APIs and web applications are often sensitive to latency and repeated round trips. Synchronous database replication needs both adequate bandwidth and low latency.",
				points: [
					"Use QoS to classify and prioritize voice or critical traffic and limit bulk traffic where appropriate.",
					"Reduce application round trips with batching, pagination, caching, and HTTP keep-alive.",
					"Use CDNs, regional deployment, or edge processing to move content or computation closer to users.",
					"Compress payloads and request only required fields; set tunnel MTU/MSS correctly.",
				],
				example: "A chatty API over a high-latency WAN should batch requests and cache stable data instead of fetching each field with a separate round trip.",
			},
			{
				title: "Measure and handle network conditions",
				body: "Measure actual behavior rather than assuming a network constraint. Use appropriate monitoring and graceful failure handling so temporary loss or service limits do not produce cascading failures.",
				points: [
					"ping measures round-trip latency and loss; traceroute or mtr helps locate path delays; iperf3 measures achievable throughput.",
					"Telemetry and SNMP can show interface utilization, errors, and drops over time.",
					"Use timeouts and bounded retries with exponential backoff; make retryable operations idempotent where possible.",
					"Respect API rate limits and Retry-After guidance; HTTP 429 indicates that the client should slow down.",
				],
				code: `delay = 1
for attempt in range(4):
    response = requests.get(url, timeout=5)
    if response.status_code == 429:
        time.sleep(int(response.headers.get("Retry-After", delay)))
    else:
        response.raise_for_status()
        return response.json()
    delay *= 2`,
				example: "Exponential backoff waits progressively longer between retries, reducing additional load on a service that is already rate-limiting or unavailable.",
			},
		],
	},
};
