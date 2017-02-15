angular.module("umbralesApp")
    .factory("plot", function () {
        plot1 = undefined;
        plot2 = undefined;
        return {
            getPlot1: function () {
                return plot1;
            },
            getPlot2: function () {
                return plot2;
            },
            setPlot: function (data) {
                var legendLabels = ['Data', 'WarningUp', 'WarningDown', 'CriticalUp', 'CriticalDown'];
                plot1 = $.jqplot('myChart', data, {
                    title: "Umbrales",
                    seriesDefaults: {
                        //renderer:$.jqplot.MekkoRenderer,
                        rendererOptions: {
                            smooth: true,
                            showBorders: false
                        }
                    },
                    // legend: {
                    //     show: true,
                    //     location: 's',
                    //     labels: legendLabels,
                    //     rendererOptions: { numberRows: 2, placement: "outside" }
                    // },
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
                    // axesDefaults: {
                    //     renderer: $.jqplot.MekkoAxisRenderer,
                    //     tickOptions: { showGridline: false }
                    // },
                    highlighter: {
                        tooltipAxes: 'both',
                        yvalues: 3,
                        formatString: '<table class="jqplot-highlighter">' +
                        '<tr><td>date:</td><td>%s</td></tr>' +
                        '<tr><td>punto:</td><td>%s</td></tr>' +
                        '</table>'
                    },
                    cursor: {
                        show: true,
                        zoom: true,
                        showTooltip: false
                    }
                });

                plot2 = $.jqplot('chart2', data, {
                    seriesDefaults: { showMarker: false },
                    series: [
                        {
                            renderer: $.jqplot.LineRenderer,
                            color: 'pink',
                            isDragable: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 3.0 }
                        },
                        {
                            show: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            show: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            show: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            show: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        }
                    ],
                    cursor: {
                        show: true,
                        showTooltip: false,
                        zoom: true,
                        constrainZoomTo: 'x'
                    },
                    seriesDefaults: {
                        //renderer:$.jqplot.MekkoRenderer,
                        rendererOptions: {
                            smooth: true,
                            showBorders: false
                        }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.DateAxisRenderer,
                            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                            tickOptions: {
                                formatString: "%H:%M"
                            }
                        }
                    }
                });

                $.jqplot.Cursor.zoomProxy(plot1, plot2);

                $.jqplot._noToImageButton = true;
            }

        }
    })