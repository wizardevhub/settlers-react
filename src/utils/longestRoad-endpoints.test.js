import { isEndpoint, getEndpoints } from './longestRoad';

describe('Test if individual endpoint is correctly detected (no towns)', () => {
    it('returns true for single road', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'}
        ];
        const myTowns = [];
        
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(true);
    });
    it('returns true for 2-piece road', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [0,8], color: 'red'}
        ];
        const myTowns = [];
        
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(true);
    });
    it('returns true for 2-piece road (other endpoint)', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [0,8], color: 'red'}
        ];
        const myTowns = [];
        
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(true);
    });
    it('returns true for endpoints of continuous road and false for others', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,1], color: 'red'},
            {edge: [2,3], color: 'red'},
            {edge: [4,3], color: 'red'},
        ];
        const myTowns = [];
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[2], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[3], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[4], myRoads, myTowns)).toEqual(true);
    });
    it('returns false for all pieces in loop road', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
        ];
        const myTowns = [];
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[2], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[3], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[4], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[5], myRoads, myTowns)).toEqual(false);
    });
    it('returns true for spurs off loop road', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
            {edge: [10,11], color: 'red'},
            {edge: [2,3], color: 'red'},
        ];
        const myTowns = [];
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[2], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[3], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[4], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[5], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[6], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[7], myRoads, myTowns)).toEqual(true);
    });
    it ('returns true for spurs off H shape and false for middle', () => {
        var myRoads = [
            {edge: [0,1], color: 'red', checked: false},
            {edge: [1,2], color: 'red', checked: false},
            {edge: [2,3], color: 'red', checked: false},
            {edge: [5,2], color: 'red', checked: false},
            {edge: [1,6], color: 'red', checked: false}
        ];
        var myTowns = [];
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[2], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[3], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[4], myRoads, myTowns)).toEqual(true);
    });
});

describe('Test if individual endpoint is correctly detected (with towns)', () => {
    it('returns true for single road', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'}
        ];
        const myTowns = [
            {vertex: 0, color: 'green'}
        ];
        
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(true);
    });
    it('returns true for 2-piece road', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [0,8], color: 'red'}
        ];
        const myTowns = [
            {vertex: 1, color: 'green'},
            {vertex: 8, color: 'red'}
        ];
        
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(true);
    });
    it('returns true for 2-piece road (other endpoint)', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [0,8], color: 'red'}
        ];
        const myTowns = [
            {vertex: 1, color: 'green'},
            {vertex: 8, color: 'red'}
        ];
        
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(true);
    });
    
    it('returns false for all pieces in loop road adjacent to opponent town', () => {
        const myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
        ];
        const myTowns = [
            {vertex: 1, color: 'green'},
            {vertex: 8, color: 'red'}
        ];
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[2], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[3], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[4], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[5], myRoads, myTowns)).toEqual(false);
    });

    it ('horiz infinity shape, broken by 2 towns', () => {
        var myRoads = [
            {edge: [0,1], color: 'red'},
            {edge: [1,2], color: 'red'},
            {edge: [2,3], color: 'red'},
            {edge: [3,4], color: 'red'},
            {edge: [0,8], color: 'red'},
            {edge: [2,10], color: 'red'},
            {edge: [4,12], color: 'red'},
            {edge: [8,9], color: 'red'},
            {edge: [9,10], color: 'red'},
            {edge: [10,11], color: 'red'},
            {edge: [11,12], color: 'red'}
        ];
        var myTowns = [
            {vertex: 2, color: 'green'},
            {vertex: 12, color: 'blue'}
        ];
        expect(isEndpoint(myRoads[0], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[1], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[2], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[3], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[4], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[5], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[6], myRoads, myTowns)).toEqual(true);
        expect(isEndpoint(myRoads[7], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[8], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[9], myRoads, myTowns)).toEqual(false);
        expect(isEndpoint(myRoads[10], myRoads, myTowns)).toEqual(true);
    });
});