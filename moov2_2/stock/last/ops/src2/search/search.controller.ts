// src/search/search.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async search(
    @Query('client') client: string,
    @Query('type_cdr') type_cdr: string,
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('extension') extension: string,
  ) {
    return this.searchService.search({ client, type_cdr, year, month, extension });
  }
}


/*@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() query: any) {
    return this.searchService.search(query);
  }
}

/*
@Controller('csv')
@UseGuards(JwtAuthGuard)
export class CsvController {
  @Get()
  findAll() {
    return 'data sécurisée';
  }
}*/