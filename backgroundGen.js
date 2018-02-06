    function randomFilling(a,b) {
        var tableaux = [];
        for (var i = 0; i < (a+2); i++){
            var row = [a+b];
            for (var j = 0; j < (a+1); j++){
                if (i < a+1 && j < a){
                    if (i>0){
                        var entry = Math.floor(Math.random()*(a+b+j-i))-a+i+1;
                        row.push(entry);
                    }
                    else {
                        row.push((a+b));
                    }
                }
                else {
                    row.push(0)
                }
            }
            tableaux.push(row);
        }
        return tableaux;
    }

    function fillingSort(randomFill) {
        var fillLength = randomFill.length-1;
        for (var j = 1; j <fillLength; j++ ) {
            for (var i = 1; i <fillLength; i++) {
                var rowIndex = fillLength-i;
                var colIndex = fillLength-j;
                while (true) {
                    var specialEntry = randomFill[rowIndex][colIndex];
                    var rightNeighbour = randomFill[rowIndex][colIndex+1];
                    var bottomNeighbour = randomFill[rowIndex+1][colIndex];
                    if (specialEntry < rightNeighbour || specialEntry < bottomNeighbour) {
                        if(rightNeighbour >= bottomNeighbour +1) {
                            randomFill[rowIndex][colIndex] = rightNeighbour;
                            randomFill[rowIndex][colIndex+1] = specialEntry;
                            colIndex = colIndex +1;
                        }
                        else {
                            randomFill[rowIndex][colIndex] = bottomNeighbour;
                            randomFill[rowIndex+1][colIndex] = specialEntry+1;
                            rowIndex = rowIndex + 1;
                        }

                    }
                    else {
                        break;
                    }
                }
            }
        }
        return randomFill;
    }

    function myDraw(planePart) {
        $('#map').empty();
        $('#mapHex').empty();
        var thirdRowLength = Math.ceil(planePart[0].length/5)
        var numRhombiAccross = 22;
        var browserWidth = 1280;
        var browserHeight = 720;
        var triangHypLength = Math.ceil(browserWidth/numRhombiAccross);
        var triangVert = triangHypLength/2;
        var triangHoriz = Math.sqrt((triangHypLength*triangHypLength-triangVert*triangVert));
        var ppLength = planePart.length-1;
        for(var j=0; j<ppLength;j++){
            var startXCoord = triangVert/2+j*(triangHoriz)-thirdRowLength*triangHoriz;
            var startYCoord = browserHeight+(thirdRowLength+5)*triangVert+j*(triangVert)+thirdRowLength*triangVert;

            var startXCoord2 = triangVert/2+(planePart.length+planePart[0].length-4-j)*triangHoriz-(thirdRowLength)*triangHoriz;
            if (j<(ppLength-1)){
                for(var i = 0; i <= j; i++){
                    var entry = planePart[ppLength-1-i][j+1-i];
                    var leftNeighbour = planePart[ppLength-1-i][j-i];
                    var lowNeighbour = planePart[ppLength-i][j+1-i];
                    var lowerlineY = startYCoord - triangHypLength*(lowNeighbour+i);
                    Circ((startXCoord+4*triangHoriz/3),(lowerlineY-triangHypLength*(entry-lowNeighbour)),(startXCoord+2*triangHoriz/3),(lowerlineY-triangHypLength*(entry-lowNeighbour)),(triangHoriz/7));
                    var upperlineY = startYCoord - triangHypLength*(entry+i);
                    var lowerVert = straightLine(startXCoord,lowerlineY,startXCoord,(lowerlineY-triangHypLength*(entry-lowNeighbour)));
                    var upperVert = straightLine(startXCoord,upperlineY,startXCoord,(upperlineY-triangHypLength*(leftNeighbour-entry)));
                    for(var i2 = 0; i2<=(entry-lowNeighbour);i2++){
                        var NWSE = NWSEline(startXCoord,(lowerlineY-triangHypLength*i2),triangHoriz,triangVert);
                        $('#map').append(NWSE);
                        if(i2<(entry-lowNeighbour)) {
                            Circ((startXCoord+triangHoriz/3),(lowerlineY-triangHypLength*i2-triangVert),(startXCoord+2*triangHoriz/3),(lowerlineY-triangHypLength*i2),(triangHoriz/7));
                        }
                    }
                    for(var i2 = 0; i2<=(leftNeighbour-entry);i2++){
                        var SWNE = SWNEline(startXCoord,(upperlineY-triangHypLength*i2),triangHoriz,triangVert);
                        $('#map').append(SWNE);
                        if(i2<(leftNeighbour-entry)) {
                            Circ((startXCoord+triangHoriz/3),(upperlineY-triangHypLength*i2-triangVert),(startXCoord+2*triangHoriz/3),(upperlineY-triangHypLength*i2-2*triangVert),(triangHoriz/7));
                        }
                    }
                    $('#map').append(lowerVert);
                    $('#map').append(upperVert);
                    
                    var entry2 = planePart[j+1-i][ppLength-1-i];
                    var leftNeighbour2 = planePart[j-i][ppLength-1-i];
                    var lowNeighbour2 = planePart[j+1-i][ppLength-i];
                    var lowerlineY2 = startYCoord - triangHypLength*(lowNeighbour2+i);
                    var upperlineY2 = startYCoord - triangHypLength*(entry2+i);
                    var lowerVert2 = straightLine(startXCoord2,lowerlineY2,startXCoord2,(lowerlineY2-triangHypLength*(entry2-lowNeighbour2)));
                    var upperVert2 = straightLine(startXCoord2,upperlineY2,startXCoord2,(upperlineY2-triangHypLength*(leftNeighbour2-entry2)));
                    Circ((startXCoord2-2*triangHoriz/3),(lowerlineY2-triangHypLength*(entry2-lowNeighbour2)),(startXCoord2-4*triangHoriz/3),(lowerlineY2-triangHypLength*(entry2-lowNeighbour2)),(triangHoriz/7));
                    $('#map').append(lowerVert2);
                    $('#map').append(upperVert2);

                    for(var i2 = 0; i2<=(leftNeighbour2-entry2);i2++){
                        var SWNE = NWSEline((startXCoord2-triangHoriz),(upperlineY2-triangHypLength*i2-triangVert),triangHoriz,triangVert);
                        $('#map').append(SWNE);
                        if(i2<(leftNeighbour2-entry2)){
                            Circ((startXCoord2-2*triangHoriz/3),(upperlineY2-triangHypLength*i2-2*triangVert),(startXCoord2-triangHoriz/3),(upperlineY2-triangHypLength*i2-triangVert),(triangHoriz/7));
                        }
                    }

                    for(var i2 = 0; i2<=(entry2-lowNeighbour2);i2++){
                        var NWSE = SWNEline((startXCoord2-triangHoriz),(lowerlineY2-triangHypLength*i2+triangVert),triangHoriz,triangVert);
                        $('#map').append(NWSE);
                        if(i2<(entry2-lowNeighbour2)){
                            Circ((startXCoord2-2*triangHoriz/3),(lowerlineY2-triangHypLength*i2),(startXCoord2-1*triangHoriz/3),(lowerlineY2-triangHypLength*i2-triangVert),(triangHoriz/7));
                        }
                    }            
                }
            }

            var centreXCoord = triangVert/2+(ppLength-1)*triangHoriz-(thirdRowLength)*triangHoriz;
            var centreYCoord = browserHeight+(thirdRowLength+5)*triangVert+(ppLength-1)*(triangVert)+thirdRowLength*triangVert;

            var centreEntry = planePart[ppLength-1-j][ppLength-1-j];
            var centreBelowEntry = planePart[ppLength-j][ppLength-j];

            var lineCentre = straightLine(centreXCoord,(centreYCoord-triangHypLength*(centreBelowEntry+j)),centreXCoord,(centreYCoord-triangHypLength*(centreEntry+j)));

            $('#map').append(lineCentre);


        }
    }


    function buttonFunc() {
        var tab = randomFilling(15,15);
        var planePart = fillingSort(tab);
        myDraw(planePart);
    }

    function interchangeBG() {
        document.getElementById('EntBut').style.display = 'none';
        $('#Landing').toggleClass('invisible');
        setTimeout(function(){
                var dispNone = document.getElementsByClassName("tester invisible");
                dispNone[0].style.display = "none";
            },000);
    }

    function straightLine(x1,y1,x2,y2){
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('x1',x1);
        newLine.setAttribute('y1',y1);
        newLine.setAttribute('x2',x2);
        newLine.setAttribute('y2',y2);
        return newLine;
    }

    function NWSEline(x1,y1,horzLength,vertLength) {
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('x1',x1);
        newLine.setAttribute('y1',y1);
        newLine.setAttribute('x2',(x1+horzLength));
        newLine.setAttribute('y2',(y1+vertLength));
        newLine.setAttribute('class', 'angleLine');
        return newLine;
    }

    function Circ(x1,y1,x2,y2,radius) {

        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('x1',x1);
        newLine.setAttribute('y1',y1);
        newLine.setAttribute('x2',x2);
        newLine.setAttribute('y2',y2);

        var circ1 = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circ1.setAttribute('cx',x1);
        circ1.setAttribute('cy',y1);
        circ1.setAttribute('r',radius);
        circ1.setAttribute('fill','#797979');

        var circ2 = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circ2.setAttribute('cx',x2);
        circ2.setAttribute('cy',y2);
        circ2.setAttribute('r',radius);
        circ2.setAttribute('fill','white');

        $('#mapHex').append(newLine);
        $('#mapHex').append(circ1);
        $('#mapHex').append(circ2);
    }

    function SWNEline(x1,y1,horzLength,vertLength) {
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('x1',x1);
        newLine.setAttribute('y1',y1);
        newLine.setAttribute('x2',(x1+horzLength));
        newLine.setAttribute('y2',(y1-vertLength));
        return newLine;
    }

    function myBG() {
        $('#BgWrap').toggleClass('invisible');
        setTimeout(function(){
            buttonFunc();
            $('#BgWrap').toggleClass('invisible');
        },400);
    }

    function pm() {
        var el = document.getElementById('DDsign');
        if (el.innerHTML == "+") {
            el.innerHTML = "-";        }
        else {
            el.innerHTML = "+";
        }

    }

    function dropDown() {
        $('.ddMenu').toggleClass('topBit');
        $('.ddMenu').toggleClass('bottomBit');
        pm();
    }

    function dualiser() {
        $('#Tiling').toggleClass('invisible');
        $('#TilingHex').toggleClass('invisible');
    }











