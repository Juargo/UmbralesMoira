angular.module("umbralesApp")
    .factory("plot", function () {
        plot1 = undefined;
        plot2 = undefined;
        showbuttom = false;
        id=undefined;
        return {
            setid: function (a) {  
                id=a;
            },
            getid: function(){
                return id;
            },
            resetid:function () {  
                id=undefined;
            },
            getPlot1: function () {
                return plot1;
            },
            getPlot2: function () {
                return plot2;
            },
            getshowbuttom: function(){
                return showbuttom;
            },
            setshowbuttom: function(a){
                showbuttom = a;
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
                            color: '#23527c',
                            isDragable: false,
                            lineWidth: 1,
                            markerOptions: { style: "filledCircle", size: 3.0 }
                        },
                        {
                            lineWidth: 1,
                            color:'#EEA52E',
                            linePattern: 'dashed',
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            lineWidth: 1,
                            color:'#EE9A2E',
                            linePattern: 'dashed',
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            lineWidth: 1,
                            color:'#C9302C',
                            markerOptions: { style: "filledCircle", size: 5.0 }
                        },
                        {
                            lineWidth: 1,
                            color: '#DF3531',
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

                //console.log(plot1);
                plot2 = $.jqplot('chart2', data, {
                    seriesDefaults: { showMarker: false },
                    series: [
                        {
                            renderer: $.jqplot.LineRenderer,
                            color: '#23527c',
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


                    // plot1.series[1].show = false;
                    // plot1.series[2].show = false;
                    // plot1.series[3].show = false;
                    // plot1.series[4].show = false;
                    // plot1.replot();
            }

        }
    })