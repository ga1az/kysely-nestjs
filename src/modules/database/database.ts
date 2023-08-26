import { Kysely } from 'kysely';

// Add your tables here.
interface Tables {
  // Example:
  // users: {
  //   id: number;
  //   name: string;
  //   email: string;
  //   password: string;
  //   created_at: Date;
  //   updated_at: Date;
  // };
}

export interface DatabaseOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class Database extends Kysely<Tables> {}
