import { RestaurantLayoutModule } from './restaurant-layout.module';

describe('RestaurantLayoutModule', () => {
  let restaurantLayoutModule: RestaurantLayoutModule;

  beforeEach(() => {
    restaurantLayoutModule = new RestaurantLayoutModule();
  });

  it('should create an instance', () => {
    expect(restaurantLayoutModule).toBeTruthy();
  });
});
