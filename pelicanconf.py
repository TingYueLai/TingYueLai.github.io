AUTHOR = 'Peter Yue'
SITENAME = 'Yue 的blog'
SITEURL = 'http://TingYueLai.github.io'
FEED_DOMAIN = SITEURL

PATH = 'content'
THEME = 'themes/mytheme'

TIMEZONE = 'Asia/Taipei'

DEFAULT_LANG = 'zh-TW'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

FEED_ALL_JSON = 'feeds/all.json'

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

# Custom Menu
MENUITEMS = (
    ('刷題記錄', 'category/shua-ti-ji-lu.html'),
    ('有趣的程式', 'category/you-qu-de-cheng-shi.html'),
    ('廢文專區', 'category/fei-wen-zhuan-qu.html'),
    ('好文推薦', 'category/hao-wen-tui-jian.html'),
    ('ABOUT ME', 'pages/about.html'),
)

DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

TEMPLATE_PAGES = {'search_json.html': 'feeds/all.json'}

# Static files (CNAME for custom domain)
STATIC_PATHS = ['extra', 'images']
EXTRA_PATH_METADATA = {
    'extra/CNAME': {'path': 'CNAME'},
}
