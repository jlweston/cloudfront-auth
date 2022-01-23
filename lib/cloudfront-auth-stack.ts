import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";

export class CloudfrontAuthStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an auth lambda. Note: this is a CloudFront Function, so does
    // not have all the usual Lambda functionality.
    const authLambda = new cloudfront.Function(this, "Function", {
      code: cloudfront.FunctionCode.fromFile({
        filePath: `${__dirname}/lambda/auth.js`,
      }),
    });

    // Create a private S3 bucket.
    const privateBucket = new s3.Bucket(
      this,
      "cloudfront-stack-private-bucket",
      {
        accessControl: s3.BucketAccessControl.PRIVATE,
        publicReadAccess: false,
      }
    );

    // Create a CloudFront distribution to front the private bucket.
    new cloudfront.Distribution(this, "cloudfront-stack-distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(privateBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        functionAssociations: [
          {
            function: authLambda,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
    });
  }
}
