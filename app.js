let subject_list = [];
let idx = 0;
let total_cg = 0;
let subject_count = 0;
let credits = 0;
let coursesShow = document.getElementById("courseCompleted");
let creditsShow = document.getElementById("creditsCompleted");
let cgBox = document.getElementById("cgBox");
const app = document.getElementById("app");
let attemptedCredits = 0;
let creditsAttempted = document.getElementById("creditsAttempted");
const handleSubmit = (e) => {

    e.preventDefault();
    const isDelete = e.submitter.textContent;

    let subject = e.target.subject.value;
    let cg = e.target.cg.value;

    let flag = true;
    if (isDelete === "Delete") flag = false;

    //validation of form i
    if (!validateForm(subject, cg, flag)) {
        return;
    }

    subject = subject.toUpperCase();
    cg = parseFloat(cg);
    subject_count = subject_list.length;
    if (flag) {
        addSubject(subject, cg);
    } else {
        deleteSubject(subject)
    }
    app.classList.remove("hidden");
    coursesShow.innerText = subject_list.map(s =>
        s.sub).join(", ")
    creditsShow.innerText = credits;
    cgBox.innerText = (total_cg * 3) / attemptedCredits;
    creditsAttempted.innerText = attemptedCredits;
    e.target.subject="";
    e.target.cg="";
}


function addSubject(subject, cg) {
    subject_list.push({ index: (subject_list.length), sub: subject, cg: cg })
    total_cg += cg;
    if (cg !== 0) {
        credits += 3;
        attemptedCredits = credits;
    }
    if (cg === 0) {
        attemptedCredits += 3;
    }

}

function validateForm(subject, cg, flag) {



    if (flag) {
        if (!subject || !cg) {
            alert("Incomplete input fields");
            return false;
        }
    } else {
        if (subject.length === 0) {
            alert("Incomplete input fields");
            return false;
        }
        if (parseFloat(cg) > 4 || parseFloat(cg) < 0) {
            alert("CG must be between 0 to 4");
            return false;
        }
    }
    return true;

}


function deleteSubject(name) {
    name = name.toUpperCase();
    const removed = subject_list.find(s => s.sub === name);
    if (!removed) {
        alert("Course Not Found")
        return;
    }
    total_cg -= removed.cg;
    subject_list = subject_list.filter(s => s.sub !== name);
     attemptedCredits -= 3; 

    if (removed.cg !== 0) {
        credits -= 3; 
    }

    coursesShow.innerText = subject_list.map(s =>
        s.sub).join(", ");

    creditsShow.innerText = credits;
    cgBox.innerText = (total_cg / attemptedCredits).toFixed(2);
    creditsAttempted.innerText = attemptedCredits;
}