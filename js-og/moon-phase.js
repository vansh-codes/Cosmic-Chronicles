function calculateMoonPhase(date) {
    // The duration in days of a lunar cycle
    var lunarDays = 29.53058770576;
    // Date time of first new moon in year 2000
    var new2000 = new Date("2000-01-06T18:14:00Z").getTime() / 1000;

    // Convert the input date to Unix timestamp
    var unixDate = date.getTime() / 1000;

    // Calculate seconds between date and new moon 2000
    var totalSecs = unixDate - new2000;

    // The modulus to drop completed cycles
    var lunarSecs = lunarDays * (24 * 60 *60);
    var currentSecs = totalSecs % lunarSecs;

    // If negative number (date before new moon 2000) add lunarSecs
    if ( currentSecs < 0 ) {
        currentSecs += lunarSecs;
    }

    // Calculate the fraction of the moon cycle
    var currentFrac = currentSecs / lunarSecs;

    // Calculate days in current cycle (moon age)
    var currentDays = currentFrac * lunarDays;
    
    // Calculate the percentage of the moon phase
    var phasePercentage = (currentDays / lunarDays) * 100;

    // Array with start and end of each phase
    var phases = [
        ["New Moon", 0, 1],
        ["Waxing Crescent", 1, 6.38264692644],
        ["First Quarter", 6.38264692644, 8.38264692644],
        ["Waxing Gibbous", 8.38264692644, 13.76529385288],
        ["Full Moon", 13.76529385288, 15.76529385288],
        ["Waning Gibbous", 15.76529385288, 21.14794077932],
        ["Last Quarter", 21.14794077932, 23.14794077932],
        ["Waning Crescent", 23.14794077932, 28.53058770576],
        ["New Moon", 28.53058770576, 29.53058770576]
    ];

    // Find current phase in the array
    var thePhase;
    for (var i = 0; i < phases.length; i++) {
        if (currentDays >= phases[i][1] && currentDays <= phases[i][2]) {
            thePhase = phases[i][0];
            break;
        }
    }
    
    // Find the date of the next new moon
    var nextNewMoonDate = new Date(date);
    nextNewMoonDate.setDate(nextNewMoonDate.getDate() + (29.53 - currentDays));

    return {
        phase: thePhase,
        percentage: phasePercentage.toFixed(2),
        nextNewMoon: nextNewMoonDate.toDateString()
    };
}

function icon(phase){
    if (phase === 'New Moon') {
        return '🌑';
    } else if (phase === 'Waxing Crescent') {
        return '🌒';
    } else if (phase === 'First Quarter') {
        return '🌓';
    } else if (phase === 'Waxing Gibbous') {
        return '🌔';
    } else if (phase === 'Full Moon') {
        return '🌕';
    } else if (phase === 'Waning Gibbous') {
        return '🌖';
    } else if (phase === 'Last Quarter') {
        // return {icon: '🌗',percentage: "50%"};
        return '🌗';
    } else if (phase === 'Waning Crescent') {
        return '🌘';
    } 
};

// Update the moon phase display
function updateMoonPhaseDisplay() {
    var currentDate = new Date();
    var moonInfo = calculateMoonPhase(currentDate);
    var phase = moonInfo.phase;
    var displayDate = 'Date: ' + currentDate.toDateString();
    var moonPhaseNameDisplay = 'Moon Phase: ' + phase;
    var moonPhaseIconDisplay = icon(phase);
    var moonPhasePercentageDisplay = 'Percentage of Lunation: ' + moonInfo.percentage + '%';
    var moonPhaseNextDisplay = 'Next New Moon: ' + moonInfo.nextNewMoon;


    document.getElementById('date').innerHTML = displayDate;
    document.getElementById('moon-phase-name').innerHTML = moonPhaseNameDisplay;
    document.getElementById('moon-phase-icon').innerHTML = moonPhaseIconDisplay;
    document.getElementById('moon-phase-percentage').innerHTML = moonPhasePercentageDisplay;
    document.getElementById('moon-phase-next').innerHTML = moonPhaseNextDisplay;

}

// Update the moon phase display initially
updateMoonPhaseDisplay();

const targetHour = 0; // 12 AM
const targetMinute = 0;

function checkTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  if (currentHour === targetHour && currentMinute === targetMinute) {
    updateMoonPhaseDisplay();
  }
}

// Update the moon phase display every day
setInterval(checkTime, 6*10000); // check every minute

const facts = [
    "The Sun is a star located at the center of the Solar System.",
    "The Milky Way galaxy contains billions of stars, including our Sun.",
    "The largest volcano in the Solar System is Olympus Mons, located on Mars.",
    "The universe is approximately 13.8 billion years old.",
    "There are more stars in the universe than grains of sand on all the beaches on Earth.",
    "The Milky Way galaxy, which contains our solar system, is just one of these galaxies",
    "The universe is expanding, with galaxies moving away from each other in all directions",
    "Black holes are regions in space where gravity is so strong that nothing, not even light, can escape from them.",
    "Did you know? The hottest planet in our solar system is not Mercury, the closest planet to the Sun, but actually Venus due to its thick atmosphere trapping heat.",
    "Did you know? Neptune, the eighth planet from the Sun, was discovered mathematically before it was observed through a telescope. Its existence was predicted based on gravitational anomalies in the orbit of Uranus.",
    "Did you know? The Moon is gradually moving away from Earth at a rate of about 3.8 centimeters (1.5 inches) per year. This phenomenon is known as lunar recession.",
    "Did you know? A day on Venus, the second planet from the Sun, is longer than its year. Venus rotates on its axis very slowly, taking about 243 Earth days to complete one rotation."
];

function updateFacts() {
    const marquee = document.getElementById('marquee-fact');
    const randomIndex = Math.floor(Math.random() * facts.length);
    marquee.textContent = facts[randomIndex];
}

setInterval(updateFacts, 60 * 1000); // Update every minute