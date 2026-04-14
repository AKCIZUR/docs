HTML cheatsheet for syntax and common tasks

While using HTML it can be very handy to have an easy way to remember how to use HTML tags properly and how to apply them. MDN provides you with extended HTML reference documentation as well as a deep instructional set of HTML guides. However, in many cases we just need some quick hints as we go. That's the whole purpose of the cheat sheet, to give you some quick accurate ready to use code snippets for common usages.

Note: HTML tags must be used for their semantic value, not their appearance. It's always possible to totally change the look and feel of a given tag using CSS so, when using HTML, take the time to focus on the meaning rather than the appearance.
Inline elements

An "element" is a single part of a webpage. Some elements are large and hold smaller elements like containers. Some elements are small and are "nested" inside larger ones. By default, "inline elements" appear next to one another in a webpage. They take up only as much width as they need in a page and fit together horizontally like words in a sentence or books shelved side-by-side in a row. All inline elements can be placed within the <body> element.
Inline elements: usage and examples Usage 	Element 	Example
A link 	<a> 	

<a href="https://example.org">
A link to example.org</a>.

An image 	<img> 	

<img src="beast.png" width="50" />

An inline container 	<span> 	

Used to group elements: for example,
to <span style="color:blue">style
them</span>.

Emphasize text 	<em> 	

<em>I'm posh</em>.

Italic text 	<i> 	

Mark a phrase in <i>italics</i>.

Bold text 	<b> 	

Bold <b>a word or phrase</b>.

Important text 	<strong> 	

<strong>I'm important!</strong>

Highlight text 	<mark> 	

<mark>Notice me!</mark>

Strikethrough text 	<s> 	

<s>I'm irrelevant.</s>

Subscript 	<sub> 	

H<sub>2</sub>O

Small text 	<small> 	

Used to represent the <small>small
print </small>of a document.

Address 	<address> 	

<address>Main street 67</address>

Textual citation 	<cite> 	

For more monsters,
see <cite>The Monster Book of Monsters</cite>.

Superscript 	<sup> 	

x<sup>2</sup>

Inline quotation 	<q> 	

<q>Me?</q>, she said.

A line break 	<br> 	

Line 1<br>Line 2

A possible line break 	<wbr> 	

<div style="width: 200px">
  Llanfair<wbr>pwllgwyngyll<wbr>gogerychwyrndrobwllllantysiliogogogoch.
</div>

Date 	<time> 	

Used to format the date. For example:
<time datetime="2020-05-24">
published on 23-05-2020</time>.

Code format 	<code> 	

This text is in normal format,
but <code>this text is in code
format</code>.

Audio 	<audio> 	

<audio controls>
  <source src="/shared-assets/audio/t-rex-roar.mp3" type="audio/mpeg">
</audio>
        

Video 	<video> 	

<video controls width="250"
  src="/shared-assets/videos/flower.webm" >
  <a href="/shared-assets/videos/flower.webm">Download WebM video</a>
</video>

Block elements

"Block elements," on the other hand, take up the entire width of a webpage. They also take up a full line of a webpage; they do not fit together side-by-side. Instead, they stack like paragraphs in an essay or toy blocks in a tower.

Note: Because this cheat sheet is limited to a few elements representing specific structures or having special semantics, the div element is intentionally not included — because the div element doesn't represent anything and doesn't have any special semantics.
Usage 	Element 	Example
A simple paragraph 	<p> 	

<p>I'm a paragraph</p>
<p>I'm another paragraph</p>

An extended quotation 	<blockquote> 	

They said:
<blockquote>The blockquote element indicates
an extended quotation.</blockquote>

Additional information 	<details> 	

<details>
  <summary>HTML Cheat Sheet</summary>
  <p>Inline elements</p>
  <p>Block elements</p>
</details>

An unordered list 	<ul> 	

<ul>
  <li>I'm an item</li>
  <li>I'm another item</li>
</ul>

An ordered list 	<ol> 	

<ol>
  <li>I'm the first item</li>
  <li>I'm the second item</li>
</ol>

A definition list 	<dl> 	

<dl>
  <dt>A Term</dt>
  <dd>Definition of a term</dd>
  <dt>Another Term</dt>
  <dd>Definition of another term</dd>
</dl>

A horizontal rule 	<hr> 	

before<hr>after

Text Heading 	<h1>-<h6> 	

<h1> This is Heading 1 </h1>
<h2> This is Heading 2 </h2>
<h3> This is Heading 3 </h3>
<h4> This is Heading 4 </h4>
<h5> This is Heading 5 </h5>
<h6> This is Heading 6 </h6>

