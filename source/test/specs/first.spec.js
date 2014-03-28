describe("Patricia Public", function () {

    beforeEach( function () {
        patricia.initialize(["romanus", "romans"]);
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
