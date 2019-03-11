$(document).ready(function() {

    // build grid

    let $grid = document.querySelector('.grid');
    const COLORS = ['lightgreen','lightblue','lightsalmon','magenta','teal','goldenrod'];
    const SQUARES = [
      {
        t: 'resume',
        bg: '',
        type: 'resume',
        content: '<a data-label="resume-download" class="icon-link resume-download" href="https://drive.google.com/open?id=1QVTzBCh2D_9D_PyNe3pBm8X-fpUHBDPm">'+
                 '<i class="fa fa-cloud-download" aria-hidden="true"></i></a>'
      },
      {
        t: 'codepen',
        bg: '',
        type: 'codepen',
        content: '<a data-label="codepen" class="icon-link codepen" href="https://codepen.io/brandoncanaday">'+
                 '<i class="fa fa-codepen" aria-hidden="true"></i></a>'
      },
      {
        t: 'projects',
        bg: '',
        type: 'projects',
        content: '<a data-label="github" class="icon-link github" href="https://github.com/brandoncanaday">'+
                 '<i class="fa fa-github" aria-hidden="true"></i></a>'
      },
      {
        t: 'about',
        bg: 'url(assets/about_me.jpg)',
        type: 'about',
        content: ''
      },
      {},
      {},
      {},
      {}
    ];

    // makes sure the sq covered by the sun never has a word in it

    while(shuffleArray(SQUARES)[1].t);

    // make $boxes for grid

    for(let i = 0, c = 0, s = 0; i < SQUARES.length; i++, c++) {
      // just keep cycling thru colors
      if(c == COLORS.length) c = 0;
      let $box;
      if(!SQUARES[i].t) {
        $box = createBox({
          bg: COLORS[c]
        });
      } else {
        $box = createBox({
          title: SQUARES[i].t,
          bg: (SQUARES[i].bg ? SQUARES[i].bg : COLORS[c]),
          content: SQUARES[i].content,
          type: SQUARES[i].type
        });
      } // if/else
      $grid.appendChild($box);
    } // for

    // google analytics event tracking prior to href nagivation

    $('.icon-link').click(() => {
      let eventLabel = $(this).attr('data-label');
      gtag('event', 'link_click', {
        'event_category': 'engagement',
        'event_label': eventLabel
      });
    });

    // lazy-load images

    $('img').unveil(200, function() {
      $(this).load(function() {
        this.style.opacity = 1;
      });
    });

    // sun/profile pic effect

    $('.me-wrap').mouseenter(function() {
        $('.header').css('background','linear-gradient(#A0D2F3,#A0D2F3)');
        $('.header').css('boxShadow','0px -30px 60px -25px blanchedalmond inset');
        $('body').css('background','linear-gradient(#FBE997,#FBE997)');
    }).mouseleave(function() {
        $('.header').css('background','linear-gradient(#FBE997,#FBE997)');
        $('.header').css('boxShadow','0px 5px 50px 5px blanchedalmond');
        $('body').css('background','linear-gradient(#A0D2F3,#A0D2F3)');
    });

    // FUNCTION DEFINITIONS

    function createBox(options) {
      // handle params
      let t = options.title || '';
      let r = options.rows || 5;
      let c = options.cols || r;
      let bg = options.bg || "white";
      let content = options.content || '';
      let type = options.type || 'empty';
      // create necessary elements
      let $box = document.createElement('div');
      let $title = document.createElement('h1');
      let $content = document.createElement('div');
      let $overlay = createOverlay(r,c);
      // modfiy css of box and its children
      $box.className     += ' box';
      $box.className     += ' '+type;
      $title.className   += ' title';
      $content.className += ' content';
      $box.style.background = bg;
      $title.innerHTML      = t;
      $content.innerHTML    = content;
      // append children to box
      $box.appendChild($title);
      $box.appendChild($overlay);
      $box.appendChild($content);
      return $box;
    } // createBox

    function createOverlay(rows,cols) {
      let r = rows || 5;
      let c = cols || r;
      let $overlay = document.createElement('div');
      $overlay.className += ' overlay';
      $overlay.style.gridTemplateRows = 'repeat('+r+',1fr)';
      $overlay.style.gridTemplateColumns = 'repeat('+c+',1fr)';
      addSquaresToOverlay(r*c,$overlay);
      return $overlay;
    } // createOverlay

    function addSquaresToOverlay(n,$overlay) {
      for(var i = 0; i < n; i++) {
        let $sq = createSq();
        $overlay.appendChild($sq);
      } // for
    } // addSquaresToOverlay

    function createSq() {
      let $sq = document.createElement('div');
      $sq.className += 'sq';
      $sq.style.transitionDelay = randomNumber(0,500)+'ms';
      return $sq;
    } // createSq

    function randomNumber(__min,__max) {
      let min = __min || 0;
      let max = __max || 10;
      let ms = Math.floor(Math.random()*(max-min+1))+min;
      return ms;
    } // randomNumber

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      } // for
      return array;
    } // shuffleArray

    //HEADER - SHRINK/EXPAND ON SCROLL // TODO: NOT WORKING, FIX

    // var lastScrollTop = 0;
    // $('html, body').scroll(function(e){
    //    e.preventDefault();
    //    var st = $(this).scrollTop();
    //    if(st > lastScrollTop) {
    //        // scroll down stuff
    //        $('.header').css('top', '-50px');
    //    } else {
    //       // scroll up stuff
    //       $('.header').css('top', '0px');
    //    }
    //    lastScrollTop = st;
    // });


    // //DYNAMIC SECTION CONTENT
    // $('section').each(function() { // load each section's title preview text from corresponding .html files
    //     var content_source = $(this).attr('id');
    //     $(this).children('span').load('sections/'+ content_source + '.html #modal-title');
    // });
    //
    // //MODAL STUFF
    // $.ajaxSetup({ cache: false }); // prevents browser from loading cached modal content, thus allowing updates to .html files
    //
    // // open modal
    // $('.modal-opener').click(function() {
    //     // prepare dynamic modal content
    //     var modal_content_source = $(this).parent().attr('id');
    //     $('.modal-header').css('backgroundImage', 'url("assets/' + modal_content_source + '.jpg")');
    //     $('.modal-title').load('sections/'+ modal_content_source + '.html #modal-title');
    //     $('.modal-body').load('sections/'+ modal_content_source + '.html #modal-text');
    //     // appear modal blur
    //     $('body').css('overflow', 'hidden');
    //     $('.modal').css('visibility', 'visible');
    //     $('.modal').css('background', 'rgba(105,105,105,.6)');
    //     // appear modal content
    //     setTimeout(function() {
    //         $('.modal .modal-content').css('visibility', 'visible');
    //         $('.modal .modal-content').css('opacity', 1);
    //     }, 200);
    // });
    //
    // // close modal
    // $('.modal .close').click(function() {
    //     // disappear modal content
    //     $('.modal .modal-content').css('opacity', 0);
    //     $('.modal .modal-content').css('visibility', 'hidden');
    //     setTimeout(function() {
    //         // disappear the modal blur
    //         $('.modal').css('background', 'rgba(105,105,105,0)');
    //         $('.modal').css('visibility', 'hidden');
    //         $('body').css('overflow', 'scroll');
    //         // reset dynamic modal content
    //         $('.modal-header').css('backgroundImage', 'none');
    //         $('.modal-title').text("");
    //         $('.modal-body').text("");
    //     }, 200);
    // });

});
