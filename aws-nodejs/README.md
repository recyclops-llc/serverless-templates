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

## Project organization
Our serverless projects 

## Linting & Formatting

We use ESLing and Prettier for our linting and code formatting. This helps us catch bugs and standardize our code format. See [here](https://prettier.io/docs/en/comparison.html), [here](https://prettier.io/docs/en/why-prettier.html) and [here](https://eslint.org/) for more info.

Currently our eslint rules largely use the defaults as [defined here](https://eslint.org/docs/rules/). Any overrides or customizations can be found in the `.elintrc.json` file.

We also use many of the Prettier defaults. Configuration options can be found [here](https://prettier.io/docs/en/options.html).

We largely followed [this tutorial](https://prettier.io/docs/en/integrating-with-linters.html) to integrate Prettier with ESLing

We use husky and lint-staged to run a pre-commit lint check on all staged files.

## To initialize a Serverless project with this template

Run `serverless create --template-url {URL TO GITHUB FOLDER OF THE TEMPLATE}` where you want to create the project.
