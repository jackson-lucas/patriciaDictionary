describe("patriciaDictionary Public", function () {

    beforeEach( function () {
        // Test all the cases
        patriciaDictionary.initialize(['romane', 'romanus', 'romulus', 'rubens', 'rub', 'rubicon', 'rubicundus']);
    });

    it("Expect methods to be defined", function () {
       expect(patriciaDictionary.initialize).toBeDefined(); 
       expect(patriciaDictionary.search).toBeDefined(); 
       expect(patriciaDictionary.getDictionary).toBeDefined(); 
    });

    it("Expect dictionary to be filled", function () {
        //expect(patriciaDictionary.getDictionary()).toEqual({});
    });

    it("Expect found the words", function () {
        expect(patriciaDictionary.search("romane")).toBe(true);
        expect(patriciaDictionary.search("romanus")).toBe(true);
        expect(patriciaDictionary.search("romulus")).toBe(true);
        expect(patriciaDictionary.search("rubens")).toBe(true);
        expect(patriciaDictionary.search("rub")).toBe(true);
        expect(patriciaDictionary.search("rubicon")).toBe(true);
        expect(patriciaDictionary.search("rubicundus")).toBe(true);
    });

    it("Expect don't found the words", function () {
        expect(patriciaDictionary.search('roman')).toBe(false);
        expect(patriciaDictionary.search('r')).toBe(false);
        expect(patriciaDictionary.search('sullivan')).toBe(false);
        expect(patriciaDictionary.search('rubicons')).toBe(false);
    });
});
