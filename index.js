function startGame() {
  var form = document.getElementById('playerEmailForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(form.action, {
      method: 'POST',
      body: new FormData(document.getElementById('playerEmailForm')),
    })
      .then((response) => response.json())
      .then((html) => {
        window.open('game.html', '_self');
      });
  });
}
