var util = util || {};
util.toArray = function (list) {
    return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal ||
function (cmdLineContainer, outputContainer) {
    window.URL = window.URL || window.webkitURL;

    var cmdLine_ = document.querySelector(cmdLineContainer);
    var output_ = document.querySelector(outputContainer);
    var VERSION_ = '3.0';
    var CMDS_ = ['about', 'awards', 'clear', 'date', 'help', 'projects', 'resume', 'theme', 'version'];
    var THEMES_ = ['glitch', 'black'];
    var fs_ = null;
    var cwd_ = null;
    var history_ = [];
    var histpos_ = 0;
    var histtemp_ = 0;

    window.addEventListener('click', function (e) {
        cmdLine_.focus();
    }, false);

    cmdLine_.addEventListener('click', inputTextClick_, false);
    cmdLine_.addEventListener('keydown', historyHandler_, false);
    cmdLine_.addEventListener('keydown', processNewCommand_, false);

    function inputTextClick_(e) {
        this.value = this.value;
    }

    function historyHandler_(e) {
        if (history_.length) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                if (history_[histpos_]) {
                    history_[histpos_] = this.value;
                } else {
                    histtemp_ = this.value;
                }
            }
            if (e.keyCode == 38) {
                histpos_--;
                if (histpos_ < 0) {
                    histpos_ = 0;
                }
            } else if (e.keyCode == 40) {
                histpos_++;
                if (histpos_ > history_.length) {
                    histpos_ = history_.length;
                }
            }
            if (e.keyCode == 38 || e.keyCode == 40) {
                this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
                this.value = this.value;
            }
        }
    }

    function processNewCommand_(e) {
        if (e.keyCode == 9) {
            e.preventDefault();
        } else if (e.keyCode == 13) {
            if (this.value) {
                history_[history_.length] = this.value;
                histpos_ = history_.length;
            }
            var line = this.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id');
            line.classList.add('line');
            var input = line.querySelector('input.cmdline');
            input.autofocus = false;
            input.readOnly = true;
            output_.appendChild(line);
            $('a[rel=external]').attr('target', '_blank');
            if (this.value && this.value.trim()) {
                var args = this.value.split(' ').filter(function (val, i) {
                    window.top.document.getElementById('soundtrack-type').play();
                    return val;
                });
                var cmd = args[0].toLowerCase();
                args = args.splice(1);
            }
            switch (cmd) {

            // about

            case 'about':
                output("<pre class='hello'>██╗  ██╗███████╗██╗     ██╗      ██████╗ <br/>██║  ██║██╔════╝██║     ██║     ██╔═══██╗<br/>███████║█████╗  ██║     ██║     ██║   ██║<br/>██╔══██║██╔══╝  ██║     ██║     ██║   ██║<br/>██║  ██║███████╗███████╗███████╗╚██████╔╝<br/>╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ </pre> <p>My name is Guilherme Pangnotta.<br/>I'm a web developer and web designer from Belo Horizonte, Brazil.</p>");
                break;

            // awards

            case 'awards':
                output("<pre>┌─┐┬ ┬┌─┐┬─┐┌┬┐┌─┐<br/>├─┤│││├─┤├┬┘ ││└─┐<br/>┴ ┴└┴┘┴ ┴┴└──┴┘└─┘</pre> <ul> <li><strong>Awwwards</strong> _ Sete Três v1 / <i>Site of the Day</i></li> <li><strong>CSS Awards</strong> _ Sete Três v1 / <i>Site of the Day</i></li> <li><strong>Design Taxi</strong> _ Sete Três v1 / <i>Site of the Day</i></li> <li><strong>The FWA</strong> _ Sete Três v1 / <i>Public Shortlist</i></li> <li><strong>One Page Love</strong> _ InkStarter.cc / <i>Site of the Day</i></li> <li><strong>Popai Brasil 2013</strong> _ Citibank Totem / <i>Gold on Digital Signage</i> via <a href='http://jchebly.com.br' rel='external'>JCHEBLY</a></li> </ul>"); break;

            // clear

            case 'clear':
                output_.innerHTML = '';
                this.value = '';
                return;

            // date

            case 'date':
                output("<p>" + (new Date()).toLocaleString() + "</p>");
                break;

            // help

            case 'help':
                output("<div class='ls-files'><p>" + CMDS_.join('<br/>') + "</p></div>");
                break;

            // projects

            case 'projects':
                output("<pre>┌─┐┌─┐┬─┐┌─┐┌─┐┌┐┌┌─┐┬    ┌─┐┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐┌─┐<br/>├─┘├┤ ├┬┘└─┐│ ││││├─┤│    ├─┘├┬┘│ │ │├┤ │   │ └─┐<br/>┴  └─┘┴└─└─┘└─┘┘└┘┴ ┴┴─┘  ┴  ┴└─└─┘└┘└─┘└─┘ ┴ └─┘</pre> <ul> <li><a href='http://inkstarter.cc' rel='external'>InkStarter.cc</a> <i>You draw. You vote. I tattoo myself!</i></li> <li><a href='http://1997.setetres.st' rel='external'>1997</a> <i>Feeling responsively nostalgic?</i></li> <li><a href='http://v1.setetres.st' rel='external'>v1</a> <i>Award winning v1.0 of my website.</i></li> <li><a href='http://v2.setetres.st' rel='external'>v2</a> <i>v2.0 of my website.</i></li> <li><a href='http://go.setetres.st/starter' rel='external'>Starter</a> <i>A quick-start responsive framework for frontend development.</i></li> <li><a href='http://go.setetres.st/sasstarter' rel='external'>Sasstarter</a> <i>A quick-start responsive framework for frontend development with Sass.</i></li> <li><a href='http://puta.nu' rel='external'>PUTA.nu</a> <i>Porn Under Traditional Arts <sup>Soon</sup></i></li> </ul> <pre>┌─┐┬─┐┌─┐┌─┐┌─┐┌─┐┌─┐┬┌─┐┌┐┌┌─┐┬    ┌─┐┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐┌─┐<br/>├─┘├┬┘│ │├┤ ├┤ └─┐└─┐││ ││││├─┤│    ├─┘├┬┘│ │ │├┤ │   │ └─┐<br/>┴  ┴└─└─┘└  └─┘└─┘└─┘┴└─┘┘└┘┴ ┴┴─┘  ┴  ┴└─└─┘└┘└─┘└─┘ ┴ └─┘</pre> <ul> <li><a href='http://cemporcentomp.com.br' rel='external'>100% Marca Própria</a> <i>HTML + CSS + JS</i> via <a href='http://jchebly.com.br' rel='external'>JCHEBLY</a></li> <li><a href='http://newtonpaiva.br' rel='external'>Newton</a> <i>HTML + CSS + JS</i> via <a href='http://jchebly.com.br' rel='external'>JCHEBLY</a></li> <li><a href='http://belo2014.com.br' rel='external'>Belo 2014</a> <i>HTML + CSS + JS</i> via <a href='http://jchebly.com.br' rel='external'>JCHEBLY</a></li> <li><a href='http://jchebly.com.br' rel='external'>JCHEBLY</a> <i>HTML + CSS + JS</i> via <a href='http://jchebly.com.br' rel='external'>JCHEBLY</a></li> <li><a href='http://dmsports.co' rel='external'>DM Sports</a> <i>HTML + CSS + JS + Wordpress</i></li> <li><a href='http://dsmais.com.br' rel='external'>DS+</a> <i>HTML + CSS + JS + Wordpress</i></li> </ul>"); break;

            // resume

            case 'resume':
                output("<pre>┌─┐┬ ┬┬─┐┬─┐┌─┐┌┐┌┌┬┐<br/>│  │ │├┬┘├┬┘├┤ │││ │ <br/>└─┘└─┘┴└─┴└─└─┘┘└┘ ┴ </pre> <p><strong>Frontend Developer</strong> @ <a href='http://jchebly.com.br' rel='external'>JCHEBLY</a> <i>Since September 2010</i></p> <pre>┌─┐┌─┐┌─┐┌┬┐<br/>├─┘├─┤└─┐ │ <br/>┴  ┴ ┴└─┘ ┴ </pre> <ul> <li><strong>AgênciaClick Isobar</strong> <i>June 2009 – August 2010</i></li> <li><strong>Sense8</strong> <i>September 2008 – May 2009</i></li> <li><strong>HouseID</strong> <i>September 2007 – May 2008</i></li> </ul> <pre>┌─┐┌┬┐┬ ┬┌─┐┌─┐┌┬┐┬┌─┐┌┐┌<br/>├┤  │││ ││  ├─┤ │ ││ ││││<br/>└─┘─┴┘└─┘└─┘┴ ┴ ┴ ┴└─┘┘└┘</pre> <p><strong>Advertising</strong> @ <a href='http://newtonpaiva.br' rel='external'>Newton</a></p>"); break;

            // theme

            case 'theme':
                var theme = args.join(' ');
                if (!theme) {
                    output("<p>" + ['usage: ', cmd, ' ' + THEMES_.join('|')].join('') + "</p>");
                } else {
                    var matchedThemes = THEMES_.join('|').match(theme);
                    if (matchedThemes && matchedThemes.length) {
                        setTheme_(theme);
                    } else {
                        output("<p>" + "Error - Unrecognized theme used" + "</p>");
                    }
                }
                break;

            // version

            case 'version':
            case 'ver':
                output("<p>" + VERSION_ + "</p>");
                break;

            // command not found

            default:
                if (cmd) {
                    output("<p>" + cmd + ": command not found. Type 'help' to list all avaiable commands" + "</p>");
                }
            }

            window.scrollTo(0, document.body.scrollHeight);
            this.value = '';
        }
    }

    function setTheme_(theme) {
        var currentUrl = document.location.pathname;
        if (!theme || theme == 'glitch') {
            localStorage.removeItem('theme');
            document.body.className = '';
            return;
        }
        if (theme) {
            document.body.classList.add(theme);
            localStorage.theme = theme;
        }
    }

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
    }

    return {
        initFS: function (persistent, size) {
            output("<p><span>" + document.title + " (v" + VERSION_ + ")</span> &#8212; " + (new Date()).toLocaleString() + "</p>");
            output("<p>Type 'help' to list all avaiable commands</p>");
        },
        output: output,
        setTheme: setTheme_
    };
};