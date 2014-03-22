/*!
 * patricia - Patricia trie implemented in a dictionary
 * @version v0.0.1
 * @license MIT
 */
;!function(undefined) {

var patricia = (function() {
    "use strict"
    
    var $private = {},
        $public = {};

    /**
     * Private Variables
     */
    $private.dictionary = {};

    // -----------------------------------

    /**
     * Public Variables
     */

    // -----------------------------------

    /**
     * Private Methods
     */
    
    /**
     * @return {Array(String)} [Return an empty array if they are equals,
     *                          Return an array with a empty string if they not similar
     *                          Return an array with 3 strings if they have some similar. 
     *                          The first it will be the similar part, 
     *                          next 2 it will the differences] ]
     */
    $private.compareWords = function(word1, word2) {
        var length = word1.length < word2.length ? word1.length : word2.length,
            similar_word = "",
            remainder1 = "",
            remainder2 = "",
            index;


        for(index = 0; index < length; index++) {
            if( !(word1.charAt(index) == word2.charAt(index)) ) {
                break;
            }
        }

        if(index == word1.length && index == word2.length) {
            return [];
        }

        similar_word = word1.slice(0, index);
        remainder1 = word1.slice(index);
        remainder2 = word2.slice(index);

        return [similar_word, remainder1, remainder2]

    };

    // -----------------------------------

    /**
     * Public Methods
     */
    $public.initialize = function(dictionary) {
    };

    $public.search = function(word) {
    };

    // -----------------------------------
    return $private;

})();


// Global
this.patricia = patricia;

}();

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