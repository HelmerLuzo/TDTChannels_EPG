/* ==========================================================================
   Main
   ========================================================================== */

var main = {

    init: function ()
    {
        /*
         * Components
         */

        components.epg();
        components.days();
    }
};

/* ==========================================================================
   Components
   ========================================================================== */

var components = {

    /* EPG
       ========================================================================== */

    epg: function ()
    {
        var component_epg = $('[data-component="epg"]');

        if (component_epg.length > 0)
        {
            /*
             * Initialize
             */

            var epg_start = component_epg.data('start');
            var epg_grid = $('.epg-grid', component_epg);
            var epg_grid_scroll = 0;

            if (typeof epg_start !== 'undefined' && epg_start !== '')
            {
                // Scroll the grid to the specified starting point
                scrollEPG(epg_start - 120);
            }

            /**
             * Controls
             */

            var action_prev = $('[data-action="prev"]', component_epg);
            var action_prev_icon = $('.icon', action_prev);
            var action_next = $('[data-action="next"]', component_epg);
            var action_next_icon = $('.icon', action_next);

            /* Previous */
            action_prev.on('click', function (e)
            {
                e.preventDefault();

                scrollEPG(-Math.abs(240));
            });

            /* Next */
            action_next.on('click', function (e)
            {
                e.preventDefault();

                scrollEPG(240);
            });

            var scroll_top = 0;
            var grid_height = epg_grid.height();

            $(window).on('scroll', function ()
            {
                scroll_top = $(window).scrollTop();

                console.log(scroll_top);

                if (scroll_top >= grid_height)
                {
                    action_prev_icon.css('position', 'relative');
                    action_next_icon.css('position', 'relative');
                }
                else
                {
                    action_prev_icon.css('position', 'fixed');
                    action_next_icon.css('position', 'fixed');
                }
            });
        }

        /**
         * Scroll the EPG grid the specified distance
         */

        function scrollEPG(distance)
        {
            epg_grid_scroll = epg_grid.scrollLeft();

            epg_grid.stop(true, true).animate({
                scrollLeft: epg_grid_scroll + distance
            }, 500);
        }
    },

    /* Days
       ========================================================================== */

    days: function ()
    {
        var component_days = $('[data-component="days"]');

        if (component_days.length > 0)
        {
            var toggle = $('[data-action="toggle"]', component_days);
            var toggle_icon = $('.icon', toggle);
            var icon_down = 'fa-angle-down';
            var icon_up = 'fa-angle-up';

            toggle.on('click', function (e)
            {
                e.preventDefault();

                // Toggle the display of all other items
                $('li[class!="today"]', component_days).toggle();

                // Toggle the class
                if (toggle_icon.hasClass(icon_down))
                {
                    toggle_icon.removeClass(icon_down);
                    toggle_icon.addClass(icon_up);
                }
                else
                {
                    toggle_icon.removeClass(icon_up);
                    toggle_icon.addClass(icon_down);
                }
            });
        }
    }
};