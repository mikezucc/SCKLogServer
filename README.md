```
     ___           ___           ___                         ___           ___
    /  /\         /  /\         /__/|                       /  /\         /  /\
   /  /:/_       /  /:/        |  |:|                      /  /::\       /  /:/_
  /  /:/ /\     /  /:/         |  |:|      ___     ___    /  /:/\:\     /  /:/ /\
 /  /:/ /::\   /  /:/  ___   __|  |:|     /__/\   /  /\  /  /:/  \:\   /  /:/_/::\
/__/:/ /:/\:\ /__/:/  /  /\ /__/\_|:|____ \  \:\ /  /:/ /__/:/ \__\:\ /__/:/__\/\:\
 \  \:\/:/~/:/ \  \:\ /  /:/ \  \:\/:::::/  \  \:\  /:/  \  \:\ /  /:/ \  \:\ /~~/:/
  \  \::/ /:/   \  \:\  /:/   \  \::/~~~~    \  \:\/:/    \  \:\  /:/   \  \:\  /:/
   \__\/ /:/     \  \:\/:/     \  \:\         \  \::/      \  \:\/:/     \  \:\/:/
     /__/:/       \  \::/       \  \:\         \__\/        \  \::/       \  \::/
     \__\/         \__\/         \__\/                       \__\/         \__\/
```

# SCKLog Server
Lean remote logger and static file server. Displays logs to web page and writes to file.

[iOS Client quick start (ObjC)](link to repo)

Client breakdown:
1. POST to `/start` with the appropriate session stamp to start a new log file with that <sessionstamp>-log.txt
2. POST to `/log` and watch them print on `/watch` web page. They will also show in the text file browsable through static root `http://localhost:3003/`.

## setup
`npm install`

`node server.js`

## observe
path: `/` => shows directory through Ecstatic static file server

path: `/watch`=> active session web page

## api
path: `/start`

    body:{"session":<string>} 
    method:`POST`
     
     
path: `/log`

    body:{"payload":<string>} 
    method:`POST`

## libs
- [Node/npm](https://nodejs.org/)
- [Socket.io](http://socket.io/)
