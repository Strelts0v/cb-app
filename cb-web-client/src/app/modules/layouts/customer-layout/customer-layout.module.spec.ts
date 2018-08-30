import { CustomerLayoutModule } from './customer-layout.module';

describe('CustomerLayoutModule', () => {
  let customerLayoutModule: CustomerLayoutModule;

  beforeEach(() => {
    customerLayoutModule = new CustomerLayoutModule();
  });

  it('should create an instance', () => {
    expect(customerLayoutModule).toBeTruthy();
  });
});
