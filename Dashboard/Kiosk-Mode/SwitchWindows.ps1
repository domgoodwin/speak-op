[void][System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms')
[System.Windows.Forms.SendKeys]::SendWait("%{ESC}")

Start-Sleep -Milliseconds 2000 