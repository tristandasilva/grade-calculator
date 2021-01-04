function calculateAverageGrade() {
    // Targeting Elements
    let gradeInputs  = $(".grade"),
        weightInputs = $(".weight"),
        gradesList   = [],
        weightsList  = [];

    // Loop through all inputed grades and weights, and only add to the list if there is both a grade and weight value
    for (let i = 0; i < gradeInputs.length; i++) {
        if (gradeInputs[i].value.length > 0 && weightInputs[i].value.length > 0) {
            gradesList.push(gradeInputs[i].value);
            weightsList.push((weightInputs[i].value)/100);
        }
    }

    let totalWeightedGrades = 0;
    let totalWeight = 0;
    for (let j = 0; j < gradesList.length; j++) {
        // Sum the weighted grade of each grade using the user-inputed grade/weight pairs
        totalWeightedGrades += gradesList[j] * weightsList[j]; 
        // Suming the total weight the user has entered
        totalWeight += weightsList[j]; 
    }

    // Calculate average grade
    let averageGrade = totalWeightedGrades / totalWeight; 

    // Checks if user has entered any data at all
    if (averageGrade) { 
        // Display average grade text and show answer box
        $("#average-grade").html("<em>Average grade = </em>" + Math.round(averageGrade * 100)/100 + "%"); 
        $(".answer-container").removeAttr("hidden"); 
        $("#container").css("margin-top", "1.5rem"); 
    }

    // Checks if user entered a desired grade and if user has entered anything at all 
    if ($("#desired-grade").val().length > 0 && averageGrade) { 
        // Calculate grade needed on remaining coursework to achieve desired grade
        gradeNeeded = ($("#desired-grade").val() - (averageGrade * (totalWeight))) / (1 - totalWeight);  
        // Display grade needed text
        $("#grade-needed").html("<em>Grade needed = </em>" + Math.round(gradeNeeded * 100)/100 + "%"); 
        checkMediaQuery("(max-height: 740px)", "1rem"); 
    }
    $(document).scrollTop($(document).height());
}

function resetTable() {
    // Clear values and answer text
    $("input").val(''); 
    $("p").text('');
    // Hide answer box and center if needed
    $(".answer-container").attr("hidden", true); 
    checkMediaQuery("(max-height: 740px)","3rem"); 
}

// Checks if the window size matches the inputed screen dimension
function checkMediaQuery(screenSize, margin) {
    if (window.matchMedia(screenSize).matches) { 
        // Change the top margin to 0.25rem
        $("#container").css("margin-top", "0.25rem"); 
    } else { 
        // Change to inputed margin
        $("#container").css("margin-top", margin); 
    }
}

// On Load
$(document).ready(() => {
    $(window).resize(() => {
        if ($("#answer-container").is(":hidden")) { 
            checkMediaQuery("(max-height: 740px)", "3rem");
        }
    });
});