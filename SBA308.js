// courseInfo Object
const courseInfo = {
    id: 3033,
    name: "Web Design Essentials"
};

// assignmentGroup Object
const assignmentGroup = [
    {
        id: 101,
        name: "SBA",
        course_id: 3033,
        group_weight: 75,
        assignments: [
            {
                id: 101307,
                name: "HTML and CSS",
                due_at: "12-20-2025",
                points_possible: 1250
            },
            {
                id: 101308,
                name: "JavaScript Fundamentals",
                due_at: "01-20-2025",
                points_possible: 1250
            },
            {
                id: 101316,
                name: "The Document Object Model",
                due_at: "01-26-2025",
                points_possible: 1250
            },
        ]
    },
    {
        id: 202,
        name: "KBA",
        course_id: 3033,
        group_weight: 25,  
        assignments: [
            {
                id: 202307,
                name: "Fundamentals of HTML/CSS",
                due_at: "12-20-2025",
                points_possible: 250
            },
            {
                id: 202308,
                name: "Fundamentals of JavaScript",
                due_at: "01-20-2025",
                points_possible: 250
            },
            {
                id: 202316,
                name: "Fundamentals of the DOM",
                due_at: "01-26-2025",
                points_possible: 250
            }
        ]
    }
]



// learnerSubmission
    const learnerSubmissions = [
    {
        learner_id: 123,
        assignment_id: 101307,
        submission: {
            submitted_at: "12-20-2025",
            score: 1250
        }
    },
    {
        learner_id: 123,
        assignment_id: 101308,
        submission: {
            submitted_at: "01-20-2026",
            score: 1250
        }
    },
    {
        learner_id: 123,
        assignment_id: 101316,
        submission: {
            submitted_at: "01-20-2026",
            score: 1000
        }
    },
    {
        learner_id: 456,
        assignment_id: 101307,
        submission: {
            submitted_at: "12-20-2025",
            score: 1250
        }
    },
    {
        learner_id: 456,
        assignment_id: 101308,
        submission: {
            submitted_at: "01-20-2026",
            score: 1250
        }
    },
        {
        learner_id: 789,
        assignment_id: 101307,
        submission: {
            submitted_at: "12-20-2025",
            score: 1250
        }
    },
    {
        learner_id: 789,
        assignment_id: 101308,
        submission: {
            submitted_at: "01-20-2026",
            score: 1250
        }
    },
]


// GET LEARNER DATA
function getLearnerData(course, assignmentGroup, learnerSubmissions) {
    try{
        if(assignmentGroup[0].course_id !== course.id) {
            throw new Error(`AssignmentGroup ${assignmentGroup[0].id} does not belong to Course ${course.id}.`);
        }
    } 
    

}

// Assignment Indexing
    const assignmentInfo = {};
    for (const group of assignmentGroup) {
        for (const assignment of group.assignments) {
            assignmentInfo[assignment.id] = assignment;
        }
    }
// Grouping Learner




    const learners = {};
    const now = new Date();
    
    for (const submission of learnerSubmissions) {
        const learnerId = submission.learner_id;
        const assignment = assignmentInfo[submission.assignment_id];
        console.log('Found assignment:', !assignment);
        if (!learners[learnerId]) {
            learners[learnerId] = {
                id: learnerId,
                totalScore: 0,
                totalPossible: 0,
                scores: {},
                assignments: {}
            };
        }



        if (!assignment) {
            console.log('SKIPPED - no assignment');
            continue;
        }









    const dueDate = new Date(assignment.due_at);
    console.log('Due:', dueDate, 'Now:', now);
    const submittedDate = new Date(submission.submission.submitted_at);
  
    if (dueDate > now) {
        continue;
    }

    let finalScore = submission.submission.score;
    const pointPossible = assignment.points_possible;

    if (pointPossible <= 0) {
    continue;
    }

    if (pointPossible === 0) {
        console.warn(`Assignment ${assignment.id} has 0 points possible, skipping.`);
        continue;
    }

    let penalty = 0;
    if (submittedDate > dueDate) {
        penalty = 0.01 * pointPossible;
        finalScore -= penalty;
        if (penalty < 0) penalty = 0;
    }





    const percentage = finalScore / pointPossible;
    const learner = learners[learnerId];

    learner.assignments[assignment.id] = percentage;
    learner.totalScore += finalScore;
    learner.totalPossible += pointPossible;


}

// FORMATTED RESULTS
const results = [];

for (const learnerId in learners) {
    const learner = learners[learnerId];
    const avg = learner.totalPossible > 0
    ? learner.totalScore / learner.totalPossible
    : 0;

    const resultObj = {
        id: learner.id,
        avg: avg,
        scores: learner.scores
    };

    results.push(resultObj);

    }   catch (error) {
            console.error("An error occured:", error.message);
            return [];
        }

return results;

