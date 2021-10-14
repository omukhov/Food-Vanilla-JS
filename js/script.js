window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          calculator = require('./modules/calculator'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          slider = require('./modules/slider'),
          timer = require('./modules/timer');

    tabs();
    modal();
    calculator();
    cards();
    forms();
    slider();
    timer();
});