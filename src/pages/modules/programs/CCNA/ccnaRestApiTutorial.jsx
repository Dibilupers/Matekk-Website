import CcnaLessonImage from "./ccnaLessonImage";

const imageBase = "https://www.9tut.com/images/ccna_self_study/REST";

export default function CcnaRestApiTutorial() {
	return (
		<div className="mt-7 space-y-6 leading-7 sm:space-y-8">
			<p>An API (Application Programming Interface) allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange data.</p>
			<p>REST (REpresentational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol – the HTTP. RESTful applications use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on resources and return data in various formats, often JSON or XML.</p>
			<CcnaLessonImage src={`${imageBase}/REST.jpg`} alt="REST API" />
			<p>An API that follows the REST standard is called a RESTful API or REST API. A REST implementation should be stateless. It means the two parties don’t need to store any information about each other, and every request and response (cycle) is independent from all others. It uses standard HTTP methods and can return data in various formats, often JSON or XML.</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">HTTP Methods in REST</h2>
			<p>HTTP methods in RESTful API development to specify the type of action being performed on a resource. There are five essential HTTP methods:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>POST: Create a new resource. (<strong>C</strong>REATE)</li>
				<li>GET: Retrieve information about a resource. GET requests do not change the resource’s state, so it is said to be a safe method (<strong>R</strong>EAD)</li>
				<li>PUT: Update an existing resource by replacing its content entirely. (<strong>U</strong>PDATE)</li>
				<li>DELETE: Delete a resource. (<strong>D</strong>ELETE)</li>
				<li>PATCH: Apply partial modifications to a resource.</li>
			</ul>
			<p>The first four methods’ functions are called <strong>CRUD</strong> (Create, Read, Update, Delete).</p>
			<p><strong>Remember:</strong> PUT for update, POST for create.</p>
			<p>Although POST and PUT can be used to create new resources but there are some differences between them. You can find out the difference in the table below:</p>
			<div className="overflow-x-auto rounded-xl border border-[#c9dcf5]">
				<table className="min-w-[640px] w-full border-collapse text-left text-sm leading-6">
					<thead className="bg-[#126bc5] text-white"><tr><th className="px-4 py-3">Criteria</th><th className="px-4 py-3">POST</th><th className="px-4 py-3">PUT</th></tr></thead>
					<tbody className="divide-y divide-[#c9dcf5]">
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Usage</th><td className="px-4 py-3">Create a new record</td><td className="px-4 py-3">Update a record</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Idempotent*</th><td className="px-4 py-3">non-idempotent</td><td className="px-4 py-3">idempotent</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Request Body</th><td className="px-4 py-3">only need to send the part to be updated in the request</td><td className="px-4 py-3">needs to send the entire resource as payload</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Status Code</th><td className="px-4 py-3">+ 201 is sent in response if new record is created successfully<br />+ 409 if duplicates are not allowed</td><td className="px-4 py-3">+ 200 when record gets updated<br />+ 201 if this record is new</td></tr>
					</tbody>
				</table>
			</div>
			<p>*Note: PUT is an idempotent method, while POST isn’t. For instance, calling the PUT method multiple times will either create or update the same resource. In contrast, multiple POST requests will lead to the creation of the same resource multiple times.</p>
			<p>In the body of these requests, there could be an optional HTTP request body that contains a custom payload of data, usually encoded in JSON. The server receives a request, processes it</p>
			<CcnaLessonImage src={`${imageBase}/REST_HTTP_body.jpg`} alt="REST HTTP request body" />
			<p>When a response is replied from the server, a status code is also attached to tell the result.</p>
			<CcnaLessonImage src={`${imageBase}/REST_Response.jpg`} alt="REST response and status code" />
			<ul className="list-disc space-y-2 pl-6">
				<li>2xx: The request was successful</li>
				<li>4xx: Something wrong with the request</li>
				<li>5xx: Something wrong at the server</li>
			</ul>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Examples of HTTP methods</h2>
			<p>We wrote a tutorial which uses Postman to send REST API to a CSR1000v router <a className="font-semibold text-[#2259dc] underline" href="https://www.digitaltut.com/use-postman-to-configure-csr1000v-router-on-cisco-sandbox-with-restconf" target="_blank" rel="noreferrer">here</a>. You will find many examples of how to use HTTP methods. Below is an example of using GET method:</p>
			<CcnaLessonImage src="https://www.digitaltut.com/images/Knowledge/Postman_RESTCONF/request_sent_success.jpg" alt="Successful REST GET request in Postman" />
			<p>POST method example. The body of POST method contains the configuration of the Loopback101 interface:</p>
			<CcnaLessonImage src="https://www.digitaltut.com/images/Knowledge/Postman_RESTCONF/Postman_add_Loopback.jpg" alt="POST request adding Loopback101" />
			<p>DELETE method:</p>
			<CcnaLessonImage src="https://www.digitaltut.com/images/Knowledge/Postman_RESTCONF/Postman_delete_loopback101.jpg" alt="DELETE request removing Loopback101" />
			<p>Note: {"{{host}}"} and {"{{port}}"} are two variables which we defined before using.</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Principles of REST</h2>
			<ol className="list-decimal space-y-4 pl-6">
				<li><strong>Stateless</strong>: Each request from a client to the server must contain all the information needed to understand and process the request. The server cannot store any client context between requests.</li>
			</ol>
			<CcnaLessonImage src={`${imageBase}/REST_stateless.jpg`} alt="Stateless REST requests" />
			<ol start="2" className="list-decimal space-y-4 pl-6">
				<li><strong>Client-Server Architecture</strong>: The client is the front-end and the server is the back-end of the service. It is important to note that both of these entities are independent of each other. The server-side code (the API) and the client-side code can each be changed without affecting the other, as long as both continue to communicate in the same format.</li>
				<li><strong>Cacheable</strong>: The client should have the ability to store responses in a cache. This greatly improves the performance of the API.</li>
				<li><strong>Uniform Interface</strong>: This constraint indicates a generic interface to manage all the interactions between the client and server in a unified way, which simplifies and decouples the architecture.</li>
				<li><strong>Layered System</strong>: The server can have multiple layers for implementation. This layered architecture helps to improve scalability by enabling load balancing.</li>
				<li><strong>Code on Demand</strong> (optional): This constraint indicates that the functionality of the client applications can be extended at runtime by allowing a code download from the server and executing the code.</li>
			</ol>
			<p>REST APIs may not be the best solution for everyone, but it is simple and good enough. That is why it is used so popularly nowadays.</p>
		</div>
	);
}