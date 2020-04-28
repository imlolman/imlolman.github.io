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
    g.innerHTML += '<a class="github-fork-ribbon" href="'+getRepoURL()+'" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>'
    document.body.appendChild(g)
}

redirectIfBlog()
window.onload = (event) => {
    addForkBox()
};