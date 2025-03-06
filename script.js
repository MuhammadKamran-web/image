// Function to generate the image from the Pollinations API
async function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const resultImage = document.getElementById('resultImage');
  const errorElement = document.getElementById('error');
  const loadingElement = document.getElementById('loading');
  const successMessage = document.getElementById('successMessage');
  const generateButton = document.getElementById('generateButton');

  // Clear previous error, success message, or image
  errorElement.style.display = 'none';
  successMessage.style.display = 'none';
  resultImage.style.display = 'none';

  // Check if the prompt is empty or exceeds the character limit
  if (!prompt) {
    alert('Please enter a prompt!');
    return;
  }
  if (prompt.length > 100) {
    alert('Prompt should not exceed 100 characters.');
    return;
  }

  // Disable the "Generate Image" button during the loading state
  generateButton.disabled = true;

  // Show loading message with spinner animation after a short delay
  setTimeout(() => {
    loadingElement.style.display = 'flex';
  }, 300);

  try {
    // Construct the Pollinations URL with the prompt
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1920&height=1080&nologo=true`;

    // Set the image source to the constructed URL
    resultImage.src = imageUrl;

    // Wait for the image to load and display it
    resultImage.onload = function () {
      loadingElement.style.display = 'none';
      successMessage.style.display = 'block';
      resultImage.style.display = 'block';
    };

    // Handle errors if the image fails to load
    resultImage.onerror = function () {
      loadingElement.style.display = 'none';
      errorElement.style.display = 'block';
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 5000); // Hide error message after 5 seconds
    };
  } catch (error) {
    console.error(error);
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
  } finally {
    // Re-enable the "Generate Image" button
    generateButton.disabled = false;
  }
}

// Save the user's last prompt in local storage on page load
window.onload = function() {
  const savedPrompt = localStorage.getItem('lastPrompt');
  if (savedPrompt) {
    document.getElementById('prompt').value = savedPrompt;
  }
};

// Save the prompt to localStorage when the user enters a prompt
document.getElementById('prompt').addEventListener('input', function() {
  localStorage.setItem('lastPrompt', this.value);
});