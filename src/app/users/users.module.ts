import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  imports: [UsersRoutingModule],
  exports: [UsersRoutingModule]
})
export class UsersModule { }
