import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';
import { SnsNotify } from './index';

export interface IntegTestingProps {
    readonly vpc?: ec2.IVpc;
}
export class IntegTesting {
    readonly stack: cdk.Stack[];

    constructor(props: IntegTestingProps = {}) {
        const app = new cdk.App();

        const env = {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: process.env.CDK_DEFAULT_REGION,
        };

        const stack = new cdk.Stack(app, 'testing-stack', { env });

        const vpc = props.vpc ?? new ec2.Vpc(stack, 'Vpc', { natGateways: 1 });

        const securityGroup = new ec2.SecurityGroup(stack, 'SecurityGroup', {
            vpc,
            allowAllOutbound: true,
        });
        securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));

        const instance = new ec2.Instance(stack, 'Instance', {
            vpc,
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T3A,
                ec2.InstanceSize.NANO,
            ),
            machineImage: ec2.MachineImage.latestAmazonLinux({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
            }),
            securityGroup,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
            },
        });
        instance.userData.addCommands(
            'amazon-linux-extras install epel -y',
            'yum install stress-ng tmux htop -y',
        );
        new cdk.CfnOutput(stack, 'instance', {
            value: instance.instancePublicDnsName,
        });

        const topic = new sns.Topic(stack, 'Topic');

        const metric = new cloudwatch.Metric({
            namespace: 'AWS/EC2',
            metricName: 'CPUUtilization',
            dimensions: {
                InstanceId: instance.instanceId,
            },
            period: cdk.Duration.minutes(1),
        });

        const alarm = new cloudwatch.Alarm(stack, 'Alarm', {
            metric,
            threshold: 5,
            evaluationPeriods: 1,
        });

        alarm.addAlarmAction(new cw_actions.SnsAction(topic));

        const snsLineNotify = new SnsNotify(stack, 'sns-line-notify', {
            lineNotifyToken: 'lineNotifyToken',
        });

        topic.addSubscription(snsLineNotify.lambdaSubscription);

        this.stack = [stack];
    }
}

new IntegTesting();