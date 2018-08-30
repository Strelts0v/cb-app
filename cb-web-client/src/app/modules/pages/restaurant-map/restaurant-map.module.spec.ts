import { RestaurantMapModule } from './restaurant-map.module';

describe('RestaurantMapModule', () => {
  let restaurantMapModule: RestaurantMapModule;

  beforeEach(() => {
    restaurantMapModule = new RestaurantMapModule();
  });

  it('should create an instance', () => {
    expect(restaurantMapModule).toBeTruthy();
  });
});
