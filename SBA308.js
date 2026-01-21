// courseInfo Object
const courseInfo = {
    id: 3033,
    name: "Web Design Essentials"
};

// assignmentGroups Object
const assignmentGroups = [
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
    function getLearnerData(course, assignmentGroups, learnerSubmissions) {
        try{
            if(assignmentGroups[0].course_id !== course.id) {
                throw new Error(`assignmentGroups ${assignmentGroups[0].id} does not belong to Course ${course.id}.`);
            }

    

// Assignment Indexing
            const assignmentInfo = {};
            for (const group of assignmentGroups) {
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
                
                if (!assignment) {
                    console.log('Assignment ${submission.assignment_id} not found, SKIPPED.');
                    continue;
                }


// INIT LEARNER
                if (!learners[learnerId]) {
                    learners[learnerId] = {
                        id: learnerId,
                        totalScore: 0,
                        totalPossible: 0,
                        scores: {},
                    };
                }

                const dueDate = new Date(assignment.due_at);
                const submittedDate = new Date(submission.submission.submitted_at);


// SKIP ASSIGNMENTS NOT DUE
                if (dueDate > now) {
                    continue;
                }


                let finalScore = submission.submission.score;
                const pointPossible = assignment.points_possible;

                if (pointPossible <= 0) {
                    console.warn(`Assignment ${assignment.id} has invalid points possible, skipping.`);
                    continue;
                }

// LATE PENALTY 
                if (submittedDate > dueDate) {
                    const penalty = 0.10 * pointPossible;
                    finalScore -= penalty;
                    finalScore = Math.max(0, finalScore);
                }

                const percentage = finalScore / pointPossible;
                const learner = learners[learnerId];

// STORING DATA
                learner.scores[assignment.id] = percentage;
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
                    id: parseInt(learner.id),
                    avg: avg,
                    scores: learner.scores
                };
                results.push(resultObj);
            } 
            return results;

    }   catch (error) {
            console.error("An error occured:", error.message);
            return [];
    }
}
// CODE VALIDATION
const result = getLearnerData(courseInfo, assignmentGroups, learnerSubmissions);
console.log(result);