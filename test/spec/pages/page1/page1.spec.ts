import {Page1} from '../../../../app/pages/page1/page1';
import {} from '../../../../typings/jasmine/jasmine.d';

let page1 = null;

   describe('Page1', () => {

        beforeEach(function() {
            page1 = new Page1();
        });
        it('initialises', () => {
            expect(page1).toBeDefined();
        });
        it('should have a function called Hi', () => {
            expect(page1.Hi()).toBeDefined();
        });
        it('should have a function return hello', () => {
            expect(page1.Hi()).toEqual('hello');
        });
    });

