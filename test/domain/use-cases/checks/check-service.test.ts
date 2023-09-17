import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';
import { LogEntity } from '../../../../src/domain/entities/log.entity';


describe('Checkservice useCase', () => { 


    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns true', async () => { 

        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
     });

     test('should call errorCallback when fetch return false', async () => {

        const wasOk = await checkService.execute('https://google-not-gud.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
     })
    
 })