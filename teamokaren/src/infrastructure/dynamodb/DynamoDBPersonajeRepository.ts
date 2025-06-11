import { IPersonajeRepository } from '../../domain/repositories/IPersonajeRepository';
import { Personaje } from '../../domain/entities/Personaje';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { config } from '../../config';

export class DynamoDBPersonajeRepository implements IPersonajeRepository {
  private dynamoDb = new DynamoDB.DocumentClient();
  private readonly tableName = config.personajesTable;
  async create(personaje: Personaje): Promise<void> {

    if (!this.tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: this.tableName,
      Item: personaje,
    };
    await this.dynamoDb.put(params).promise();
  }

  async getById(id: string): Promise<Personaje | null> {

    if (!this.tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item as Personaje || null;
  }

  async getAll(): Promise<Personaje[]> {

    if (!this.tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: this.tableName,
    };
    const result = await this.dynamoDb.scan(params).promise();
    return result.Items as Personaje[];
  }

  async update(id: string, personaje: Partial<Personaje>): Promise<void> {

    if (!this.tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: this.tableName,
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

    if (!this.tableName) {
      throw new Error('DYNAMODB_TABLE is not defined');
    }

    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    await this.dynamoDb.delete(params).promise();
  }
}
