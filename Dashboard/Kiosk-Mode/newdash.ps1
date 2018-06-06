######################################################
##########            Kiosk Mode          ############
######################################################
#
# Runs chrome and other apps in full-screen mode 
# on predefined screens
# ----------------------------------------------------

param([String]$url,[String]$mon)

$chromePath = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
# if Window not moved (especially on machine start) - try increaing the delay. 
$ChromeStartDelay = 3

Set-Location $PSScriptRoot
. .\HelperFunctions.ps1


# Kill all running instances
# &taskkill /im chrome* /F

newMonitor $url -MonitorNum $mon