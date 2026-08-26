(function () {
  function init() {
    var links = document.querySelectorAll('[data-comms-tab]');
    var panels = document.querySelectorAll('.comms-panel');

    if (!links.length || !panels.length) {
      return;
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = link.getAttribute('data-comms-tab');

        links.forEach(function (l) {
          var li = l.closest('.x-govuk-secondary-navigation__list-item');
          if (li) {
            li.classList.remove('x-govuk-secondary-navigation__list-item--current');
          }
          l.removeAttribute('aria-current');
        });

        var activeLi = link.closest('.x-govuk-secondary-navigation__list-item');
        if (activeLi) {
          activeLi.classList.add('x-govuk-secondary-navigation__list-item--current');
        }
        link.setAttribute('aria-current', 'page');

        panels.forEach(function (panel) {
          panel.hidden = (panel.id !== targetId);
        });
      });
    });

    var secondaryNavMap = {
      'other': 'comms-other',
      'ptm': 'comms-ptm',
      'pcd': 'comms-pcd',
      'vcl': 'comms-vcl'
    };
    var params = new URLSearchParams(window.location.search);
    var secondaryNav = params.get('secondaryNav');
    var targetSubTab = secondaryNav && secondaryNavMap[secondaryNav];
    if (targetSubTab) {
      var targetLink = document.querySelector('[data-comms-tab="' + targetSubTab + '"]');
      if (targetLink) {
        targetLink.click();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
