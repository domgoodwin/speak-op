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

Monitor 'https://search-rpa-demo-5ytqt4pq75irmtyirthnq3cw6q.eu-west-2.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/59bca6e0-67d9-11e8-8e7d-93c83d19852b?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now%2Fy,mode:quick,to:now))&_a=(description:%27%27,filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(vis:(defaultColors:(%270%20-%2050%27:%27rgb(0,104,55)%27,%2750%20-%2075%27:%27rgb(255,255,190)%27,%2775%20-%20100%27:%27rgb(165,0,38)%27),legendOpen:!f)),gridData:(h:3,i:%271%27,w:3,x:0,y:0),id:eda53690-67d6-11e8-8e7d-93c83d19852b,panelIndex:%271%27,type:visualization,version:%276.2.2%27),(embeddableConfig:(vis:(defaultColors:(%270%20-%2050%27:%27rgb(0,104,55)%27,%2750%20-%2075%27:%27rgb(255,255,190)%27,%2775%20-%20100%27:%27rgb(165,0,38)%27),legendOpen:!f)),gridData:(h:3,i:%272%27,w:3,x:3,y:0),id:e1df4c10-67d6-11e8-8e7d-93c83d19852b,panelIndex:%272%27,type:visualization,version:%276.2.2%27),(embeddableConfig:(vis:(defaultColors:(%270%20-%2050%27:%27rgb(0,104,55)%27,%2750%20-%2075%27:%27rgb(255,255,190)%27,%2775%20-%20100%27:%27rgb(165,0,38)%27),legendOpen:!f)),gridData:(h:3,i:%273%27,w:3,x:0,y:3),id:d736b870-67d6-11e8-8e7d-93c83d19852b,panelIndex:%273%27,type:visualization,version:%276.2.2%27),(gridData:(h:5,i:%274%27,w:6,x:6,y:0),id:%2738f5d800-67d9-11e8-8e7d-93c83d19852b%27,panelIndex:%274%27,type:visualization,version:%276.2.2%27)),query:(language:lucene,query:%27%27),timeRestore:!f,title:tc_dahsbard,viewMode:view)' -MonitorNum 3
Monitor 'C:\repo\speak-op\Dashboard\SocialMedia\CSOMediaDashboard.html' -MonitorNum 2
Monitor 'https://apppulse-active.saas.hpe.com/apmsaas-web/dist/index.html?TENANTID=335121943#/dashboard https://app.geckoboard.com/edit/dashboards/113650' -MonitorNum 1