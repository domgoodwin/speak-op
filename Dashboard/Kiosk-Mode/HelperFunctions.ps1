#------------------------------------
#     Functions Definition 
#   Do NOT TOUCH this section!  
#------------------------------------
Set-Location $PSScriptRoot
Add-Type -Path Tomin.Tools.KioskMode.dll

$WinAPI = [Tomin.Tools.KioskMode.WinApi]
$Helpers = [Tomin.Tools.KioskMode.Helper]

if (!$ChromeStartDelay) {$ChromeStartDelay = 10}
if (!$chromePath) {$chromePath = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'}
if (!$chromeArguments) {$chromeArguments = '--new-window'}

function Wait-ForProcess($procName, $procTitle)
{
    $sw = [Diagnostics.Stopwatch]::StartNew()
    while ($true)
    {
        $res = Get-Process -Name $procName | where {$_.MainWindowHandle -ne ([IntPtr]::Zero) -and (!$procTitle -or $_.MainWindowTitle -eq $procTitle)}
        if ($res) 
        {
            return $res 
        }
        Start-Sleep -Milliseconds 100
        
        if ($sw.Elapsed.TotalMinutes -gt 5)
        {
            Write-Error TimeOut
            return
        }
    }
}


function Cockpit-Start($MonitorNum)
{
    Start-Process $cockpitPath

    #main window
    $window = (Wait-ForProcess Ciklum.Cockpit.CommunicationSpace 'COCKPIT COMMUNICATION SPACE' | select -First 1).MainWindowHandle
    
    $WinAPI::ShowWindow($window, [Tomin.Tools.KioskMode.Enums.ShowWindowCommands]::Restore)
    $Helpers::MoveToMonitor($window, $MonitorNum)
    $WinAPI::ShowWindow($window, [Tomin.Tools.KioskMode.Enums.ShowWindowCommands]::Maximize)
}


function Monitor($Url, $MonitorNum)
{
    $counter = 0 
    Write-Output "starting chrome $Url , monitor: $MonitorNum"
    if ([int]$counter -gt 0) { $chromeArguments = '--profile-directory="Default"' }
    Start-Process $chromePath "$chromeArguments $Url"
    Start-Sleep -Seconds 5
    $window = (Get-Process -Name chrome | where MainWindowHandle -ne ([IntPtr]::Zero) | Select-Object -First 1).MainWindowHandle
    $WinAPI::ShowWindow($window, [Tomin.Tools.KioskMode.Enums.ShowWindowCommands]::Restore)
    $Helpers::MoveToMonitor($window, $MonitorNum)
    $Helpers::SendKey($window, '{F11}')
    Start-Sleep -Seconds 3
    $counter = $counter + 1
}

function newMonitor($url, $MonitorNum)
{
    $counter = 0 
    Write-Output "starting chrome $url, monitor: $MonitorNum"
    if ([int]$counter -gt 0) { $chromeArguments = '--profile-directory="Default"' }
    Start-Process $chromePath "$chromeArguments $Url"
    Start-Sleep -Seconds 5
    $window = (Get-Process -Name chrome | where MainWindowHandle -ne ([IntPtr]::Zero) | Select-Object -First 1).MainWindowHandle
    $WinAPI::ShowWindow($window, [Tomin.Tools.KioskMode.Enums.ShowWindowCommands]::Restore)
    $Helpers::MoveToMonitor($window, $MonitorNum)
    $Helpers::SendKey($window, '{F11}')
    Start-Sleep -Seconds 3
}