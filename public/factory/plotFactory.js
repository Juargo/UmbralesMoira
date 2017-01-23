angular.module("graphApp")
    .factory("plot", function () {
        plot1 = undefined;
        id=undefined;
        return {
            setid: function (idg) {  
                id=idg;
            },
            getid: function(){
                return id;
            },
            resetid:function () {  
                id=undefined;
            },
            getPlot: function () {
                return plot1;
            },

            setPlot: function (data) {
                plot1 = $.jqplot('myChart', data, {
                    title: "Umbrales",
                    series: [{}, {
                        //linePattern: 'dotted',
                        linePattern: 'dashed',
                        lineWidth: 1,
                        showMarker: false,
                        shadow: false,
                        //pointLabels: { show:true } 
                        markerOptions: { style: "circle" }
                    }, {
                        linePattern: 'dotted',
                        showMarker: false,
                        shadow: false
                    }],
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.DateAxisRenderer,
                            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                            tickOptions: {
                                formatString: "%H:%M",
                                angle: -45
                            }
                        }
                    },
                    highligther: {
                        sizeAdjust: 10,
                        tooltipLocation: 'n',
                        tooltipAxes: 'both',
                        tooltipFormatString: '<b><i><span>%s , </span></i></b> %.2f',
                        useAxesFormatters: false
                    }
                })
            }

        }
    })