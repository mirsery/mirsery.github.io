// 页头右上角的浅色/深色切换。
// 首屏的主题由 layout/partial/head.pug 里的内联脚本先定好；这里负责：
// 点击切换并记住选择（localStorage）；没选过时跟随系统，系统切换时跟着变；别的标签页切换后同步。
(function () {
    var root = document.documentElement;
    var button = document.querySelector('.theme-toggle');
    var prefersLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

    function savedTheme() {
        try { return localStorage.getItem('theme'); } catch (e) { return null; }
    }

    function updateButton(theme) {
        if (!button) return;
        var label = theme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
    }

    function setTheme(theme) {
        if (root.getAttribute('data-theme') === theme) return;
        root.setAttribute('data-theme', theme);
        updateButton(theme);
        // Disqus 的文字颜色是加载时按页面配色定的，换主题后重新加载评论区
        if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
            try {
                window.DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = window.disqus_identifier;
                        this.page.url = window.disqus_url;
                        this.page.title = window.disqus_title;
                    }
                });
            } catch (e) {}
        }
    }

    updateButton(root.getAttribute('data-theme'));

    if (button) {
        button.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    }

    if (prefersLight) {
        var followSystem = function (e) {
            var saved = savedTheme();
            if (saved !== 'light' && saved !== 'dark') setTheme(e.matches ? 'light' : 'dark');
        };
        if (prefersLight.addEventListener) prefersLight.addEventListener('change', followSystem);
        else if (prefersLight.addListener) prefersLight.addListener(followSystem);
    }

    window.addEventListener('storage', function (e) {
        if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) setTheme(e.newValue);
    });
})();
