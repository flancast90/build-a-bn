# build-a-bn
> Build you very own (very simple) botnet!

<br>

## Get Started
To get started with build-a-bn, simply install the required libs, and then start the server.
1. ``cd server && npm install``
2. ``node build-a-bn.js``
3. See ``localhost:8000`` for the (blank) file which will add your computer to the botnet for the time it is on the page

**💡 Pro Tip 💡**: Use ngrok.io (https://ngrok.com/) to give a public URL to your build-a-bn program, which then will add anyone on that link to the botnet!
Other options include hosting on repl.it (https://replit.com/), Digital Ocean (https://www.digitalocean.com/), or Netlify (https://www.netlify.com/)

#### Commands
build-a-bn has some basic commands which can be tryped into the console while the program is running, and allow you some control over the botnet.
```
--help : outputs a list of commands.
--ips : returns a url containing every url connected to the server
--start [ip] : starts a DDoS attack from the IP specified. Instead of an IP, use "all" to start DDoS across all connections.
--stop [ip] : stops a DDoS attack on the IP specified. Instead of an IP, use "all" to stop DDoS across all connections.
```

#### Adding to exisiting website.
build-a-bn can be simply added to any existing node.js site or html you may have. To do so, just move the ``/client/script.js`` to your project root and link in your existing html file. Then, move the ``/server/build-a-botnet.js`` file to your root directory as well. From here, you have a few options, the easiest of which is just to add your existing server code inside the build-a-botnet.js file, or vice-versa. With additional modification, you can require the build-a-botnet file as follows: 
```js
const botnet = require('./build-a-botnet.js');
```

This approach is not recommended, however, since the JS file may have to be changed to play well with your other file. In the future, options will be added allowing an easy ``require()`` import.

## Licence
```
Copyright 2022 Finn Lancaster

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

