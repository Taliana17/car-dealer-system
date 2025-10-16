import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { FeaturesModule } from './features/features.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SalesModule } from './sales/sales.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env opcional
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST') || 'localhost',
        port: +(cfg.get('DB_PORT') || 5432),
        username: cfg.get('DB_USER') || 'postgres',
        password: cfg.get('DB_PASS') || 'postgres',
        database: cfg.get('DB_NAME') || 'autosales',
        autoLoadEntities: true,
        synchronize: true, // en dev
        logging: true,
      }),
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    CategoriesModule,
    FeaturesModule,
    VehiclesModule,
    SalesModule,
    PaymentsModule,
  ],
})
export class AppModule {}
