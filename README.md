# CloudFront Function for authorisation

A simple stack that demonstrates using a [CloudFront Function](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) to provide basic authorisation. While CloudFront Functions can't make HTTP or service calls, they're enough for us to validate basic auth or JWT.

## Useful commands

* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
