function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const resultImage = document.getElementById('resultImage');
  const loadingElement = document.getElementById('loading');
  const successMessage = document.getElementById('successMessage');

  // Clear previous error, success message, or image
  successMessage.style.display = 'none';
  resultImage.style.display = 'none';

  if (!prompt) {
    alert('Please enter a prompt!');
    return;
  }

  loadingElement.style.display = 'flex';

  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1920&height=1080&nologo=true`;
  
  resultImage.src = imageUrl;
  // Wait for the image to load and display it
    resultImage.onload = function () {
      loadingElement.style.display = 'none';
      successMessage.style.display = 'block';
      resultImage.style.display = 'block';
    };
}
