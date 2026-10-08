import { Inject, Injectable } from '@nestjs/common';
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  NotFound,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ENV_CONFIG, type EnvConfig } from 'src/config/env';
import {
  GetPresignedUrl,
  GetPresignedUrlResponse,
} from '@repo/contracts/upload';
import { createUploadKey } from './utils/create-upload-key';

@Injectable()
export class StorageService {
  private readonly client: S3Client;
  private readonly bucketName: string;
  private readonly storageUrl: string;

  constructor(@Inject(ENV_CONFIG) config: EnvConfig) {
    this.bucketName = config.S3_BUCKET;
    this.storageUrl = config.S3_ENDPOINT;

    this.client = new S3Client({
      region: config.S3_REGION,
      endpoint: config.S3_ENDPOINT,
      forcePathStyle: true,
      credentials: {
        secretAccessKey: config.S3_SECRET_KEY,
        accessKeyId: config.S3_ACCESS_KEY,
      },
    });
  }

  async getPresignedUrl(
    userId: string,
    file: GetPresignedUrl,
  ): Promise<GetPresignedUrlResponse> {
    const key = createUploadKey(userId);

    const command = new PutObjectCommand({
      Key: key,
      ContentType: file.contentType,
      ContentLength: file.size,
      Bucket: this.bucketName,
    });

    const presignedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 60,
    });

    return { url: presignedUrl, key };
  }

  async isObjectExist(key: string) {
    try {
      await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucketName, Key: key }),
      );
      return true;
    } catch (error: unknown) {
      if (error instanceof NotFound) {
        return false;
      }
      throw error;
    }
  }

  getPublicReadUrl(key: string) {
    return [this.storageUrl, this.bucketName, key].join('/');
  }
}
