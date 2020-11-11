# API Reference

**Classes**

Name|Description
----|-----------
[SnsNotify](#cdk-sns-notify-snsnotify)|*No description*


**Structs**

Name|Description
----|-----------
[SnsNotifyProps](#cdk-sns-notify-snsnotifyprops)|*No description*



## class SnsNotify  <a id="cdk-sns-notify-snsnotify"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SnsNotify(scope: Construct, id: string, props: SnsNotifyProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SnsNotifyProps](#cdk-sns-notify-snsnotifyprops)</code>)  *No description*
  * **lineNotifyToken** (<code>string</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**lambdaSubscription** | <code>[LambdaSubscription](#aws-cdk-aws-sns-subscriptions-lambdasubscription)</code> | <span></span>



## struct SnsNotifyProps  <a id="cdk-sns-notify-snsnotifyprops"></a>






Name | Type | Description 
-----|------|-------------
**lineNotifyToken** | <code>string</code> | <span></span>



