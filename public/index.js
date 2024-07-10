document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const playerName = document.getElementById('playerName').value;
    const team = document.getElementById('team').value;
    const year = document.getElementById('year').value;
  
    const response = await fetch(`/api/search?playerName=${playerName}&team=${team}&year=${year}`);
    const results = await response.json();
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results.map(card => `<div>${card.name} - ${card.team} (${card.year})</div>`).join('');
  });