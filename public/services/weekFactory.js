angular.module("umbralesApp")
    .factory("week", function () {
        var mes = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
        var dia = { Mon: 7, Tue: 8, Wed: 9, Thu: 10, Fri: 11, Sat: 12, Sun: 13 };

        //get today
        // 0   1   2  3
        //Sun Feb 12 2017 06:26:44 GMT-0300 (CLT)
        date = new Date();
        dateString = date.toString().split(/ /g);

        //asegunandome de que tome la fecha que quiero, el lunes de la semana pasada
        date = new Date(mes[dateString[1]] + '-' + dateString[2] + '-' + dateString[3]);
        date.setDate(date.getDate() - dia[dateString[0]]);

        //console.log(date);

        dy = date;
        lunes = new Date(dy.setDate(date.getDate()));
        domingo = new Date(dy.setDate(lunes.getDate()+6));

        date = new Date(mes[dateString[1]] + '-' + dateString[2] + '-' + dateString[3]);
        date.setDate(date.getDate() - dia[dateString[0]]);

        function formatDay(d, a) {
            if (a == -1) {
                d = new Date(d.setDate(d.getDate() - 1));
            } else if (a == 1) {
                d = new Date(d.setDate(d.getDate() + 1));
            }
            dayText = d.getFullYear().toString() + "_" + (d.getMonth() + 1).toString() + "_" + d.getDate().toString();
            return dayText;
        }
        dias = [
            { fi: formatDay(date, -1), ff: formatDay(date, 1), class: "active", nombre: "Lunes" },
            { fi: formatDay(date, 0), ff: formatDay(date, 1), class: "", nombre: "Martes" },
            { fi: formatDay(date, 0), ff: formatDay(date, 1), class: "", nombre: "Miercoles" },
            { fi: formatDay(date, 0), ff: formatDay(date, 1), class: "", nombre: "Jueves" },
            { fi: formatDay(date, 0), ff: formatDay(date, 1), class: "", nombre: "Viernes" },
            { fi: formatDay(date, 0), ff: formatDay(date, 1), class: "", nombre: "Sabado" },
            { fi: formatDay(date, 0), ff: formatDay(date, 1), class: "", nombre: "Domingo" }
        ];

        return {
            getWeek: function () {
                return dias;
            },
            getLunes:function(){
                return lunes;
            },
            getDomingo:function(){
                return domingo;
            },
            getOnly: function (puntos,dia) {
                newpuntos=[];
                function formatDate(a, index) {
                    if (a < 10) {
                        b = "0" + a.toString();
                    } else {
                        b = a;
                    }
                    return b;
                }
                
                for(i=0;i<puntos.length;i++){
                    var t = new Date(puntos[i][1] * 1000);
                    var tt = t.toGMTString();
                    var tt = tt.substr(0, 25);
                    var tt = tt.toString().split(/ /g);
                    //Tue, 31 Jan 2017 01:10:00
                    if(tt[1] == formatDate(dia) && puntos[i][0] != null){
                        newpuntos.push(puntos[i]);
                    }
                }

                return newpuntos;

            }
        }
    })