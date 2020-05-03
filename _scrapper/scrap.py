import requests
import json
import re
import os
import shutil
import datetime
from PIL import Image


def resize(filename, width):
    image = Image.open('temp/'+filename+'.png')
    w, h = image.size
    image = image.resize((width, int((width/w)*h)), Image.ANTIALIAS)
    quality_val = 90
    image.save('projects/images/'+filename+'.png', 'PNG', quality=quality_val)


def download(url, filename):
    r = requests.get(url)
    open('temp/'+filename+'.png', 'wb').write(r.content)


def saveRepo():
    print('Saving Repo')
    response = requests.get('https://api.github.com/users/imlolman/repos?page=1&per_page=100')
    response.encoding = 'utf-8'
    open('temp/repos.json', encoding="utf-8", mode='w+').write(response.text)


def setupFolders():
    if(os.access('temp', os.R_OK)):
        shutil.rmtree('temp')
    os.mkdir('temp')

    if(os.access('projects', os.R_OK)):
        shutil.rmtree('projects')
    os.mkdir('projects')

    if(os.access('projects/images', os.R_OK)):
        shutil.rmtree('projects/images')
    os.mkdir('projects/images')


def downloadNresize():
    data = open('temp/repos.json', encoding="utf-8", mode='r+').read()
    repos = json.loads(data)
    reposToPublish = []

    for repo in repos:
        if(repo['has_pages']):
            reposToPublish.append(repo)

    print("Downloading and Resizing Image")

    open('projects/repos.json', 'w+',
         encoding="utf-8").write(json.dumps(reposToPublish))

    for repo in reposToPublish:
        response = requests.get(repo['html_url'])
        response.encoding = 'utf-8'

        data = response.text

        match = re.search('<meta property="og:image" content="(.*?)" />', data)

        if match:
            download(match.group(1), repo['name'])
            resize(repo['name'], 500)

    print(str(len(reposToPublish))+' repos Done, You are good to go.')


def formatSitemap(url, priority):
    return """  <url>
    <loc>""" + str(url) + """</loc>
    <lastmod>""" + str(datetime.date.today()) + """</lastmod>
    <changefreq>weekly</changefreq>
    <priority>""" + str(priority) + """</priority>
  </url>
"""


def generateSitemap(urls):
    map = """<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n"""
    for url in urls:
        map += formatSitemap(url['url'], url['priority'])
    map += """</urlset>"""
    return map


def writeSitemap():
    data = open('temp/repos.json', encoding="utf-8", mode='r+').read()
    repos = json.loads(data)
    urls = [{
        "url": "https://imlolman.github.io",
        "priority": 0.9
    },
        {
        "url": "https://imlolman.github.io/donateWithPaytm",
        "priority": 0.3
    },
        {
        "url": "https://imlolman.github.io/donate",
        "priority": 0.3
    },
        {
        "url": "https://imlolman.github.io/privacyPolicy",
        "priority": 0.4
    },        {
        "url": "https://imlolman.github.io/support",
        "priority": 0.4
    },        {
        "url": "https://imlolman.github.io/allProjects",
        "priority": 0.8
    }]

    for repo in repos:
        if(repo['has_pages']):
            urls.append({"url": "https://imlolman.github.io/" +
                         repo['name'], "priority": 0.6})

    open('sitemap.xml', 'w+').write(generateSitemap(urls))
    print('Sitemap Written')


def removeTempFile():
    if(os.access('temp', os.R_OK)):
        shutil.rmtree('temp')


setupFolders()
saveRepo()
writeSitemap()
downloadNresize()
removeTempFile()
