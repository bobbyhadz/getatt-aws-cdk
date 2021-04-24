import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, id, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const cfnBucket = s3Bucket.node.defaultChild as s3.CfnBucket;

    console.log('directly 👉', cfnBucket.getAtt('Arn').toString());

    console.log(
      'on Fn class 👉',
      cdk.Fn.getAtt(cfnBucket.logicalId, 'Arn').toString(),
    );

    // 👇 add the call to getAtt as an Output
    new cdk.CfnOutput(this, 'bucketArn', {
      value: cfnBucket.getAtt('Arn').toString(),
      description: 'The arn of the s3 bucket',
      exportName: 'avatarsBucket',
    });
  }
}
