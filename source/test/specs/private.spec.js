describe("Private Method: compareWords", function () {

    it("Use cases", function () {
       expect(patricia.compareWords("romane", "romanus")).toEqual(["roman", "e", "us"]); 
       expect(patricia.compareWords("romane", "slower")).toEqual(["", "romane", "slower"]); 
       expect(patricia.compareWords("slower", "slower")).toEqual([]); 
    });
});