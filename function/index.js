const AWS = require("aws-sdk");
const https = require("https");
const fs = require('fs');

let lineNotifyToken = process.env.LINE_NOTIFY_TOKEN
  ? process.env.LINE_NOTIFY_TOKEN
  : "";

let widgetDefinition = {
  MetricWidget: {
    width: 600,
    height: 400,
    start: "-PT3H",
    end: "PT0H",
    view: "timeSeries",
    stacked: false,
    metrics: [],
    stat: "Average",
    yAxis: {
      left: {
        min: 0,
        max: 0,
      },
    },
    period: 60,
    title: "Snapshot Graphs",
    annotations: {
      horizontal: [
        {
          color: "#ff6961",
          label: "Trouble threshold start",
          value: 0,
        },
      ],
    },
  },
};

const lineNotify = async (url, path, accessToken, payload) => {
  postFile(url, path, accessToken, payload.message, payload.image, function (err, file) {
    if (err || !file) {
      console.error(err)
      return;
    }
  })
};

const makeLineMessage = (subject, timestamp, trigger, element) => {
  let message = "\n";

  message += `Subject: ${subject}\n`;
  message += `Timestamp: ${timestamp}\n`;

  for (var prop in element) {
    message += `${element[prop]}: ${trigger[element[prop]]}\n`;
  }
  return message;
};

exports.handler = function (event) {
  console.log("event:", JSON.stringify(event, undefined, 2));

  for (var recordNum = 0; recordNum < event.Records.length; recordNum++) {
    const record = event.Records[recordNum];
    const { Subject, Message, Timestamp } = record.Sns;
    const SnsMessage = JSON.parse(Message);
    const { Trigger } = SnsMessage;

    var cloudwatch = new AWS.CloudWatch();

    cloudwatch.getMetricWidgetImage(
      getWidgetDefinition(Trigger, SnsMessage),
      async function (err, data) {
        if (err) console.log(err, err.stack);
        else {
          var image = Buffer.from(data.MetricWidgetImage);

          if (lineNotifyToken !== "") {
            await lineNotify(
              "notify-api.line.me",
              "/api/notify",
              lineNotifyToken,
              {
                message: makeLineMessage(Subject, Timestamp, Trigger, [
                  "Namespace",
                  "MetricName",
                  "Threshold",
                ]),
                image,
              }
            );
          }
        }
      }
    );
  }
};

function getWidgetDefinition(trigger, message) {
  var metrics = [];
  var metric = [
    trigger.Namespace,
    trigger.MetricName,
    trigger.Dimensions[0].name,
    trigger.Dimensions[0].value,
  ];

  metrics.push(metric);
  widgetDefinition.MetricWidget.metrics = metrics;
  widgetDefinition.MetricWidget.yAxis.left.max = getYMax(
    message.NewStateReason
  );
  widgetDefinition.MetricWidget.title = trigger.MetricName;
  widgetDefinition.MetricWidget.annotations.horizontal[0].value =
    trigger.Threshold;

  var mw = JSON.stringify(widgetDefinition.MetricWidget);
  widgetDefinition.MetricWidget = mw;

  return widgetDefinition;
}

function getYMax(s) {
  var regex1 = /\[[0-9]*.[0-9]/;
  var datapoint = regex1.exec(s)[0].substring(1);

  return datapoint * 3;
}

var getOptions = function (hostname, path, method, accessToken) {
  return {
    hostname,
    port: 443,
    path,
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
};

var postFile = function (hostname, path, accessToken, json, outputFile, callback) {
  console.log('start postFile');

  var options = getOptions(hostname, path, 'POST', accessToken);
  var boundary = 'afdasfd77a6s234ak3hs7';
  options.headers['Content-Type'] = 'multipart/form-data; boundary="' + boundary + '"';

  var req = https.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      if (res.statusCode === 200) {
        callback(null, JSON.parse(chunk));
      }
    });
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
    callback(e.message);
  });

  req.write(
    '--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="message"\r\n\r\n'
  );
  req.write(
    json
  );
  req.write(
    '\r\n--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="imageFile"; filename="CloudWatch.png"\r\n' + 'Content-Type: image/png\r\n\r\n'
  );
  req.write(outputFile);
  req.end('\r\n--' + boundary + '--');
};