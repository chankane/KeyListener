Get-ChildItem "./input.js" | Get-Content | Set-Content "out.js"
Get-ChildItem "./*.js" -exclude "out.js", "app.js", "input.js" | Get-Content | Add-Content "out.js"
