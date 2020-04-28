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
    if(repoURL == repoURLs[7] || repoURL == repoURLs[25 ] || repoURL == repoURLs[11]){
        g.innerHTML += '<a class="github-fork-ribbon left-bottom fixed" href="'+getRepoURL()+'" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>'
    }else{
        g.innerHTML += '<a class="github-fork-ribbon" href="'+getRepoURL()+'" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>'
    }
    document.body.appendChild(g)
}

redirectIfBlog()

window.addEventListener("load",function(event) {
    addForkBox()
},false);