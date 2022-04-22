import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

   // meant to test a functional feature, not a technical spec
  it('should add two numbers', () => {
    // const logger = new LoggerService(); // ususally we want to provide mock or fake services for the unit test

    // this is a complete fake object
    const logger = jasmine.createSpyObj('LoggerService', ["log"]);

    const calculator = new CalculatorService(logger);

    // now not needed because jasmine will automatically spy on the spyobj
    // spyOn(logger, 'log');

    const result = calculator.add(2,2);

    expect(result).toBe(4);

    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2,2);

    expect(result).toBe(0, "unexpected subtraction result");
  });

});
