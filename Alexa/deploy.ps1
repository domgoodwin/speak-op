$version = 0
foreach($file in Get-ChildItem  -Filter *.zip)
{
    $newVersion = [int]$file.name.Split("-")[1].Split(".")[0]
    if($version -lt  $newVersion){
        $version = $newVersion
    }
}
$version += 1
$file = "package-" + $version.ToString() + ".zip"
#Compress-Archive -Path "node_modules\*","GetServiceStatus.js","package.json","main.js" -CompressionLevel Fastest -DestinationPath $file
7za a -tzip  package-$version.zip package.json node_modules GetServiceStatus.js  main.js
aws s3 cp $file s3://speakop-lambda-deploy/$file

terraform init
terraform apply  -var="app_version=$version"-auto-approve
aws lambda invoke --region=eu-west-2 --function-name=SpeakOp_Main output.txt

aws s3 rm s3://speakop-lambda-deploy/$file