import { IPersonajeRepository } from '../../domain/repositories/IPersonajeRepository';
import { Personaje } from '../../domain/entities/Personaje';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDBPersonajeRepository implements IPersonajeRepository {
  private dynamoDb = new DynamoDB.DocumentClient();

  async create(personaje: Personaje): Promise<void> {
    const tableName = process.env.DYNAMODB_TABLE;
    if (!tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: tableName,
      Item: personaje,
    };
    await this.dynamoDb.put(params).promise();
  }

  async getById(id: string): Promise<Personaje | null> {
    const tableName = process.env.DYNAMODB_TABLE;
    if (!tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: tableName,
      Key: { id },
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item as Personaje || null;
  }

  async getAll(): Promise<Personaje[]> {
    const tableName = process.env.DYNAMODB_TABLE;
    if (!tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: tableName,
    };
    const result = await this.dynamoDb.scan(params).promise();
    return result.Items as Personaje[];
  }

  async update(id: string, personaje: Partial<Personaje>): Promise<void> {
    const tableName = process.env.DYNAMODB_TABLE;
    if (!tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: 'set #nombre = :nombre, #altura = :altura',
      ExpressionAttributeNames: {
        '#nombre': 'nombre',
        '#altura': 'altura',
      },
      ExpressionAttributeValues: {
        ':nombre': personaje.nombre,
        ':altura': personaje.altura,
      },
    };
    await this.dynamoDb.update(params).promise();
  }

  async delete(id: string): Promise<void> {
    const tableName = process.env.DYNAMODB_TABLE;
    if (!tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: tableName,
      Key: { id },
    };
    await this.dynamoDb.delete(params).promise();
  }
}
