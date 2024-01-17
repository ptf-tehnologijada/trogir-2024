export const calculateTotalPoints = (matches) => {
  const pointsForWin = 2;
  const pointsForDraw = 1;

  const teamStats = {};

  matches.forEach((match) => {
    const homeTeam = match.homeName;
    const awayTeam = match.awayName;
    const homeGoals = Number(match.homeNum);
    const awayGoals = Number(match.awayNum);

    // Initialize team stats if not present
    if (!teamStats[homeTeam]) {
      teamStats[homeTeam] = { points: 0, wins: 0, draws: 0 };
    }
    if (!teamStats[awayTeam]) {
      teamStats[awayTeam] = { points: 0, wins: 0, draws: 0 };
    }

    if (match.entryType === 1) {
      return;
    }

    if (homeGoals > awayGoals) {
      // Home team wins
      teamStats[homeTeam].points += pointsForWin;
      teamStats[homeTeam].wins += 1;
    } else if (homeGoals < awayGoals) {
      // Away team wins
      teamStats[awayTeam].points += pointsForWin;
      teamStats[awayTeam].wins += 1;
    } else {
      // It's a draw
      teamStats[homeTeam].points += pointsForDraw;
      teamStats[awayTeam].points += pointsForDraw;
      teamStats[homeTeam].draws += 1;
      teamStats[awayTeam].draws += 1;
    }
  });

  // Convert the object into an array of teams with points, wins, and draws
  const teamsWithStats = Object.keys(teamStats).map((team) => ({
    team,
    points: teamStats[team].points,
    wins: teamStats[team].wins,
    draws: teamStats[team].draws,
  }));

  // Sort the array in descending order based on points
  teamsWithStats.sort((a, b) => b.points - a.points);

  return teamsWithStats;
};
