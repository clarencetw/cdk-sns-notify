# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SnsNotify <a name="SnsNotify" id="cdk-sns-notify.SnsNotify"></a>

#### Initializers <a name="Initializers" id="cdk-sns-notify.SnsNotify.Initializer"></a>

```typescript
import { SnsNotify } from 'cdk-sns-notify'

new SnsNotify(scope: Construct, id: string, props: SnsNotifyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-sns-notify.SnsNotify.Initializer.parameter.scope">scope</a></code> | <code>@aws-cdk/core.Construct</code> | *No description.* |
| <code><a href="#cdk-sns-notify.SnsNotify.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-sns-notify.SnsNotify.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-sns-notify.SnsNotifyProps">SnsNotifyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-sns-notify.SnsNotify.Initializer.parameter.scope"></a>

- *Type:* @aws-cdk/core.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-sns-notify.SnsNotify.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-sns-notify.SnsNotify.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-sns-notify.SnsNotifyProps">SnsNotifyProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-sns-notify.SnsNotify.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-sns-notify.SnsNotify.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-sns-notify.SnsNotify.isConstruct">isConstruct</a></code> | Return whether the given object is a Construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-sns-notify.SnsNotify.isConstruct"></a>

```typescript
import { SnsNotify } from 'cdk-sns-notify'

SnsNotify.isConstruct(x: any)
```

Return whether the given object is a Construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-sns-notify.SnsNotify.isConstruct.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-sns-notify.SnsNotify.property.node">node</a></code> | <code>@aws-cdk/core.ConstructNode</code> | The construct tree node associated with this construct. |
| <code><a href="#cdk-sns-notify.SnsNotify.property.lambdaSubscription">lambdaSubscription</a></code> | <code>@aws-cdk/aws-sns-subscriptions.LambdaSubscription</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-sns-notify.SnsNotify.property.node"></a>

```typescript
public readonly node: ConstructNode;
```

- *Type:* @aws-cdk/core.ConstructNode

The construct tree node associated with this construct.

---

##### `lambdaSubscription`<sup>Required</sup> <a name="lambdaSubscription" id="cdk-sns-notify.SnsNotify.property.lambdaSubscription"></a>

```typescript
public readonly lambdaSubscription: LambdaSubscription;
```

- *Type:* @aws-cdk/aws-sns-subscriptions.LambdaSubscription

---


## Structs <a name="Structs" id="Structs"></a>

### SnsNotifyProps <a name="SnsNotifyProps" id="cdk-sns-notify.SnsNotifyProps"></a>

#### Initializer <a name="Initializer" id="cdk-sns-notify.SnsNotifyProps.Initializer"></a>

```typescript
import { SnsNotifyProps } from 'cdk-sns-notify'

const snsNotifyProps: SnsNotifyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-sns-notify.SnsNotifyProps.property.lineNotifyToken">lineNotifyToken</a></code> | <code>string</code> | *No description.* |

---

##### `lineNotifyToken`<sup>Required</sup> <a name="lineNotifyToken" id="cdk-sns-notify.SnsNotifyProps.property.lineNotifyToken"></a>

```typescript
public readonly lineNotifyToken: string;
```

- *Type:* string

---



