import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as cdk from '@aws-cdk/core';

export interface SnsNotifyProps {
  readonly lineNotifyToken: string;
}

export class SnsNotify extends cdk.Construct {
  readonly lambdaSubscription: subscriptions.LambdaSubscription

  constructor(scope: cdk.Construct, id: string, props: SnsNotifyProps) {
    super(scope, id);
    const lambdaFun = new lambda.Function(this, 'lambda_fun', {
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../', 'function')),
      environment: {
        LINE_NOTIFY_TOKEN: props.lineNotifyToken,
      },
    });

    const cloudwatchReadOnlyPolicyStatement = new iam.PolicyStatement({
      actions: ['cloudwatch:Get*'],
      resources: ['*'],
    });
    lambdaFun.role!.addToPrincipalPolicy(cloudwatchReadOnlyPolicyStatement);

    this.lambdaSubscription = new subscriptions.LambdaSubscription(lambdaFun);
  }
}