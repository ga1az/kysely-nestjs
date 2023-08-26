import { Injectable } from '@nestjs/common';
import { Database } from './modules/database/database';
import { sql } from 'kysely';

@Injectable()
export class AppService {
  constructor(private readonly database: Database) {}
  async getHello(): Promise<Object> {
    try {
      await this.database
        .withSchema('public')
        .schema.createTable('companies')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .execute();
    } catch (error) {
      console.log(error);
    }

    await sql`
      insert into public.companies (name) values ('locura')
    `.execute(this.database);

    const select = await sql`select * from public.companies`.execute(
      this.database,
    );

    return { s: select };
  }
}
