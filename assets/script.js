function loadProjects(x = 0) {
  fetch('https://api.github.com/users/imlolman/repos?page=1&per_page=100').then((resp) => resp.json()).then(data => {
    data.sort(function (a, b) {
      var keyA = a.id,
        keyB = b.id;
      // Compare the 2 dates
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    projects = []
    data.forEach(repo => {
      if (repo.has_pages) {
        template = `
                <div class="col-md-4 mb-2">
                <div class="card" style="width: 100%;height: 100%">
                  <div class="card-img"><img src="` + `/projects/images/` + repo.name + `.png" onerror="this.setAttribute('src','http://corsbypass.000webhostapp.com/og-image.php?url=` + repo.html_url + `&resolution=500x300&quality=10&crop=false')" class="card-img-top"
                      onerror="this.style.display='none'" alt="⌛ Loading ` + repo.name.replace(/-/g, ' ') + ` Thumbnail.">
                    <div class="updated"><i class="fa fa-clock-o" aria-hidden="true"></i> Created ` + moment(repo.created_at).fromNow() + `. </div>
                    <div class="open-source-code"><a href="` + repo.html_url + `" target="_blank">
                    Source Code <i class="fa fa-book" aria-hidden="true"></i> </a></div>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title"><a href="https://imlolman.github.io/` + repo.name + `" target="_blank"> <i class="fa fa-github" aria-hidden="true"></i> ` + repo.name.replace(/-/g, ' ') + `</a></h5>
                    <p class="card-text">` + repo.description + `</p>
                    <br><br>
                    <a href="https://imlolman.github.io/` + repo.name + `" target="_blank"
                      class="btn btn-primary open-project-btn"> Open Working Project &nbsp; <i class="fa fa-share-square-o" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
              `
        projects.push(template);
      }
    });

    document.getElementById('projects').innerHTML = projects.splice(0, x).join('');
  }).catch(error => console.log(error));
}