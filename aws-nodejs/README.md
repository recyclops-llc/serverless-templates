# aws-nodejs
Starter templates for creating a serverless project on AWS using NodeJs.

## serverless.yml
A few links that will be helpful to understand the serverless .yml file, and closely related, AWS CloudFormation templates:
- [serverless.yml documentation](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)
- [Serverless & AWS events](https://www.serverless.com/framework/docs/providers/aws/events/)
- [AWS CloudFormation Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)
- [AWS resource and proptery types reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)

All the spots that need renaming have been marked by `# TODO: ` comments. Other configurations such as lambda memory size, timeout settings, or SQS batch sizes should be updated or deleted as needed to start a new project. 

This file contains all the configuring to setup the following sample resources:
- A `POST /user` endpoint for creating a user
- A lambda to be triggered by requests sent to the `user/` endpoint
- A SNS topic to receive `create-user` events
- A SQS Standard Queue that is subscribed to the `create-user` SNS topic
- A lambda that is triggered by new messages sent to the `CreateUser` queue
- A SQS DLQ that receives all events failed to be handled from the `CreateUser` queue
- A lambda that is triggered by new messages sent to the `CreateUserDLQ`

These resources should be renamed or deleted when creating a new project based off of this template.

## Sample code
The sample code in this project receives a POSt request to create a user. The request information to sent to a SNS topic. A SQS Queue that is subscribed to that topic receives that message. A lambda is then triggered to process the message from the queue. If the message fails to be processed, an error is thrown and the message is then sent to the DLQ where another lambda is triggered to handle the failure.

## Local dev & Testing
### Local dev
TODO: Still need to figure out how to set up a full local dev environment. Currently the serverless-offline plugin provides the ability to test sending requests to the endpoint and triggering the lambda. We have yet to set up other AWS services locally, though it looks to be possible with [AWS SAM (Serverless Application Model)](https://aws.amazon.com/serverless/developer-tools/) and [LocalStack](https://github.com/localstack/localstack).

### Automated testing
Unit tests have been written to show a sample of how testing should be set up. 

## Linting & Formatting

We use ESLint and Prettier for our linting and code formatting. This helps us catch bugs and standardize our code format. See [here](https://prettier.io/docs/en/comparison.html), [here](https://prettier.io/docs/en/why-prettier.html) and [here](https://eslint.org/) for more info.

Currently our eslint rules largely use the defaults as [defined here](https://eslint.org/docs/rules/). Any overrides or customizations can be found in the `.elintrc.json` file.

We also use many of the Prettier defaults. Configuration options can be found [here](https://prettier.io/docs/en/options.html).

We largely followed [these instructions](https://prettier.io/docs/en/integrating-with-linters.html) to integrate Prettier with ESLint.

We use husky and lint-staged to run a pre-commit lint check on all staged files.

## To initialize a Serverless project with this template

Run `serverless create --template-url {URL TO GITHUB FOLDER OF THE TEMPLATE}` where you want to create the project.
