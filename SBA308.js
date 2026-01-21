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
        }
    ]
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
function getLearnerData(courseInfo, assignmentGroup, learnerSubmission) {
    try{
        if(assignmentGroup.course_id !== course.id) {
            throw new Error(`AssignmentGroup ${arguments.id} does not belong to Course.`);
        }
    } catch (error) {
        console.error("An error occured:", error.message);
        return [];
    }
}

// Assignment Indexing

const assignmentInfo = {};

for (let i = 0; i < assignmentGroup.assignments.length; i++) {
    const assignment = assignmentGroup.assignments[i];
    assignmentInfo[assignment.id] = assignment;
}

// Grouping Learner
const learners = {};

for (const submission of learnerSubmission) {
    const assignment = assignmentInfo[submission.assignment_id];
    const learnerId = submission.learner_id;
    
    if (!assignment) {
        continue;
    }

    const dueDate = new Date(assignment.due_at);
    const submittedDate = new Date(submission.submission.submitted_at)
    const now = new Date();
    if (dueDate > now) {
        continue;
    }
    if (!learners[learnerId]) {
        learners[learnerId] = {
            id: learnerId,
            totalScore: 0,
            totalPossible: 0,
            scores: {}
            assignment: {}
        };
    }

    if (assignment.points_possible === 0) {
        console.warn(`Assignment ${assignment.id} has 0 points possible, skipping.`);
        continue;
    }

    let finalScore = submission.submission.score;

    if (submittedDate > dueDate) {
        const penalty = assignment.points_possible * 0.1;
        finalScore -= penalty;
    }

    learner[learnerId].totalScore += finalScore;
    learner[learnerId].totalPossible += assignment.points_possible;

    learner[learnerId].score[assignment.id] = finalScore / assignment.points_possible;
}

// FORMATTED RESULTS
const results [];

for (const key in learners) {
    const learner = learners[key];

    let avg = 0;
    if (learner.totalPossible !==0) {
        avg = learner.totalScore / learner.totalPossible;
    }
    const resultObj = {
        id: learner.id,
        avg: avg,
        learner.scores
    };

    resultObj.push(resultObj);
}

return results;

