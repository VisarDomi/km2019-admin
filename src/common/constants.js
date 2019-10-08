import AWS from "aws-sdk";

export const albumBucketName = "kengamagjike2019";
const bucketRegion = "eu-west-1";
const IdentityPoolId = "eu-west-1:3b983321-f178-4d4d-b369-7184ffbcf0a4";
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId })
});
export const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});
