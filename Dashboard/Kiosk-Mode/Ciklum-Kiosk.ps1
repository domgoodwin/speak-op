######################################################
##########            Kiosk Mode          ############
######################################################
#
# Runs chrome and other apps in full-screen mode 
# on predefined screens
# ----------------------------------------------------

$chromePath = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
# if Window not moved (especially on machine start) - try increaing the delay. 
$ChromeStartDelay = 3

Set-Location $PSScriptRoot
. .\HelperFunctions.ps1

# Kill all running instances
# &taskkill /im chrome* /F

Monitor 'https://www.bbc.co.uk/ https://www.google.com' -MonitorNum 1
Monitor 'https://www.amazon.co.uk' -MonitorNum 2
Monitor 'https://www.volkswagen.co.uk' -MonitorNum 3