describe("Example Test", function () {
    it("Expect app.initialize return string", function () {
       expect(library.initialize()).toBe("Init"); 
    });
});

describe("Example Test2", function () {

    it("Expect app", function () {
       expect(library).toBeDefined(); 
    });
});
