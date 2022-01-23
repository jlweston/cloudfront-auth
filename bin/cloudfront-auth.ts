#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { CloudfrontAuthStack } from "../lib/cloudfront-auth-stack";

const app = new cdk.App();
new CloudfrontAuthStack(app, "CloudfrontAuthStack");
