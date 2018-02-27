document.addEventListener("DOMContentLoaded", function (event) {
  const codeButtons = document.querySelectorAll('.code-button');
  const resetButton = document.querySelector('.reset-button');
  const actionButtons = document.querySelectorAll('.action-button');
  const currentCode = document.querySelector('#current-code');
  const errorContainer = document.querySelector('.error-container');
  const stopButton = document.querySelector('#stop-all-button');

  codeButtons.forEach((codeButton) => {
    codeButton.addEventListener('click', () => {
      const value = codeButton.getAttribute('data-number');
      currentCode.innerHTML += value;
      errorContainer.innerHTML = "";
    });
  });

  resetButton.addEventListener('click', () => {
    errorContainer.innerHTML = "";
    currentCode.innerHTML = '';
  });

  actionButtons.forEach((actionButton) => {
    actionButton.addEventListener('click', () => {
      const operation = actionButton.getAttribute('data-operation');
      const code = currentCode.innerHTML;
      errorContainer.innerHTML = "";
      actionButtons.forEach((button) => button.classList.add('disabled'));
      fetch('/command', {
        method: 'post',
        body: JSON.stringify({
          operation,
          code
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        actionButtons.forEach((button) => button.classList.remove('disabled'));
        if (response.status === 401) {
          errorContainer.innerHTML = "Code Incorrect";
        } else if (response.status !== 200) {
          errorContainer.innerHTML = "Erreur inconnue, veuillez réessayer";
        }
      })
    });
  });

  stopButton.addEventListener('click', () => {
    fetch('/stop-everything', {method: 'post'});
  })
});
