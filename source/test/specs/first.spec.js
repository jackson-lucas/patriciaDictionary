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
        expect(patricia.getDictionary()).toEqual({
            root: {
                is_word: false,
                nextNodes: {
                    r: {
                        is_word: false,
                        nextNodes: {
                            om: {
                                is_word: false,
                                nextNodes: {
                                    an: {
                                        is_word: false,
                                        nextNodes: {
                                            e: {
                                                is_word: true,
                                                nextNodes: {}
                                            },
                                            us: {
                                                is_word: true,
                                                nextNodes: {}
                                            }
                                        }
                                    },
                                    ulus: {
                                        is_word: true,
                                        nextNodes: {}
                                    }
                                }
                            },
                            ub: {
                                is_word: true,
                                nextNodes: {
                                    ens: {
                                        is_word: true,
                                        nextNodes: {}
                                    },
                                    ic: {
                                        is_word: false,
                                        nextNodes: {
                                            on: {
                                                is_word: true,
                                                nextNodes: {}
                                            },
                                            undus: {
                                                is_word: true,
                                                nextNodes: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            // Just because the there is a test before and words_counter don't recognize duplicates
            words_counter: 14
        });
    });

    it("Expect found the words", function () {
        expect(patricia.search("romane")).toBe(true);
        expect(patricia.search("romanus")).toBe(true);
        expect(patricia.search("romulus")).toBe(true);
        expect(patricia.search("rubens")).toBe(true);
        expect(patricia.search("rub")).toBe(true);
        expect(patricia.search("rubicon")).toBe(true);
        expect(patricia.search("rubicundus")).toBe(true);
    });

    it("Expect don't found the words", function () {
        expect(patricia.search('roman')).toBe(false);
        expect(patricia.search('r')).toBe(false);
        expect(patricia.search('sullivan')).toBe(false);
        expect(patricia.search('rubicons')).toBe(false);
    });
});
