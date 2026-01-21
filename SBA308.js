// courseInfo Object
const courseInfo = {
    id: 3033,
    name: "Web Design Essentials"
};

// assignmentGroup Object
const assignmentGroup = {
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


// learnerSubmission
    const learnerSubmission = [
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
        if(assignmentGroup.course_id !== course.id) {
            throw new Error(`AssignmentGroup ${arguments.id} does not belong to Course ${course.id}.`);
        }
    } 
    
    catch (error) {
        console.error("An error occured:", error.message);
        return [];
    }
}

// Assignment Indexing

const assignmentInfo = {};

for (const assignment of assignmentGroup.assignments) {
    assignmentInfo[assignment.id] = assignment;
}

// Grouping Learner
const learners = {};

for (const submission of learnerSubmissions) {
    const learnerId = submission.learner_id;
    if (!learners[learnerId]) {
        learners[learnerId] = {
            id: learnerId,
            totalScore: 0,
            totalPossible: 0,
            scores: {}
            assignment: {}
        };
    }

    const assignment = assignmentInfo[submission.assignment_id];
    if (!assignment) {
        continue;
    }

    const dueDate = new Date(assignment.due_at);
    const submittedDate = new Date(submission.submission.submitted_at)
    const now = new Date();
    if (dueDate > now) {
        continue;
    }
}

    let finalScore = submission.submission.score;
    const pointPossible = assignment.points_possible;

    if (pointPossible) <= 0) {
        contiue
    }

    if (pointPossible === 0) {
        console.warn(`Assignment ${assignment.id} has 0 points possible, skipping.`);
        continue;
    }


    if (submittedDate > dueDate) {
        const penalty = score - .01 * pointPossible;
        finalScore -= penalty;
        if (penalty < 0) penalty = 0
    }

    const percentage = finalScore / pointPossible;

    const learner = learners[learnerId];

    learner.assignment[assignment.id] = percentage;

    learner.totalScore += finalScore;
    learner.totalPossible += pointPossible;
}

// FORMATTED RESULTS
const results [];

for (const learnerId in learners) {
    const learner = learners[learnerId];
    const avg = learner.totalPossible > 0
    ? learner.finalScore / learner.pointPossible: 0;

    const resultObj = {
        id: learner.id,
        avg: avg,
        learner.scores
    };

    resultObj.push(resultObj);
}

return results;

