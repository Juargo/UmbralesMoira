angular.module("umbralesApp")
    .factory("plot", function () {
        plot1 = undefined;
        return {
            getPlot: function () {
                return plot1;
            },

            setPlot: function (data) {
                plot1 = $.jqplot('myChart', data, {
                    title: "Umbrales",
                    series: [
                        {
                            renderer: $.jqplot.LineRenderer,
                            color: 'pink',
                            isDragable: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 3.0 }
                        },
                        {
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        }
                    ],
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.DateAxisRenderer,
                            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                            tickOptions: {
                                formatString: "%H:%M"
                            }
                        }
                    },
                    highlighter: {
                        tooltipAxes: 'both',
                        yvalues: 3,
                        formatString: '<table class="jqplot-highlighter"><tr><td>hi:</td><td>%s</td></tr><tr><td>low:</td><td>%s</td></tr><tr><td>close:</td><td>%s</td></tr></table>'
                    }
                });
            }

        }
    })