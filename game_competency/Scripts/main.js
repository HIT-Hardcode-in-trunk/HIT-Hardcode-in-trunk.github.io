var $progressValue = 0;
var resultList = [];
var scoreList = [];
var video = document.getElementById('video1');
var next = document.getElementById('next');
  

next.addEventListener('click',function(){
  video.load();
  video.stop();
  },false);


const quizdata = [
    {
        question:"Can you tell me about a time when you successfully completed a task as part of a team?",
        video: "videoOption_0",
        options: ["Answer A", "Answer B", "Answer C"],
        answer: "Answer A",
        answerDescription: [
            
            "Answer A: This is the best answer as it follows the STARR method and demonstrates well the candidate’s ability to work in a team. It also covers many of the skills that the employer is looking for." + "<br></br>",
            "Answer B: This is the poorest answer as it isn’t full enough – it doesn’t give a detailed description and doesn’t follow the STARR method." + "<br></br>",
            "Answer C: This is a fairly good answer as it follows the STARR method, but the candidate should have concentrated more on describing specifically what they did, rather than the team as a whole."
        
        ],

        
        category: 1,
        optionScores :[0, 50, 10]
    }
    // {
    //     question:"Describe a situation where you delivered good customer service.",
    //     video:  "videoOption_1",
    //     options: ["Answer A", "Answer B", "Answer C"],
    //     answer: ["Answer B"],
    //     category: 2,
    //     optionScores: [0, 50, 10]
    // },
    // {
    //     question:"Tell me about a time when you’ve had to complete a project or task to a tight deadline.",
    //     video: "videoOption_3",
    //     options: ["Answer A", "Answer B", "Answer C"],
    //     answer: ["Answer C"],
    //     category: 2,
    //     optionScores: [0, 90, 10]
    // },
 
    // {
    //     question:"Tell me about a time when you used your written or verbal communication skills effectively.",
    //     video: "videoOption_4",
    //     options: ["Answer A", "Answer B", "Answer C"],
    //     answer: ["Answer A"],
    //     category: 2,
    //     optionScores: [0, 90, 10]
    // },

    // {
    //     question:"Describe a situation where you used your organisation skills effectively?",
    //     video: "videoOption_5",
    //     options: ["Answer A", "Answer B", "Answer C"],
    //     answer: ["Answer B"],
    //     category: 2,
    //     optionScores: [0, 90, 10]
    // },

    // {
    //     question:"Would you like to ask any questions?",
    //     video: "videoOption_6",
    //     options: [
    //         "Question A: I don’t have any questions as I think you have covered everything during the interview.", 
    //         "Question B: Can you give me a bit more information about the team that I would be working with?", 
    //         "Question C: What are the next steps in the process?"],
    //     answer: ["Answer B"],
    //     category: 2,
    //     optionScores: [0, 90, 10]
    // }

];
/** Random shuffle questions **/
function shuffleArray(question) {
    var shuffled = question.sort(function () {
        return 1 - Math.random();
    });
    return shuffled;
}

function shuffle(a) {
    for (var i = a.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        var _ref = [a[j], a[i - 1]];
        a[i - 1] = _ref[0];
        a[j] = _ref[1];
    }
}

/*** Return shuffled question ***/
function generateQuestions() {
    var questions = shuffleArray(quizdata);
    return questions;
}

/*** Return list of options ***/
function returnOptionList(opts, i) {
    var optionHtml =
        '<li class="myoptions">' +
        '<input value="' +
        opts +
        '" name="optRdBtn" type="radio" id="rd_' +
        i +
        '">' +
        '<label for="rd_' +
        i +
        '">' +
        opts +
        "</label>" +
        '<div class="bullet">' +
        '<div class="line zero"></div>' +
        '<div class="line one"></div>' +
        '<div class="line two"></div>' +
        '<div class="line three"></div>' +
        '<div class="line four"></div>' +
        '<div class="line five"></div>' +
        '<div class="line six"></div>' +
        '<div class="line seven"></div>' +
        "</div>" +
        "</li>";

    return optionHtml;
}

/** Render Options **/
function renderOptions(optionList) {
    var ulContainer = $("<ul>").attr("id", "optionList");
    for (var i = 0, len = optionList.length; i < len; i++) {
        var optionContainer = returnOptionList(optionList[i], i);
        ulContainer.append(optionContainer);
    }
    $(".answerOptions").html("").append(ulContainer);
}

/** Render question **/
function renderQuestion(question) {
    $(".question").html("<h1>" + question + "</h1>");
}

/** Render quiz :: Question and option **/
function renderQuiz(questions, index) {
    var currentQuest = questions[index];
    renderQuestion(currentQuest.question);
    renderOptions(currentQuest.options);
    console.log("Question");
    console.log(questions[index]);
}

/** Return correct answer of a question ***/
function getCorrectAnswer(questions, index) {
    return "This is correct answer: " + questions[index].answer +"<br></br>" + questions[index].answerDescription;
}

/** pushanswers in array **/
function correctAnswerArray(resultByCat) {
    var arrayForChart = [];
    for (var i = 0; i < resultByCat.length; i++) {
        arrayForChart.push(resultByCat[i].correctanswer);
    }

    return arrayForChart;
}
/** Generate array for percentage calculation **/
function genResultArray(results, wrong, scoreTotal, scoreMaxPossTotal) {
    var resultByCat = resultByCategory(results);
    var arrayForChart = correctAnswerArray(resultByCat);
    arrayForChart.push(wrong);
    return arrayForChart;
}

//// direct percentage //////////
function directPercent(number, total) {
    if(number==0 && total==0) return -1//bad parameter error
    if (number == 0) return 0
    else return 100*((number / total).toFixed(2));
}

/** percentage Calculation **/
function percentCalculation(array, total) {
    var percent = array.map(function (d, i) {
        return ((100 * d) / total).toFixed(2);
    });
    return percent;
}

/*** Get percentage for chart **/
function getPercentage(resultByCat, wrong) {
    var totalNumber = resultList.length;
    var wrongAnwer = wrong;
    var arrayForChart=genResultArray(resultByCat, wrong);
    return percentCalculation(arrayForChart, totalNumber);
}

/** count right and wrong answer number **/
function countAnswers(results) {
    var countCorrect = 0,
        countWrong = 0,
        scoreTotal = 0,
        scoreMaxPossTotal= 0;
    for (var i = 0; i < results.length; i++) {
        if (results[i].iscorrect == true) countCorrect++;
        else countWrong++;
        scoreTotal += results[i].clickedScore;
        scoreMaxPossTotal += results[i].maxPossScore;
    }
    return [countCorrect, countWrong, scoreTotal,scoreMaxPossTotal];
}

/**** Categorize result *****/
function resultByCategory(results) {
    var categoryCount = [];
    var ctArray = results.reduce(function (res, value) {
        if (!res[value.category]) {
            res[value.category] = {
                category: value.category,
                correctanswer: 0
            };
            categoryCount.push(res[value.category]);
        }
        var val = value.iscorrect == true ? 1 : 0;
        res[value.category].correctanswer += val;
        return res;
    }, {});

    categoryCount.sort(function (a, b) {
        return a.category - b.category;
    });

    return categoryCount;
}

/** Total score pie chart**/
function totalPieChart(_upto, _cir_progress_id, _correct, _incorrect) {
    $("#" + _cir_progress_id)
        .find("._text_incor")
        .html("Incorrect : " + _incorrect);
    $("#" + _cir_progress_id)
        .find("._text_cor")
        .html("Correct : " + _correct);

    var unchnagedPer = _upto;

    _upto = _upto > 100 ? 100 : _upto < 0 ? 0 : _upto;

    var _progress = 0;

    var _cir_progress = $("#" + _cir_progress_id).find("._cir_P_y");
    var _text_percentage = $("#" + _cir_progress_id).find("._cir_Per");

    var _input_percentage;
    var _percentage;

    var _sleep = setInterval(_animateCircle, 25);

    function _animateCircle() {
        //2*pi*r == 753.6 +xxx=764
        _input_percentage = (_upto / 100) * 764;
        _percentage = (_progress / 100) * 764;

        _text_percentage.html(_progress + "%");

        if (_percentage >= _input_percentage) {
            _text_percentage.html(
                '<tspan x="50%" dy="0em">' +
                unchnagedPer +
                '% </tspan><tspan  x="50%" dy="1.9em">Your Score</tspan>'
            );
            clearInterval(_sleep);
        } else {
            _progress++;

            _cir_progress.attr("stroke-dasharray", _percentage + ",764");
        }
    }
}

function renderBriefChart(correct, total, incorrect,scoreTotal,scoremaxpossTotal) {
    var percent = (100 * correct) / total;
    if (Math.round(percent) !== percent) {
        percent = percent.toFixed(2);
    }

    totalPieChart(percent, "_cir_progress", correct, incorrect);
}
/*** render chart for result **/
function renderChart(data) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: [
                "Verbal communication",
                "Non-verbal communication",
                "Written communication",
                "Incorrect"
            ],
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#e6ded4", "#968089", "#e3c3d4", "#ab4e6b"],
                    borderColor: [
                        "rgba(239, 239, 81, 1)",
                        "#8e3407",
                        "rgba((239, 239, 81, 1)",
                        "#000000"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            pieceLabel: {
                render: "percentage",
                fontColor: "black",
                precision: 2
            }
        }
    });
}

/** List question and your answer and correct answer  

*****/
function getAllAnswer(results) {
    var innerhtml = "";
    var totalScore = countAnswers(results)[2];
    var totalPossMaxScore = countAnswers(results)[3];
    var totalScorePercent = directPercent(totalScore, totalPossMaxScore);
    for (var i = 0; i < results.length; i++) {
        var _class = results[i].iscorrect ? "item-correct" : "item-incorrect";
        var _classH = results[i].iscorrect ? "h-correct" : "h-incorrect";
        var questionScore = results[i].clickedScore;
        var questionMaxPossScore = results[i].maxPossScore;
        var questionPercent = directPercent(questionScore, questionMaxPossScore);
        var questionPercentofTotalMaxPossScore = directPercent(questionScore, totalPossMaxScore);
        var _html =
            '<div class="_resultboard ' +
            _class +
            '">' +
            '<div class="_header">' +
            results[i].question +
            "</div>" +
            '<div class="_yourans ' +
            _classH +
            '">' +
            results[i].clicked +
            "</div>" +
            '<div class="_yourscore ' +
            _classH +
            '">' +
            questionScore + " / "+questionMaxPossScore +" Q("+questionPercent+"%) Qtotal("+questionPercentofTotalMaxPossScore+"%) Total("+totalScorePercent+"%)"+
            "</div>";

        var html = "";
        if (!results[i].iscorrect)
            html = '<div class="_correct">' + results[i].answer + "</div>";
        _html = _html + html + "</div>";
        innerhtml += _html;
    }

    $(".allAnswerBox").html("").append(innerhtml);
}
/** render  Brief Result **/
function renderResult(resultList) {
    var results = resultList;
    console.log(results);
    var countCorrect = countAnswers(results)[0],
        countWrong = countAnswers(results)[1],
        scoreTotal = countAnswers(results)[2];
    scoreMaxPossTotal = countAnswers(results)[3];

    renderBriefChart(countCorrect, resultList.length, countWrong, scoreTotal, scoreMaxPossTotal);
}

function renderChartResult() {
    var results = resultList;
    var countCorrect = countAnswers(results)[0],
        countWrong = countAnswers(results)[1],
        scoreTotal = countAnswers(results)[2];
    scoreMaxPossTotal = countanswers(results)[3];
    var dataForChart = genResultArray(resultList, countWrong, scoreTotal, scoreMaxPossTotal);
    renderChart(dataForChart);
}

/** Insert progress bar in html **/
function getProgressindicator(length) {
    var progressbarhtml = " ";
    for (var i = 0; i < length; i++) {
        progressbarhtml +=
            '<div class="my-progress-indicator progress_' +
            (i + 1) +
            " " +
            (i == 0 ? "active" : "") +
            '"></div>';
    }
    $(progressbarhtml).insertAfter(".my-progress-bar");
}

/*** change progress bar when next button is clicked ***/
function changeProgressValue() {
    $progressValue += 9;
    if ($progressValue >= 100) {
    } else {
        if ($progressValue == 99) $progressValue = 100;
        $(".my-progress")
            .find(".my-progress-indicator.active")
            .next(".my-progress-indicator")
            .addClass("active");
        $("progress").val($progressValue);
    }
    $(".js-my-progress-completion").html($("progress").val() + "% complete");
}
function addClickedAnswerToResult(questions, presentIndex, clicked,scoreClicked,maxpossScore) {
    var correct = getCorrectAnswer(questions, presentIndex);
    var result = {
        index: presentIndex,
        question: questions[presentIndex].question,
        clicked: clicked,
        iscorrect: clicked == correct ? true : false,
        answer: correct,
        category: questions[presentIndex].category,
        clickedScore: scoreClicked,
        maxPossScore: maxpossScore
    };
    resultList.push(result);

    console.log("result");
    console.log(result);
}

$(document).ready(function () {
    $(".videoOptions > div").addClass("hidden");

    var presentIndex = 0;
    $("#videoOption_" + presentIndex).removeClass("hidden");
    var clicked = 0;
    //var clickedIdx = 0;
    var clickedScore = 0;
    var maxPossScore = 0;
    var questions = generateQuestions();
    renderQuiz(questions, presentIndex);
    getProgressindicator(questions.length);

    $(".answerOptions ").on("click", ".myoptions>input", function (e) {
        //initialise - zero the globals
        clicked = 0;
        clickedScore = 0;
        maxPosScore = 0;
        clicked = $(this).val();
       var  clickedIdx = this.id.replace("rd_", "");
        clickedScore = questions[presentIndex].optionScores[clickedIdx];
        for (var i = 0; i < questions[presentIndex].optionScores.length; i++) {
            if (questions[presentIndex].optionScores[i] > maxPossScore) {
                maxPossScore = questions[presentIndex].optionScores[i];
            }
        }
        if (questions.length == presentIndex + 1) {
            $("#submit").removeClass("hidden");
            $("#next").addClass("hidden");
        } else {
            $("#next").removeClass("hidden");
        }
    });

    $("#next").on("click", function (e) {
        e.preventDefault();
        addClickedAnswerToResult(questions, presentIndex, clicked,clickedScore,maxPossScore);

        $(this).addClass("hidden");
        $(".videoOptions > div").addClass("hidden");
        presentIndex++;
        $("#videoOption_" + presentIndex).removeClass("hidden");
        renderQuiz(questions, presentIndex);
        changeProgressValue();
    });

    $("#submit").on("click", function (e) {
        addClickedAnswerToResult(questions, presentIndex, clicked,clickedScore,maxPossScore);
        $(".multipleChoiceQues").hide();
        $(".resultArea").show();
        renderResult(resultList);
    });

    $(".resultArea").on("click", ".viewchart", function () {
        $(".resultPage2").show();
        $(".resultPage1").hide();
        $(".resultPage3").hide();
        renderChartResult();
    });

    $(".resultArea").on("click", ".backBtn", function () {
        $(".resultPage1").show();
        $(".resultPage2").hide();
        $(".resultPage3").hide();
        renderResult(resultList);
    });

    $(".resultArea").on("click", ".viewanswer", function () {
        $(".resultPage3").show();
        $(".resultPage2").hide();
        $(".resultPage1").hide();
        getAllAnswer(resultList);
    });

    $(".resultArea").on("click", ".replay", function () {
        window.location.reload(true);
    });
});
