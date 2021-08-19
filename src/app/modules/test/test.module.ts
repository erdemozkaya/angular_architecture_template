import { TestRoutingModule } from './test-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    TestRoutingModule,
    CommonModule
  ]
})
export class TestModule { }
