#Indie Butler Relay

The relay side of the [Indie Butler](https://github.com/julien51/indie-butler-app).

It's bit nerdy, but Bulter is a way to host websites directly in your browser, yet, making them accessible to the rest of the world (when your browser is connected, of course!).


Since this is a nodejs based app, you can deploy it like you would deploy any other node app. It doesn't have any other software
requirement...
It works on Heroku (but uses xhr-polling), as well as nodejitsu (which does support websockets!).

It uses IndieAuth to make sure that only the owner of a domain can bind to it. The only requirement is that your domain points to a rel="me" url (and back) for a service that supports IndieAuth.

## To do


* Add an API to listen on multiple host names so we can welcome more people.
* Write more implementations,on other stacks.


##Protocol

### Binding

* DNS: a domain owner creates a CNAME record for <code>butler</code> than points to the relay of their choice. [They can also deploy their own relay].
* A browser app initiates a websocket connection to <code>http://butler.domain.tld</code>. The relay MUST send a <code>session</code> message with a session id.
* The browser app MUST open a new tab that will perform a rel=me auth to any existing IndieAuth provider. The <code>redirect_uri</code> MUST
be <code>http://butler.domain.tld/authed/<sid>/&me=<domain></code>  where sid is the session id obtained from the server and <domain> is the
user's domain.
* When receiving the redirect from the Authentication provider, the relay MUST bind the session id to the websocket connection.

### Querying

Once a domain was bound, the relay will be able to relay any request to the browser which initiated the binding!
The incoming requests are send to the websocket with teh following : VERB (only get supported for now), and a JS object including the HTTP headers and the path of the request).
The browser MUST then respond to the requests with an object that includes a headers object and a body string, which used to build the HTTP response.
