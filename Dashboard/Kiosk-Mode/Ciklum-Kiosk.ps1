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

Monitor 'https://search-rpa-demo-5ytqt4pq75irmtyirthnq3cw6q.eu-west-2.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/59bca6e0-67d9-11e8-8e7d-93c83d19852b?_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3Anow-5y%2Cmode%3Aquick%2Cto%3Anow))' -MonitorNum 2
Monitor 'C:\repo\speak-op\Dashboard\SocialMedia\CSOMediaDashboard.html' -MonitorNum 2
Monitor 'https://apppulse-active.saas.hpe.com/apmsaas-web/dist/index.html?TENANTID=335121943#/dashboard https://app.geckoboard.com/edit/dashboards/113650' -MonitorNum 1