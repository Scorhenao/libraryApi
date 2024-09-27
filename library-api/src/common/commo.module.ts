import { Module } from '@nestjs/common';

@Module({
  providers: [],
  exports: [], // Exporta las interfaces para que estén disponibles globalmente
})
export class CommonModule {}
