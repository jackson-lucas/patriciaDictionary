describe("Private Method: compareWords", function () {

    it("Use cases", function () {
       expect(patricia.compareWords("romane", "slower")).toEqual([-1]); 
       expect(patricia.compareWords("slower", "slower")).toEqual([0]); 
       expect(patricia.compareWords("roman", "romanus")).toEqual([1, "roman", "", "us"]); 
       expect(patricia.compareWords("romanus", "roman")).toEqual([2, "roman", "us", ""]); 
       expect(patricia.compareWords("romane", "romanus")).toEqual([3, "roman", "e", "us"]); 
    });
});