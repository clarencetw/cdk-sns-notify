# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### SnsNotify <a name="cdk-sns-notify.SnsNotify"></a>

#### Initializer <a name="cdk-sns-notify.SnsNotify.Initializer"></a>

```typescript
import { SnsNotify } from 'cdk-sns-notify'

new SnsNotify(scope: Construct, id: string, props: SnsNotifyProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-sns-notify.SnsNotify.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-sns-notify.SnsNotify.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-sns-notify.SnsNotify.parameter.props"></a>

- *Type:* [`cdk-sns-notify.SnsNotifyProps`](#cdk-sns-notify.SnsNotifyProps)

---



#### Properties <a name="Properties"></a>

##### `lambdaSubscription`<sup>Required</sup> <a name="cdk-sns-notify.SnsNotify.property.lambdaSubscription"></a>

- *Type:* [`@aws-cdk/aws-sns-subscriptions.LambdaSubscription`](#@aws-cdk/aws-sns-subscriptions.LambdaSubscription)

---


## Structs <a name="Structs"></a>

### SnsNotifyProps <a name="cdk-sns-notify.SnsNotifyProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SnsNotifyProps } from 'cdk-sns-notify'

const snsNotifyProps: SnsNotifyProps = { ... }
```

##### `lineNotifyToken`<sup>Required</sup> <a name="cdk-sns-notify.SnsNotifyProps.property.lineNotifyToken"></a>

- *Type:* `string`

---



