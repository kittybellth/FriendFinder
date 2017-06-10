
var friendArray = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendArray);
  });

  app.post("/api/friends", function(req, res){
    var newScores = req.body.scores;
    calculate(newScores, res);
    friendArray.push(req.body);
  });
};

var calculate = function(newScores, res){
    var numArr = [];

    // calculating the absolute number of each person to find the perfect match
    for(var i = 0; i < friendArray.length; i++){ 
        var newNum = 0;
        for (var x = 0; x < friendArray[i].scores.length; x++){   
                var num = Math.abs(friendArray[i].scores[x]-newScores[x]);
                newNum += num;  
        };
        numArr.push(newNum);
    };

    // finding the minimum number
    console.log(numArr);
    var minNum = Math.min.apply(null, numArr);
    console.log(minNum);
    for (var y = 0; y < numArr.length; y++){
        if (numArr[y] == minNum){
            res.json(friendArray[y]);
            return;
            
        };
    };
};