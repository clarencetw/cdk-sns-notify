[![NPM version](https://badge.fury.io/js/cdk-sns-notify.svg)](https://badge.fury.io/js/cdk-sns-notify)
[![PyPI version](https://badge.fury.io/py/cdk-sns-notify.svg)](https://badge.fury.io/py/cdk-sns-notify)
![Release](https://github.com/clarencetw/cdk-sns-notify/workflows/Release/badge.svg)

# cdk-sns-notify

A CDK construct library to send line notify or discord webhook

# Sample

```ts
import * as sns from "@aws-cdk/aws-sns";
import * as cloudwatch from "@aws-cdk/aws-cloudwatch";
import * as cw_actions from "@aws-cdk/aws-cloudwatch-actions";

import { SnsNotify } from "cdk-sns-notify";

const topic = new sns.Topic(stack, "Topic");

const metric = new cloudwatch.Metric({
  namespace: "AWS/EC2",
  metricName: "CPUUtilization",
  dimensions: {
    InstanceId: instance.instanceId,
  },
  period: cdk.Duration.minutes(1),
});

const alarm = new cloudwatch.Alarm(stack, "Alarm", {
  metric,
  threshold: 5,
  evaluationPeriods: 1,
});

alarm.addAlarmAction(new cw_actions.SnsAction(topic));

const snsLineNotify = new SnsNotify(stack, "sns-line-notify", {
  lineNotifyToken: "lineNotifyToken",
});
```

# Deploy

```sh
cdk deploy
```
