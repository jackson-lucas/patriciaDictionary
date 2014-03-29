describe("Patricia Public", function () {

    beforeEach( function () {
        patricia.initialize(['romane', 'romanus', 'romulus', 'rubens', 'rub', 'rubicon', 'rubicundus']);
    });

    it("Expect methods to be defined", function () {
       expect(patricia.initialize).toBeDefined(); 
       expect(patricia.search).toBeDefined(); 
       expect(patricia.getDictionary).toBeDefined(); 
    });

    it("Expect dictionary to be filled", function () {
       expect(patricia.getDictionary()).toEqual();
    });
});

describe("Private Method: compareWords", function () {

    it("Use cases", function () {
       expect(patricia.compareWords("romane", "slower")).toEqual([-1]); 
       expect(patricia.compareWords("slower", "slower")).toEqual([0]); 
       expect(patricia.compareWords("roman", "romanus")).toEqual([1, "roman", "", "us"]); 
       expect(patricia.compareWords("romanus", "roman")).toEqual([2, "roman", "us", ""]); 
       expect(patricia.compareWords("romane", "romanus")).toEqual([3, "roman", "e", "us"]); 
    });
});