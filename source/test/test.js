/*!
 *patricia - Patricia trie implementation for dictionary
 *Copyright (C) <2014>  <Jackson S. L. Lima>
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
;!function(undefined) {

var patricia = (function() {
    "use strict"
    
    var $private = {},
        $public = {};

    /**
     * Private Variables
     */
    $private.dictionary = { 
        root: {
            is_word: false,
            nextNodes: {}
        },
        words_counter: 0
    };

    // -----------------------------------

    /**
     * Public Variables
     */

    // -----------------------------------

    /**
     * Private Methods
     */
    
    /**
     * Class Node
     * @param {Boolean} is_word
     * @param {Object}  nextNodes
     */
    $private.Node = function (is_word, nextNodes) {
        this.is_word = is_word || true;
        this.nextNodes = nextNodes || {};
    }
    
    /**
     * @return {Array(String)} [The first value on array it'll be
     *                         compare_value = -1: different,
     *                                          0: equals,
     *                                          1: word1 is inside word2,
     *                                          2: word2 is inside word1,
     *                                          3: have some in similar.
     *                          Then the second it will be the similar part, 
     *                          next 2 it will the differences(Strings)]
     */
    $private.compareWords = function (word1, word2) {
        var length = word1.length < word2.length ? word1.length : word2.length,
            similar_word = "",
            remainder1 = "",
            remainder2 = "",
            compare_value,
            index;


        for(index = 0; index < length; index++) {
            if( !(word1.charAt(index) == word2.charAt(index)) ) {
                break;
            }
        }

        if (!index) {
        // Totally different
            return [-1];

        } else if (word1 == word2) {
            return [0];

        }

        similar_word = word1.slice(0, index);
        remainder1 = word1.slice(index);
        remainder2 = word2.slice(index);

        if (word1 == similar_word) {
            compare_value = 1;

        } else if (word2 == similar_word) {
            compare_value = 2;

        } else {
            // None of the above
            compare_value = 3;
        }
        return [compare_value, similar_word, remainder1, remainder2]

    };

    /**
     * Get an array of strings and put inside the dictionary as patricia trie
     * @param  {Array(String)} words
     * @param  {Object} root [Node]
     */
    $private.fillDictionary = function (words, data) {
        var index,
            key,
            index_keys,
            comparisionResult,
            temporaryNode,
            should_go_for_next_word = false,
            data = data || {},
            actualNode = data.root || $private.dictionary.root,
            nextNodes = actualNode.nextNodes,
            should_count_words = data.should_count_words || false;

        // TEST: this function for any case
        if (should_count_words) {
            $private.dictionary.words_counter += words.length;
        }

        for(index = 0; index < words.length; index++) {

            if(!Object.keys(nextNodes).length) {
            // nextNodes is empty
                nextNodes[ words[index] ] = new $private.Node();

            } else {
                for(key in nextNodes) {
                    comparisionResult = $private.compareWords(key, words[index]);

                    // To understand the numbers see $private.compareWords()
                    switch (comparisionResult[0]) {
                        case -1:
                            /* Just go for the next key
                               Just making the case explicit. 
                               This case isn't necessary
                            */ 
                            break;

                        case 0:
                            nextNodes[key].is_word = true;
                            should_go_for_next_word = true;
                            break;

                        case 1:
                            $private.fillDictionary([comparisionResult[3]], nextNodes[key])
                            should_go_for_next_word = true;
                            break;

                        case 2:
                            /* As the principle of patricia. Hear, never could 
                            happen a subscription
                             */ 
                            actualNode.nextNodes[ comparisionResult[1] ] = new $private.Node();

                            temporaryNode = actualNode.nextNodes[key];
                            delete actualNode.nextNodes[key];

                            actualNode = actualNode.nextNodes[ comparisionResult[1] ];
                            actualNode.nextNodes[ comparisionResult[2] ] = temporaryNode;

                            should_go_for_next_word = true;
                            break;

                        case 3:
                            actualNode.nextNodes[ comparisionResult[1] ] = new $private.Node();

                            temporaryNode = actualNode.nextNodes[key];
                            delete actualNode.nextNodes[key];

                            actualNode = actualNode.nextNodes[ comparisionResult[1] ];

                            actualNode.nextNodes[ comparisionResult[2] ] = temporaryNode;
                            actualNode.nextNodes[ comparisionResult[3] ] = new $private.Node();

                            should_go_for_next_word = true;
                            actualNode = root || $private.dictionary.root;
                            break;
                    }

                    if(should_go_for_next_word) {
                        should_go_for_next_word = false;
                        break;
                    }
                }

            }
        }
    }

    // -----------------------------------

    /**
     * Public Methods
     */
    $public.initialize = function (words) {
        $private.fillDictionary(words, { should_count_words: true });
    };

    $public.search = function (word) {
    };

    $public.getDictionary = function () {
        return $private.dictionary;
    }

    // for test
    $public.compareWords = $private.compareWords;

    // -----------------------------------
    return $public;

})();


// Global
this.patricia = patricia;

}();

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

describe("Private Method: compareWords", function () {

    it("Use cases", function () {
       expect(patricia.compareWords("romane", "slower")).toEqual([-1]); 
       expect(patricia.compareWords("slower", "slower")).toEqual([0]); 
       expect(patricia.compareWords("roman", "romanus")).toEqual([1, "roman", "", "us"]); 
       expect(patricia.compareWords("romanus", "roman")).toEqual([2, "roman", "us", ""]); 
       expect(patricia.compareWords("romane", "romanus")).toEqual([3, "roman", "e", "us"]); 
    });
});