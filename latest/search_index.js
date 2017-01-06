var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#HTTP.jl-Documentation-1",
    "page": "Home",
    "title": "HTTP.jl Documentation",
    "category": "section",
    "text": "HTTP.jl provides a pure Julia library for HTTP functionality."
},

{
    "location": "index.html#HTTP.get",
    "page": "Home",
    "title": "HTTP.get",
    "category": "Function",
    "text": "        HTTP.get(uri) -> Response\n        HTTP.get(client::HTTP.Client, uri) -> Response\n\n    Build and execute an http \"GET\" request. Query parameters must be included in the uri itself.\n    Returns a `Response` object that includes the resulting status code (`HTTP.status(r)` and `HTTP.statustext(r)`),\n    response headers (`HTTP.headers(r)`), cookies (`HTTP.cookies(r)`), response history if redirects were involved\n    (`HTTP.history(r)`), and response body (`HTTP.body(r)` or `string(r)` or `HTTP.bytes(r)`).\n\n    Additional keyword arguments supported, include:\n\n    * `headers::Dict{String,String}`: headers given as Dict to be sent with the request\n    * `body`: a request body can be given as a `String`, `Vector{UInt8}`, `IO`, or `HTTP.FIFOBuffer`; see example below for how to utilize `HTTP.FIFOBuffer` for \"streaming\" request bodies\n    * `stream::Bool=false`: enable response body streaming; depending on the response body size, the request will return before the full body has been received; as the response body is read, additional bytes will be recieved and put in the response body. Readers should read until `eof(response.body) == true`; see below for an example of response streaming\n    * `chunksize::Int`: if a request body is larger than `chunksize`, the \"chunked-transfer\" http mechanism will be used and chunks will be sent no larger than `chunksize`\n    <!-- * `gzip::Bool`: -->\n    * `connecttimeout::Float64`: sets a timeout on how long to wait when trying to connect to a remote host; default = 10.0 seconds\n    * `readtimeout::Float64`: sets a timeout on how long to wait when receiving a response from a remote host; default = 9.0 seconds\n    * `tlsconfig::TLS.SSLConfig`: a valid `TLS.SSLConfig` which will be used to initialize every https connection\n    * `maxredirects::Int`: the maximum number of redirects that will automatically be followed for an http request\n\n    Simple request example:\n    ```julia\n    julia> resp = HTTP.get(\"http://httpbin.org/ip\")\n    HTTP.Response:\n    HTTP/1.1 200 OK\n    Connection: keep-alive\n    Content-Length: 32\n    Access-Control-Allow-Credentials: true\n    Date: Fri, 06 Jan 2017 05:07:07 GMT\n    Content-Type: application/json\n    Access-Control-Allow-Origin: *\n    Server: nginx\n\n    {\n      \"origin\": \"65.130.216.45\"\n    }\n\n\n    julia> string(resp)\n    \"{\n\n\"origin\": \"65.130.216.45\" } \"         ```\n\n    Response streaming example:\n    ```julia\n    julia> r = HTTP.get(\"http://httpbin.org/stream/100\"; stream=true)\n    HTTP.Response:\n    HTTP/1.1 200 OK\n    Content-Length: 0\n\n\n    julia> body = HTTP.body(r)\n    HTTP.FIFOBuffer(0,1048576,0,1,1,UInt8[],Condition(Any[]),Task (runnable) @0x000000010d221690,false)\n\n    julia> while true\n        println(String(readavailable(body)))\n        eof(body) && break\n    end\n    {\"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\", \"User-Agent\": \"HTTP.jl/0.0.0\"}, \"args\": {}, \"id\": 0, \"origin\": \"65.130.216.45\"}\n    {\"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\", \"User-Agent\": \"HTTP.jl/0.0.0\"}, \"args\": {}, \"id\": 1, \"origin\": \"65.130.216.45\"}\n    {\"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\", \"User-Agent\": \"HTTP.jl/0.0.0\"}, \"args\": {}, \"id\": 2, \"origin\": \"65.130.216.45\"}\n    {\"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\", \"User-Agent\": \"HTTP.jl/0.0.0\"}, \"args\": {}, \"id\": 3, \"origin\": \"65.130.216.45\"}\n    ...\n    ```\n\n    Request streaming example:\n    ```julia\n    # create a FIFOBuffer for sending our request body\n    f = HTTP.FIFOBuffer()\n    # write initial data\n    write(f, \"hey\")\n    # start an HTTP.post asynchronously\n    t = @async HTTP.post(\"http://httpbin.org/post\"; body=f)\n    write(f, \" there \") # as we write to f, it triggers another chunk to be sent in our async request\n    write(f, \"sailor\")\n    close(f) # setting eof on f causes the async request to send a final chunk and return the response\n\n    resp = t.result # get our response by getting the result of our asynchronous task\n    ```\n\n\n\n"
},

{
    "location": "index.html#HTTP.send!",
    "page": "Home",
    "title": "HTTP.send!",
    "category": "Function",
    "text": "`HTTP.send!([client::HTTP.Client,] request; stream::Bool=false)`\n\nSend an HTTP.Request to its associated host/uri. Set the keyword argument stream=true to enable response streaming, which will result in HTTP.send! potentially returning before the entire response body has been received. If the response body buffer fills all the way up, it will block until its contents are read, freeing up additional space to write.\n\n\n\n"
},

{
    "location": "index.html#HTTP.Client",
    "page": "Home",
    "title": "HTTP.Client",
    "category": "Type",
    "text": "HTTP.Client([logger::IO]; args...)\n\nA type to make connections to remote hosts, send HTTP requests, and manage state between requests. Takes an optional logger IO argument where client activity is recorded (defaults to STDOUT). Additional keyword arguments can be passed that will get transmitted with each HTTP request:\n\nchunksize::Int: if a request body is larger than chunksize, the \"chunked-transfer\" http mechanism will be used and chunks will be sent no larger than chunksize\n\n<!– * gzip::Bool: –>\n\nconnecttimeout::Float64: sets a timeout on how long to wait when trying to connect to a remote host; default = 10.0 seconds\nreadtimeout::Float64: sets a timeout on how long to wait when receiving a response from a remote host; default = 9.0 seconds\ntlsconfig::TLS.SSLConfig: a valid TLS.SSLConfig which will be used to initialize every https connection\nmaxredirects::Int: the maximum number of redirects that will automatically be followed for an http request\n\n\n\n"
},

{
    "location": "index.html#HTTP.Connection",
    "page": "Home",
    "title": "HTTP.Connection",
    "category": "Type",
    "text": "HTTP.Connection\n\nRepresents a persistent client connection to a remote host; only created when a server response includes the \"Connection: keep-alive\" header. A connection will be reused when sending subsequent requests to the same host.\n\n\n\n"
},

{
    "location": "index.html#Requests-1",
    "page": "Home",
    "title": "Requests",
    "category": "section",
    "text": "Note that the HTTP methods of POST, DELETE, PUT, etc. all follow the same format as HTTP.get, documented below.HTTP.get\nHTTP.send!\nHTTP.Client\nHTTP.Connection"
},

{
    "location": "index.html#HTTP.Request",
    "page": "Home",
    "title": "HTTP.Request",
    "category": "Type",
    "text": "A type representing an HTTP request.\n\n\n\n"
},

{
    "location": "index.html#HTTP.Response",
    "page": "Home",
    "title": "HTTP.Response",
    "category": "Type",
    "text": "A type representing an HTTP response.\n\n\n\n"
},

{
    "location": "index.html#HTTP.Cookies.Cookie",
    "page": "Home",
    "title": "HTTP.Cookies.Cookie",
    "category": "Type",
    "text": "A Cookie represents an HTTP cookie as sent in the Set-Cookie header of an HTTP response or the Cookie header of an HTTP request.\n\nSee http:#tools.ietf.org/html/rfc6265 for details.\n\n\n\n"
},

{
    "location": "index.html#HTTP.URI",
    "page": "Home",
    "title": "HTTP.URI",
    "category": "Type",
    "text": "HTTP.URI(str::String) => HTTP.URI\n\nA type representing a uri/url used for resource identification on the web.\n\n\n\n"
},

{
    "location": "index.html#HTTP.FIFOBuffer",
    "page": "Home",
    "title": "HTTP.FIFOBuffer",
    "category": "Type",
    "text": "A FIFOBuffer is a first-in, first-out, in-memory, async-friendly IO buffer type\n\nConstructors: FIFOBuffer([max]): creates a FIFOBuffer with a maximum size of max; this means that bytes can be written up until max number of bytes have been written (with none being read). At this point, the FIFOBuffer is full and will return 0 for all subsequent writes. If no max argument is given, then an \"infinite\" size FIFOBuffer is returned; this essentially allows all writes every time.\n\nReading is supported via readavailable, which \"extracts\" all bytes that have been written, starting at the earliest bytes written\n\nA FIFOBuffer is built to be used asynchronously to allow buffered reading and writing. In particular, a FIFOBuffer detects if it is being read from/written to the main task, or asynchronously, and will behave slightly differently depending on which.\n\nSpecifically, when reading from a FIFOBuffer, if accessed from the main task, it will not block if there are no bytes available to read. If being read from asynchronously, however, reading will block until additional bytes have been written. An example of this in action is:\n\nf = HTTP.FIFOBuffer(5) # create a FIFOBuffer that will hold at most 5 bytes, currently empty\nf2 = HTTP.FIFOBuffer(5) # a 2nd buffer that we'll write to asynchronously\n\n# start an asynchronous reading task\ntsk = @async begin\n    while !eof(f)\n        write(f2, readavailable(f))\n    end\nend\n\n# now write some bytes to the buffer\n# writing triggers our async task to wake up and read the bytes we just wrote\n# leaving the buffer empty again and blocking again until more bytes have been written\nwrite(f, [0x01, 0x02, 0x03, 0x04, 0x05])\n\n# we can see that `f2` now holds the bytes we wrote to `f`\nString(readavailable(f2))\n\n# our async task will continue until `f` is closed\nclose(f)\n\nistaskdone(tsk) # true\n\n\n\n"
},

{
    "location": "index.html#HTTP-Types-1",
    "page": "Home",
    "title": "HTTP Types",
    "category": "section",
    "text": "HTTP.Request\nHTTP.Response\nHTTP.Cookie\nHTTP.URI\nHTTP.FIFOBuffer"
},

{
    "location": "index.html#HTTP.parse",
    "page": "Home",
    "title": "HTTP.parse",
    "category": "Function",
    "text": "HTTP.parse{R <: Union{Request, Response}}(::Type{R}, str) => R\n\nGiven a string input str, use http-parser to create and populate a Julia Request or Response object.\n\n\n\n"
},

{
    "location": "index.html#HTTP.escape",
    "page": "Home",
    "title": "HTTP.escape",
    "category": "Function",
    "text": "create a valid uri/url string by escaping characters\n\n\n\n"
},

{
    "location": "index.html#HTTP.unescape",
    "page": "Home",
    "title": "HTTP.unescape",
    "category": "Function",
    "text": "unescape a uri/url\n\n\n\n"
},

{
    "location": "index.html#HTTP.userinfo",
    "page": "Home",
    "title": "HTTP.userinfo",
    "category": "Function",
    "text": "Splits the userinfo portion of an URI in the format user:password and returns the components as tuple.\n\nNote: This is just a convenience method, and this form of usage is deprecated as of rfc3986. See: http://tools.ietf.org/html/rfc3986#section-3.2.1\n\n\n\n"
},

{
    "location": "index.html#HTTP.splitpath",
    "page": "Home",
    "title": "HTTP.splitpath",
    "category": "Function",
    "text": "Splits the path into components and parameters See: http://tools.ietf.org/html/rfc3986#section-3.3\n\n\n\n"
},

{
    "location": "index.html#Base.isvalid",
    "page": "Home",
    "title": "Base.isvalid",
    "category": "Function",
    "text": "checks of a HTTP.URI is valid\n\n\n\n"
},

{
    "location": "index.html#HTTP.sniff",
    "page": "Home",
    "title": "HTTP.sniff",
    "category": "Function",
    "text": "HTTP.sniff(content::Union{Vector{UInt8}, String, IO}) => String (mimetype)\n\nHTTP.sniff will look at the first 512 bytes of content to try and determine a valid mimetype. If a mimetype can't be determined appropriately, \"application/octet-stream\" is returned.\n\nSupports JSON detection through the HTTP.isjson(content) function.\n\n\n\n"
},

{
    "location": "index.html#HTTP-Utilities-1",
    "page": "Home",
    "title": "HTTP Utilities",
    "category": "section",
    "text": "HTTP.parse\nHTTP.escape\nHTTP.unescape\nHTTP.userinfo\nHTTP.splitpath\nHTTP.isvalid\nHTTP.sniff"
},

]}
