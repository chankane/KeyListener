Get-ChildItem "./*.js" -exclude "out.js", "app.js" | Get-Content | Set-Content "out.js"
