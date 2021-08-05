# webappdevelopment_project

Because of CORS issues, I set up a localhost proxy using the following open source code:
https://github.com/garmeeh/local-cors-proxy 

In Terminal:
First, run this instruction to install the local proxy:
npm install -g local-cors-proxy

Then, start the server:
lcp --proxyUrl http://api.openweathermap.org

You should now see a message similar to this in Terminal:

 Proxy Active 

Proxy Url: http://api.openweathermap.org
Proxy Partial: proxy
PORT: 8010
Credentials: false
Origin: *

To start using the proxy, just replace the proxied part of your url with: http://localhost:8010/proxy

Use this localhost:8010 proxy to call the Open Weather API. You can now open up the Projects HTML page and use the searches for weather-related data.


To install Node JS server:
Open the Terminal app and type brew update. This updates Homebrew with a list of the latest version of Node.
Type brew install node.

In the root directory of this project, run http-server in Terminal. 
