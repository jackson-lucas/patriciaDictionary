describe("Patricia Public", function () {
    it("Expect methods to be defined", function () {
       expect(patricia.initialize).toBeDefined(); 
       expect(patricia.search).toBeDefined(); 
    });
});

describe("Private Method: compareWords", function () {

    it("Use cases", function () {
       expect(patricia.compareWords("romane", "romanus")).toEqual(["roman", "e", "us"]); 
       expect(patricia.compareWords("romane", "slower")).toEqual(["", "romane", "slower"]); 
       expect(patricia.compareWords("slower", "slower")).toEqual([]); 
    });
});