describe("Patricia Public", function () {

    beforeEach( function () {
        // Test all the cases
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
