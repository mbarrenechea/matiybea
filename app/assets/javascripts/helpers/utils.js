/**
 * A wrapper for CartoDB
 * More info: http://docs.cartodb.com/cartodb-platform/cartodb-js.html
 */
window.utilsHelper = {

  SMALL_SCREEN: 1050,

  w: window,

  d: document,

  getWindowWidth: function() {
    var e = this.d.documentElement,
        g = this.d.getElementsByTagName('body')[0];
    return  this.w.innerWidth || e.clientWidth || g.clientWidth;
  },

  getWindowHeight: function() {
    var e = this.d.documentElement,
        g = this.d.getElementsByTagName('body')[0];
    return  this.w.innerHeight|| e.clientHeight|| g.clientHeight;
  },

  isSmallScreen: function() {
    return (this.getWindowWidth() < this.SMALL_SCREEN)      
  }


};
