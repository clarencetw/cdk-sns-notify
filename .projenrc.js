const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  authorAddress: 'mr.lin.clarence@gmail.com',
  authorName: 'Clarence',
  cdkVersion: '1.72.0',
  name: 'cdk-sns-notify',
  repository: 'https://github.com/clarencetw/cdk-sns-notify.git',
  keywords: ['aws', 'cdk', 'line notify'],
  defaultReleaseBranch: 'master',

  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['clarencetw'],
  },
  autoApproveUpgrades: true,

  catalog: {
    twitter: 'Clarence_Lin',
    announce: false,
  },
  python: {
    distName: 'cdk-sns-notify',
    module: 'cdk_sns_notify',
  },

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
    '@aws-cdk/aws-lambda-nodejs',
  ],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
