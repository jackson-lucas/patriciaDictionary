/*!
 *patriciaDictionary - Patricia trie implementation for dictionary
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

/**
 * @namespace patriciaDictionary
 */
var patriciaDictionary = (function() {
    "use strict"

    var $private = {},
        $public = {};

    /**
     * Private Variables
     */
    
    /**
     * @name patriciaDictionary~dictionary
     * @type {Object}
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
     * @class patriciaDictionary~Node
     * @param {Boolean} is_word
     * @param {Object}  nextNodes
     */
    $private.Node = function (is_word, nextNodes) {
        this.is_word = is_word == undefined ?  true : is_word;
        this.nextNodes = nextNodes || {};
    }
    
    /**
     * @method patriciaDictionary~compareWords
     * @return {Array} Array[0] can be  [-1: different, 0: equals, 
     *                                          1: word1 is inside word2,
     *                                          2: word2 is inside word1,
     *                                          3: have some in similar].
     *                          Array[1] it will be the similar part(String). And 
     *                          next 2 it will the differences(Strings)
     *
     * @example
     * //returns [-1]
     * patriciaDictionary.compareWords('romane', 'slower');
     * // returns [0]
     * patriciaDictionary.compareWords('slower', 'slower');
     * // returns [1, 'roman', ', 'us']
     * patriciaDictionary.compareWords('roman', 'romanus');
     * // returns [2, 'roman', 'us', ']
     * patriciaDictionary.compareWords('romanus', 'roman');
     * // returns [3, 'roman', 'e', 'us']
     * patriciaDictionary.compareWords('romane', 'romanus');
     */
    $private.compareWords = function (word1, word2) {
        var length = word1.length < word2.length ? word1.length : word2.length,
            similar_word = '',
            remainder1 = '',
            remainder2 = '',
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
            // Have something in similar but aren't inside each other
            compare_value = 3;
        }
        return [compare_value, similar_word, remainder1, remainder2]

    };

    /**
     * @method patriciaDictionary~fillDictionary
     * @description Get an array of strings and put inside the dictionary as patricia trie
     * @param  {Array(String)} words
     * @param  {Object:Node} root
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
            should_count_words = data.should_count_words == undefined ? 
                true : data.should_count_words,
            is_word_different = false;


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
                            is_word_different = true;
                            break;

                        case 0:
                            nextNodes[key].is_word = true;
                            should_go_for_next_word = true;
                            is_word_different = false;
                            break;

                        case 1:
                            $private.fillDictionary([comparisionResult[3]], 
                                { 
                                    should_count_words: false, 
                                    root: nextNodes[key] 
                            });
                            should_go_for_next_word = true;
                            is_word_different = false;
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
                            actualNode = data.root || $private.dictionary.root;
                            is_word_different = false;
                            break;

                        case 3:
                            actualNode.nextNodes[ comparisionResult[1] ] = new $private.Node(false);

                            temporaryNode = actualNode.nextNodes[key];
                            delete actualNode.nextNodes[key];

                            actualNode = actualNode.nextNodes[ comparisionResult[1] ];

                            actualNode.nextNodes[ comparisionResult[2] ] = temporaryNode;
                            actualNode.nextNodes[ comparisionResult[3] ] = new $private.Node();

                            should_go_for_next_word = true;
                            actualNode = data.root || $private.dictionary.root;
                            is_word_different = false;
                            break;
                    }

                    if(should_go_for_next_word) {
                        should_go_for_next_word = false;
                        break;
                    }
                }

                if(is_word_different) {
                    is_word_different = false;
                    nextNodes[ words[index] ] = new $private.Node();
                }

            }
        }
    }

    // -----------------------------------

    /**
     * Public Methods
     */
    
    /**
     * @method patriciaDictionary.initialize
     * @param  {Array(String)} words Your dictionary
     */
    $public.initialize = function (words) {
        $private.fillDictionary(words, { should_count_words: true });
    };

    /**
     * @method patriciaDictionary.search
     * @description Search a word in dictionary
     * @param  {String} word 
     * @return {Boolean}
     */
    $public.search = function (word, data) {
        var key,
            comparisionResult,
            data = data || {},
            actualNode = data.root || $private.dictionary.root,
            nextNodes = actualNode.nextNodes;



        for(key in nextNodes) {
            comparisionResult = $private.compareWords(key, word);

            // To understand the numbers see $private.compareWords()
            switch (comparisionResult[0]) {
                case -1:
                    /* Just go for the next key
                       Just making the case explicit. 
                       This case isn't necessary
                    */ 
                    break;

                case 0:
                    return nextNodes[key].is_word;

                case 1:
                    return $public.search(comparisionResult[3], { root: nextNodes[key] });
                    break;

                case 2:
                case 3:
                    return false;
            }
        }
        return false;
    };

    /**
     * @method patriciaDictionary.getDictionary
     * @return {Object} Patricia dictionary
     */
    $public.getDictionary = function () {
        return $private.dictionary;
    }

    // -----------------------------------
    return $public;

})();


// Global
this.patriciaDictionary = patriciaDictionary;

}();
