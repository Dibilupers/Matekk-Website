export default function CcnaJsonTutorial() {
	return (
		<div className="mt-7 space-y-6 leading-7 sm:space-y-8">
			<p>JavaScript Object Notation (JSON) is a human readable and very popular format used by web services, programming languages (including Python) and APIs to read/write data. JSON is also a subject of the CCNA 200-301 so in this article we will learn some basic knowledge of JSON and how to use Python to process JSON.</p>
			<h2 className="text-xl font-bold text-[#071126] sm:text-2xl"><strong>JSON syntax structure:</strong></h2>
			<ul className="list-disc space-y-2 pl-6">
				<li>uses curly braces <code>{"{}"}</code> to hold objects and square brackets <code>[]</code> to hold arrays</li>
				<li>JSON data is written as key/value pairs</li>
				<li>A key/value pair consists of a key (must be a string in double quotation marks <code>""</code>), followed by a colon <code>:</code>, followed by a value. For example: “name”:”John”</li>
				<li>Each key must be unique</li>
				<li>Values must be of type string, number, object, array, boolean or null</li>
				<li>Multiple key/value within an object are separated by commas <code>,</code></li>
			</ul>
			<p>JSON can use arrays. Arrays are used to store multiple values in a single variable. For example:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`{
"name":"John",
"age":30,
"cars":[ "Ford", "BMW", "Fiat"]
}`}</code></pre>
			<p>In the above example, “cars” is the key which is assigned a JSON array of strings. They contains three values “Ford”, “BMW” and “Fiat”.</p>
			<p>If we have a JSON string, we can convert (parse) it into Python by using the <code>json.loads()</code> method, which returns a Python dictionary:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`import json
myvar = '{"name":"John","age":30,"cars":[ "Ford", "BMW", "Fiat"]}'
parse_myvar = json.loads(myvar)
print(parse_myvar["cars"][0])`}</code></pre>
			<p>The result:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>Ford</code></pre>
			<p>Note:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>Python comes with a built-in package called json for encoding and decoding JSON data so we need to “import json” first</li>
				<li>If you want to write a variable in multiple lines or with special characters (including NEWLINEs, TABs) then you should use triple quotes <code>"""</code>. For example the “myvar” variable above can be written as follows:</li>
			</ul>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`myvar = """
{
"name":"John",
"age":30,
"cars":[ "Ford", "BMW", "Fiat"]
}
"""`}</code></pre>
		</div>
	);
}