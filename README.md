# Reminder

[![Build Status](https://travis-ci.org/vicente-valls/reminder.svg?branch=master)](https://travis-ci.org/vicente-valls/reminder)

## Introduction

Reminder service is meant to be used to schedule HTTP requests.
Reminder exposes a rest API to create reminder tasks.
Reminder service is built using serverless framework using following components from AWS:
* ApiGateway.
* Lambda.
* SQS: used to store and manage the reminder tasks.

Following diagram shows interaction of such components.

![Sequence Diagram](https://github.com/vicente-valls/reminder/raw/master/diagrams/reminder-sequence-diagram.jpg
 "Sequence Diagram")
 
HTTP responses from the reminder requests should be `200` and follow the schema below:
```
{
  "type": "object",
  "properties": {
    "remindMeAgain": {
      "type": "boolean"
    },
    "remindMeAfter": {
      "type": "integer"
    }
  },
  "required": ["remindMeAgain"]
}
```

Any other status code (3XX-4XX-5XX...) or payloads will **not** be queued again for a further reminding.

## Requirements
* yarn
* nvm
* node `v6.10.3`

## Installation
```
$ nvm use
$ yarn install
```

## Testing
```
$ yarn test
```
