Get-ChildItem "./src/server/logic/mino/mino.js" | Get-Content | Set-Content "./server.js"
Get-ChildItem "./src/server/logic/mino/*.js" -exclude "mino.js" | Get-Content | Add-Content "./server.js"
Get-ChildItem "./src/server/logic/*.js" | Get-Content | Add-Content "./server.js"
Get-ChildItem "./src/server/*.js" -exclude "main.js" | Get-Content | Add-Content "./server.js"
Get-ChildItem "./src/server/main.js" | Get-Content | Add-Content "./server.js"

Get-ChildItem "./src/client/input/*.js" | Get-Content | Set-Content "./client.js"
Get-ChildItem "./src/client/board/*.js" | Get-Content | Add-Content "./client.js"
Get-ChildItem "./src/client/main.js" | Get-Content | Add-Content "./client.js"
