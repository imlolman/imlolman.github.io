var repoURLs = [
    /* 0  */ 'https://github.com/imlolman/blog/',
    /* 1  */ 'https://github.com/imlolman/Clip-Path-Animation-CSS/',
    /* 2  */ 'https://github.com/imlolman/Collage-Result/',
    /* 3  */ 'https://github.com/imlolman/Copy-Pasta/',
    /* 4  */ 'https://github.com/imlolman/CORS-bypass-tools/',
    /* 5  */ 'https://github.com/imlolman/Dominoes-2D-Simulator-using-Box-2D-and-zim/',
    /* 6  */ 'https://github.com/imlolman/Don-t-Blink/',
    /* 7  */ 'https://github.com/imlolman/Drag-N-Drop-Colors-in-Canvas-now-with-touch-controls/',
    /* 8  */ 'https://github.com/imlolman/DVD-Logo-Animation/',
    /* 9  */ 'https://github.com/imlolman/Firebase-Random-Caller/',
    /* 10 */ 'https://github.com/imlolman/Flappy-Bird-in-P5js/',
    /* 11 */ 'https://github.com/imlolman/Flat-UI-Colors-Chrome-App/',
    /* 12 */ 'https://github.com/imlolman/Font-Awesome-Offline-Quick-Icon-Search/',
    /* 13 */ 'https://github.com/imlolman/From-Wallpaper-To-Clock/',
    /* 14 */ 'https://github.com/imlolman/Guess-Nihongo/',
    /* 15 */ 'https://github.com/imlolman/Image-Vector-Transformation/',
    /* 16 */ 'https://github.com/imlolman/imlolman.github.io/',
    /* 17 */ 'https://github.com/imlolman/JSON-to-Firebase-Firestore/',
    /* 18 */ 'https://github.com/imlolman/Logo/',
    /* 19 */ 'https://github.com/imlolman/Multitouch-Tester/',
    /* 20 */ 'https://github.com/imlolman/Paytm-Payment-Gateway-Integration-using-Google-Cloud-Function/',
    /* 21 */ 'https://github.com/imlolman/Simple-Project-for-Collage-HTML/',
    /* 22 */ 'https://github.com/imlolman/Simple-Subnets-Generator/',
    /* 23 */ 'https://github.com/imlolman/Snake-Game-p5js/',
    /* 24 */ 'https://github.com/imlolman/Space-Invader-p5js/',
    /* 25 */ 'https://github.com/imlolman/Symmetry-Painter/',
    /* 26 */ 'https://github.com/imlolman/WC-ScoreBoard/',
    /* 27 */ 'https://github.com/imlolman/WSS-Tester/',
    /* 28 */ 'https://github.com/imlolman/Minesweeper-AI/',
    /* 29 */ 'https://github.com/imlolman/TicTacToe-AI/',
    /* 30 */ 'https://github.com/imlolman/Falling-Sand-Simulator/',

    ]
    
    
    var redirectIfBlog = () => {
        if(document.URL == 'https://imlolman.github.io/blog/'){
            window.location = "https://medium.com/imlolman"
        }
    }
    
    var getRepoURL = () => 'https://github.com/imlolman/'+document.URL.split('//')[1].split('/')[1]+'/';
    
    var addForkBox = () => {
        g = document.createElement('div');
        g.setAttribute("id", "forkBox");
        g.innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css" />'
        repoURL = getRepoURL()
        lb=[repoURLs[3],repoURLs[7],repoURLs[25],repoURLs[11],repoURLs[27],repoURLs[28],repoURLs[29], repoURLs[12], repoURLs[30]]
        if(lb.includes(repoURL)){
            g.innerHTML += '<a class="github-fork-ribbon left-bottom fixed" href="'+getRepoURL()+'" data-ribbon="Star me on GitHub" title="Star me on GitHub">Star me on GitHub</a>'
        }else{
            g.innerHTML += '<a class="github-fork-ribbon fixed" href="'+getRepoURL()+'" data-ribbon="Star me on GitHub" title="Star me on GitHub">Star me on GitHub</a>'
        }
        document.body.appendChild(g)
    }
    
    redirectIfBlog()
    
    window.addEventListener("load",function(event) {
        addForkBox()
    },false);
    
    
    /*
    https://imlolman.github.io/blog 
    https://imlolman.github.io/Clip-Path-Animation-CSS
    https://imlolman.github.io/Collage-Result
    https://imlolman.github.io/Copy-Pasta
    https://imlolman.github.io/CORS-bypass-tools
    https://imlolman.github.io/Dominoes-2D-Simulator-using-Box-2D-and-zim
    https://imlolman.github.io/Don-t-Blink
    https://imlolman.github.io/Drag-N-Drop-Colors-in-Canvas-now-with-touch-controls
    https://imlolman.github.io/DVD-Logo-Animation
    https://imlolman.github.io/Firebase-Random-Caller
    https://imlolman.github.io/Flappy-Bird-in-P5js
    https://imlolman.github.io/Flat-UI-Colors-Chrome-App
    https://imlolman.github.io/Font-Awesome-Offline-Quick-Icon-Search
    https://imlolman.github.io/From-Wallpaper-To-Clock
    https://imlolman.github.io/Guess-Nihongo
    https://imlolman.github.io/Image-Vector-Transformation
    https://imlolman.github.io/imlolman.github.io
    https://imlolman.github.io/JSON-to-Firebase-Firestore
    https://imlolman.github.io/Logo
    https://imlolman.github.io/Multitouch-Tester
    https://imlolman.github.io/Paytm-Payment-Gateway-Integration-using-Google-Cloud-Function
    https://imlolman.github.io/Simple-Project-for-Collage-HTML
    https://imlolman.github.io/Simple-Subnets-Generator
    https://imlolman.github.io/Snake-Game-p5js
    https://imlolman.github.io/Space-Invader-p5js
    https://imlolman.github.io/Symmetry-Painter
    https://imlolman.github.io/WC-ScoreBoard
    https://imlolman.github.io/WSS-Tester
    https://imlolman.github.io/Minesweeper-AI
    */