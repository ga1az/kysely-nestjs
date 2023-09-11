import { Injectable } from '@nestjs/common';
import { Database } from '../database/database';
import type { Selectable } from 'kysely';
import { Company } from './entity';
import { CompanyDto } from '../auth/dto/register.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly database: Database) {}

  async getCompanyByTenantId(tenantId: string): Promise<Selectable<Company>> {
    const company = await this.database
      .withSchema('public')
      .selectFrom('company')
      .where('tenant_id', '=', tenantId)
      .selectAll()
      .executeTakeFirst();

    return company;
  }

  async createCompany(company: CompanyDto): Promise<string> {
    const createdCompany = await this.database
      .withSchema('public')
      .insertInto('company')
      .values([company])
      .returning('tenant_id')
      .executeTakeFirst();

    return createdCompany.tenant_id;
  }

  async getMaxMenuCount(tenantId: string): Promise<number> {
    const maxMenuCount = await this.database
      .withSchema('public')
      .selectFrom('pricing')
      .innerJoin('company', 'company.id_pricing', 'pricing.id')
      .where('company.tenant_id', '=', tenantId)
      .select('max_menu_count')
      .executeTakeFirst();

    return maxMenuCount.max_menu_count;
  }
}
