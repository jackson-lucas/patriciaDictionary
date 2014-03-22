/*!
 * library-template - Template for JS projects
 * @version v1.1.0
 * @license MIT
 */
;!function(undefined) {

var library = (function() {
    "use strict"
    
    var $private = {};
    var $public = {};

    /**
     * Private Variables
     */
    $private.privateVar = 'private var';

    // -----------------------------------

    /**
     * Public Variables
     */
    $public.publicVar = 'public var';

    // -----------------------------------

    /**
     * Private Methods
     */
    $private.privateMethod = function() {
      return 'Private method';
    };

    // -----------------------------------

    /**
     * Public Methods
     */
    $public.initialize = function() {
      return 'Init';
    };

    // -----------------------------------
    return $public;

})();


// Global
this.library = library;

}();

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
