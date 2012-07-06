Indie Butler Relay
====================

The relay side of the [Indie Butler](https://github.com/julien51/indie-butler-app).

It's bit nerdy, but Bulter is a way to host websites directly in your browser, yet, making them accessible to the rest of the world (when your browser is connected, of course!).


Since this is a nodejs based app, you can deploy it like you would deploy any other node app. It doesn't have any other software
requirement...
It works on Heroku (but uses xhr-polling), as well as nodejitsu (which does support websockets!).

It uses IndieAuth to make sure that only the owner of a domain can bind to it. The only requirement is that your domain points to a rel="me" url (and back) for a service that supports IndieAuth.

To do
-----

* Add an API to listen on multiple host names so we can welcome more people.
* Write more implementations,on other stacks.
